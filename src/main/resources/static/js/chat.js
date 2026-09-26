const params =
    new URLSearchParams(window.location.search);

const problemId =
    params.get("problemId");


const messagesContainer =
    document.getElementById("messages");

const messageInput =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const chatInfo =
    document.getElementById("chat-info");


let currentUser = null;
let problem = null;


async function loadChatData() {

    try {

        // Get logged-in user
        const userResponse =
            await fetch("/current-user");


        if (!userResponse.ok) {
            throw new Error("Unable to get current user");
        }


        currentUser =
            await userResponse.json();


        if (!currentUser) {

            window.location.href =
                "/login";

            return;
        }


        // Get problem
        const problemResponse =
            await fetch("/problems/" + problemId);


        if (!problemResponse.ok) {
            throw new Error("Problem not found");
        }


        problem =
            await problemResponse.json();


        chatInfo.textContent =
            "Private conversation for: " +
            problem.title;


        await loadMessages();


    } catch (error) {

        console.error(error);

        chatInfo.textContent =
            "Unable to load chat.";

    }
}


async function loadMessages() {

    if (!problemId) {

        chatInfo.textContent =
            "No problem selected.";

        return;
    }


    try {

        const response =
            await fetch(
                "/messages/problem/" + problemId
            );


        if (!response.ok) {
            throw new Error(
                "Unable to load messages"
            );
        }


        const messages =
            await response.json();


        messagesContainer.innerHTML = "";


        if (messages.length === 0) {

            messagesContainer.innerHTML = `
                <p style="color:#8f98b1;">
                    No messages yet.
                    Start the conversation!
                </p>
            `;

            return;
        }


        messages.forEach(message => {

            const messageElement =
                document.createElement("div");


            messageElement.classList.add(
                "message"
            );


            if (
                String(message.senderId) ===
                String(currentUser.id)
            ) {

                messageElement.classList.add(
                    "sent"
                );

            } else {

                messageElement.classList.add(
                    "received"
                );
            }


            messageElement.textContent =
                message.message;


            messagesContainer.appendChild(
                messageElement
            );

        });


        messagesContainer.scrollTop =
            messagesContainer.scrollHeight;


    } catch (error) {

        console.error(error);

        messagesContainer.innerHTML = `
            <p style="color:#ff9c9c;">
                Unable to load messages.
            </p>
        `;
    }
}


async function sendMessage() {

    const message =
        messageInput.value.trim();


    if (!message) {
        return;
    }


    if (!problemId) {

        alert("Problem information is missing.");

        return;
    }


    try {

        const response =
            await fetch("/messages", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    problemId:
                        Number(problemId),

                    message:
                        message

                })

            });


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(errorText);
        }


        messageInput.value = "";

        await loadMessages();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to send message. " +
            "Please try again."
        );
    }
}


sendButton.addEventListener(
    "click",
    sendMessage
);


messageInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();
        }
    }
);


loadChatData();