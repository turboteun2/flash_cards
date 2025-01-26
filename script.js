var displayText = document.getElementById('flashDisplay');
var toggleFlash = false;
var i = 0;

const maxNum = chaptersData.length - 1;

displayText.innerHTML = chaptersData[i].answer;
displayText.innerHTML = chaptersData[i].flash;
document.getElementById('telling').innerHTML = i + " / " + maxNum;

function flash() {
    toggleFlash = !toggleFlash;
    if (toggleFlash) {
        displayText.innerHTML = chaptersData[i].answer;
    } else {
        displayText.innerHTML = chaptersData[i].flash;
    }
}

function nextFlash() {
    i++;
    i = (i > maxNum) ? 0 : i;   
    displayText.innerHTML = chaptersData[i].flash;
    document.getElementById('telling').innerHTML = i + " / " + maxNum;
    toggleFlash = false;
    console.log("Card number: ", i);
}
