package com.harsh.quiz.service;

import com.harsh.quiz.entity.QuizResult;
import com.harsh.quiz.repo.QuizResultRepo;
import org.springframework.stereotype.Service;

@Service
public class QuizResultService {

    private final QuizResultRepo quizResultRepo;

    /** Constructor injection — allows final field, easier unit testing. */
    public QuizResultService(QuizResultRepo quizResultRepo) {
        this.quizResultRepo = quizResultRepo;
    }

    /**
     * Persists a quiz result.
     * submittedAt is set automatically by @CreationTimestamp on the entity —
     * no manual assignment needed here.
     */
    public QuizResult saveResult(QuizResult result) {
        return quizResultRepo.save(result);
    }

    public java.util.List<QuizResult> getTopPerformers() {
        return quizResultRepo.findTop10ByOrderByScoreDescTimeTakenAsc();
    }

    public java.util.List<QuizResult> getUserHistory(String playerName) {
        return quizResultRepo.findByPlayerNameOrderBySubmittedAtDesc(playerName);
    }

    public com.harsh.quiz.dto.StatsDTO calculateUserStats(String playerName) {
        java.util.List<QuizResult> history = getUserHistory(playerName);
        if (history.isEmpty()) {
            return new com.harsh.quiz.dto.StatsDTO(0, 0.0, 0);
        }

        int totalQuizzes = history.size();
        int totalScore = 0;
        int totalTime = 0;

        for (QuizResult result : history) {
            // we calculate average score based on percentage? Let's just do average absolute score.
            // Or average percentage. Let's do percentage if totalQuestions > 0.
            if (result.getTotalQuestions() > 0) {
               totalScore += (int)Math.round(((double)result.getScore() / result.getTotalQuestions()) * 100);
            }
            totalTime += result.getTimeTaken();
        }

        double averageScore = (double) totalScore / totalQuizzes;
        return new com.harsh.quiz.dto.StatsDTO(totalQuizzes, Math.round(averageScore * 100.0)/100.0, totalTime);
    }
}
