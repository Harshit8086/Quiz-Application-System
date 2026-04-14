package com.harsh.quiz.config;

import com.harsh.quiz.entity.AppUser;
import com.harsh.quiz.repo.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            System.out.println("No users found in database. Seeding default Admin user...");

            AppUser admin = new AppUser();
            admin.setUsername("Harsh");
            // Encrypt the password using the available PasswordEncoder bean
            admin.setPassword(passwordEncoder.encode("changeme"));
            admin.setRole("ROLE_ADMIN");

            userRepository.save(admin);
            
            System.out.println("Default Admin seeded: Harsh / changeme");
        }
    }
}
