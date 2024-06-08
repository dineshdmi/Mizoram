import moment from "moment";
import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
const Footer = () => {
  const history = useHistory();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    console.log(history.location.pathname);

    if (history.location.pathname === "/mcqTest") {
      setToggle(true);
    }
  }, []);
  return (
    <>
      {!toggle ? (
        <div>
          <div className="container-fluid  row py-4 box_shadow px-3  align-items-center ">
            <div className="col-md-6 textGrayfz16Regular d-flex responsive_mb">
              <div className="col text-center">
                <p
                  className="textGrayfz16Regular pointer"
                  onClick={() => history.push("/policy")}
                >
                  Privacy Policy
                </p>
              </div>

              <div className="col text-center">
                <p
                  className="textGrayfz16Regular pointer"
                  onClick={() => history.push("/term")}
                >
                  Terms & Conditions 
                </p>
              </div>

              <div className="col text-center">
                <p
                  className="textGrayfz16Regular pointer"
                  onClick={() => history.push("/contact")}
                >
                  Contact Us
                </p>
              </div>
            </div>
            <div className="col-md-6 responsive_text text_end  textGrayfz16Regular">
              Copyright {moment(new Date()).format("YYYY")}. All Rights
              Reserved.
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Footer;
