document.getElementById("fetch").addEventListener("click", fetchGitHubProfile);

function fetchGitHubProfile() {
    const username = document.getElementById("username").value.trim();
    const errorElement = document.getElementById("error");
    const profileElement = document.getElementById("profile");
    const profileDataElement = document.getElementById("profile-data");

    // Clear previous error and profile data
    errorElement.textContent = "";
    profileDataElement.innerHTML = "";

    if (username === "") {
        errorElement.textContent = "Please enter a GitHub username.";
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then((response) => {
            // Check if the response status is OK (status code 200)
            if (!response.ok) {
                throw new Error("GitHub user not found.");
            }
            // Parse the JSON data from the response
            return response.json();
        })
        .then((data) => {
            // Process and display the fetched data
            // This step is reached if the response was successful
            profileDataElement.innerHTML = `
                <img src="${data.avatar_url}" alt="${data.login}" width="100">
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Username:</strong> ${data.login}</p>
                <p><strong>Location:</strong> ${data.location}</p>
                <p><strong>Followers:</strong> ${data.followers}</p>
                <p><strong>Following:</strong> ${data.following}</p>
            `;
            profileElement.style.display = "block";
        })
        .catch((error) => {
            // Handle errors here
            errorElement.textContent = error.message;
            profileElement.style.display = "none";
        });
}
