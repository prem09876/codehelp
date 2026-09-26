async function loadProfile() {

    try {

        const response =
            await fetch("/current-user");


        if (!response.ok) {

            window.location.href = "/login";

            return;
        }


        const user =
            await response.json();


        if (!user) {

            window.location.href = "/login";

            return;
        }


        document.getElementById(
            "profile-name"
        ).textContent = user.name;


        document.getElementById(
            "profile-email"
        ).textContent = user.email;


        document.getElementById(
            "detail-name"
        ).textContent = user.name;


        document.getElementById(
            "detail-email"
        ).textContent = user.email;


        document.getElementById(
            "profile-avatar"
        ).textContent =
            user.name
                .charAt(0)
                .toUpperCase();


    } catch (error) {

        console.error(
            "Unable to load profile:",
            error
        );

        window.location.href = "/login";
    }
}


loadProfile();