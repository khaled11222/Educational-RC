var pickedElement = null;
var puzzleElements = Array.from(document.getElementsByClassName("element"));
var wrongAnswer = new Audio("assets/wrong-answer.mp3");
var correctAnswer = new Audio("assets/correct-answer.mp3");
var answers = Array.from(document.getElementsByClassName("answer"));
var restartpuzzleIcon = document.querySelector(".restart_puzzle_icon");
var mainContainer = document.querySelector(".main_container");
var preLoader = document.querySelector(".preLoader");
var dummyimgIcon = document.querySelector(".dummy_icon");
var dummyImg = document.querySelector(".dummy_Img");
var closeDummyImgIcon = document.querySelector(".dummyCloseIcon");
var pageContent = document.querySelector(".page_content");

function pickElement(e) {
  pickedElement = e.target;
  puzzleElements.forEach((element) => {
    element.style.backgroundColor = "white";
    element.style.color = "black";
  });
  e.target.style.backgroundColor = "rgb(40 134 212)";
  e.target.style.color = "white";
}

puzzleElements.forEach((element) => {
  element.addEventListener("click", pickElement);
});
function solve(e) {
  if (pickedElement !== null && e.target.innerHTML == "") {
    if (pickedElement.dataset.iscorrect === "true") {
      correctAnswer.play();
      e.target.innerHTML = `<p class="correctSolution">${pickedElement.dataset.element}</p> <div ><img src="assets/tikMark-small.png" /></div> `;
      pickedElement.style.display="none";
      pickedElement = null;
    } else {
      let intervalCounter = 0;
      wrongAnswer.play();
      interval = setInterval(function () {
        intervalCounter++;
        if (e.target.innerHTML.includes(`crossMark`)) {
          e.target.innerHTML = `<p class="wrongSolution">${pickedElement.dataset.element}</p>`;
        } else {
          e.target.innerHTML = `<p class="wrongSolution">${pickedElement.dataset.element}</p> <div  ><img src="assets/crossMark-small.png" ></div> `;
        }
        if (intervalCounter > 3) {
          clearInterval(interval);
          e.target.innerHTML = "";
        }
      }, 250);
    }
  }
}

answers.forEach(function (answer) {
  answer.addEventListener("click", solve);
});

const restertGame = () => {
  pickedElement = null;

  for (const answer of answers) {
    answer.innerHTML = "";
  }

  puzzleElements.forEach((element) => {
    element.style.backgroundColor = "white";
    element.style.color = "black";
    element.style.display = "block";
  });
};

restartpuzzleIcon.addEventListener("click", restertGame);

var solvePazzelIcon = document.querySelector(".solvePazzel");

function puzzleSolving(e) {
  puzzleElements.forEach((element) => {
    element.style.backgroundColor = "white";
    element.style.color = "black";
  });
  var isAnswerEmpty;
  puzzleElements.forEach((element) => {
    if (element.dataset.iscorrect === "true") {
      console.log(element);
      element.style.display = "none";
      isAnswerEmpty = true;
      answers.forEach(function (answer) {
        if (answer.innerHTML === "" && isAnswerEmpty) {
          answer.innerHTML = `<p class="correctSolution">${element.dataset.element}</p> <div ><img src="assets/tikMark-small.png" /></div> `;
          isAnswerEmpty = false;
        }
      });
    }
  });
}

solvePazzelIcon.addEventListener("click", puzzleSolving);

setTimeout(function () {
  mainContainer.style.visibility = "visible";
  preLoader.style.visibility = "hidden";
}, 2000);

function handleScalability(e) {
  const baseRatio = mainContainer.clientWidth / mainContainer.clientHeight;
  const windowRatio = window.innerWidth / window.innerHeight;
  if (windowRatio > baseRatio) {
    const ratio = window.innerHeight / mainContainer.clientHeight;
    mainContainer.style.left = `${
      (window.innerWidth - mainContainer.clientWidth * ratio) / 2
    }px`;
    mainContainer.style.transform = `scale(${ratio})`;
    return;
  }
  mainContainer.style.left = `0px`;
  mainContainer.style.transform = `scale(${
    window.innerWidth / mainContainer.clientWidth
  })`;
}
window.addEventListener("resize", handleScalability);

function showDummyImage() {
  pageContent.style.opacity = 0.5;
  dummyImg.style.visibility = "visible";
}
dummyimgIcon.addEventListener("click", showDummyImage);

function closeDummyImg() {
  console.log("dummyImg");

  pageContent.style.opacity = 1;

  dummyImg.style.visibility = "hidden";
}
closeDummyImgIcon.addEventListener("click", closeDummyImg);

var infoIcon = document.querySelector(".info_icon");
var infoContent = document.querySelector(".info_content");
function showInfo() {
  pageContent.style.opacity = 0.5;
  infoContent.style.visibility = "visible";
}
infoIcon.addEventListener("click", showInfo);

var closeInfoIcon = document.querySelector(".infoCloseIcon");
function closeinfo() {
  pageContent.style.opacity = 1;
  infoContent.style.visibility = "hidden";
}
closeInfoIcon.addEventListener("click", closeinfo);
