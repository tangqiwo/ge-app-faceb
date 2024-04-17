package com.baidu.appwalle;

final class Pair<A, B> {
    private final A mFirst;
    private final B mSecond;

    private Pair(A first, B second) {
        this.mFirst = first;
        this.mSecond = second;
    }

    public static <A, B> Pair<A, B> of(A first, B second) {
        return new Pair(first, second);
    }

    public A getFirst() {
        return this.mFirst;
    }

    public B getSecond() {
        return this.mSecond;
    }

    public int hashCode() {
        int result = 1;
        result = 31 * result + (this.mFirst == null ? 0 : this.mFirst.hashCode());
        result = 31 * result + (this.mSecond == null ? 0 : this.mSecond.hashCode());
        return result;
    }

    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        } else if (obj == null) {
            return false;
        } else if (this.getClass() != obj.getClass()) {
            return false;
        } else {
            Pair other = (Pair) obj;
            if (this.mFirst == null) {
                if (other.mFirst != null) {
                    return false;
                }
            } else if (!this.mFirst.equals(other.mFirst)) {
                return false;
            }

            if (this.mSecond == null) {
                return other.mSecond == null;
            } else return this.mSecond.equals(other.mSecond);
        }
    }
}