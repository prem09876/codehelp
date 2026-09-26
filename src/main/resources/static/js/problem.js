// ================================
// LOAD SINGLE PROBLEM
// ================================

async function loadProblem() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const problemId =
        params.get("id");


    if (!problemId) {

        document.getElementById(
            "title"
        ).textContent =
            "Problem not found";

        return;
    }


    try {

        // ============================
        // GET PROBLEM
        // ============================

        const problemResponse =
            await fetch(
                "/problems/" + problemId
            );


        if (!problemResponse.ok) {

            throw new Error(
                "Problem not found"
            );
        }


        const problem =
            await problemResponse.json();


        // ============================
        // DISPLAY PROBLEM
        // ============================

        document.getElementById(
            "language"
        ).textContent =
            problem.language;


        document.getElementById(
            "title"
        ).textContent =
            problem.title;


        document.getElementById(
            "description"
        ).textContent =
            problem.description;


        document.getElementById(
            "error"
        ).textContent =
            problem.errorMessage ||
            "No error message";


        document.getElementById(
            "code"
        ).textContent =
            problem.code;


        // ============================
        // HELP BUTTON
        // ============================

        const helpButton =
            document.getElementById(
                "helpButton"
            );


        if (!helpButton) {
            return;
        }


        helpButton.onclick =
            async function() {

                try {

                    // Check logged-in user
                    const userResponse =
                        await fetch(
                            "/current-user"
                        );


                    if (!userResponse.ok) {

                        throw new Error(
                            "Unable to check login"
                        );
                    }


                    const currentUser =
                        await userResponse.json();


                    // ========================
                    // NOT LOGGED IN
                    // ========================

                    if (!currentUser) {

                        window.location.href =
                            "/login";

                        return;
                    }


                    // ========================
                    // OWN PROBLEM
                    // ========================

                    if (
                        Number(currentUser.id) ===
                        Number(problem.userId)
                    ) {

                        alert(
                            "This is your own problem."
                        );

                        return;
                    }


                    // ========================
                    // OPEN CHAT
                    // ========================

                    window.location.href =
                        "/chat?problemId=" +
                        problem.id;


                } catch (error) {

                    console.error(error);

                    alert(
                        "Unable to open chat."
                    );
                }

            };

    } catch (error) {

        console.error(
            "Unable to load problem:",
            error
        );

        document.getElementById(
            "title"
        ).textContent =
            "Unable to load problem";
    }
}


// ================================
// START
// ================================

loadProblem();