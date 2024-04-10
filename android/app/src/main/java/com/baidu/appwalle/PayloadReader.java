package com.baidu.appwalle;

import android.util.Log;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.util.Arrays;
import java.util.Map;

public final class PayloadReader {
    private PayloadReader() {
    }

    /**
     * 读取指定ID的数据
     *
     * @param apkFile
     * @param id
     * @return
     */
    public static String getString(File apkFile, int id) {
        byte[] bytes = get(apkFile, id);
        if (bytes == null) {
            return null;
        } else {
            try {
                return new String(bytes, "UTF-8");
            } catch (UnsupportedEncodingException var4) {
                var4.printStackTrace();
                return null;
            }
        }
    }

    public static byte[] get(File apkFile, int id) {
        Map<Integer, ByteBuffer> idValues = getAll(apkFile);
        if (idValues == null) {
            return null;
        } else {
            ByteBuffer byteBuffer = (ByteBuffer) idValues.get(id);
            return byteBuffer == null ? null : getBytes(byteBuffer);
        }
    }

    private static byte[] getBytes(ByteBuffer byteBuffer) {
        byte[] array = byteBuffer.array();
        int arrayOffset = byteBuffer.arrayOffset();
        return Arrays.copyOfRange(array, arrayOffset + byteBuffer.position(), arrayOffset + byteBuffer.limit());
    }

    private static Map<Integer, ByteBuffer> getAll(File apkFile) {
        Map<Integer, ByteBuffer> idValues = null;
        try {
            RandomAccessFile randomAccessFile = null;
            FileChannel fileChannel = null;
            try {
                randomAccessFile = new RandomAccessFile(apkFile, "r");
                fileChannel = randomAccessFile.getChannel();
                ByteBuffer apkSigningBlock2 = (ByteBuffer) ApkUtil.findApkSigningBlock(fileChannel).getFirst();
                idValues = ApkUtil.findIdValues(apkSigningBlock2);
            } catch (IOException var18) {
                Log.d("异常", var18.getMessage());
            } finally {
                try {
                    if (fileChannel != null) {
                        fileChannel.close();
                    }
                } catch (IOException var17) {
                    Log.d("异常", var17.getMessage());
                }
                try {
                    if (randomAccessFile != null) {
                        randomAccessFile.close();
                    }
                } catch (IOException var16) {
                    Log.d("异常", var16.getMessage());
                }
            }
        } catch (SignatureNotFoundException var20) {
            Log.d("异常", var20.getMessage());
        }
        return idValues;
    }
}