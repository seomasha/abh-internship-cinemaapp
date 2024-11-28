package com.abhinternship.CinemaApp.utils;

public class OtpDetails {
    private final String otp;
    private final long expirationTime;

    public OtpDetails(String otp, long expirationTime) {
        this.otp = otp;
        this.expirationTime = expirationTime;
    }

    public String getOtp() {
        return otp;
    }

    public long getExpirationTime() {
        return expirationTime;
    }
}
