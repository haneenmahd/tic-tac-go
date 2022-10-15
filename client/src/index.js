import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import AppWraper from "./App";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Room from "./pages/Room";

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
          path="/room/:roomCode"
          element={
            <AppWraper>
              <Room />
            </AppWraper>
          }
        />

        <Route
          path="/game/:mode/:side"
          element={
            <AppWraper>
              <Game />
            </AppWraper>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
