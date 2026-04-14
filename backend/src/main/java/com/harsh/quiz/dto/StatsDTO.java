package com.harsh.quiz.dto;

public class StatsDTO {
    private int totalQuizzes;
    private double averageScore;
    private int totalTimeSpent; // in seconds

    public StatsDTO(int totalQuizzes, double averageScore, int totalTimeSpent) {
        this.totalQuizzes = totalQuizzes;
        this.averageScore = averageScore;
        this.totalTimeSpent = totalTimeSpent;
    }

    public int getTotalQuizzes() {
        return totalQuizzes;
    }

    public void setTotalQuizzes(int totalQuizzes) {
        this.totalQuizzes = totalQuizzes;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(double averageScore) {
        this.averageScore = averageScore;
    }

    public int getTotalTimeSpent() {
        return totalTimeSpent;
    }

    public void setTotalTimeSpent(int totalTimeSpent) {
        this.totalTimeSpent = totalTimeSpent;
    }
}
