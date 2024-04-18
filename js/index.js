const anwser = "APPLE";

let index = 0;
let attempts = 0;
let timer;

const appStart = () => {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "🥳 게임이 종료됐습니다. 🥳";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:250px; left:755px; background-color:white; width:400px; height:100px; border:1px solid black; border-radius: 15px;font-size: large; font-weight: bold;";
    document.body.appendChild(div);
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
    let anwserCount = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const letter = block.innerText;
      const anwserWord = anwser[i];
      if (letter === anwserWord) {
        anwserCount++;
        block.style.background = "#6aaa64";
      } else if (anwser.includes(letter)) block.style.background = "#c9b458";
      else block.style.background = "#787c7e";
      block.style.color = "white";
    }
    if (anwserCount === 5) {
      gameOver();
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
  };

  startTimer();
  window.addEventListener("keydown", handleKeyDown);
};

appStart();
