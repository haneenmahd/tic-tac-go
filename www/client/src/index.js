import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import AppWraper from "./AppWrapper";
import Home from "./pages/Home";
import Play from "./pages/Play";
import GameResult from "./components/GameResult";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/"
          index
          element={
            <AppWraper>
              <Home />
            </AppWraper>
          }
        />

        <Route
          path="/play"
          element={
            <AppWraper hideFooter>
              <Play />
            </AppWraper>
          }
        />

        <Route
          path="/game-result"
          element={
            <AppWraper hideFooter>
              <GameResult playerScore={1} opponentScore={2} />
            </AppWraper>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
