async function signup() {
    let fullName = document.getElementById("fullName").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!fullName || !email || !password) {
        alert("⚠️ Please fill out all fields.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ full_name: fullName, email_address: email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("✅ Signup successful!");
            window.location.href = "../index.html"; // Redirect to login page
        } else {
            alert("❌ Signup failed: " + data.error);
        }
    } catch (error) {
        console.error("Signup Error:", error);
        alert("⚠️ An error occurred. Please try again.");
    }
}
