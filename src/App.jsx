import Die from './Die'
import Button from './Button'
import TimesRolled from './TimesRolled'
import BestTime from './BestTIme'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import React from 'react'
import Confetti from 'react-confetti'


import './App.css'

export default function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [bestTime, setBestTime] = useState(
    localStorage.getItem('bestTime') || null
  )

  useEffect(() => {
    //check if all dice are held
    //if so, check if all dice are the same
    //if so, set tenzies to true and log "TENZIES!"
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSame = dice.every(die => die.value === firstValue)
    if (allHeld && allSame) {
      setTenzies(true)
      console.log('TENZIES!')
      setEndTime(Date.now())
      const elapsedTime = calculateElapsedTime()
      if (bestTime === null || elapsedTime < Number(bestTime)) {
        setBestTime(elapsedTime);
        localStorage.setItem('bestTime', elapsedTime)
      }
    }
  }, [dice, bestTime])

  function allNewDice() {
    //return an array of 10 objects with random numbers between 1 and 6
    let newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  function calculateElapsedTime() {
    if (startTime !== null && endTime !== null) {
      const elapsedTime = endTime - startTime;
      return Math.round(elapsedTime / 1000);
    } else {
      return null;
    }
  }

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice())
      setTenzies(false)
      setRolls(0)
      setStartTime(null)
      setEndTime(null)
    } else {
      const updatedDice = dice.map(die => {
        if (!die.isHeld) {
          return { ...die, value: Math.floor(Math.random() * 6) + 1 }
        } else {
          return die
        }
      })
      setDice(updatedDice)
      setRolls((oldRolls) => oldRolls + 1)
      if (startTime === null) {
        setStartTime(Date.now());
      }
    }
  }

  function holdDice(id) {
    //find the die in the array with the matching id
    //toggle the isHeld property of that die
    const updatedDice = dice.map(die => {
      if (die.id === id) {
        return { ...die, isHeld: !die.isHeld }
      } else {
        return die
      }
    })
    setDice(updatedDice)
  }

  const diceElements = dice.map(die => {
    return <Die 
      key={die.id}
      value={die.value}
      holdDice={() => holdDice(die.id)}
      isHeld={die.isHeld}
    />
  })


  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <Button text={tenzies ? 'New Game' : 'Roll'} onClick={rollDice} />
      <TimesRolled 
      rolls={rolls}
      calculateElapsedTime={calculateElapsedTime}
      endTime={endTime}
      />
      <BestTime bestTime={bestTime}/>
    </main>
  )
}

