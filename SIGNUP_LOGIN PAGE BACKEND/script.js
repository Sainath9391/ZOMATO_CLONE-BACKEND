async function handleLogin() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("⚠️ Please enter both email and password.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email_address: email, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert("✅ Login successful! Redirecting...");
            window.location.href = "/dashboard.html"; // Change to actual redirect page
        } else {
            alert(`Login failed: ${data.message}`);
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("⚠️ Login failed: Internal Server Error");
    }
}
