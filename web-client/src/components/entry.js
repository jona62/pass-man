import React from "react";
import FontAwesomeIcon from "./icon";
import { Link } from "react-router-dom";

const style = {
  display: "inline-flex",
};

const Entry = (props) => {
  return (
    <div className="container pt-3 pb-3">
      <div className="row text-muted pt-3">
        <h2 className="pl-3">
          <FontAwesomeIcon name={props.iconName}></FontAwesomeIcon>
          <span className="text-dark">{props.website}</span>
        </h2>
      </div>

      <div className="text-muted row pt-2 pt-2">
        <div className="col-sm-10 align-self-center">
          <span>
            Username: {props.username} {"    "}{" "}
            <input
              className="form-control form-control-md w-25 ml-4 bg-transparent border-0"
              type="password"
              value={props.password}
              disabled
              style={style}
            />
          </span>
        </div>

        <div className="col-auto text-muted align-self-end justify-content-end">
          <button className="btn btn-link text-muted">Copy</button>
          <Link to={"/accounts/" + props.id}>
            {
              <button
                className="btn btn-link text-muted"
                data-toggle="modal"
                data-target="#staticBackdrop"
              >
                Edit
              </button>
            }
          </Link>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Entry;
