var displayText = document.getElementById('flashDisplay');
const chapters = [chaptersDataBacc1, chaptersDataBacc2, chaptersDataBacc3]
var value = 0;
var chaptersData = chapters[value];
var toggleFlash = false;
var toggleChaptersVar = false;
var i = 0;
var score = [];
var randomizedOrder = [];

const maxNum = chaptersData.length - 1;

function randomizeOrder() {
    randomizedOrder = [...Array(chaptersData.length).keys()];
    for (let i = randomizedOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomizedOrder[i], randomizedOrder[j]] = [randomizedOrder[j], randomizedOrder[i]];
    }
}

randomizeOrder();

displayText.innerHTML = chaptersData[randomizedOrder[i]].answer;
displayText.innerHTML = chaptersData[randomizedOrder[i]].flash;
document.getElementById('telling').innerHTML = i + " / " + maxNum;

function flash() {
    toggleFlash = !toggleFlash;
    if (toggleFlash) {
        document.getElementById('turnCard').innerHTML = "Flashcard";
        document.getElementById('card').style.backgroundColor = "transparent";
        displayText.innerHTML = chaptersData[randomizedOrder[i]].answer;
    } else {
        displayText.innerHTML = chaptersData[randomizedOrder[i]].flash;
        document.getElementById('card').style.backgroundColor = "rgba(0, 0, 120, 0.15)";
        document.getElementById('turnCard').innerHTML = "Answer";
    }
}

function pickChapter(x){
    x = x - 1;
    console.log("Chapter number: ", x);
    value = x;
    toggleChapters();
    chaptersData = chapters[x];
    i = 0;
    randomizeOrder();
    displayText.innerHTML = chaptersData[randomizedOrder[i]].answer;
    displayText.innerHTML = chaptersData[randomizedOrder[i]].flash;
}

function nextFlash() {
    i++;
    i = (i > maxNum) ? 0 : i;   
    displayText.innerHTML = chaptersData[randomizedOrder[i]].flash;
    document.getElementById('telling').innerHTML = i + " / " + maxNum;
    toggleFlash = false;
    document.getElementById('turnCard').innerHTML = "Answer";
    document.getElementById('card').style.backgroundColor = "rgba(0, 0, 120, 0.15)";
    console.log("Card number: ", i);
}

function previousFlash() {
    i--;i--;
    console.log("Card number: ", i);
    i = (i < -1) ? maxNum -1 : i;
    nextFlash();
}

function toggleChapters(){
    toggleChaptersVar = !toggleChaptersVar;
    if (toggleChaptersVar) {
        document.getElementsByClassName('chapters')[0].style.display = "flex";
        document.getElementsByClassName('back_overlay')[0].style.display = "flex";
    } else {
        document.getElementsByClassName('chapters')[0].style.display = "none";
        document.getElementsByClassName('back_overlay')[0].style.display = "none";
    }
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        flash();
    } else if (event.code === 'ArrowLeft') {
        previousFlash();
    } else if (event.code === 'ArrowRight') {
        nextFlash();
    }
});