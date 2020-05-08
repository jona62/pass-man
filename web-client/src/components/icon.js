import React from "react";

const fontIconStyle = {
  fontSize: "18px !important",
};

const FontAwesomeIcon = (props) => {
  return <i style={fontIconStyle} className={`pr-3 fa fa-` + props.name}></i>;
};

export default FontAwesomeIcon;
