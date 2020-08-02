function initMap() {
    const mapEl = document.getElementById("map");
    const bakeryCoords = { lat: 38.96, lng:  -76.94 };
    const map = new google.maps.Map(mapEl, { zoom: 14, center: bakeryCoords });
    const marker = new google.maps.Marker({ position: bakeryCoords, map });
}

document.addEventListener("DOMContentLoaded", () => {
    const url =  "/contact";
    const form = document.getElementById("location");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const success = document.getElementById("success");
    const errors = document.getElementById("errors");
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!email.value || !message.value) {
            errors.innerText = "please add a valid message and email address";
            return;
        }
        const body = JSON.stringify({ email: email.value, message: message.value });
        const request = new Request(url, { method: "POST", body, headers })
        try {
            const response = await fetch(request);
            const data = await response.json();
            success.innerText = `Message Sent! from ${data.email}`;
        } catch (err) {
            console.log(err);
            errors.innerText = "there was an error sending the data!";
        }
    });


});