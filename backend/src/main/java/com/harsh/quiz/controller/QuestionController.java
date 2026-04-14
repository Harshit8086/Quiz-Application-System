package com.harsh.quiz.controller;

import com.harsh.quiz.dto.AnswerRequest;
import com.harsh.quiz.dto.QuizQuestionDTO;
import com.harsh.quiz.entity.QuizQuestion;
import com.harsh.quiz.service.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST controller for quiz questions.
 *
 * Security note: @CrossOrigin removed — CORS is now handled globally by
 * SecurityConfig.corsConfigurationSource() which applies at the security
 * filter layer and works correctly with JWT-protected endpoints.
 */
@RestController
@RequestMapping("/api")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    /**
     * Returns all questions (entities, including correctAnswer).
     * Intended for admin/data-entry use only — secure this endpoint in production.
     */
    @GetMapping("/questions")
    public List<QuizQuestion> getQuestions() {
        return questionService.getAllQuestions();
    }

    /**
     * Returns a random set of questions as safe DTOs (correctAnswer excluded).
     *
     * @param count number of random questions to return
     */
    @GetMapping("/questions/random/{count}")
    public List<QuizQuestionDTO> getRandomQuestions(@PathVariable int count) {
        return questionService.getRandomQuestions(count);
    }

    /**
     * Validates an answer server-side and returns the result.
     * The correct answer is revealed only AFTER the user submits — never before.
     *
     * Response body: { "correct": true/false, "correctAnswer": "..." }
     */
    @PostMapping("/questions/check")
    public ResponseEntity<Map<String, Object>> checkAnswer(@RequestBody AnswerRequest request) {
        QuizQuestion question = questionService.getQuestionById(request.getQuestionId());

        boolean correct = question.getCorrectAnswer()
                .equalsIgnoreCase(request.getSelectedAnswer());

        Map<String, Object> response = new HashMap<>();
        response.put("correct", correct);
        response.put("correctAnswer", question.getCorrectAnswer());

        return ResponseEntity.ok(response);
    }

    /** Saves a single question (admin use). */
    @PostMapping(value = "/save", consumes = "application/json", produces = "application/json")
    public QuizQuestion saveQuestion(@RequestBody QuizQuestion question) {
        return questionService.saveQuestion(question);
    }

    /** Bulk-saves questions (admin use). */
    @PostMapping("/saveAll")
    public List<QuizQuestion> saveAllQuestions(@RequestBody List<QuizQuestion> questions) {
        return questionService.saveAllQuestions(questions);
    }
}
