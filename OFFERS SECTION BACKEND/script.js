function applyOffer(discount, offerName) {
    fetch("http://localhost:3000/api/offers/apply-offer", { 

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            offerName: offerName,
            discount: discount
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`Offer '${offerName}' applied successfully! Proceed to checkout.`);
        } else {
            alert("Failed to apply offer. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while applying the offer.");
    });
}

function confirmOffer(discount, offerName) {
    if (confirm(`Do you want to apply '${offerName}'?`)) {
        applyOffer(discount, offerName);
    }
}

function applyOffer(discount, offerName) {
    // Hide offers and show checkout section
    document.getElementById("offers-section").style.display = "none";
    document.getElementById("checkout-section").style.display = "block";

    // Get the total amount before discount
    let originalPrice = 499;  // Base price

    // Calculate final price after discount
    let finalPrice = originalPrice - discount;
    if (finalPrice < 0) finalPrice = 0; // Ensure no negative price

    // Update the checkout summary
    document.getElementById("discount-applied").innerText = `Discount Applied: ₹${discount}`;
    document.getElementById("final-price").innerText = finalPrice;

    alert(`Offer '${offerName}' applied successfully! Proceed to checkout.`);
}



// Function to navigate between steps
function nextStep(step) {
    document.querySelectorAll('.step').forEach(el => el.style.display = 'none');
    document.getElementById(`step${step}`).style.display = 'block';
}

// Function to show the selected payment form
function showPaymentForm(formId) {
    // Hide all payment forms
    document.querySelectorAll('.payment-form').forEach(form => form.style.display = 'none');

    // Show the selected one
    document.getElementById(formId).style.display = 'block';
}

// Function to handle payment confirmation
function pay(method) {
    alert(`Payment successful via ${method}! Your order has been placed.`);
    window.location.reload(); // Reload to reset the form after payment
}




async function saveDeliveryDetails() {
    const fullName = document.getElementById("fullName").value;
    const address = document.getElementById("address").value;
    const phoneNumber = document.getElementById("phoneNumber").value;

    if (!fullName || !address || !phoneNumber) {
        alert("❌ All fields are required!");
        return;
    }

    const data = { full_name: fullName, address: address, phone_number: phoneNumber };
    console.log("📤 Sending data:", data); // Debugging log

    try {
        const response = await fetch("http://localhost:3000/api/delivery/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("✅ Server Response:", result);
        alert(result.message);
        nextStep(3);
    } catch (err) {
        console.error("❌ Error in fetch:", err);
        alert("❌ Something went wrong!");
    }
}
