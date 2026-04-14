package com.harsh.quiz.dto;

import com.harsh.quiz.entity.QuizQuestion;

import java.util.List;

/**
 * Safe response DTO for quiz questions.
 * Deliberately omits the correctAnswer field so it is never sent to the browser.
 */
public class QuizQuestionDTO {

    private Long id;
    private String questionText;
    private List<String> options;

    public QuizQuestionDTO() {}

    public QuizQuestionDTO(Long id, String questionText, List<String> options) {
        this.id = id;
        this.questionText = questionText;
        this.options = options;
    }

    /** Converts a QuizQuestion entity to a safe DTO, stripping correctAnswer. */
    public static QuizQuestionDTO fromEntity(QuizQuestion question) {
        return new QuizQuestionDTO(
                question.getId(),
                question.getQuestionText(),
                question.getOptions()
        );
    }

    // ── Getters ──────────────────────────────────────────────────────────────

    public Long getId() { return id; }
    public String getQuestionText() { return questionText; }
    public List<String> getOptions() { return options; }

    // ── Setters ──────────────────────────────────────────────────────────────

    public void setId(Long id) { this.id = id; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }
    public void setOptions(List<String> options) { this.options = options; }
}
