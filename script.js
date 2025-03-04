
const params = new URLSearchParams(window.location.search);

function getChapter() {
    var chapter = params.get("chapter") || 0;
    document.getElementById("hoofdstuk").innerHTML = "Hoofdstuk: " + (1 + parseInt(chapter));
    return chapter;
}

function shuffleCards(cards) {
    var arr = cards;
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr; // Return the shuffled array
}

const chapters = [chaptersDataBacc1, chaptersDataBacc2, chaptersDataBacc3, chaptersDataBacc4, chaptersDataBacc5, chaptersDataBacc6]
var displayText = document.getElementById('flashDisplay');
const value = getChapter(); // Default to 0 if invalid
var shuffleBoolean = params.get("shuffle") || false;
var chaptersData = shuffleBoolean ? shuffleCards(chapters[value]) : chapters[value];
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
        document.getElementById('turnCard').innerHTML = "❌ Wrong";
        document.getElementById('answerCard').innerHTML = "✅ Correct";
        document.getElementById('turnCard').style.backgroundColor = "rgba(255, 0, 0, 0.6)";
        document.getElementById('card').style.backgroundColor = "transparent";
        displayText.innerHTML = chaptersData[i].answer;
    } else {
        // False - If the card is not flipped, show the question
        displayText.innerHTML = chaptersData[i].flash;
        document.getElementById('card').style.backgroundColor = "rgba(0, 0, 120, 0.15)";
        document.getElementById('turnCard').style.backgroundColor = "transparent";
        document.getElementById('turnCard').innerHTML = "Previous";
        document.getElementById('answerCard').innerHTML = "Next";
    }
}

function nextFlash() {
    i++;
    i = (i > maxNum) ? 0 : i;
    displayText.innerHTML = chaptersData[i].flash;
    document.getElementById('card').style.backgroundColor = "rgba(0, 0, 120, 0.15)";
    document.getElementById('turnCard').style.backgroundColor = "transparent";
    document.getElementById('turnCard').innerHTML = "Previous";
    document.getElementById('answerCard').innerHTML = "Next";
    document.getElementById('telling').innerHTML = i + " / " + maxNum;
    toggleFlash = false;
    document.getElementById('turnCard').innerHTML = "Previous";
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

function pickChapter(x) {
    params.set('chapter', x - 1);
    window.location.href = `${window.location.pathname}?${params}`;
}

function shuffleCardsBoolean() {
    params.set('shuffle', true);
    window.location.href = `${window.location.pathname}?${params}`;
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