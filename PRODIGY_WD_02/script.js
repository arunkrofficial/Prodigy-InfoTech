let timer;
let startTime;
let isRunning = false;
let laps = [];

function startStopwatch() {
    if (!isRunning) {
        startTime = new Date().getTime();
        isRunning = true;
        timer = setInterval(updateDisplay, 10);
        document.getElementById("start").disabled = true;
        document.getElementById("pause").disabled = false;
    }
}

function pauseStopwatch() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById("start").disabled = false;
    document.getElementById("pause").disabled = true;
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById("start").disabled = false;
    document.getElementById("pause").disabled = true;
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    document.getElementById("milliseconds").innerText = "00";
    laps = [];
    updateLaps();
}

function updateDisplay() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;

    const minutes = Math.floor(elapsedTime / (60 * 1000));
    const seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    document.getElementById("minutes").innerText = padTime(minutes);
    document.getElementById("seconds").innerText = padTime(seconds);
    document.getElementById("milliseconds").innerText = padTime(milliseconds);
}

function padTime(value) {
    return value < 10 ? `0${value}` : value;
}

function recordLap() {
    if (isRunning) {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;

        const minutes = Math.floor(elapsedTime / (60 * 1000));
        const seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
        const milliseconds = Math.floor((elapsedTime % 1000) / 10);

        const lapTime = `${padTime(minutes)}:${padTime(seconds)}.${padTime(milliseconds)}`;
        laps.push(lapTime);

        updateLaps();
    }
}

function updateLaps() {
    const lapsContainer = document.getElementById("laps");
    lapsContainer.innerHTML = "<h3>Lap Times</h3>";

    if (laps.length === 0) {
        lapsContainer.innerHTML += "<p>No laps recorded.</p>";
    } else {
        laps.forEach((lap, index) => {
            lapsContainer.innerHTML += `<p>Lap ${index + 1}: ${lap}</p>`;
        });
    }
}
