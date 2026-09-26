package com.codehelp.ccodehelp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpSession;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/problem")
    public String problem() {
        return "problem";
    }

    @GetMapping("/chat")
    public String chat(HttpSession session) {

        Long userId =
                (Long) session.getAttribute("userId");

        if (userId == null) {
            return "redirect:/login";
        }

        return "chat";
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("/register")
    public String registerPage() {
        return "register";
    }

    @GetMapping("/my-problems")
    public String myProblems(HttpSession session) {

        Long userId =
                (Long) session.getAttribute("userId");

        if (userId == null) {
            return "redirect:/login";
        }

        return "my-problems";
    }

    @GetMapping("/create-problem")
    public String createProblem() {
        return "create-problem";
    }

    @GetMapping("/messages")
    public String messages(HttpSession session) {

        Long userId =
                (Long) session.getAttribute("userId");

        if (userId == null) {
            return "redirect:/login";
        }

        return "messages";
    }

    @GetMapping("/problems-page")
    public String problemsPage(HttpSession session) {

        Long userId =
                (Long) session.getAttribute("userId");

        if (userId == null) {
            return "redirect:/login";
        }

        return "problems";
    }

    @GetMapping("/profile")
    public String profile(HttpSession session) {

        Long userId =
                (Long) session.getAttribute("userId");

        if (userId == null) {
            return "redirect:/login";
        }

        return "profile";
    }
}