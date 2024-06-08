import React from "react";
import { GrClose } from "react-icons/gr";
import { useHistory } from "react-router-dom";
import CloseIcon2 from "./CloseIcon2";

const CloseIcon = ({ stop }) => {
  // console.log("propss", props);
  const history = useHistory();
  return (
    <>
      {/* <div
        onClick={() => {
          stop();
          
          history.push("/profile");

         
        }}
        style={{ marginTop: "-4px", cursor: "pointer" }}
      >
        <GrClose />
      </div> */}
    </>
  );
};

export default CloseIcon;
