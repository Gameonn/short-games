import React from "react";
import "./Rules.css";
import rules from "./rules.json";

const Rules = (props) => {
  const gameRules = rules.find((gameObj) => gameObj.name === props.gameName);
  const rulesSection = Object.entries(gameRules)
    .slice(1)
    .map((value, i) => (
      <div key={i} className="rule-block">
        <h6 className="rule-heading">{value[0]}:</h6>
        <span className="rule-detail">{value[1]}</span>
      </div>
    ));

  return (
    <div className="row purple lighten-4">
      <div className="section">
        <div className="rule-container">
          <h5 className="flow-text purple-text"> {props.gameName} Rules</h5>
          <div className="col12 z-depth-3">{rulesSection}</div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
