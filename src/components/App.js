import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Game from "./Game";

function App() {
  const [currentInput, setCurrentInput] = useState({
    currentGuess: [],
    currentGuessNumber: 1,
    guesses: [[[]],[[]],[[]],[[]],[[]],[[]]]
  });

  // const [currentInput, setCurrentInput] = useState({
  //   round: 1,
  //   currentKey: "",
  //   guesses: [],
  // })

  const [guessNumber, setGuessNumber] = useState(1);

  // Add an event listener to the document to capture keystrokes for player guess. 
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
  }, []);

  

  return (
    <div className="App">
      <Header currentGuess={currentInput.currentGuess}/>
      <Game currentInput={currentInput}/>
    </div>
  );
}

export default App;
