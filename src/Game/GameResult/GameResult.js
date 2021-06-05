import React from "react";
import { Redirect, Link } from "react-router-dom";

const gameResult = (props) => {
  return (
    <div className="row purple lighten-4">
      {props.location.state === undefined ? <Redirect to="/" /> : null}
      <div className="row purple-text">
        <div className="section">
          <h1>Oops!! You Lose</h1>
          <div className="divider"></div>
        </div>
      </div>
      <div className="row">
        <h5>
          Your final score is &nbsp;
          <span className="btn-floating purple lighten-3">
            {props.location.state.score}
          </span>
        </h5>
        <div className="divider"></div>
        <h5>
          Top Score &nbsp;
          <span className="btn-floating disabled">
            {
              JSON.parse(localStorage.getItem(props.location.state.scoreType))[
                localStorage.getItem("difficulty")
              ]
            }
          </span>
        </h5>
        <Link
          to={props.location.state.url}
          className="waves-effect waves-light btn"
          title="Try Again"
        >
          <i className="material-icons left ">refresh</i>Retry
        </Link>
        <Link
          to="/"
          className="waves-effect waves-light btn"
          style={{ marginLeft: "15px" }}
        >
          <i className="material-icons left ">home</i>Home
        </Link>
      </div>
    </div>
  );
};

export default gameResult;
