import React from "react";
import { Link } from "react-router-dom";

const notFound = () => {
  return (
    <div className="row teal lighten-4">
      <div className="section">
        <h3>Link Expired or Invalid</h3>
        <div className="divider"></div>
        <p className="flow-text teal-text">
          Generate Short Link in a flash and use everywhere
        </p>

        <Link to="/" className="waves-effect waves-light btn">
          <i className="material-icons left ">home</i>Home
        </Link>
      </div>
    </div>
  );
};

export default notFound;
