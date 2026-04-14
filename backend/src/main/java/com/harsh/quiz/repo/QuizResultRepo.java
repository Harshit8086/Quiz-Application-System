package com.harsh.quiz.repo;

import com.harsh.quiz.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuizResultRepo extends JpaRepository<QuizResult, Long> {
    
    // For User Dashboard: Get a user's entire quiz history, newest first
    List<QuizResult> findByPlayerNameOrderBySubmittedAtDesc(String playerName);

    // For Leaderboard: Top 10 by highest score, then lowest time taken
    List<QuizResult> findTop10ByOrderByScoreDescTimeTakenAsc();
}

