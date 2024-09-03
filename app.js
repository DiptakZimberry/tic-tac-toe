let boxes = document.querySelectorAll(".box");
let rstBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg =document.querySelector("#msg");

let turnO = true;
count = 0;

const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
const reset = () =>{
    turnO =true;
    enableBoxes();
    msgContainer.classList.add("hide");

}

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        if(turnO){ //player O
            box.innerHTML = "O";
            turnO = false;
        }
        else{ // player X
            box.innerHTML = "X";
            turnO=true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            draw();
        }
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText ="";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const draw = () =>{
    msg.innerText=`Game was draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winningPattern) {
          let pos1Value =  boxes[pattern[0]].innerText;
          let pos2Value =  boxes[pattern[1]].innerText;
          let pos3Value =  boxes[pattern[2]].innerText;
          if(pos1Value != "" && pos2Value != "" && pos3Value != ""){
            if(pos1Value === pos2Value && pos2Value === pos3Value){
                showWinner(pos1Value);
            }
          }
    }
}

newGameBtn.addEventListener("click",reset);
rstBtn.addEventListener("click",reset);