import React from "react";
import { NavLink } from "react-router-dom";

const header = (props) => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <NavLink to="/" className="brand-logo">
            Gameonn
          </NavLink>
          <ul id="nav" className="right">
            <li>{/* <NavLink to="/">Typing Game</NavLink> */}</li>
            <li>{/* <NavLink to="/">Hangman</NavLink> */}</li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default header;
