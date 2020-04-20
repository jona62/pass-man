import React from "react";
import { NavLink } from "react-router-dom";

class HomePage extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3 appContainer">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink
              className="navbar-brand nav-link2 "
              exact
              to="/home"
            ></NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default HomePage;
