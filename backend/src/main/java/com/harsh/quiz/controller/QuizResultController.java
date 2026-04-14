package com.harsh.quiz.controller;

import com.harsh.quiz.entity.QuizResult;
import com.harsh.quiz.service.QuizResultService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for quiz results.
 *
 * Security note: @CrossOrigin removed — CORS is handled globally by SecurityConfig.
 */
@RestController
@RequestMapping("/api/results")
public class QuizResultController {

    private final QuizResultService quizResultService;

    public QuizResultController(QuizResultService quizResultService) {
        this.quizResultService = quizResultService;
    }

    /**
     * Saves a completed quiz result.
     *
     * @param result validated request body — @Valid enforces constraints
     *               defined on the QuizResult entity (@Min, @Max)
     */
    @PostMapping
    public ResponseEntity<QuizResult> saveResult(@Valid @RequestBody QuizResult result) {
        return ResponseEntity.ok(quizResultService.saveResult(result));
    }
}
