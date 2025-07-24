import { useState } from "react";
import Square from "./Square";

interface Props{
  updateWinner : (winner : string) => void,
  xTurn : boolean,
  updateTurn : ()=> void
}

const getWinner = function (line : string){
    if(line === "XXX") return "X";
    else if (line === "OOO") return "O";
    else return "N";
};


const calculateWinner = function(grid : string[][]):string{
  let winner: string = "N";
  // row check
  for(let i =0; i < 3; i++){
    let line = "";
    for(let j = 0; j<3; j++){
      line+= grid[i][j];
    }
    winner = getWinner(line);
    if(winner!=="N") return winner;
  }

  // column check
  for(let i =0; i < 3; i++){
    let line = "";
    for(let j = 0; j<3; j++){
      line+= grid[j][i];
    }
    winner = getWinner(line);
    if(winner!=="N") return winner;
  }

  // diagonal check
  let diag1 = grid[0][0]+ grid[1][1]+ grid[2][2];
  winner = getWinner(diag1)
  if(winner!=="N") return winner;

  let diag2 = grid[0][2] + grid[1][1] + grid[2][0];
  winner = getWinner(diag2)
  if(winner!=="N") return winner;
  
  return "Not Decided Yet";
}


export default function Grid({updateWinner, xTurn, updateTurn}: Props){
  const [gridState, setGridState] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);


  let handleClick = function handleClick(row: number, col:number){
    let prevGridState = gridState.map(row=> [...row]);

    if(xTurn) prevGridState[row][col] = "X";
    else prevGridState[row][col] = "O";

    setGridState(prevGridState);
    updateTurn();

    let winner = calculateWinner(prevGridState);
    updateWinner(winner)
    console.log(winner)
   } 

  let arr = [];
  for(let i =0; i<3; i++){
    arr.push(Array.from({ length: 3 }, (_, i) => i ))
  }

  let grid = [];
  for(let row = 0; row<3; row++){
    let gridRow = [];
    for(let col = 0; col < 3; col++){
      gridRow.push(
        <Square 
          key ={row.toString() + col.toString()} 
          status={gridState[row][col]}
          onSquareClick = {()=> handleClick(row,col)}
        />)
    }
    grid.push(
      <div key = {row}>{gridRow}</div>
    )
  }
  return (
    <>
      <div className="row justify-content-center">
        {grid}       
      </div>
    </>
  )
}
