const hourHand = document.querySelector('.hour-hand');
const minHand = document.querySelector('.minute-hand');
const secHand = document.querySelector('.second-hand');
const times = document.querySelectorAll('.time');

let angle = 0;
times.forEach(time => {
    time.style.transform = `rotateZ(${angle}deg)`;
    angle+=30;
})


function displayTime() {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    hourHand.style.transform = `rotateZ(${(hour%12)*30 + 180}deg)`;
    minHand.style.transform = `rotateZ(${(minute)*6 + 180}deg)`;
    secHand.style.transform = `rotateZ(${(second)*6 + 180}deg)`;
}

displayTime();
setInterval(displayTime, 1000);