package com.harsh.quiz.dto;

/**
 * Response body returned on successful login.
 * Contains the JWT and its expiry duration in milliseconds.
 */
public class AuthResponse {

    private String token;
    private long expiresIn; // milliseconds

    public AuthResponse() {}

    public AuthResponse(String token, long expiresIn) {
        this.token = token;
        this.expiresIn = expiresIn;
    }

    // ── Getters & Setters ─────────────────────────────────────────────────────

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public long getExpiresIn() { return expiresIn; }
    public void setExpiresIn(long expiresIn) { this.expiresIn = expiresIn; }
}
