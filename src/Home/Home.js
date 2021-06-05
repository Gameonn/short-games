import React, { useState } from "react";
import "./Home.css";
import hangman from "../GameLogos/hangman.png";
// import ChooseLevel from "../Game/ChooseLevel";
import typingGame from "../GameLogos/typing-game.jpg";
import { Redirect } from "react-router";

const Home = (props) => {
  const games = [
    {
      id: 1,
      name: "Hangman",
      image: hangman,
      tagline: "Play to survive in Hangman",
      url: "/games/hangman",
    },
    {
      id: 2,
      name: "Typing Game",
      image: typingGame,
      tagline: "Kill the keyboard with your fingers to boost in typing game",
      url: "/games/typing-game",
    },
  ];

  const gameLevelHandler = (evt) => {
    const selectedGame = games.find(
      (game) => game.name === evt.currentTarget.title
    );
    setSelectedGame(selectedGame);
    setGameLevel(true);
  };

  const [gameLevel, setGameLevel] = useState(false);
  const [selectedGame, setSelectedGame] = useState();
  return (
    <div className="row">
      {gameLevel ? (
        <Redirect
          to={{
            pathname: selectedGame.url + "/level",
            state: { game: selectedGame },
          }}
        />
      ) : null}

      <div>
        {games.map((game) => {
          return (
            <div className="col s12 m3" key={game.id}>
              <div className="card card-style z-depth-4">
                <div className="card-image">
                  <img src={game.image} alt={game.name} />
                  <button
                    type="button"
                    className="btn-floating halfway-fab waves-effect waves-light red"
                    onClick={(e) => gameLevelHandler(e)}
                    title={game.name}
                  >
                    <i className="material-icons large">add</i>
                  </button>
                </div>
                <div className="card-stacked">
                  <h5>
                    <span className="grey-text text-darken-4">{game.name}</span>
                  </h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
