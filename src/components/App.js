import React, { useEffect, useState } from "react";
import Header from "./Header";
import Game from "./Game";
import HeaderModal from "./HeaderModal";
import { validGuesses, answers } from "../data";

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

  const [roundsWon, setRoundsWon] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const [showHeaderModal, setShowHeaderModal] = useState(false);

  const [guessedLetters, setGuessedLetters] = useState(new Set());

  // Set answer for game
  const [answer, setAnswer] = useState(answers[Math.floor(Math.random()*answers.length)].toUpperCase());

  const wordSet = new Set(validGuesses);

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
    setGuessedLetters(new Set());
    setAnswer(answers[Math.floor(Math.random()*answers.length)].toUpperCase());
  }

  // Checks the guess that was submitted and sets game state accordingly
  function checkGameStatus(result) {
    if (result.every(color => color === 'green')) {
      setWonGame(true);
      setGameOver(true);
      setRoundsWon(roundsWon + 1);
      setRoundsPlayed(roundsPlayed + 1);
    } else if (gameTileStates.round === 5) {
      setGameOver(true);
      setRoundsPlayed(roundsPlayed + 1);
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

    // Load results into Game Tile States Array
    setGameTileStates((prevValue) => {
      var newStates = prevValue.tileStates;
      newStates[prevValue.round] = result;
      const newRound = prevValue.round + 1;

      checkGameStatus(result);

      return {
        tileStates: newStates,
        round: newRound
      }
    })

    // Add letters to list of already-guessed letters
    for (let i = 0; i < 5; i++) {
      if (!guessedLetters.has(guess[i])) {
        setGuessedLetters(prevValue => new Set([...prevValue, guess[i]]))
      } 
    }
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
    const guessString = currentInput.currentGuess.join("")
    if (currentInput.currentGuess.length === 5) {
      if (wordSet.has(guessString.toLowerCase())) {
        guessSubmit(currentInput.currentGuess, answer);
        setCurrentInput((prevValue) => ({
          ...prevValue,
          currentGuess: [],
          currentGuessNumber: prevValue.currentGuessNumber + 1
        }));
      } else {
        setFeedbackMessage("Not in word list");
        setShowFeedback(true);
        setTimeout(() => {
        setShowFeedback(false)
        }, 2000);   
      }
    } else {
      setFeedbackMessage("Not enough letters");
        setShowFeedback(true);
        setTimeout(() => {
        setShowFeedback(false)
        }, 2000);   
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

  // Render a modal if one of the header buttons are clicked
  function handleHeaderClick() {
    setShowHeaderModal(true);
  }

  function closeHeaderModal() {
    setShowHeaderModal(false);
  }

  // Render a modal if player attempts to submit a word that is not in the word list or is not 5 letters long  
  function renderFeedbackModal() {
     
    return (
    <div className="feedback-modal">
      <div className="feedback-modal-content">
        <p>{feedbackMessage}</p>
      </div>
    </div>
    )
  }

  // Render a modal at the end of the game to give player feedback (win or lose/correct word)
  function renderEndModal() {
    if (wonGame) {
      return (
        <div className="game-end-modal">
          <div className="game-end-modal-content">
            <h2>Congratulations!</h2>
            <p>You guessed the correct word!</p>
            <button className="gameover-button" onClick={restartGame}>Play Again</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="game-end-modal">
          <div className="game-end-modal-content">
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
        <Header handleHeaderClick={handleHeaderClick} />
        <Game currentInput={currentInput} gameTileStates={gameTileStates} guessedLetters={guessedLetters} handleLetterInput={handleLetterInput} handleEnter={handleEnter} handleBackspace={handleBackspace}/>
        {gameOver && renderEndModal()}
        {showFeedback && renderFeedbackModal()}
        {showHeaderModal && <HeaderModal closeHeaderModal={closeHeaderModal}/>}
      </div>
    </div>
  );
}

export default App;
