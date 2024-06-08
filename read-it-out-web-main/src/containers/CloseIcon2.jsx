import Speech from "../speech";
import { FaBeer } from "react-icons/fa";
import React from "react";
import { GrClose } from "react-icons/gr";
import { useHistory } from "react-router-dom";

const CloseIcon2 = () => {
  const play = () => {
    console.log("playyyyyyyyyyyyyyyyyyyyyyy");
  };

  const history = useHistory();

  let data = "ooo";
  return (
    <div className="extra" onClick={() => history.push("/profile")}>
      <Speech text={data} stop={true} />
      <GrClose className="iconc" />
    </div>
  );
};

export default CloseIcon2;
