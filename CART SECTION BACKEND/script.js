async function fetchCart() {
    const response = await fetch("http://localhost:3000/cart/USER_ID"); // Replace USER_ID dynamically
    const data = await response.json();
    cart = data.items || [];
    renderCart();
}
fetchCart();


async function updateCart() {
    await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "USER_ID", items: cart, totalPrice: cart.reduce((total, item) => total + item.price * item.quantity, 0) })
    });
}

cartContainer.addEventListener("click", async (event) => {
    const id = parseInt(event.target.dataset.id);
    if (event.target.classList.contains("increase")) {
        cart = cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
    }
    if (event.target.classList.contains("decrease")) {
        cart = cart.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item);
    }
    if (event.target.classList.contains("remove-btn")) {
        cart = cart.filter(item => item.id !== id);
    }

    renderCart();
    await updateCart();
});
