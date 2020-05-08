import React from "react";

const style = {
  paddingTop: "60px",
  height: "100vh",
};

function Loading() {
  return (
    <div style={style} className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
