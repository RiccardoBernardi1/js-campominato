"use strict"
// 1. Creare un ciclo for che generi le 100 caselle della griglia
// 1a. Selezionare il contenitore e salvarlo in una costante
// 1b. Creare la casella 
// 1c. Inserire il numero nella casella
// 1d. Aggiungere alle caselle la loro classe css 
// 1e. Inserire la casella nel contenitore
// 2. Creare un bottone che generi la griglia al click
// 3. Generare un array di 16 numeri casuali tra 1 e il numero di caselle
// 4. Verificare che ogni numero generato non sia già nell'array
// 5. Ad ogni click su una casella verificare se il numero della casella è nell'array e in tal caso colorarla di rosso
// 6. Far terminare la partita se si clicca su un numero presente nella lista o se si clicca su tutti i numeri non presenti in essa
// 7. Creare un contatore per il punteggio

// FUNCTIONS

function addGrid (cellNum,container){
    let gameOver=false;
    let points=0;
    for (let i = 1; i <= cellNum; i++) {
        const boardCell=document.createElement("div");
        boardCell.innerHTML=i;
        boardCells.push(boardCell);
        if (cellNum==100){
            boardCell.classList.add("board-cell-10")
        }else if(cellNum==81){
            boardCell.classList.add("board-cell-9")
        }else{
            boardCell.classList.add("board-cell-7")
        }
        container.append(boardCell);
       
        boardCell.addEventListener("click", function myFunction(){
            if(endGame!=true&&!(bombs.includes(Number(boardCell.innerHTML)))){
                this.classList.add("light-blue");
                this.removeEventListener("click",myFunction);
                points+=1;
                console.log(points)
                if(points===cellNum-bombs.length){
                    endGame()
                }
            }else if(endGame!=true&&bombs.includes(Number(boardCell.innerHTML))){
                endGame()
            }
        });
    } 
}
function bombGen (bombNum,cellNum){
    while(bombs.length<bombNum){
        let bomb = Math.floor(Math.random() * (cellNum - 1 + 1) ) + 1;
        if(!(bombs.includes(bomb))){
            bombs.push(bomb);
        }
    } 
}
function endGame(){
    for (let index = 0; index < boardCells.length; index++) {
        if(bombs.includes(Number(boardCells[index].innerHTML))){
            boardCells[index].classList.add("red");
        }else{
            boardCells[index].classList.add("light-blue");
        }
    }
    return true;
}
//MAIN

let bombs=[];
const boardCells=[];
const board=document.querySelector(".board");
const btn=document.getElementById("btn");
let cells=0;
btn.addEventListener("click",function(){
    board.innerHTML="";
    let difficulty=document.getElementById("difficulty").value;
    board.classList.remove("d-none");
    if (difficulty==="easy"){
        cells=100;
    }else if(difficulty==="normal"){
        cells=81;
    }else{
        cells=49;
    }
    bombGen (1,cells);
    console.log(bombs)
    addGrid (cells,board);
});
