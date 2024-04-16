package com.baidu.appwalle;

import java.io.IOException;
import java.nio.BufferUnderflowException;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.channels.FileChannel;
import java.util.LinkedHashMap;
import java.util.Map;

final class ApkUtil {
    private ApkUtil() {
    }

    public static long getCommentLength(FileChannel fileChannel) throws IOException {
        long archiveSize = fileChannel.size();
        if (archiveSize < 22L) {
            throw new IOException("APK too small for ZIP End of Central Directory (EOCD) record");
        } else {
            long maxCommentLength = Math.min(archiveSize - 22L, 65535L);
            long eocdWithEmptyCommentStartPosition = archiveSize - 22L;
            for(int expectedCommentLength = 0; (long)expectedCommentLength <= maxCommentLength; ++expectedCommentLength) {
                long eocdStartPos = eocdWithEmptyCommentStartPosition - (long)expectedCommentLength;
                ByteBuffer byteBuffer = ByteBuffer.allocate(4);
                fileChannel.position(eocdStartPos);
                fileChannel.read(byteBuffer);
                byteBuffer.order(ByteOrder.LITTLE_ENDIAN);
                if (byteBuffer.getInt(0) == 101010256) {
                    ByteBuffer commentLengthByteBuffer = ByteBuffer.allocate(2);
                    fileChannel.position(eocdStartPos + 20L);
                    fileChannel.read(commentLengthByteBuffer);
                    commentLengthByteBuffer.order(ByteOrder.LITTLE_ENDIAN);
                    int actualCommentLength = commentLengthByteBuffer.getShort(0);
                    if (actualCommentLength == expectedCommentLength) {
                        return actualCommentLength;
                    }
                }
            }

            throw new IOException("ZIP End of Central Directory (EOCD) record not found");
        }
    }

    public static long findCentralDirStartOffset(FileChannel fileChannel) throws IOException {
        return findCentralDirStartOffset(fileChannel, getCommentLength(fileChannel));
    }

    public static long findCentralDirStartOffset(FileChannel fileChannel, long commentLength) throws IOException {
        ByteBuffer zipCentralDirectoryStart = ByteBuffer.allocate(4);
        zipCentralDirectoryStart.order(ByteOrder.LITTLE_ENDIAN);
        fileChannel.position(fileChannel.size() - commentLength - 6L);
        fileChannel.read(zipCentralDirectoryStart);
        return zipCentralDirectoryStart.getInt(0);
    }

    public static Pair<ByteBuffer, Long> findApkSigningBlock(FileChannel fileChannel) throws IOException, SignatureNotFoundException {
        long centralDirOffset = findCentralDirStartOffset(fileChannel);
        return findApkSigningBlock(fileChannel, centralDirOffset);
    }

    public static Pair<ByteBuffer, Long> findApkSigningBlock(FileChannel fileChannel, long centralDirOffset) throws IOException, SignatureNotFoundException {
        if (centralDirOffset < 32L) {
            throw new SignatureNotFoundException("APK too small for APK Signing Block. ZIP Central Directory offset: " + centralDirOffset);
        } else {
            fileChannel.position(centralDirOffset - 24L);
            ByteBuffer footer = ByteBuffer.allocate(24);
            fileChannel.read(footer);
            footer.order(ByteOrder.LITTLE_ENDIAN);
            if (footer.getLong(8) == 2334950737559900225L && footer.getLong(16) == 3617552046287187010L) {
                long apkSigBlockSizeInFooter = footer.getLong(0);
                if (apkSigBlockSizeInFooter >= (long)footer.capacity() && apkSigBlockSizeInFooter <= 2147483639L) {
                    int totalSize = (int)(apkSigBlockSizeInFooter + 8L);
                    long apkSigBlockOffset = centralDirOffset - (long)totalSize;
                    if (apkSigBlockOffset < 0L) {
                        throw new SignatureNotFoundException("APK Signing Block offset out of range: " + apkSigBlockOffset);
                    } else {
                        fileChannel.position(apkSigBlockOffset);
                        ByteBuffer apkSigBlock = ByteBuffer.allocate(totalSize);
                        fileChannel.read(apkSigBlock);
                        apkSigBlock.order(ByteOrder.LITTLE_ENDIAN);
                        long apkSigBlockSizeInHeader = apkSigBlock.getLong(0);
                        if (apkSigBlockSizeInHeader != apkSigBlockSizeInFooter) {
                            throw new SignatureNotFoundException("APK Signing Block sizes in header and footer do not match: " + apkSigBlockSizeInHeader + " vs " + apkSigBlockSizeInFooter);
                        } else {
                            return Pair.of(apkSigBlock, apkSigBlockOffset);
                        }
                    }
                } else {
                    throw new SignatureNotFoundException("APK Signing Block size out of range: " + apkSigBlockSizeInFooter);
                }
            } else {
                throw new SignatureNotFoundException("No APK Signing Block before ZIP Central Directory");
            }
        }
    }

    public static Map<Integer, ByteBuffer> findIdValues(ByteBuffer apkSigningBlock) throws SignatureNotFoundException {
        checkByteOrderLittleEndian(apkSigningBlock);
        ByteBuffer pairs = sliceFromTo(apkSigningBlock, 8, apkSigningBlock.capacity() - 24);
        Map<Integer, ByteBuffer> idValues = new LinkedHashMap();
        int entryCount = 0;
        while(pairs.hasRemaining()) {
            ++entryCount;
            if (pairs.remaining() < 8) {
                throw new SignatureNotFoundException("Insufficient data to read size of APK Signing Block entry #" + entryCount);
            }

            long lenLong = pairs.getLong();
            if (lenLong < 4L || lenLong > 2147483647L) {
                throw new SignatureNotFoundException("APK Signing Block entry #" + entryCount + " size out of range: " + lenLong);
            }

            int len = (int)lenLong;
            int nextEntryPos = pairs.position() + len;
            if (len > pairs.remaining()) {
                throw new SignatureNotFoundException("APK Signing Block entry #" + entryCount + " size out of range: " + len + ", available: " + pairs.remaining());
            }
            int id = pairs.getInt();
            idValues.put(id, getByteBuffer(pairs, len - 4));
            pairs.position(nextEntryPos);
        }
        return idValues;
    }

    private static ByteBuffer sliceFromTo(ByteBuffer source, int start, int end) {
        if (start < 0) {
            throw new IllegalArgumentException("start: " + start);
        } else if (end < start) {
            throw new IllegalArgumentException("end < start: " + end + " < " + start);
        } else {
            int capacity = source.capacity();
            if (end > source.capacity()) {
                throw new IllegalArgumentException("end > capacity: " + end + " > " + capacity);
            } else {
                int originalLimit = source.limit();
                int originalPosition = source.position();
                ByteBuffer var7;
                try {
                    source.position(0);
                    source.limit(end);
                    source.position(start);
                    ByteBuffer result = source.slice();
                    result.order(source.order());
                    var7 = result;
                } finally {
                    source.position(0);
                    source.limit(originalLimit);
                    source.position(originalPosition);
                }
                return var7;
            }
        }
    }

    private static ByteBuffer getByteBuffer(ByteBuffer source, int size) throws BufferUnderflowException {
        if (size < 0) {
            throw new IllegalArgumentException("size: " + size);
        } else {
            int originalLimit = source.limit();
            int position = source.position();
            int limit = position + size;
            if (limit >= position && limit <= originalLimit) {
                source.limit(limit);
                ByteBuffer var6;
                try {
                    ByteBuffer result = source.slice();
                    result.order(source.order());
                    source.position(limit);
                    var6 = result;
                } finally {
                    source.limit(originalLimit);
                }

                return var6;
            } else {
                throw new BufferUnderflowException();
            }
        }
    }

    private static void checkByteOrderLittleEndian(ByteBuffer buffer) {
        if (buffer.order() != ByteOrder.LITTLE_ENDIAN) {
            throw new IllegalArgumentException("ByteBuffer byte order must be little endian");
        }
    }
}