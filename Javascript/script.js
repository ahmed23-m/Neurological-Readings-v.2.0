// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjan3X86EnK2UCibt6SO39yo66MDABK0A",
    authDomain: "noro-14113.firebaseapp.com",
    databaseURL: "https://noro-14113-default-rtdb.firebaseio.com",
    projectId: "noro-14113",
    storageBucket: "noro-14113.appspot.com",
    messagingSenderId: "761578432013",
    appId: "1:761578432013:web:175bc5a9ef337580a75744",
    measurementId: "G-WPM8CBFMJJ",
};

// Initialize Firebase
initializeApp(firebaseConfig);
var Signals;
var details = document.querySelector(".Details p");

import {
    getDatabase,
    ref,
    child,
    onValue,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
const database = getDatabase();

onValue(child(ref(database), "Signals"), (snapshot) => {
    Signals = snapshot.val();
    console.log(Signals);
});
onValue(child(ref(database), "The Ratio"), (snapshot) => {
    details.textContent = snapshot.val();
});

const ctx = document.getElementById("myChart");
const chart_cont = document.querySelector('.Chart');

// var myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: [0],
//         datasets: [
//             {
//                 label: 'Signals speed(HZ)',
//                 data: [0],
//                 borderWidth: 1,
//                 pointRadius: 0
//             },
//         ]
//     },
//     options: {
//         scales: {
//             x: {
//                 display: true,
//                 title: {
//                     display: true,
//                     text: 'Time(seconds)'
//                 }
//             },
//             y: {
//                 display: true,
//                 title: {
//                     display: true,
//                     text: 'Signals speed(HZ)'
//                 }
//             }
//         }
//     }
// });
// window.setInterval(mycallback, 1000);
// var i =0;
// function mycallback() {
//     i++;
//     myChart.data.labels.push(i);
//     myChart.data.datasets[0].data.push(Signals);
//     if(myChart.data.labels.length>20)
//     {
//         myChart.data.labels.splice(0,4);
//         myChart.data.datasets[0].data.splice(0,4);
//     }
//     myChart.update();
// }
var trace1 = {
    x: [0],
    y: [0],
    mode: "lines",
};
var data = [trace1];
var layout = {
    xaxis: {
        autotick: false,
        ticks: "inside",
        tick0: 0,
        dtick: 1,
        ticklen: 4,
        tickwidth: 2,
        zeroline: true,
        autorange: true,
        title: {
            text: "Time(seconds)",
            standoff: 20
        },
        color: '#ffffffa3'
    },
    yaxis: {
        title: {
            text: "Signals speed(HZ)",
            standoff: 20
        },
        color: '#ffffffa3',
        // lineheight: 30
    },
    margin: {
        l: 70,
        r: 30,
        b: 70,
        t: 50,
        pad: 10
    },
    paper_bgcolor: '#120a1896',
    plot_bgcolor: '#120a1896',
    width: chart_cont.width,
    height: chart_cont.height,
};
window.setInterval(mycallback, 1000);
var i = 0;
function mycallback() {
    i++;
    trace1.x.push(i);
    trace1.y.push(Signals);
    if(trace1.x.length>20)
    {
        trace1.x.splice(0,4);
        // trace1.y.splice(0,4);
    }
    Plotly.newPlot("myChart", data, layout);
}
