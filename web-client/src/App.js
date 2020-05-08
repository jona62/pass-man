import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import HomePage from "./pages/homePage";
import AccountFormPage from "./pages/accountFormPage";
import ShowAccountPage from "./pages/showAccountPage";
import PrivateRoute from "./components/privateRoute";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <PrivateRoute path="/home" component={HomePage} />
          {/* <PrivateRoute path="/accounts/new" component={AccountFormPage} /> */}
          {/* <PrivateRoute path="/accounts/:id" component={ShowAccountPage} /> */}
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={SignUpPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
