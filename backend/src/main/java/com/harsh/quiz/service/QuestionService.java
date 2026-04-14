package com.harsh.quiz.service;

import com.harsh.quiz.dto.QuizQuestionDTO;
import com.harsh.quiz.entity.QuizQuestion;
import com.harsh.quiz.repo.QuestionRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class QuestionService {

    private final QuestionRepo questionRepo;

    /** Constructor injection — allows final field, easier unit testing. */
    public QuestionService(QuestionRepo questionRepo) {
        this.questionRepo = questionRepo;
    }

    /** Returns all questions (entity — for admin/internal use only). */
    @Transactional(readOnly = true)
    public List<QuizQuestion> getAllQuestions() {
        return questionRepo.findAll();
    }

    /**
     * Returns a random set of questions as safe DTOs.
     * The DTO strips correctAnswer before passing to any caller.
     */
    @Transactional(readOnly = true)
    public List<QuizQuestionDTO> getRandomQuestions(int count) {
        return questionRepo.findRandomQuestions(count)
                .stream()
                .map(QuizQuestionDTO::fromEntity)
                .toList();
    }

    /**
     * Looks up a question by ID for server-side answer checking.
     *
     * @throws jakarta.persistence.EntityNotFoundException if ID not found
     */
    @Transactional(readOnly = true)
    public QuizQuestion getQuestionById(Long id) {
        return questionRepo.findById(id)
                .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException(
                        "Question not found with id: " + id));
    }

    public QuizQuestion saveQuestion(QuizQuestion question) {
        return questionRepo.save(question);
    }

    public List<QuizQuestion> saveAllQuestions(List<QuizQuestion> questions) {
        return questionRepo.saveAll(questions);
    }
}
