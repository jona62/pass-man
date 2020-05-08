import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import HomePage from "./pages/homePage";
import PrivateRoute from "./components/privateRoute";
import EditPopup from "./pages/edit-popup";
import AddEntry from "./pages/add-entry";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <PrivateRoute path="/home" component={HomePage} />
          <PrivateRoute path="/accounts/new" component={AddEntry} />
          <PrivateRoute path="/accounts/:id" component={EditPopup} />
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={SignUpPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
