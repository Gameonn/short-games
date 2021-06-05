import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Modal from "../UI/Modal";
import Rules from "./Rules";

const ChooseLevel = (props) => {
  const selectedGame = props.location.state.game;
  const selectedDifficulty = localStorage.getItem("difficulty") || "easy";
  const [difficulty, setDifficulty] = useState(selectedDifficulty);
  const [start, setStart] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const formHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("difficulty", difficulty);
    setStart(true);
  };

  return (
    <div className="row purple lighten-4">
      <div className="section">
        {start ? <Redirect to={selectedGame.url} /> : null}
        <h3>Welcome to the {selectedGame.name}</h3>
        <div className="divider"></div>
        <p className="flow-text purple-text">{selectedGame.tagline}</p>
        <div className="divider"></div>
        <div className="row section">
          <div className="col s6 offset-s3">
            <div className="waves-effect waves-light purple lighten-2 circle">
              <i className="material-icons large">arrow_downward</i>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showRules} modalClosed={() => setShowRules(false)}>
        <Rules gameName={selectedGame.name} />
      </Modal>
      <div className="row">
        <div className="col s6 offset-s3">
          <form onSubmit={formHandler}>
            <h6>Choose your Difficulty Level</h6>
            <div className="input-field s12">
              <select
                style={{ display: "block" }}
                onChange={(e) => setDifficulty(e.target.value)}
                value={difficulty}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="extreme">Extreme</option>
              </select>
            </div>
            <button
              type="submit"
              className="waves-effect btn-small"
              style={{ marginBottom: "15px" }}
            >
              Start Game
            </button>
          </form>
          <button
            onClick={() => setShowRules(true)}
            type="button"
            className="waves-effect btn-small purple lighten-2"
          >
            Rules of Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseLevel;
