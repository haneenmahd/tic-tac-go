import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import AppWraper from "./AppWrapper";
import Home from "./pages/Home";
import Play from "./pages/Play";
import Test from "./pages/Socket";

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
          path="/test"
          element={
            <AppWraper>
              <Test />
            </AppWraper>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
