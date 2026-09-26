const registerForm =
    document.getElementById("registerForm");

const registerMessage =
    document.getElementById("registerMessage");


registerForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        registerMessage.textContent =
            "Creating account...";

        registerMessage.style.color =
            "#aebcff";


        try {

            const response =
                await fetch("/register", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })

                });


            if (!response.ok) {

                const errorText =
                    await response.text();

                throw new Error(errorText);

            }


            await response.json();


            registerMessage.textContent =
                "Account created successfully!";

            registerMessage.style.color =
                "#7ee2a8";


            setTimeout(function() {

                window.location.href =
                    "/login";

            }, 1000);


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            registerMessage.textContent =
                "Registration failed. Please try again.";

            registerMessage.style.color =
                "#ff9c9c";

        }

    }
);