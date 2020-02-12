let min = 1,
    max = 20,
    winningNum = getRandomNum(min, max),
    guessLeft = 5;

const game = document.querySelector("#game"),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector(".max-num"),
      guessBtn = document.querySelector("#guess-btn"),
      guessInput = document.querySelector("#guess-input"),
      message = document.querySelector(".message"),
      medium = document.querySelector("#medium");

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener("mousedown", (e) => {
  if(e.target.classList.contains("play-again")){
    window.location.reload();
  }
});

guessBtn.addEventListener("click", () => {
  let guess = parseInt(guessInput.value);
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, `red`);
  }
  if(guess === winningNum){
    gameOver(true, `${winningNum} is correct! YOU WIN!`);
  } else{
    guessLeft -= 1;
    if (guessLeft === 0) {
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
    } else {
      if(guessLeft === -1){
        window.location.reload();
      }
      guessInput.value = "";
      setMessage(`${guess} is not correct, ${guessLeft} guesses left`, `red`);
    }
  }
});


function gameOver(won, msg){
  let color;
  won === true ? color = "green" : color = "red";
  guessInput.disabled = true;
  setMessage(msg, color);
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

function setMessage(msg, color){
  guessInput.style.borderColor = color;
  message.style.color = color;
  message.textContent = msg;
}

function getState(){
  if(medium.checked){
    guessLeft = 4;
  }else{
    guessLeft = 3;
  }
}

