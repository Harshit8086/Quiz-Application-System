package com.harsh.quiz.config;

/**
 * WebConfig is intentionally empty.
 *
 * CORS configuration has been moved to SecurityConfig.corsConfigurationSource()
 * so that it applies at the Spring Security filter layer — which runs BEFORE
 * Spring MVC and was previously ignoring WebMvcConfigurer CORS rules for
 * JWT-protected endpoints.
 *
 * @see com.harsh.quiz.security.SecurityConfig#corsConfigurationSource()
 */
public class WebConfig {
    // CORS is configured in SecurityConfig — see above Javadoc.
}
