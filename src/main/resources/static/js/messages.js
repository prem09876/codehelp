async function loadMessages() {

    const container =
        document.getElementById(
            "messages-container"
        );


    try {

        const response =
            await fetch("/messages/inbox");


        if (!response.ok) {

            window.location.href =
                "/login";

            return;
        }


        const conversations =
            await response.json();


        if (conversations.length === 0) {

            container.innerHTML = `

                <div class="glass empty-state">

                    <div class="empty-icon">
                        💬
                    </div>

                    <h2>
                        No messages yet
                    </h2>

                    <p>
                        When another student helps
                        with your problem, your
                        conversation will appear here.
                    </p>

                    <a
                        href="/"
                        class="primary-btn">

                        Explore Problems

                    </a>

                </div>

            `;

            return;
        }


        container.innerHTML = "";


        conversations.forEach(
            function(conversation) {

                const card =
                    document.createElement("div");

                card.className =
                    "message-card glass";


                card.innerHTML = `

                    <div class="message-avatar">
                        ${conversation.otherUserName
                            .charAt(0)
                            .toUpperCase()}
                    </div>

                    <div class="message-content">

                        <h3>
                            ${escapeHtml(
                                conversation.otherUserName
                            )}
                        </h3>

                        <p class="message-problem">
                            Problem:
                            ${escapeHtml(
                                conversation.problemTitle
                            )}
                        </p>

                        <p class="message-preview">
                            ${escapeHtml(
                                conversation.lastMessage
                            )}
                        </p>

                    </div>

                    <button
                        class="open-chat-btn"
                        onclick="openChat(
                            ${conversation.problemId}
                        )">

                        Open Chat →

                    </button>

                `;


                container.appendChild(card);

            }
        );


    } catch (error) {

        console.error(
            "Unable to load messages:",
            error
        );


        container.innerHTML = `

            <div class="glass empty-state">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h2>
                    Unable to load messages
                </h2>

                <p>
                    Please try again.
                </p>

            </div>

        `;
    }
}


function openChat(problemId) {

    window.location.href =
        "/chat?problemId=" + problemId;
}


function escapeHtml(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value || "";

    return div.innerHTML;
}


loadMessages();