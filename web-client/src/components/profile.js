import React from "react";

const styling = {
  position: "absolute",
  bottom: "0",
};
const Profile = (props) => {
  return (
    <div style={styling} className="row pl-2 pt-4 pb-4">
      <div className="col-sm-7">
        <p className="text-light">
          {(props.user.firstName, props.user.lastName)}
          <br />
          {props.user.email}
        </p>
      </div>
      <div className="col-auto align-self-center">
        <br />
        <br />
        <button className="btn btn-link text-light">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
