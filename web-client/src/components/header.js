import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="row pl-3 pr-3 pt-5 pb-3 w-100 bg-white">
      <div className="col-auto">
        <Link className="nav-link" exact to="/accounts/new">
          <input
            className="btn btn-primary"
            type="button"
            name="button"
            value="Add Entry"
            className="btn btn-primary"
          />
        </Link>
      </div>
      <div className="col-sm-10">
        <input
          className="form-control form-control-md"
          type="text"
          placeholder="Quick Filter"
        />
      </div>
    </div>
  );
};

export default Header;
