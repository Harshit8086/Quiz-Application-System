package com.harsh.quiz.repo;

import com.harsh.quiz.entity.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepo extends JpaRepository<QuizQuestion, Long> {

    /**
     * Returns a random sample of questions from the database.
     *
     * Note: ORDER BY RAND() is fine for small datasets (< 10,000 rows).
     * For very large tables consider a more efficient randomisation strategy.
     *
     * @param count maximum number of questions to return
     */
    @Query(value = "SELECT * FROM quiz_question ORDER BY RAND() LIMIT :count", nativeQuery = true)
    List<QuizQuestion> findRandomQuestions(@Param("count") int count);
}
