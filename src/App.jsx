import Die from './Die'
import Button from './Button'
import { useState } from 'react'

import './App.css'

function App() {

  const [dice, setDice] = useState(allNewDice())

  function allNewDice() {
    //return an array of 10 random numbers between 1 and 6
    let newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.floor(Math.random() * 6) + 1)
    }
    return newDice
  }

  function asdSetDice() {
    setDice(allNewDice())
  }


  return (
    <main>
      <div className='dice-container'>
        {dice.map((die, index) => {
          return <Die key={index} value={die} />
        })}
      </div>
      <Button text='Roll Dice' onClick={asdSetDice} />
    </main>
  )
}

export default App
