package com.codehelp.ccodehelp.repository;

import com.codehelp.ccodehelp.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByProblemId(Long problemId);

    List<Message> findByProblemIdOrderByIdAsc(Long problemId);

    List<Message> findBySenderIdOrReceiverIdOrderByIdDesc(
            Long senderId,
            Long receiverId
    );
}
