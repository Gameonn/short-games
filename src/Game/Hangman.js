import React from "react";
import "./Hangman.css";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

class Hangman extends React.Component {
  constructor(props) {
    super(props);
    this.words = [];
    this.correctLetters = [];
    this.wrongLetters = [];
    this.figureParts = React.createRef(null);
    this.notificationList = React.createRef(null);
    this.word = React.createRef(null);
    this.difficulty = localStorage.getItem("difficulty") || "easy";
    this.hintCount = 0;
    this.hintUsed = false;
  }

  state = {
    score: 0,
    chosenWord: "",
    gameOver: false,
    wrongLettersDiv: null,
    wordDiv: null,
  };

  componentDidMount() {
    axios
      .get(`https://random-word-api.herokuapp.com/word?number=50`)
      .then((result) => {
        this.words = result.data;
        if (this.difficulty === "easy" || this.difficulty === "medium")
          this.words = this.words.filter((word) => word.length <= 8);
        else this.words = this.words.filter((word) => word.length >= 12);
        this.addWordToDOM();
      });
  }

  addWordToDOM = () => {
    let randomWord = this.words[Math.floor(Math.random() * this.words.length)];
    this.setState({ chosenWord: randomWord });
    console.log(randomWord);
    this.displayWord();
  };

  setWrongLetters = () => {
    //display wrong letter
    const wrongLettersDiv = this.wrongLetters.map((letter, i) => (
      <span key={i}>{letter + " "}</span>
    ));
    this.setState({ wrongLettersDiv: wrongLettersDiv });
    //display parts
    const figureParts = this.figureParts.current?.childNodes;
    if (figureParts) {
      let reducedLives = 0;
      if (this.difficulty === "extreme") reducedLives = 4;
      else if (this.difficulty === "hard") reducedLives = 3;
      else if (this.difficulty === "medium") reducedLives = 1;
      figureParts.forEach((part, i) => {
        const errors = this.wrongLetters.length + reducedLives;
        if (i < errors) part.style.display = "block";
        else part.style.display = "none";
      });

      if (this.wrongLetters.length + reducedLives === figureParts.length) {
        this.gameOver();
      }
    }
  };

  displayWord = () => {
    const wordDiv = this.state.chosenWord.split("").map((letter, i) => (
      <span className="letter" key={i}>
        {this.correctLetters.includes(letter) ? letter : ""}
      </span>
    ));
    this.setState({ wordDiv: wordDiv });
    if (this.correctLetters.length && !this.hintUsed) this.updateScore(1);
    this.hintUsed = false;
    const uniqueListChosenWord = [...new Set(this.state.chosenWord.split(""))];

    if (this.correctLetters.length === uniqueListChosenWord.length) {
      this.showNotification("Congratulations! You Won.", 1);
      this.updateScore(5);
      this.correctLetters = [];
      this.wrongLetters = [];
      this.setWrongLetters();
      this.hintCount = 0;
      setTimeout(() => {
        this.addWordToDOM();
      }, 2000);
    }
  };

  showNotification(message, success) {
    const notificationList = this.notificationList.current;
    if (notificationList) {
      const colorClass = success ? "green" : "amber";
      notificationList.classList.add("show");
      notificationList.classList.add(colorClass);
      notificationList.innerText = message;
      setTimeout(() => {
        notificationList.classList.remove("show");
        notificationList.classList.remove(colorClass);
        notificationList.innerText = "";
      }, 2000);
    }
  }

  handleKeyDown = (evt) => {
    if (evt.code >= "KeyA" && evt.code <= "KeyZ") {
      const letter = evt.key.toLowerCase();

      if (this.state.chosenWord.includes(letter)) {
        if (!this.correctLetters.includes(letter)) {
          this.correctLetters.push(letter);
          this.displayWord();
        } else {
          this.showNotification("You have already entered this letter", 0);
        }
      } else {
        if (!this.wrongLetters.includes(letter)) {
          this.wrongLetters.push(letter);
          this.setWrongLetters();
        } else {
          this.showNotification("You have already entered this letter", 0);
        }
      }
    }
  };

  hintHandler = () => {
    if (this.hintCount >= 2) {
      this.showNotification("You have used all your hints", 0);
      return;
    }
    const uniqueListChosenWord = [...new Set(this.state.chosenWord.split(""))];
    let wordsLeft = uniqueListChosenWord.filter(
      (x) => this.correctLetters.indexOf(x) === -1
    );
    const letter = wordsLeft[Math.floor(Math.random() * wordsLeft.length)];
    this.hintCount += 1;
    this.hintUsed = true;
    this.correctLetters.push(letter);
    this.displayWord();
  };
  updateScore(amount) {
    this.setState({ score: this.state.score + amount });
  }
  gameOver() {
    let scoreObj = JSON.parse(localStorage.getItem("hangman-score"));
    if (!scoreObj) scoreObj = { easy: 0, medium: 0, hard: 0, extreme: 0 };
    const oldHighestScore = scoreObj[this.difficulty];
    if (this.state.score > oldHighestScore) {
      scoreObj[this.difficulty] = this.state.score;
      localStorage.setItem("hangman-score", JSON.stringify(scoreObj));
    }

    this.setState({ gameOver: true });
  }

  render() {
    return (
      <div
        className="row purple lighten-4"
        tabIndex="0"
        onKeyDown={(e) => this.handleKeyDown(e)}
      >
        {this.state.gameOver ? (
          <Redirect
            to={{
              pathname: "/game-result",
              state: {
                score: this.state.score,
                scoreType: "hangman-score",
                url: this.props.match.path,
              },
            }}
          />
        ) : null}
        <div className="col s8 offset-s2">
          <h3 className="purple-text text-lighten-2">Hangman</h3>
          <h6 className="right">
            Score: <strong id="score">{this.state.score}</strong>
          </h6>

          <h6>Find the hidden word - Enter a alphabet</h6>
          <div className="game-container z-depth-1">
            <svg
              height="250"
              width="200"
              className="figure-container"
              ref={this.figureParts}
            >
              {/* Rod */}
              <line
                x1="20"
                y1="230"
                x2="100"
                y2="230"
                className="figure-part"
              />
              <line x1="60" y1="20" x2="60" y2="230" className="figure-part" />
              <line x1="60" y1="20" x2="140" y2="20" className="figure-part" />
              <line x1="140" y1="20" x2="140" y2="50" className="figure-part" />

              {/* Head */}
              <circle cx="140" cy="70" r="20" className="figure-part" />
              {/* Body */}
              <line
                x1="140"
                y1="90"
                x2="140"
                y2="150"
                className="figure-part"
              />
              {/* Arms */}
              <line
                x1="140"
                y1="120"
                x2="120"
                y2="100"
                className="figure-part"
              />
              <line
                x1="140"
                y1="120"
                x2="160"
                y2="100"
                className="figure-part"
              />
              {/* Legs */}
              <line
                x1="140"
                y1="150"
                x2="120"
                y2="180"
                className="figure-part"
              />
              <line
                x1="140"
                y1="150"
                x2="160"
                y2="180"
                className="figure-part"
              />
            </svg>

            <div className="word" ref={this.word}>
              {this.state.wordDiv}
            </div>
            <div className="wrong-letters-container">
              <div className="flow-text"> {this.state.wrongLettersDiv} </div>
            </div>
            <div className="left">
              <button
                className="waves-effect waves-light btn-small"
                onClick={this.hintHandler}
              >
                <i className="material-icons left ">lightbulb_outline</i>Hint
              </button>
            </div>
          </div>
          <div className="divider"></div>
          <div className="section">
            <h5>
              LEVEL -
              <strong style={{ textTransform: "capitalize" }}>
                {this.difficulty}
              </strong>
            </h5>
            <Link to="/" className="waves-effect waves-light btn">
              <i className="material-icons left ">home</i>Home
            </Link>
          </div>

          <div
            ref={this.notificationList}
            className="notification-container"
          ></div>
        </div>
      </div>
    );
  }
}

export default Hangman;
