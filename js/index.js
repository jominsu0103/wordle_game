let index = 0;
let attempts = 0;
let timer;

let selectedAnswer;
let previousDate;

const backspaceIcon = document.getElementById("backspaceIcon");

const updateAnswer = () => {
  const answers = [
    "APPLE",
    "CHAIR",
    "SMILE",
    "TIGER",
    "BEACH",
    "ANGEL",
    "MUSIC",
    "LEMON",
    "EARTH",
    "HAPPY",
    "GRAPE",
    "PLANT",
    "OCEAN",
    "BREAD",
    "DREAM",
    "STUDY",
    "CHILD",
    "HORSE",
    "RABBIT",
    "STORM",
    "SPACE",
    "FAIRY",
    "HOUSE",
    "MAPLE",
    "DRINK",
    "LIGHT",
    "PANDA",
    "PEACH",
    "SNAKE",
    "TEETH",
    "PLANT",
    "MOUSE",
    "PIZZA",
    "WATER",
    "QUEEN",
    "CLOCK",
    "TIGER",
    "SMILE",
    "MONEY",
    "RIVER",
    "SHOES",
    "PAPER",
    "MANGO",
    "PEARL",
    "BRAIN",
    "PAINT",
    "FAIRY",
    "TIGER",
    "SWORD",
    "PIZZA",
  ];
  const randomIndex = Math.floor(Math.random() * answers.length);
  selectedAnswer = answers[randomIndex];
  console.log(selectedAnswer);
};

const isDateChanged = () => {
  const currentDate = new Date().toDateString();
  if (currentDate !== previousDate) {
    previousDate = currentDate;
    return true;
  }
  return false;
};

const getStoredAnswer = () => {
  const storedAnswer = localStorage.getItem("selectedAnswer");
  if (storedAnswer) {
    selectedAnswer = storedAnswer;
  } else {
    updateAnswer();
    localStorage.setItem("selectedAnswer", selectedAnswer);
  }
};

const shakeBlockAnimation = () => {
  const blocks = document.querySelectorAll(".board-block");
  blocks.forEach((block) => {
    block.classList.add("shake-animation");
    setTimeout(() => {
      block.classList.remove("shake-animation");
    }, 400); // 애니메이션 시간(0.4초) 이후에 클래스 제거
  });
};

const flipBlockAnimation = () => {
  const blocks = document.querySelectorAll(".board-block");
  blocks.forEach((block) => {
    block.classList.add("flip-horizontal-animation");
    setTimeout(() => {
      block.classList.remove("flip-horizontal-animation");
    }, 600); // 애니메이션 시간(0.6초) 이후에 클래스 제거
  });
};

const appStart = () => {
  if (isDateChanged()) {
    getStoredAnswer();
  }

  const handleBackspaceClick = () => {
    handleBackspace();
  };

  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "🥳 게임이 종료됐습니다. 🥳";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:250px; left:755px; background-color:white; width:400px; height:100px; border:1px solid black; border-radius: 15px;font-size: large; font-weight: bold;";
    document.body.appendChild(div);
  };

  const helpMessage = () => {
    const div = document.createElement("div");
    div.innerText = "🤔 어려우신가요? 🤔";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:250px; left:755px; background-color:white; width:400px; height:100px; border:1px solid black; border-radius: 15px;font-size: large; font-weight: bold;";
    document.body.appendChild(div);

    setTimeout(() => {
      div.remove();
    }, 3000);
  };

  const nextLine = () => {
    if (attempts === 6) {
      gameOver();
      return;
    }
    attempts++;
    index = 0;
  };

  const gameOver = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameover();
    clearInterval(timer);
  };

  const handleEnterKey = () => {
    let answerCount = 0;
    let wrongCount = 0;
    const correctBlocks = [];
    const wrongBlocks = [];
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const letter = block.innerText;
      const answerWord = selectedAnswer[i];
      if (letter === answerWord) {
        answerCount++;
        block.style.background = "#6aaa64";
        correctBlocks.push(i);
      } else if (selectedAnswer.includes(letter))
        block.style.background = "#c9b458";
      else {
        wrongCount++;
        block.style.background = "#787c7e";
        wrongBlocks.push(i);
      }
      block.style.color = "white";
      const physicalKey = document.querySelector(
        `.keyboard-column[data-key='${letter}']`
      );
      if (physicalKey) {
        physicalKey.style.background = block.style.background;
      }
    }
    if (answerCount === 5) {
      correctBlocks.forEach((index) => {
        const block = document.querySelector(
          `.board-block[data-index='${attempts}${index}']`
        );
        block.classList.add("flip-horizontal-animation");
      });
      gameOver();
    } else if (wrongCount === 5) {
      wrongBlocks.forEach((index) => {
        const block = document.querySelector(
          `.board-block[data-index='${attempts}${index}']`
        );
        block.classList.add("shake-animation");
      });
      nextLine();
    } else {
      nextLine();
    }
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeyboardClick = (event) => {
    const key = event.target.dataset.key;
    console.log(key);
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= key.charCodeAt(0) && key.charCodeAt(0) <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  const keyboardClickEventListener = () => {
    const keyboardBlock = document.querySelectorAll(".keyboard-column");
    keyboardBlock.forEach((key) => {
      key.addEventListener("click", handleKeyboardClick);
    });
  };

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };
  const startTimer = () => {
    const startTime = new Date();

    const setTime = () => {
      const currentTime = new Date();
      const flowTime = new Date(currentTime - startTime);
      const minutes = flowTime.getMinutes().toString().padStart(2, "0");
      const seconds = flowTime.getSeconds().toString().padStart(2, "0");
      const time = document.querySelector("#timer");
      time.innerText = `${minutes}:${seconds}`;
    };

    timer = setInterval(setTime, 1000);

    setTimeout(helpMessage, 60000);
  };

  startTimer();
  keyboardClickEventListener();
  backspaceIcon.addEventListener("click", handleBackspaceClick);
  window.addEventListener("keydown", handleKeyDown);
};

appStart();
