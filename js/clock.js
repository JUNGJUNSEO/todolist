const clock = document.querySelector(".header__clock");

function getClock() {
    const date = new Date();
    const day =date.getUTCDate()
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    clock.innerText = `${day}일${hours}시${minutes}분${seconds}초`;
}

getClock()
setInterval(getClock,1000)