import Speech from "../speech";

import React from "react";

const speech1 = ({ data }) => {
  ;
  return (
    <div>
      <Speech text={data} stop={true} pause={true} resume={true} />
      {/* <div style={{ textAlign: "center" }}>
        &nbsp;&nbsp;&nbsp; Start &nbsp;&nbsp;&nbsp;&nbsp;
        Stop&nbsp;&nbsp;&nbsp;&nbsp; Pause&nbsp;&nbsp;&nbsp;&nbsp; Resume
      </div> */}
    </div>
  );
};

export default speech1;
