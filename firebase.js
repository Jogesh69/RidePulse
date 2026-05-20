// FIREBASE CONFIG

const firebaseConfig = {

apiKey: "AIzaSyBR0ohy9VE4bGBz1YvmsOhr1a6bbVLS1lU",

authDomain: "ridepulse-6e084.firebaseapp.com",

databaseURL:
"https://ridepulse-6e084-default-rtdb.asia-southeast1.firebasedatabase.app",

projectId: "ridepulse-6e084",

storageBucket: "ridepulse-6e084.firebasestorage.app",

messagingSenderId: "262188554050",

appId: "1:262188554050:web:aac053e8e4990be6fb1adb"

};

// INITIALIZE FIREBASE

firebase.initializeApp(firebaseConfig);

// DATABASE

const database = firebase.database();