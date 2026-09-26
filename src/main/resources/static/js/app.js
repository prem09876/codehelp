// ================================
// LOAD ALL PUBLIC PROBLEMS
// ================================

async function loadProblems() {

    const container =
        document.getElementById("problems-container");

    // This page doesn't have the problem container
    if (!container) {
        return;
    }

    try {

        const response =
            await fetch("/problems");

        if (!response.ok) {
            throw new Error("Failed to load problems");
        }

        const problems =
            await response.json();

        console.log("Problems received:", problems);

        container.innerHTML = "";

        if (problems.length === 0) {

            container.innerHTML = `
                <div class="loading glass">
                    No problems posted yet.
                </div>
            `;

            return;
        }

        problems.forEach(problem => {

            const card =
                document.createElement("div");

            card.className = "problem-card";

            card.innerHTML = `
                <span class="language">
                    ${problem.language}
                </span>

                <h3>
                    ${problem.title}
                </h3>

                <p class="problem-description">
                    ${problem.description}
                </p>

                <div class="error">
                    ${problem.errorMessage || "No error message"}
                </div>

                <button
                    class="help-btn"
                    onclick="viewProblem(${problem.id})">

                    View Problem →

                </button>
            `;

            container.appendChild(card);

        });

    } catch (error) {

        console.error(
            "Error loading problems:",
            error
        );

        container.innerHTML = `
            <div class="loading glass">
                ❌ Unable to load problems.
            </div>
        `;
    }
}


// ================================
// VIEW PROBLEM
// ================================

function viewProblem(problemId) {

    window.location.href =
        "/problem?id=" + problemId;
}


// ================================
// LOAD CURRENT USER
// ================================

async function loadCurrentUser() {

    const accountArea =
        document.getElementById("account-area");

    if (!accountArea) {
        return;
    }

    try {

        const response =
            await fetch("/current-user");

        if (!response.ok) {
            throw new Error(
                "Unable to get current user"
            );
        }

        const user =
            await response.json();


        // ============================
        // NOT LOGGED IN
        // ============================

        if (!user) {

            accountArea.innerHTML = `
                <a
                    href="/login"
                    class="login-btn">

                    Login

                </a>
            `;

            return;
        }


        // ============================
        // LOGGED IN
        // ============================

        accountArea.innerHTML = `

            <div class="account-wrapper">

                <button
                    class="account-button"
                    onclick="toggleAccountMenu()">

                    <span class="account-avatar">
                        ${user.name
                            .charAt(0)
                            .toUpperCase()}
                    </span>

                    <span class="account-name">
                        ${user.name}
                    </span>

                    <span class="account-arrow">
                        ▾
                    </span>

                </button>


                <div
                    id="account-menu"
                    class="account-menu">

                    <div class="account-info">

                        <div class="profile-avatar">
                            ${user.name
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div>

                            <strong>
                                ${user.name}
                            </strong>

                            <small>
                                ${user.email}
                            </small>

                        </div>

                    </div>


                    <div class="menu-divider"></div>


                    <a
                        href="/profile"
                        class="menu-item">

                        👤
                        <span>
                            My Profile
                        </span>

                    </a>


                    <a
                        href="/my-problems"
                        class="menu-item">

                        💻
                        <span>
                            My Problems
                        </span>

                    </a>


                    <a
                        href="/messages"
                        class="menu-item">

                        💬
                        <span>
                            My Messages
                        </span>

                    </a>


                    <div class="menu-divider"></div>


                    <button
                        class="menu-item logout-item"
                        onclick="logout()">

                        🚪
                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            </div>
        `;

    } catch (error) {

        console.error(
            "Unable to get current user:",
            error
        );
    }
}


// ================================
// ACCOUNT DROPDOWN
// ================================

function toggleAccountMenu() {

    const menu =
        document.getElementById("account-menu");

    if (!menu) {
        return;
    }

    menu.classList.toggle("show");
}


// ================================
// CLOSE DROPDOWN WHEN CLICKING OUTSIDE
// ================================

document.addEventListener(
    "click",
    function(event) {

        const wrapper =
            document.querySelector(
                ".account-wrapper"
            );

        const menu =
            document.getElementById(
                "account-menu"
            );

        if (
            wrapper &&
            menu &&
            !wrapper.contains(event.target)
        ) {

            menu.classList.remove("show");
        }

    }
);


// ================================
// LOGOUT
// ================================

async function logout() {

    try {

        await fetch(
            "/logout",
            {
                method: "POST"
            }
        );

        window.location.href = "/";

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );
    }
}


// ================================
// START
// ================================

loadProblems();

loadCurrentUser();

// =========================
// PROTECTED NAVIGATION
// =========================

document.addEventListener("click", async function(event) {

    const link =
        event.target.closest(".nav-links a");

    if (!link) {
        return;
    }


    const path =
        new URL(
            link.href,
            window.location.origin
        ).pathname;


    // Home is public
    if (path === "/") {
        return;
    }


    // Login and register are public
    if (
        path === "/login" ||
        path === "/register"
    ) {
        return;
    }


    // Check login status
    event.preventDefault();


    try {

        const response =
            await fetch("/current-user");


        if (!response.ok) {

            window.location.href =
                "/login";

            return;
        }


        const user =
            await response.json();


        if (!user) {

            window.location.href =
                "/login";

            return;
        }


        // User is logged in
        window.location.href =
            link.href;


    } catch (error) {

        console.error(
            "Login check failed:",
            error
        );

        window.location.href =
            "/login";
    }

});