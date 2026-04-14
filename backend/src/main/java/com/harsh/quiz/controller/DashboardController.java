package com.harsh.quiz.controller;

import com.harsh.quiz.dto.StatsDTO;
import com.harsh.quiz.entity.QuizResult;
import com.harsh.quiz.service.QuizResultService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final QuizResultService quizResultService;

    public DashboardController(QuizResultService quizResultService) {
        this.quizResultService = quizResultService;
    }

    /**
     * Publicly accessible global leaderboard.
     * Note: Make sure /api/dashboard/leaderboard is permitted in SecurityConfig.
     */
    @GetMapping("/leaderboard")
    public ResponseEntity<List<QuizResult>> getLeaderboard() {
        return ResponseEntity.ok(quizResultService.getTopPerformers());
    }

    /**
     * Secured endpoint returning current user's aggregated stats.
     */
    @GetMapping("/my-stats")
    public ResponseEntity<StatsDTO> getMyStats() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return ResponseEntity.ok(quizResultService.calculateUserStats(username));
    }

    /**
     * Secured endpoint returning current user's quiz history.
     */
    @GetMapping("/my-history")
    public ResponseEntity<List<QuizResult>> getMyHistory() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return ResponseEntity.ok(quizResultService.getUserHistory(username));
    }
}
