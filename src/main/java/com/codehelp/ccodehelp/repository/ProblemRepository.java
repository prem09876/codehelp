package com.codehelp.ccodehelp.repository;

import com.codehelp.ccodehelp.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {

    List<Problem> findByUserId(Long userId);
}