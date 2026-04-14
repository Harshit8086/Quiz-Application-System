package com.harsh.quiz.dto;

/**
 * Request body for the POST /api/questions/check endpoint.
 * The frontend submits which answer the user selected for a given question.
 */
public class AnswerRequest {

    private Long questionId;
    private String selectedAnswer;

    public AnswerRequest() {}

    public AnswerRequest(Long questionId, String selectedAnswer) {
        this.questionId = questionId;
        this.selectedAnswer = selectedAnswer;
    }

    // ── Getters & Setters ─────────────────────────────────────────────────────

    public Long getQuestionId() { return questionId; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }

    public String getSelectedAnswer() { return selectedAnswer; }
    public void setSelectedAnswer(String selectedAnswer) { this.selectedAnswer = selectedAnswer; }
}
