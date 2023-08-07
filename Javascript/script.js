// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTWBNR14dECgbNoxd5EZ2Z3BoIbk4_Q1k",
    authDomain: "aicontrol-3b183.firebaseapp.com",
    databaseURL: "https://aicontrol-3b183-default-rtdb.firebaseio.com",
    projectId: "aicontrol-3b183",
    storageBucket: "aicontrol-3b183.appspot.com",
    messagingSenderId: "393464001551",
    appId: "1:393464001551:web:7b878a39f9e0726c9a9f7a",
    measurementId: "G-28MMZRP17S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
var Signals;
var details = document.querySelector(".Details p");

import { getDatabase, ref, child, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
const database = getDatabase();

onValue(child(ref(database), "Signals"), (snapshot) => {
    Signals = snapshot.val();
    // console.log(Signals);
});
onValue(child(ref(database), "The Ratio"), (snapshot) => {
    details.textContent = snapshot.val();
});

const ctx = document.getElementById('myChart');

let ch = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [0],
        datasets: [
            {
                label: 'Signals speed(HZ)',
                data: [0],
                borderWidth: 1,
                pointRadius: 0,
                borderColor: '#2196f3',
                pointBorderColor: "#2196f3",
                pointHoverBackgroundColor: "#2196f3",
                pointHoverBorderColor: "#2196f3",
                fill: false,
                lineTension: 0
            }
        ]
    },
    options: {
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time(seconds)'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Signals speed(HZ)'
                }
            }
        }
    }
});

window.setInterval(mycallback, 1000);
var i = 0;
function mycallback() {
    i++;
    ch.data.labels.push(i);
    ch.data.datasets[0].data.push(Signals);
    if (ch.data.labels.length > 20) {
        ch.data.labels.splice(0, 4);
        ch.data.datasets[0].data.splice(0, 4);
    }
    ch.update();
}
