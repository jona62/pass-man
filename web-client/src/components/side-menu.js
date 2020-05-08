import React from "react";
import Profile from "./profile";
import FontAwesomeIcon from "./icon";

const sideMenuStyle = {
  height: "100vh",
};

const Link = {
  backgroundColor: "rgba(255, 255, 255, 0.5)",
};

const SideMenu = (props) => {
  return (
    <div style={sideMenuStyle} className="col-sm-2 bg-primary">
      <div className="row">
        <div className="col-sm-12 align-self-center justify-self-center pt-5 pb-4">
          <h3 className="text-light">
            Password <br /> Manager
          </h3>
        </div>
      </div>

      <div className="row">
        <div style={Link} className="col-sm-12 pt-3 pb-3">
          <span className="text-light">
            <FontAwesomeIcon name="address-book" /> All Passwords
          </span>
        </div>
      </div>

      <Profile {...props} />
    </div>
  );
};

export default SideMenu;
