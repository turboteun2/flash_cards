/*
    TODO:
    - Add chapters, and make it possible to switch between them
    - Randomize the order of the cards.
    - Voeg een score toe, wanneer iets fout is, voeg het cijfer toe tot een array & vraag dit op een later moment opnieuw.
*/
function getChapter() {
    const params = new URLSearchParams(window.location.search);
    var chapter = params.get("chapter") || 0;
    document.getElementById("hoofdstuk").innerHTML = "Hoofdstuk: " + (1 + parseInt(chapter));
    return chapter;
}

var displayText = document.getElementById('flashDisplay');
const chapters = [chaptersDataBacc1, chaptersDataBacc2, chaptersDataBacc3, chaptersDataBacc4, chaptersDataBacc5, chaptersDataBacc6]
const value = getChapter(); // Default to 0 if invalid
var chaptersData = chapters[value];
var toggleChaptersVar = false;
var toggleFlash = false;
var score = 0;
var i = 0;

var maxNum = chaptersData.length - 1;

displayText.innerHTML = chaptersData[i].answer;
displayText.innerHTML = chaptersData[i].flash;
document.getElementById('telling').innerHTML = i + " / " + maxNum;

function flash() {
    toggleFlash = !toggleFlash;
    if (toggleFlash) {
        // True - If the card is flipped, show the answer
        document.getElementById('turnCard').innerHTML = "Wrong";
        document.getElementById('answerCard').innerHTML = "Correct";
        document.getElementById('turnCard').style.backgroundColor = "rgba(255, 0, 0, 0.75)";
        document.getElementById('card').style.backgroundColor = "transparent";
        displayText.innerHTML = chaptersData[i].answer;
    } else {
        // False - If the card is not flipped, show the question
        displayText.innerHTML = chaptersData[i].flash;
        document.getElementById('card').style.backgroundColor = "rgba(0, 0, 120, 0.15)";
        document.getElementById('turnCard').style.backgroundColor = "transparent";
        document.getElementById('turnCard').innerHTML = "Answer";
        document.getElementById('answerCard').innerHTML = "Next";
    }
}

function pickChapter(x) {
    const params = new URLSearchParams(window.location.search);
    params.set('chapter', x - 1);
    window.location.href = `${window.location.pathname}?${params}`;
}

function nextFlash() {
    i++;
    i = (i > maxNum) ? 0 : i;
    displayText.innerHTML = chaptersData[i].flash;
    document.getElementById('card').style.backgroundColor = "rgba(0, 0, 120, 0.15)";
    document.getElementById('turnCard').style.backgroundColor = "transparent";
    document.getElementById('turnCard').innerHTML = "Answer";
    document.getElementById('answerCard').innerHTML = "Next";
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

function correct(){
    score++;
    document.getElementById('score').innerHTML = `Score: ${score}`;
    nextFlash();
}

function incorrect(){
    document.getElementById('score').innerHTML = `Score: ${score}`;
    let flashWrong = displayText.innerHTML = chaptersData[i].flash;
    let flashAnswer = displayText.innerHTML = chaptersData[i].answer;

    chaptersData.push({flash: flashWrong, answer: flashAnswer});

    maxNum++;
    nextFlash();
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        flash();
    } else if (event.code === 'ArrowLeft') {
        toggleFlash ? incorrect() : previousFlash();
    } else if (event.code === 'ArrowRight') {
        toggleFlash ? correct() : nextFlash();
    }
});

/*

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

*/