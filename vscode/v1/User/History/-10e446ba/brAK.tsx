import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'
import Grid from './components/Grid'
import Result from './components/Result'
import Container from './components/Container'

function App() {
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState("Not Decided Yet");
  const handleWinner = function(winner : string){
    setWinner(winner);
  }
  return (
    <>
    <Container>
      <div className='row text-center'>
        <Grid 
          updateWinner = {handleWinner} 
          xTurn = {xTurn} 
          updateTurn = {()=>setXTurn(!xTurn)}    
        />
        <Result 
          winningStatus={winner} 
          currentPlayer={xTurn? "X": "O"}
        />
      </div>
    </Container>
    </>
  )
}

export default App
