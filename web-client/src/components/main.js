import React from "react";
import Header from "./header";
import Entries from "./entries";

const Main = () => {
  return (
    <div className="col-sm-9">
      <Header />
      <Entries />
    </div>
  );
};

export default Main;
