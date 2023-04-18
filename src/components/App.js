import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Game from "./Game";

function App() {
  const [currentInput, setCurrentInput] = useState({
    currentGuess: [],
    currentGuessNumber: 1
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
            return {
              currentGuess: [...prevValue.currentGuess, value],
              currentGuessNumber: prevValue.currentGuessNumber
            }
          } else {
            var newArray = prevValue.currentGuess;
            newArray[4] = value;
            return {
              currentGuess: newArray,
              currentGuessNumber: prevValue.currentGuessNumber
            }
          }
        });
      // Handle Backspace
      } else if (event.keyCode === 8) {
        setCurrentInput((prevValue) => {
          console.log(prevValue.currentGuess);
          console.log(prevValue.currentGuess[-2]);
          if (prevValue.currentGuess.length > 1) {
            return {
              currentGuess: prevValue.currentGuess.slice(0, -1),
              currentGuessNumber: prevValue.currentGuessNumber
            }
          } else if (prevValue.currentGuess.length <= 1) {
            return {
              currentGuess: [],
              currentKey: event.key,
              currentGuessNumber: prevValue.currentGuessNumber
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
            return {
              currentGuess: [],
              currentGuessNumber: prevValue.currentGuessNumber + 1
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
