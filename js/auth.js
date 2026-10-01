const USER_KEY = "glowCartUser";

function getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
}

function saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearUser() {
    localStorage.removeItem(USER_KEY);
}

function isLoggedIn() {
    return !!getUser();
}

function showAuthMessage(element, message, success = false) {
    if (!element) {
        return;
    }

    element.textContent = message;
    element.style.color = success ? "#16823b" : "#c2185b";
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("registerName").value.trim();
        const username = document.getElementById("registerUsername").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const message = document.getElementById("registerMessage");

        if (password !== confirmPassword) {
            showAuthMessage(message, "Passwords do not match.");
            return;
        }

        if (password.length < 4) {
            showAuthMessage(message, "Password must contain at least 4 characters.");
            return;
        }

        const existingUser = getUser();

        if (existingUser && existingUser.username === username) {
            showAuthMessage(message, "Username already exists.");
            return;
        }

        const user = {
            name: name,
            username: username,
            email: email,
            password: password
        };

        saveUser(user);

        showAuthMessage(
            message,
            "Registration successful! Redirecting to login...",
            true
        );

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1200);
    });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("loginUsername").value.trim();
        const password = document.getElementById("loginPassword").value;
        const message = document.getElementById("loginMessage");

        const user = getUser();

        if (!user) {
            showAuthMessage(
                message,
                "No account found. Please register first."
            );
            return;
        }

        if (
            username !== user.username ||
            password !== user.password
        ) {
            showAuthMessage(
                message,
                "Incorrect username or password."
            );
            return;
        }

        localStorage.setItem("glowCartLoggedIn", "true");

        showAuthMessage(
            message,
            `Welcome, ${user.name}!`,
            true
        );

        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1000);
    });
}

const forgotPassword = document.getElementById("forgotPassword");

if (forgotPassword) {
    forgotPassword.addEventListener("click", function (event) {
        event.preventDefault();

        alert(
            "Demo Mode: Password reset is not connected to a real email system."
        );
    });
}