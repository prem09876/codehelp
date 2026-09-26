package com.codehelp.ccodehelp.model;

public class Conversation {

    private Long problemId;
    private String problemTitle;

    private Long otherUserId;
    private String otherUserName;

    private String lastMessage;

    public Conversation() {
    }

    public Conversation(
            Long problemId,
            String problemTitle,
            Long otherUserId,
            String otherUserName,
            String lastMessage) {

        this.problemId = problemId;
        this.problemTitle = problemTitle;
        this.otherUserId = otherUserId;
        this.otherUserName = otherUserName;
        this.lastMessage = lastMessage;
    }

    public Long getProblemId() {
        return problemId;
    }

    public void setProblemId(Long problemId) {
        this.problemId = problemId;
    }

    public String getProblemTitle() {
        return problemTitle;
    }

    public void setProblemTitle(String problemTitle) {
        this.problemTitle = problemTitle;
    }

    public Long getOtherUserId() {
        return otherUserId;
    }

    public void setOtherUserId(Long otherUserId) {
        this.otherUserId = otherUserId;
    }

    public String getOtherUserName() {
        return otherUserName;
    }

    public void setOtherUserName(String otherUserName) {
        this.otherUserName = otherUserName;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }
}
