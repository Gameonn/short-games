import React, { Component } from "react";
import styles from "./Game.module.css";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

class TypingGame extends Component {
  state = {
    score: 0,
    time: 5,
    randomWord: "",
    gameOver: false,
  };

  componentDidMount() {
    this.words = [];
    axios
      .get(`https://random-word-api.herokuapp.com/word?number=500`)
      .then((result) => {
        this.words = result.data;
        if (this.difficulty === "easy" || this.difficulty === "medium")
          this.words = this.words.filter((word) => word.length <= 8);
        // else this.words = this.words.filter((word) => word.length >= 12);

        this.addWordToDOM();
        this.timeInterval = setInterval(() => {
          this.updateTime();
        }, 1000);
      });
    this.difficulty = localStorage.getItem("difficulty") || "easy";
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
    this.words = [];
    this.difficulty = "easy";
  }

  //add to DOM
  addWordToDOM = () => {
    let randomWord = this.words[Math.floor(Math.random() * this.words.length)];
    this.setState({ randomWord: randomWord });
  };

  updateTime = () => {
    this.setState((prevState) => {
      return { ...prevState, time: prevState.time - 1 };
    });
    if (this.state.time === 0) {
      clearInterval(this.timeInterval);
      this.gameOver();
    }
  };

  gameOver() {
    let scoreObj = JSON.parse(localStorage.getItem("typing-score"));
    if (!scoreObj) scoreObj = { easy: 0, medium: 0, hard: 0, extreme: 0 };
    const oldHighestScore = scoreObj[this.difficulty];
    if (this.state.score > oldHighestScore) {
      scoreObj[this.difficulty] = this.state.score;
      localStorage.setItem("typing-score", JSON.stringify(scoreObj));
    }

    this.setState({ gameOver: true });
  }

  inputHandler = (e) => {
    const insertedText = e.target.value;

    if (insertedText === this.state.randomWord) {
      this.addWordToDOM();
      this.updateScore();

      e.target.value = "";
      let time = 10;
      if (this.difficulty === "extreme") time = 2;
      else if (this.difficulty === "hard") time = 5;
      else if (this.difficulty === "medium") time = 7;

      if (this.state.randomWord.length > 12) time += 4;
      this.setState((prevState) => {
        return { ...prevState, time: prevState.time + time };
      });
      this.updateTime();
    }
  };

  updateScore() {
    this.setState({ score: this.state.score + 1 });
  }

  render() {
    return (
      <div className="row purple lighten-4">
        <div className="col s8 offset-s2">
          <div className={styles.Game}>
            {this.state.gameOver ? (
              <Redirect
                to={{
                  pathname: "/game-result",
                  state: {
                    score: this.state.score,
                    scoreType: "typing-score",
                    url: this.props.match.path,
                  },
                }}
              />
            ) : null}
            <h3 className="purple-text text-lighten-2">Typing Game</h3>
            <div className="divider"></div>
            <h6>Type the following</h6>
            <h3 id="word" className={styles.randomWord}>
              {this.state.randomWord}
            </h3>
            <input
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              className={styles.answerInput}
              type="text"
              onChange={(e) => this.inputHandler(e)}
              placeholder="Type the word here...."
            />
            <p className={styles.TimeContainer}>
              Time left: <span id="time">{this.state.time}s</span>
            </p>
            <p className={styles.ScoreContainer}>
              Score: <span id="score">{this.state.score}</span>
            </p>
            <h5>
              LEVEL - <strong> {this.difficulty} </strong>{" "}
            </h5>
            <Link to="/" className="waves-effect waves-light btn">
              <i className="material-icons left ">home</i>Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default TypingGame;
