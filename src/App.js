import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import MainPage from "./pages/mainPage";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container-fluid text-center">
          <div className="row justify-content-center">
            <Switch>
              <Route path="/home" component={MainPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignUpPage} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
