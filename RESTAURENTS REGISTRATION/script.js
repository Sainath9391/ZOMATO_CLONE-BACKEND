document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const restaurantName = document.getElementById("registerRestaurant").value;
            const email = document.getElementById("registerEmail").value;
            const password = document.getElementById("registerPassword").value;

            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ restaurantName, email, password }),
            });

            const data = await response.json();
            alert(data.msg);

            if (response.ok) {
                showPage("login"); // Redirect to login page after successful registration
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                alert("Login successful!");
                window.location.href = "DYNAMICAL ADD RESTAURENTS/index.html"; // Redirect after login
            } else {
                alert(data.msg);    
            }
        });
    }
});

// Function to show/hide pages
function showPage(page) {
    document.getElementById("register").style.display = page === "register" ? "block" : "none";
    document.getElementById("login").style.display = page === "login" ? "block" : "none";
}
