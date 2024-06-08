import React, { useRef, useState } from "react";

import ReactToPrint from "react-to-print";
import Invoice from "./Invoice";
import { useHistory } from "react-router";
import { AiFillPrinter } from "react-icons/ai";

const ComponentToPrint = (props) => {
  console.log("props", props);
  const history = useHistory();
  const componentRef = useRef();
  const [userData, setUserData] = useState(props.history.location.state);

  return (
    <>
      <button
        className="btn btn-primary mb-4 "
        onClick={() => history.push("/slotList")}
      >
        Back
      </button>
      <ReactToPrint
        trigger={() => (
          <button className="btn btn-light-primary mb-4 float-right p-2">
            <AiFillPrinter fontSize={20} />
          </button>
        )}
        content={() => componentRef.current}
      />
      <Invoice ref={componentRef} userData={userData} />
    </>
  );
};

export default ComponentToPrint;
