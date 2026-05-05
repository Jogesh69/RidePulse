
// ----------------------
// GET BUS ID FROM URL
// ----------------------

const params = new URLSearchParams(window.location.search);
const busId = params.get("bus");

// ----------------------
// ROUTE DATA
// ----------------------

const routes = {

"101": {
name: "Bus 101",
route: "Paltan Bazar → Jalukbari",
path: [
[26.1825,91.7500],
[26.1870,91.7425],
[26.1765,91.7365],
[26.1685,91.7205],
[26.1585,91.6805]
]
},

"202": {
name: "Bus 202",
route: "Six Mile → Adabari",
path: [
[26.1440,91.7860],
[26.1520,91.7700],
[26.1800,91.7530],
[26.1870,91.7425],
[26.1765,91.7365],
[26.1700,91.7100]
]
},

"303": {
name: "Bus 303",
route: "Noonmati → Fancy Bazar",
path: [
[26.2000,91.8000],
[26.1950,91.7850],
[26.1900,91.7700],
[26.1870,91.7425],
[26.1685,91.7205]
]
},

"404": {
name: "Bus 404",
route: "ISBT → Beltola",
path: [
[26.1060,91.7000],
[26.1150,91.7200],
[26.1300,91.7400],
[26.1400,91.7600]
]
}

};

// ----------------------
// DEFAULT FALLBACK
// ----------------------

const selected = routes[busId] || routes["101"];

// ----------------------
// MAP INIT
// ----------------------

var map = L.map('map').setView(selected.path[0], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19
}).addTo(map);

// ----------------------
// DRAW ROUTE LINE
// ----------------------

L.polyline(selected.path, { weight: 5 }).addTo(map);

// ----------------------
// CREATE MARKER
// ----------------------

var marker = L.marker(selected.path[0]).addTo(map);

marker.bindPopup(selected.name + " - " + selected.route).openPopup();

// ----------------------
// MOVE BUS
// ----------------------

let i = 0;

setInterval(() => {

marker.setLatLng(selected.path[i]);
i = (i + 1) % selected.path.length;

}, 3000);

// ----------------------
// UPDATE DASHBOARD
// ----------------------

document.getElementById("busName").innerText = selected.name;
document.getElementById("routeName").innerText = selected.route;

// ----------------------
// LIVE CLOCK
// ----------------------

setInterval(() => {
document.getElementById("clock").innerText =
new Date().toLocaleTimeString();
}, 1000);

// ----------------------
// ETA + SPEED
// ----------------------

let eta = 8;

setInterval(() => {

if (eta > 1) {
eta--;
document.getElementById("eta").innerText = eta + " mins";
}

document.getElementById("speed").innerText =
30 + Math.floor(Math.random() * 10);

}, 3000);