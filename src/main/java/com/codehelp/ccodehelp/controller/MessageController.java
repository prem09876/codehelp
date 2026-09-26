package com.codehelp.ccodehelp.controller;

import com.codehelp.ccodehelp.model.Conversation;
import com.codehelp.ccodehelp.model.Message;
import com.codehelp.ccodehelp.model.Problem;
import com.codehelp.ccodehelp.model.User;
import com.codehelp.ccodehelp.repository.MessageRepository;
import com.codehelp.ccodehelp.repository.ProblemRepository;
import com.codehelp.ccodehelp.repository.UserRepository;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/messages")
public class MessageController {

    private final MessageRepository messageRepository;
    private final ProblemRepository problemRepository;
    private final UserRepository userRepository;

    public MessageController(
            MessageRepository messageRepository,
            ProblemRepository problemRepository,
            UserRepository userRepository) {

        this.messageRepository = messageRepository;
        this.problemRepository = problemRepository;
        this.userRepository = userRepository;
    }


    // =========================
    // SEND MESSAGE
    // =========================

@PostMapping
public Message sendMessage(
        @RequestBody Message message,
        HttpSession session) {

    Long senderId =
            (Long) session.getAttribute("userId");


    if (senderId == null) {

        throw new RuntimeException(
                "Please login first"
        );
    }


    Problem problem =
            problemRepository
                    .findById(message.getProblemId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Problem not found"
                            ));


    Long ownerId =
            problem.getUserId();


    List<Message> messages =
            messageRepository
                    .findByProblemIdOrderByIdAsc(
                            message.getProblemId()
                    );


    Long receiverId;


    // ==================================
    // PROBLEM OWNER
    // ==================================

    if (senderId.equals(ownerId)) {

        if (messages.isEmpty()) {

            throw new RuntimeException(
                    "No student has started the conversation"
            );
        }


        // Find the student who is helping
        Message firstMessage =
                messages.get(0);


        Long helperId =
                firstMessage.getSenderId();


        if (helperId.equals(ownerId)) {

            helperId =
                    firstMessage.getReceiverId();
        }


        receiverId = helperId;
    }


    // ==================================
    // STUDENT HELPING
    // ==================================

    else {

        // No messages yet:
        // this student can start the chat
        if (messages.isEmpty()) {

            receiverId = ownerId;
        }

        else {

            // Check whether this student
            // already belongs to the conversation

            boolean participant =
                    messages.stream().anyMatch(
                            existingMessage ->

                                    senderId.equals(
                                            existingMessage.getSenderId()
                                    )
                                    ||
                                    senderId.equals(
                                            existingMessage.getReceiverId()
                                    )
                    );


            if (!participant) {

                throw new RuntimeException(
                        "This problem already has another private conversation"
                );
            }


            // Find the other participant
            Message lastMessage =
                    messages.get(
                            messages.size() - 1
                    );


            if (senderId.equals(
                    lastMessage.getSenderId())) {

                receiverId =
                        lastMessage.getReceiverId();

            } else {

                receiverId =
                        lastMessage.getSenderId();
            }
        }
    }


    message.setSenderId(senderId);
    message.setReceiverId(receiverId);


    return messageRepository.save(message);
}


    // =========================
    // GET CHAT MESSAGES
    // =========================

@GetMapping("/problem/{problemId}")
public List<Message> getMessages(
        @PathVariable Long problemId,
        HttpSession session) {

    Long currentUserId =
            (Long) session.getAttribute("userId");

    if (currentUserId == null) {
        throw new RuntimeException(
                "Please login first"
        );
    }

    Problem problem =
            problemRepository
                    .findById(problemId)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Problem not found"
                            ));

    Long ownerId =
            problem.getUserId();

    List<Message> messages =
            messageRepository
                    .findByProblemIdOrderByIdAsc(
                            problemId
                    );

    // Problem owner can access the chat
    if (currentUserId.equals(ownerId)) {
        return messages;
    }

    // Check whether this user is part
    // of the conversation
    boolean isParticipant =
            messages.stream().anyMatch(message ->
                    currentUserId.equals(
                            message.getSenderId()
                    )
                    ||
                    currentUserId.equals(
                            message.getReceiverId()
                    )
            );

    if (!isParticipant) {
        throw new RuntimeException(
                "You are not part of this conversation"
        );
    }

    return messages;
}


    // =========================
    // GET MY MESSAGES / INBOX
    // =========================

    @GetMapping("/inbox")
    public List<Conversation> getInbox(
            HttpSession session) {

        Long currentUserId =
                (Long) session.getAttribute("userId");

        if (currentUserId == null) {

            throw new RuntimeException(
                    "Please login first"
            );
        }


        List<Message> messages =
                messageRepository
                        .findBySenderIdOrReceiverIdOrderByIdDesc(
                                currentUserId,
                                currentUserId
                        );


        List<Conversation> conversations =
                new ArrayList<>();


        // Prevent duplicate conversations
        Set<Long> addedProblemIds =
                new HashSet<>();


        for (Message message : messages) {

            Long problemId =
                    message.getProblemId();


            if (addedProblemIds.contains(problemId)) {
                continue;
            }


            Problem problem =
                    problemRepository
                            .findById(problemId)
                            .orElse(null);


            if (problem == null) {
                continue;
            }


            Long otherUserId;


            if (message.getSenderId()
                    .equals(currentUserId)) {

                otherUserId =
                        message.getReceiverId();

            } else {

                otherUserId =
                        message.getSenderId();
            }


            User otherUser =
                    userRepository
                            .findById(otherUserId)
                            .orElse(null);


            if (otherUser == null) {
                continue;
            }


            Conversation conversation =
                    new Conversation(

                            problemId,

                            problem.getTitle(),

                            otherUserId,

                            otherUser.getName(),

                            message.getMessage()
                    );


            conversations.add(conversation);

            addedProblemIds.add(problemId);
        }


        return conversations;
    }
}