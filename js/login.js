
let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Search for the user
    let user = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    if (user) {
        alert("Login successful! Welcome " + user.firstName);
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "../index.html";
    } else {
        alert("Invalid email or password");
    }

});

