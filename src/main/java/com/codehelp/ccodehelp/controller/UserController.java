package com.codehelp.ccodehelp.controller;

import com.codehelp.ccodehelp.model.User;
import com.codehelp.ccodehelp.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@RestController
public class UserController {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public User register(@RequestBody User user) {

        if (user.getName() == null ||
                user.getName().trim().isEmpty()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Name is required"
            );
        }

        if (user.getEmail() == null ||
                user.getEmail().trim().isEmpty()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email is required"
            );
        }

        if (user.getPassword() == null ||
                user.getPassword().length() < 6) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Password must be at least 6 characters"
            );
        }


        if (userRepository
                .findByEmail(user.getEmail())
                .isPresent()) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already registered"
            );
        }


        // Hash password before saving
        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );


        return userRepository.save(user);
    }


    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public String login(
            @RequestBody User user,
            HttpSession session) {

        Optional<User> existingUser =
                userRepository.findByEmail(
                        user.getEmail()
                );


        if (existingUser.isEmpty()) {

            return "Invalid email or password";
        }


        User foundUser =
                existingUser.get();


        // Compare entered password
        // with hashed password
        if (passwordEncoder.matches(
                user.getPassword(),
                foundUser.getPassword())) {

            session.setAttribute(
                    "userId",
                    foundUser.getId()
            );

            session.setAttribute(
                    "userName",
                    foundUser.getName()
            );

            return "Login successful";
        }


        return "Invalid email or password";
    }


    // =========================
    // CURRENT USER
    // =========================

    @GetMapping("/current-user")
    public User currentUser(
            HttpSession session) {

        Long userId =
                (Long) session.getAttribute(
                        "userId"
                );


        if (userId == null) {
            return null;
        }


        return userRepository
                .findById(userId)
                .orElse(null);
    }


    // =========================
    // LOGOUT
    // =========================

    @PostMapping("/logout")
    public String logout(
            HttpSession session) {

        session.invalidate();

        return "Logged out successfully";
    }
}