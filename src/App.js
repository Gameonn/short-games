import React, { Suspense } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Header from "./Header/Header";
import Home from "./Home/Home";
import GameResult from "./Game/GameResult/GameResult";
const Hangman = React.lazy(() => import("./Game/Hangman"));
const TypingGame = React.lazy(() => import("./Game/TypingGame"));
const ChooseLevel = React.lazy(() => import("./Game/ChooseLevel"));

const App = (props) => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route
          exact
          path="/games/:name/level"
          render={(props) => (
            <Suspense fallback={<div>Loading...</div>}>
              <ChooseLevel {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/games/hangman"
          render={(props) => (
            <Suspense fallback={<div>Loading...</div>}>
              <Hangman {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/games/typing-game"
          render={(props) => (
            <Suspense fallback={<div>Loading...</div>}>
              <TypingGame {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/game-result"
          render={(props) => <GameResult {...props} />}
        />
        <Route path="/" exact component={Home} />
        <Route render={() => <h1>Not Found</h1>} />
      </Switch>
    </div>
  );
};

export default App;
