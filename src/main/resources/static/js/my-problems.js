async function loadMyProblems() {

    const container =
        document.getElementById("my-problems-container");

    try {

        const response = await fetch("/problems/my");

        if (!response.ok) {
            throw new Error("Unable to load problems");
        }

        const problems = await response.json();

        container.innerHTML = "";

        if (problems.length === 0) {

            container.innerHTML = `
                <div class="empty-state glass">

                    <div class="empty-icon">
                        💻
                    </div>

                    <h2>No problems yet</h2>

                    <p>
                        You haven't posted any coding problems.
                    </p>

                    <button
                        class="primary-btn"
                        onclick="window.location.href='/create-problem'">

                        Post Your First Problem

                    </button>

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

        console.error(error);

        container.innerHTML = `
            <div class="loading glass">
                ❌ Unable to load your problems.
            </div>
        `;
    }
}


function viewProblem(problemId) {

    window.location.href =
        "/problem?id=" + problemId;
}


loadMyProblems();