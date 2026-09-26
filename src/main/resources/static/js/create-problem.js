const problemForm =
    document.getElementById("problemForm");

const formMessage =
    document.getElementById("formMessage");


problemForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const title =
        document.getElementById("title").value.trim();

    const language =
        document.getElementById("language").value;

    const description =
        document.getElementById("description").value.trim();

    const code =
        document.getElementById("code").value.trim();

    const errorMessage =
        document.getElementById("errorMessage").value.trim();


    formMessage.textContent = "Posting your problem...";
    formMessage.style.color = "#aebcff";


    try {

        const response = await fetch("/problems", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                title: title,
                language: language,
                description: description,
                code: code,
                errorMessage: errorMessage

            })

        });


        if (!response.ok) {

            const error =
                await response.text();

            throw new Error(error);

        }


        const problem =
            await response.json();


        formMessage.textContent =
            "Problem posted successfully!";

        formMessage.style.color =
            "#7ee2a8";


        setTimeout(function() {

            window.location.href =
                "/problem?id=" + problem.id;

        }, 1000);


    } catch (error) {

        console.error(error);

        formMessage.textContent =
            "Unable to post problem. Please login first.";

        formMessage.style.color =
            "#ff9c9c";

    }

});