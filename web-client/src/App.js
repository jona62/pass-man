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

function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
      <Link className="navbar-brand" to="/home">
        PassMan
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/accounts/new">
            Save a password
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <div className="container-fluid text-center">
          <div className="row justify-content-center">
            <Switch>
              <PrivateRoute path="/home" component={HomePage} />
              <PrivateRoute path="/accounts/new" component={AccountFormPage} />
              <PrivateRoute path="/accounts/:id" component={ShowAccountPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/" component={SignUpPage} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
