import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import AppWraper from "./AppWrapper";
import Home from "./pages/Home";
import Play from "./pages/Play";
import Game from "./pages/Game";
import UserProvider from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
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
              <AppWraper>
                <Play />
              </AppWraper>
            }
          />

          <Route
            path="/game"
            element={
              <AppWraper>
                <Game />
              </AppWraper>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);
