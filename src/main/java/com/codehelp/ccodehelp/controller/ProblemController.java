package com.codehelp.ccodehelp.controller;

import com.codehelp.ccodehelp.model.Problem;
import com.codehelp.ccodehelp.repository.ProblemRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/problems")
public class ProblemController {

    private final ProblemRepository problemRepository;

    public ProblemController(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    @PostMapping
    public Problem createProblem(
            @RequestBody Problem problem,
            HttpSession session) {

        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            throw new RuntimeException("Please login first");
        }

        problem.setUserId(userId);

        return problemRepository.save(problem);
    }

    @GetMapping
    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }

    @GetMapping("/{id}")
    public Problem getProblemById(@PathVariable Long id) {
        return problemRepository.findById(id).orElse(null);
    }

    // My Problems
    @GetMapping("/my")
    public List<Problem> getMyProblems(HttpSession session) {

        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            return List.of();
        }

        return problemRepository.findByUserId(userId);
    }
}