const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");


loginForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;


        loginMessage.textContent =
            "Logging in...";

        loginMessage.style.color =
            "#aebcff";


        try {

            const response =
                await fetch("/login", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })

                });


            const result =
                await response.text();


            if (result === "Login successful") {

                loginMessage.textContent =
                    "Login successful!";

                loginMessage.style.color =
                    "#7ee2a8";


                setTimeout(function() {

                    window.location.href = "/";

                }, 700);


            } else {

                loginMessage.textContent =
                    "Invalid email or password.";

                loginMessage.style.color =
                    "#ff9c9c";

            }


        } catch (error) {

            console.error(error);

            loginMessage.textContent =
                "Unable to connect to server.";

            loginMessage.style.color =
                "#ff9c9c";

        }

    }
);