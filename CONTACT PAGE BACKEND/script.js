document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let rating = document.querySelector('input[name="rating"]:checked');
    if (!rating) {
        alert("⚠️ Please select a star rating before submitting!");
        return;
    }

    const feedbackData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        rating: rating.value,
        message: document.getElementById("message").value,
    };

    try {
        let response = await fetch("http://localhost:3000/api/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(feedbackData),
        });

        let result = await response.json();
        if (response.ok) {
            document.getElementById("ratingDisplay").innerHTML = `Your rating: ${rating.value}⭐`;
            document.getElementById("popupBox").style.display = "block";
            document.getElementById("contactForm").reset();
        } else {
            alert(result.error);
        }
    } catch (error) {
        alert("❌ Server error. Please try again later.");
    }
});

function closePopup() {
    document.getElementById("popupBox").style.display = "none";
}
