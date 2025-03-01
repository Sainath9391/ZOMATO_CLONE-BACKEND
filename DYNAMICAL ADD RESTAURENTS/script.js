document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("restaurants-table-body");
    const form = document.getElementById("add-restaurant-form");
    const viewBtn = document.getElementById("view-restaurants-btn");

    // Fetch and display restaurants
    async function fetchRestaurants() {
        tableBody.innerHTML = ""; // Clear previous data
        try {
            const response = await fetch("http://localhost:3000/api/restaurants");
            const restaurants = await response.json();

            if (restaurants.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="3">No restaurants found.</td></tr>`;
                return;
            }

            restaurants.forEach(restaurant => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${restaurant.name}</td>
                    <td>${restaurant.address}</td>
                    <td><a href="${restaurant.website}" target="_blank">Visit</a></td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    }

    // Handle form submission
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const website = document.getElementById("website").value;

        try {
            const response = await fetch("http://localhost:3000/api/restaurants/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, address, website })
            });

            if (response.ok) {
                alert("Restaurant added successfully!");
                form.reset();
            } else {
                alert("Error adding restaurant");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

    // Load restaurants when the "View All Restaurants" button is clicked
    viewBtn.addEventListener("click", fetchRestaurants);
});
