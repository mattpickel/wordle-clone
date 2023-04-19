import React, { useEffect, useState } from "react";
import Header from "./Header";
import Game from "./Game";
import { answers } from "../data";

function App() {
  const [currentInput, setCurrentInput] = useState({
    currentGuess: [],
    currentGuessNumber: 1,
    guesses: [[[]],[[]],[[]],[[]],[[]],[[]]]
  });

  const [gameTileStates, setGameTileStates] = useState({
    tileStates: [
    ['grey', 'grey', 'grey', 'grey', 'grey'],
    ['grey', 'grey', 'grey', 'grey', 'grey'],
    ['grey', 'grey', 'grey', 'grey', 'grey'],
    ['grey', 'grey', 'grey', 'grey', 'grey'],
    ['grey', 'grey', 'grey', 'grey', 'grey'],
    ['grey', 'grey', 'grey', 'grey', 'grey']
    ],
    round: 0
  })

  var answer = answers[0].toUpperCase();

  // Function is called when return/enter key pressed w/ 5 letters in the current guess. Returns array of green/yellow/grey strings to be delivered to game row tiles.
  function guessSubmit(guess, answer) {
    const result = []
    const answerArray = answer.split("");
    const unguessedLetters = [...answerArray];
    const tempGuess = [...guess];

    // Find all green letters
    for (let i = 0; i < 5; i++) {
      if (guess[i] === answerArray[i]) {
        result.push('green');
        unguessedLetters[i] = "";
        tempGuess[i] = ""; // Update tempGuessArray
      } else {
        result.push(""); // Reserve space for later
      }
    }

    // Find all the yellow letters
    for (let i = 0; i < 5; i++) {
      if (tempGuess[i] !== "" && unguessedLetters.includes(tempGuess[i])) {
        result[i] = ('yellow');
        unguessedLetters[unguessedLetters.indexOf(guess[i])] = "";
      } else if (result[i] === "") {
        result[i] = ('grey')
      }
    }

    setGameTileStates((prevValue) => {
      console.log('test');
      var newStates = prevValue.tileStates;
      newStates[prevValue.round] = result;
      console.log(newStates[prevValue.round]);
      const newRound = prevValue.round + 1;
      return {
        tileStates: newStates,
        round: newRound
      }
    })

    console.log(result);
    console.log(unguessedLetters);
  }

 

  // Key handler for handling player input. If letter, added to current guess. If backspace, delete last character from current guess. 
  // If return/enter, submit guess if 5 letters and increase currentGuessNumber. The array of guesses is maintained accordingly. 
  useEffect(() => {
    function handleKeyDown(event) {    
      // Only capture keystroke if it is a letter. When captured, add it to the current guess. If it is a backspace, remove the previous letter that was guessed.    
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        const value = event.key.toUpperCase();  
        setCurrentInput((prevValue) => {
          if (prevValue.currentGuess.length < 5) {         
            var newGuess = [...prevValue.currentGuess, value];
            var newGuesses = prevValue.guesses;
            newGuesses[prevValue.currentGuessNumber - 1] = newGuess;   
            return {
              currentGuess: newGuess,
              currentGuessNumber: prevValue.currentGuessNumber,
              guesses: newGuesses
            }
          } else {
            var newGuess = prevValue.currentGuess;
            newGuess[4] = value;
            var newGuesses = prevValue.guesses;
            newGuesses[prevValue.currentGuessNumber - 1] = newGuess;
            return {
              currentGuess: newGuess,
              currentGuessNumber: prevValue.currentGuessNumber,
              guesses: newGuesses
            }
          }
        });
      // Handle Backspace
      } else if (event.keyCode === 8) {
        setCurrentInput((prevValue) => {
          if (prevValue.currentGuess.length > 1) {
            var newGuess = prevValue.currentGuess.slice(0, -1);
            var newGuesses = prevValue.guesses;
            newGuesses[prevValue.currentGuessNumber - 1] = newGuess;
            return {
              currentGuess: newGuess,
              currentGuessNumber: prevValue.currentGuessNumber,
              guesses: newGuesses
            }
          } else if (prevValue.currentGuess.length <= 1) {
            var newGuesses = prevValue.guesses;
            newGuesses[prevValue.currentGuessNumber - 1] = [];
            return {
              currentGuess: [],
              currentKey: event.key,
              currentGuessNumber: prevValue.currentGuessNumber,
              guesses: newGuesses
            }
          }
        })       
        console.log("Delete last letter");
      // Handle enter/submission
      } else if (event.keyCode === 13) {
        if (currentInput.currentGuess.length === 5) {
          guessSubmit(currentInput.currentGuess, answer);
        }
        setCurrentInput((prevValue) => {
          if (prevValue.currentGuess.length < 5) {
            return prevValue;
          } else if (prevValue.currentGuess.length === 5) {
            var newGuesses = prevValue.guesses;
            newGuesses[prevValue.currentGuessNumber - 1] = prevValue.currentGuess;
            return {
              currentGuess: [],
              currentGuessNumber: prevValue.currentGuessNumber + 1,
              guesses: newGuesses
            }
          }
        });
        
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    // Clean-up
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [currentInput]);

  

  return (
    <div className="App">
      <Header />
      <Game currentInput={currentInput}/>
    </div>
  );
}

export default App;
