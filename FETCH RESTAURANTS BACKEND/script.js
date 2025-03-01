let map;
let userMarker;
let restaurantMarkers = [];

function initMap(latitude, longitude) {
    if (!map) {
        map = L.map('map').setView([latitude, longitude], 13); // Center map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    }

    // Clear old markers
    if (userMarker) {
        map.removeLayer(userMarker);
    }
    restaurantMarkers.forEach(marker => map.removeLayer(marker));

    // Add user location marker
    userMarker = L.marker([latitude, longitude]).addTo(map)
        .bindPopup("📍 Your Location").openPopup();
}

async function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showRestaurants, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

async function showRestaurants(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    initMap(latitude, longitude); // Initialize map

    try {
        let response = await fetch("http://localhost:3000/api/restaurants", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude }),
        });

        let result = await response.json();
        let restaurantList = document.getElementById("restaurantList");
        restaurantList.innerHTML = "";

        if (result.restaurants) {
            result.restaurants.forEach((restaurant) => {
                let div = document.createElement("div");
                div.classList.add("restaurant");
                div.innerHTML = `<strong>${restaurant.name}</strong> <br> 📍 Location: (${restaurant.latitude}, ${restaurant.longitude})`;
                restaurantList.appendChild(div);

                // Add restaurant markers to the map
                let marker = L.marker([restaurant.latitude, restaurant.longitude])
                    .addTo(map)
                    .bindPopup(`<b>${restaurant.name}</b><br>📍 (${restaurant.latitude}, ${restaurant.longitude})`);
                
                restaurantMarkers.push(marker);
            });
        } else {
            restaurantList.innerHTML = "<p>No restaurants found nearby.</p>";
        }
    } catch (error) {
        alert("❌ Server error. Please try again later.");
    }
}

function showError(error) {
    alert("Error getting location: " + error.message);
}
