const startBtn = document.getElementById("start");
const imgContainer = document.querySelector(`#img-container`);
const timer = document.getElementById(`timer`);
let play = false;
const tries = document.getElementById("tries");
const restart = document.getElementById("restart");
let numberOfClick = 0;
let firstChose = "";
// let stage = 2;
let restartEvent;
let imgsEventRef = [];
let imgsGotClcick = [];
let points = 0;
let interval;
const goBtn = document.getElementById("go");
const gameOvBtn = document.getElementById("gameOv");
const nameInput = document.getElementById("nameInput");
const nameSpan = document.getElementById("name");
const nameWarnning = document.getElementById("name-warnning");
const welcoming = document.getElementById("welcoming");
const losingMsg = document.getElementById("losing-msg");
const gameOv = document.getElementById("gameOv");
let imgs = document.querySelectorAll("#img-container div");
// congrats elements
const congrats = document.getElementById("congrats");
const congratsBtn = document.getElementById("congrats-btn");
// -------------------------------functions-------------------------
goBtn.addEventListener("click", () => {
  if (nameInput.value.length < 3) {
    nameWarnning.style.display = `block`;
    setTimeout(() => {
      nameWarnning.style.display = `none`;
    }, 5000);
  } else {
    nameSpan.innerHTML = nameInput.value;
    welcoming.style.opacity = `0`;
    setTimeout(() => {
      welcoming.style.display = `none`;
    }, 800);
    go();
  }
});
async function go() {
  startBtn.addEventListener("click", () => {
    if (!play) {
      startGame();
      play = true;
    } else {
      document.getElementById("warnnig").style.display = `block`;
      setTimeout(() => {
        document.getElementById("warnnig").style.display = `none`;
      }, 5000);
    }
  });

  async function startGame() {
    imgs = shuffleArray(imgs);
    for (let i = 0; i < imgs.length; i++) imgContainer.appendChild(imgs[i]);
    // shufling items
    setTimeout(() => {
      imgs.map((e) => {
        e.style.transform = `rotateY(0deg)`;
      });
    }, 100);
    //reveal items
    memorisingTimer();
    //starting memorisng timer
    setTimeout(() => {
      imgs.map((e) => {
        //180
        e.style.transform = `rotateY(180deg)`;
      });
      // startChosing();
      // 10000
    }, 10700);
    //start chsoing
  }

  async function memorisingTimer() {
    let time = Number.parseInt(timer.innerHTML);
    let interval = setInterval(() => {
      time--;
      timer.innerHTML = `${time}s`;
      if (time === -1) {
        clearInterval(interval);
        // 60s
        timer.innerHTML = `60s`;
        startChosingStage();
      }
    }, 1000);
  }
  function gameOverBtn() {
    clearInterval(interval);
    function eventOv() {
      // 10s
      timer.innerHTML = `10s`;
      play = false;
      numberOfClick = 0;
      firstChose = "";
      tries.innerHTML = `5`;
      points = 0;
      imgs.map((e) => {
        if (e.style.transform !== "rotateY(180deg)")
          e.style.transform = `rotateY(180deg)`;
      });
      losingMsg.style.opacity = `0`;
      setTimeout(() => {
        losingMsg.style.display = `none`;
      }, 800);
      gameOv.removeEventListener("click", eventOv);
      restart.removeEventListener("click", restartEvent);
      imgsGotClcick.forEach((e) => {
        for (let i = 0; i < imgsEventRef.length; i++) {
          e.removeEventListener("click", imgsEventRef[i]);
        }
      });
    }
    gameOv.addEventListener("click", eventOv);
  }
  function restartBtn() {
    let restartF = function () {
      imgs.forEach((e) => {
        if (e.style.transform !== "rotateY(180deg)")
          e.style.transform = `rotateY(180deg)`;
      });
      clearInterval(interval);
      timer.innerHTML = `10s`;
      numberOfClick = 0;
      points = 0;
      tries.innerHTML = `5`;
      firstChose = "";
      startGame();
      restart.removeEventListener("click", restartF);
      imgsGotClcick.forEach((e) => {
        for (let i = 0; i < imgsEventRef.length; i++) {
          e.removeEventListener("click", imgsEventRef[i]);
        }
      });
    };
    restart.addEventListener("click", restartF);
    restartEvent = restartF;
  }
  function check(secondElementClicked) {
    if (
      firstChose.firstElementChild.dataset["num"] !==
      secondElementClicked.firstElementChild.dataset["num"]
    ) {
      let prevChose = firstChose;
      setTimeout(() => {
        secondElementClicked.style.transform = `rotateY(180deg)`;
        prevChose.style.transform = `rotateY( 180deg)`;
      }, 850);
      numberOfClick--;
      tries.innerHTML = `${Number.parseInt(tries.innerHTML) - 1}`;
    } else {
      points++;
      numberOfClick--;
    }
  }
  function congratsBtnF() {
    clearInterval(interval);
    function eventCong() {
      // 10s
      timer.innerHTML = `10s`;
      play = false;
      numberOfClick = 0;
      firstChose = "";
      tries.innerHTML = `5`;
      points = 0;
      imgs.map((e) => {
        if (e.style.transform !== "rotateY(180deg)")
          e.style.transform = `rotateY(180deg)`;
      });
      congrats.style.opacity = `0`;
      setTimeout(() => {
        congrats.style.display = `none`;
      }, 800);
      congratsBtn.removeEventListener("click", eventCong);
      restart.removeEventListener("click", restartEvent);
      imgsGotClcick.forEach((e) => {
        for (let i = 0; i < imgsEventRef.length; i++) {
          e.removeEventListener("click", imgsEventRef[i]);
        }
      });
    }
    congratsBtn.addEventListener("click", eventCong);
  }
  function chosing() {
    imgs.forEach((e) => {
      let startChosingF = function () {
        e.style.transform = `rotateY(0)`;
        if (numberOfClick === 0) {
          firstChose = e;
          numberOfClick++;
        } else {
          check(e);
        }
        if (points === 10) {
          congrats.style.display = `flex`;
          setTimeout(() => {
            congrats.style.opacity = `1`;
          }, 100);
          congratsBtnF();
        }
        if (Number.parseInt(tries.innerHTML) === 0) {
          losingMsg.style.display = `flex`;
          setTimeout(() => {
            losingMsg.style.opacity = `1`;
          }, 100);
          gameOverBtn();
        }
      };
      e.addEventListener("click", startChosingF);
      imgsEventRef.push(startChosingF);
      imgsGotClcick.push(e);
    });
  }
  function startChosingStage() {
    //setting time
    let time = Number.parseInt(timer.innerHTML);
    interval = setInterval(() => {
      time--;
      timer.innerHTML = `${time}s`;
      if (time === 0) {
        // clearInterval(interval);
        // ======
        losingMsg.style.display = `flex`;
        setTimeout(() => {
          losingMsg.style.opacity = `1`;
        }, 100);
        // ======
        gameOverBtn();
      }
    }, 1000);
    restartBtn();
    chosing();
  }
}
function shuffleArray(nodeList) {
  let array = Array.from(nodeList);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
