import React, { useEffect, useState } from "react";
import Header from "./Header";
import Game from "./Game";
import { answers } from "../data";

function App() {
  const initialGuesses = Array.from({ length: 6 }, () => []);
  const initialTileStates = Array.from({ length: 6 }, () => Array(5).fill('grey'));

  // Initialize state variables
  const [currentInput, setCurrentInput] = useState({
    currentGuess: [],
    currentGuessNumber: 1,
    guesses: initialGuesses
  });

  const [gameTileStates, setGameTileStates] = useState({
    tileStates: initialTileStates,
    round: 0
  })

  const answer = answers[0].toUpperCase();

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

    // Load results into Tile States Array
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

  // Higher order function to handle updates to current input
  function updateCurrentInput(updateFn) {
    setCurrentInput((prevValue) => {
      const newGuess = updateFn(prevValue.currentGuess);
      const newGuesses = prevValue.guesses.map((guess, i) =>
        i == prevValue.currentGuessNumber - 1 ? newGuess : guess
      );

      return {
        ...prevValue,
        currentGuess: newGuess,
        guesses: newGuesses
      };
    });
  }

  // Compute 'newGuess' to be used in H.O. function
  function handleLetterInput(value) {
    updateCurrentInput((prevGuess) => {
      const newGuess = prevGuess.length < 5 ? [...prevGuess, value] : [...prevGuess.slice(0, 4), value];
      return newGuess;
    });
  }

  function handleBackspace() {
    updateCurrentInput((prevGuess) => {
      const newGuess = prevGuess.slice(0, -1);
      return newGuess;
    })
  }

  // Submit guess on enter if valid 
  function handleEnter() {
    if (currentInput.currentGuess.length === 5) {
      guessSubmit(currentInput.currentGuess, answer);
      setCurrentInput((prevValue) => ({
        ...prevValue,
        currentGuess: [],
        currentGuessNumber: prevValue.currentGuessNumber + 1
      }));
    }
  }

  // Call function based on keystroke
  function handleKeyDown(event) {
    const { keyCode } = event;
    if (keyCode >= 65 && keyCode <= 90) {
      handleLetterInput(event.key.toUpperCase());
    } else if (keyCode === 8) {
      handleBackspace();
    } else if (keyCode === 13) {
      handleEnter();
    }
  }

  // Event listener on entire document to always capture user input
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentInput]);

  return (
    <div className="App">
      <Header />
      <Game currentInput={currentInput} gameTileStates={gameTileStates}/>
    </div>
  );
}

export default App;
