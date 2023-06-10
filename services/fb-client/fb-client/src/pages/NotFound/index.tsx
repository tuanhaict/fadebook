import React from "react";
import { BiMessageAltError } from "react-icons/bi";
import "./NotFound.scss";
const NotFound = () => {
  return (
    <div className="not-found">
      <span className="not-found-text">This features isn't available now</span>
      <BiMessageAltError className="not-found-icon" />
    </div>
  );
};

export default NotFound;
