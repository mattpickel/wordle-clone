import React, { useEffect, useState } from "react";
import Header from "./Header";
import Game from "./Game";
import { answers } from "../data";

function App() {
  const initialGuesses = Array.from({ length: 6 }, () => []);
  const initialTileStates = Array.from({ length: 6 }, () => Array(5).fill(''));

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

  const [wonGame, setWonGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Set answer for game
  const answer = answers[0].toUpperCase();

  // Restart the game
  function restartGame() {
    console.log('restart game');
    setWonGame(false);
    setGameOver(false);
    setGameTileStates({
      tileStates: initialTileStates,
      round: 0
    });
    setCurrentInput({
      currentGuess: [],
      currentGuessNumber: 1,
      guesses: initialGuesses
    });
  }

  // Checks the guess that was submitted and sets game state accordingly
  function checkGameStatus(result) {
    if (result.every(color => color === 'green')) {
      setWonGame(true);
      setGameOver(true);
    } else if (gameTileStates.round === 5) {
      setGameOver(true);
    }
  }
  
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

      checkGameStatus(result);

      return {
        tileStates: newStates,
        round: newRound
      }
    })
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
    if (!gameOver) {
      const { keyCode } = event;
      if (keyCode >= 65 && keyCode <= 90) { // If letter
        handleLetterInput(event.key.toUpperCase());
      } else if (keyCode === 8) { // If backspace
        handleBackspace();
      } else if (keyCode === 13) { // If enter/return
        handleEnter();
      }
    }
  }

  // Render a modal at the end of the game to give player feedback (win or lose/correct word)
  function renderModal() {
    if (wonGame) {
      return (
        <div className="modal">
          <div className="modal-content">
            <h2>Congratulations!</h2>
            <p>You guessed the correct word!</p>
            <button className="gameover-button" onClick={restartGame}>Play Again</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="modal">
          <div className="modal-content">
            <h2>Game Over</h2>
            <p>The correct word was: {answer}</p>
            <button className="gameover-button" onClick={restartGame}>Play Again</button>
          </div>
        </div>
      );
    }
  }

  // Event listener on entire document to always capture user input
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentInput]);

  return (
    <div className="App">
      <div className="main-content">
        <Header />
        <Game currentInput={currentInput} gameTileStates={gameTileStates}/>
        {gameOver && renderModal()}
      </div>
    </div>
  );
}

export default App;
