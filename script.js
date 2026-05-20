// ==========================
// TRACK BUS REDIRECTION
// ==========================

function trackBus(busId){

window.location.href =
"track.html?bus=" + busId;

}

// ==========================
// REAL-TIME TRACKING SYSTEM
// ==========================

if(document.body.classList.contains("track-page")){

// MAP

var map =
L.map('map').setView([26.1825,91.7500],13);

// TILE LAYER

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
maxZoom:19
}
).addTo(map);

// DEFAULT MARKER

var marker =
L.marker([26.1825,91.7500]).addTo(map);

marker.bindPopup(
"Waiting for live driver..."
).openPopup();

// ==========================
// FIREBASE LIVE TRACKING
// ==========================

database.ref("liveBus").on(
"value",
function(snapshot){

const busLocation =
snapshot.val();

// DRIVER OFFLINE

if(!busLocation){

document.getElementById("busStatus")
.innerText =
"Driver Offline";

document.getElementById("busStatus")
.style.color = "#ff5252";

return;

}

// DRIVER ONLINE

document.getElementById("busStatus")
.innerText =
"Bus Live";

document.getElementById("busStatus")
.style.color = "#00e676";

// UPDATE COORDINATES

document.getElementById("latitude")
.innerText =
busLocation.lat.toFixed(5);

document.getElementById("longitude")
.innerText =
busLocation.lng.toFixed(5);

// UPDATE BUS NUMBER

document.getElementById("liveBusNumber")
.innerText =
busLocation.bus;

// UPDATE MARKER

marker.setLatLng([
busLocation.lat,
busLocation.lng
]);

marker.bindPopup(
"Bus " + busLocation.bus + " is live"
);

// CENTER MAP

map.setView([
busLocation.lat,
busLocation.lng
],15);

}
);
}
// ==========================
// DRIVER REGISTRATION
// ==========================

const registerForm =
document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit", function(e){

e.preventDefault();

// GET VALUES

const driverName =
document.getElementById("driverName").value;

const busNumber =
document.getElementById("busNumber").value;

const route =
document.getElementById("routeSelect").value;

const password =
document.getElementById("registerPassword").value;

// DRIVER OBJECT

const driverData = {

driverName: driverName,
busNumber: busNumber,
route: route,
password: password

};

// STORE DRIVER

localStorage.setItem(
busNumber,
JSON.stringify(driverData)
);

alert("Driver Registered Successfully!");

// RESET FORM

registerForm.reset();

});

}

// ==========================
// DRIVER LOGIN
// ==========================

const loginForm =
document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit", function(e){

e.preventDefault();

// GET VALUES

const busNumber =
document.getElementById("loginBus").value;

const password =
document.getElementById("loginPassword").value;

// FETCH DRIVER

const storedData =
localStorage.getItem(busNumber);

// CHECK DRIVER

if(!storedData){

alert("Driver Not Found!");

return;

}

// PARSE DRIVER

const driver =
JSON.parse(storedData);

// PASSWORD CHECK

if(driver.password === password){

alert("Login Successful!");

// SAVE SESSION

localStorage.setItem(
"currentDriver",
busNumber
);

// REDIRECT

window.location.href =
"driverpanel.html";

}

else{

alert("Incorrect Password!");

}

});

}

// ==========================
// DRIVER PANEL LOGIC
// ==========================

if(document.getElementById("startTracking")){

// CURRENT DRIVER

const currentDriver =
localStorage.getItem("currentDriver");

// LOGIN CHECK

if(!currentDriver){

alert("Please login first!");

window.location.href =
"driver.html";

}

// DRIVER DATA

const driverData =
JSON.parse(
localStorage.getItem(currentDriver)
);

// UPDATE DRIVER INFO

document.getElementById("driverDisplayName")
.innerText = driverData.driverName;

document.getElementById("driverBusNumber")
.innerText = driverData.busNumber;

document.getElementById("driverRoute")
.innerText = driverData.route;

// MAP

var map =
L.map('map').setView([26.1825,91.7500],13);

// TILE LAYER

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
maxZoom:19
}
).addTo(map);

// MARKER

var marker =
L.marker([26.1825,91.7500]).addTo(map);

// START TRACKING

document.getElementById("startTracking")
.addEventListener("click", function(){

if(navigator.geolocation){

// STATUS

document.getElementById("trackingStatus")
.innerText = "Live";

document.getElementById("trackingStatus")
.classList.add("live-status");

// GPS WATCH

navigator.geolocation.watchPosition(

function(position){

const lat =
position.coords.latitude;

const lng =
position.coords.longitude;

// UPDATE UI

document.getElementById("latitude")
.innerText = lat.toFixed(5);

document.getElementById("longitude")
.innerText = lng.toFixed(5);

// UPDATE MAP

marker.setLatLng([lat,lng]);

map.setView([lat,lng],15);

// STORE LIVE LOCATION

database.ref("liveBus").set({

lat: lat,
lng: lng,
bus: driverData.busNumber

});

},

function(error){

alert(
"Location access denied or unavailable!"
);

console.log(error);

}

);

}

else{

alert("Geolocation not supported!");

}

});

}


// ==========================
// COMING SOON ALERT
// ==========================

function comingSoonAlert(){

alert(
"Live tracking is currently available only for Route 101 (Paltan Bazar → Jalukbari)."
);

}

// ==========================
// DRIVER LOGOUT
// ==========================

const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener(
"click",
function(){

// REMOVE DRIVER SESSION

localStorage.removeItem(
"currentDriver"
);

// REMOVE LIVE LOCATION

database.ref("liveBus").remove();

// REDIRECT

window.location.href =
"driver.html";

}
);

}