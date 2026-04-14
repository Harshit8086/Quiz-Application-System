package com.harsh.quiz.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

/**
 * Stores the result of a completed quiz session.
 *
 * submittedAt is automatically set by Hibernate on INSERT via @CreationTimestamp —
 * no manual assignment needed in the service layer.
 */
@Entity
@Table(name = "quiz_result")
public class QuizResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Name of the player who took the quiz (from the login username). */
    private String playerName;

    @Min(value = 0, message = "Score cannot be negative")
    private int score;

    @Min(value = 1, message = "Total questions must be at least 1")
    @Max(value = 100, message = "Total questions cannot exceed 100")
    private int totalQuestions;

    @Min(value = 0, message = "Time taken cannot be negative")
    private int timeTaken; // seconds

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime submittedAt;

    // ── Getters & Setters ─────────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPlayerName() { return playerName; }
    public void setPlayerName(String playerName) { this.playerName = playerName; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }

    public int getTimeTaken() { return timeTaken; }
    public void setTimeTaken(int timeTaken) { this.timeTaken = timeTaken; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
}
