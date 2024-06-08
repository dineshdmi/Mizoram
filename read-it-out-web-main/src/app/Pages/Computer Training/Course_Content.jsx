import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import queryString from "query-string";
import { ApiGet, ApiGetNoAuth, Bucket } from "../../helpers/API/ApiData";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { Modal } from "react-bootstrap";
import * as userUtil from "../../utils/user.util";

const Course_Content = (props) => {
  const { accountData, pdfReader, pdf, PDF, Epub, Index, item } = props;
  const [userInfo, setUserInfo] = useState({});

  const [maincategory, setMainCategory] = useState([]);
  const history = useHistory();
  const token = userUtil.getUserInfo();
  const Id = JSON.parse(localStorage.getItem("token"));

  console.log("accountData", accountData);
  useEffect(() => {
    // setUserInfo(JSON.parse(localStorage.getItem("userinfo"))[0]);
    // const idValue = queryString.parse(window.location.search);
    // ApiGetNoAuth("student/content")
    //   .then((res) => {
    //     setMainCategory(res.data.data);
    //     console.log("Sucess");
    //     console.log(res.data.data);
    //   })
    //   .catch((err) => {
    //     if (err.status == 410) {
    //       history.push("/bookList");
    //     } else {
    //       toast.error(err.message);
    //     }
    //   });
  }, []);

  return (
    <>
      <div className="">
        <div className=" box_shadow rounded_1 marginBottom50">
          <>
            {" "}
            <div className="">
              <div className="px-3 py-3 border-bottom d-flex align-items-center justify-content-between">
                <div className="font_size_20 color_black font_medium">
                  Course Content
                </div>
                <div className="">
                  {PDF ? (
                    <button
                      className="py-1 viewAllBtn border-none rounded text-center text-decoration-none "
                      onClick={() => pdfReader(PDF, Index)}
                    >
                      Read PDF
                    </button>
                  ) : (
                    ""
                  )}
                  {Epub ? (
                    <button
                      className="py-1 viewAllBtn border-none rounded text-center text-decoration-none ml-2"
                      onClick={() => pdf(Epub, item)}
                    >
                      Read EPub
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                {/* <div className="col-md-3 text-end">
                    <button className="px-3 py-2 viewAllBtn rounded border-none">
                      View All
                    </button>
                  </div> */}
              </div>
              <div className=" px-3 font_size_12 color_light_gray">
                {accountData[0]?.description}
              </div>
              <div className="">
                <div className="">
                  <>
                    {accountData[0]?.subject.map((item, i) => {
                      return (
                        <Accordion className="accordionBG">
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className="px-3 py-2 font_size_18 font_medium color_blue font_capital">
                              {item.title}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography className="font_size_14 font_medium color_light_gray px-3 py-2 font_capital">
                              <ul
                                className="list-style-none"
                                style={{ listStyleType: "none" }}
                              >
                                {item.content.map((sub, i) => {
                                  return (
                                    <li className="">
                                      <div>{i + 1 + ". " + sub}</div>
                                    </li>
                                  );
                                })}
                              </ul>
                            </Typography>
                            <div className="">
                              {/* {item.pdf && (
                                <button className="viewAllBtn border-none rounded">
                                  Read PDF
                                </button>
                              )} */}
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                  </>
                </div>
              </div>
            </div>
            {/* <Modal
          show={modal}
          centered
          onHide={() => setModal(!modal)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="example-modal-sizes-title-lg"
              className="font_size_20 font_bold color_light_gray"
            >
              Continue with sign In or Sign Up
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>Do you want to Logout ?</span>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <button onClick={contiNue} className="btn btn-light btn-elevate">
                Continue
              </button>
              <> </>
              <button
                type="button"
                onClick={() => logOut()}
                className="btn btn-primary btn-elevate"
              >
                Logout
              </button>
            </div>
          </Modal.Footer>
        </Modal> */}
          </>
        </div>
      </div>
    </>
  );
};

export default Course_Content;
