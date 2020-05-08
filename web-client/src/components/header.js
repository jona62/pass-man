import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="row pl-3 pr-3 pt-5 pb-3 w-100 bg-white">
      <div className="col-auto">
        <button
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#addEntryPopup"
        >
          Add Entry
        </button>
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
