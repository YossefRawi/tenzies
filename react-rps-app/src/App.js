
import Die from "./components/Die"
import React ,{useState, useEffect} from "react"
import { nanoid } from 'nanoid'

import Confetti from 'react-confetti'




export default function App() {

const [dice, setDice] = useState(allNewDice())
const [tenzies, setTenzies] = useState(false)


  function allNewDice(){
    let newArray = []
    
    for(let i=0; i < 10; i++){
      newArray.push({
          id: nanoid(),
          value: Math.floor(Math.random() * (6)) + 1,
          isHeld: false
        })
        
    }
    
    
    return newArray
    
}


function rollDice(){
  setDice(oldDice => oldDice.map(die => { 
    return die.isHeld ? die
      :{
      id: nanoid(),
      value: Math.floor(Math.random() * (6)) + 1,
      isHeld: false
      } 
    
  }))
}

function holdDice(id){
  setDice(oldDice => oldDice.map(die => { 
    return die.id === id ? 
          {...die, isHeld : !die.isHeld} :
          die
  }))
  
}

const diceElements = dice.map(die => <Die key={die.id} value={die.value} die={die} holdDice={() => holdDice(die.id)} />)




useEffect(()=>{
  const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
},[dice])


function newGame(){
  window.location.reload();
}




    return (
        <main>
          <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
            className="roll-dice" 
            onClick={tenzies ? newGame : rollDice} 
            >{tenzies ? "New Game" : "Roll Dice"}</button>
            {tenzies && <Confetti/>}
        </main>
    )
}
