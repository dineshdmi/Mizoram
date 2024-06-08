import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { FiPhone, FiMail } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { ApiPost, ApiPostNoAuth } from "../../helpers/API/ApiData";
import { toast, ToastContainer } from "react-toastify";

const Contact = () => {
  const React = require('react');

  const [loading, setLoading] = useState(false);
  const [button, setbutton] = useState(false);
  const [data, setData] = useState([]);
  const [errors, setError] = useState({});
  const [contact, setcontact] = useState({});
  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    const name = JSON.parse(localStorage.getItem("userinfo"));
    setcontact(name);
  }, []);

  const history = useHistory();

  const handleonChangeSignup = (e) => {
    // console.log(e.target);
    let { name, value } = e.target;

    setcontact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const callsignup = () => {
    setbutton(true);
    enableLoading();

    var body = {
      email: contact.email,
      firstName: contact.name,
      message: contact.message,
    };
    console.log(contact);

    if (token) {
      ApiPost("/contact_us/add", body)
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          disableLoading();
          setbutton(false);
          // setCategory(res.data.data);
        })
        .catch((err) => {
          disableLoading();
          setbutton(false);
          console.log(err);
          if (err.status === 410) {
            history.push("/postlist");
          } else {
            // toast.error(err.message);
          }
        });
    } else {
      ApiPostNoAuth("student/contact_us/add", body)
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          // setCategory(res.data.data);
        })
        .catch((err) => {
          console.log(err);
          if (err.status === 410) {
            history.push("/postlist");
          } else {
            // toast.error(err.message);
          }
        })
        .finally(() => {
          // This block will run after either the .then() or .catch() has completed.
          disableLoading();
          setbutton(false);
        });
    }

  };
  console.log(contact);

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!data.firstName) {
      formIsValid = false;
      errors["firstName"] = "*Please Enter First Name";
    }
    if (!data.lastName) {
      formIsValid = false;
      errors["lastName"] = "*Please Enter Last Name";
    }
    if (!data.email) {
      formIsValid = false;
      errors["email"] = "*Please Enter Email";
    }
    if (!data.message) {
      formIsValid = false;
      errors["message"] = "*Please Enter Bio";
    }
    if (!data.phoneNumber) {
      formIsValid = false;
      errors["phoneNumber"] = "*Please Enter Phone Number";
    }

    setError(errors);
    return formIsValid;
  };

  return (
    <div className="bg-light-grey pt-25 mb-50">
      <ToastContainer position="top-right" />
      <div className="container bg-white box_shadow rounded">
        <div className="">
          <div className="font_size_26 font_bold color_black border-bottom p-4 ">Contact</div>
          <Row>
            <Col md="8" className=" pt-25 pt-50">
              <div className="ml-25 ">
                <div className="font_size_32 font_bold color_black">Any Query ? GET IN TOUCH !</div>
              </div>
              <div className="pt-30 ml-25"></div>
              <div className="d-flex ml-25 pb-18 flexColumn">
                <div className="mb-3 col-md-5 mr-20 pt-60">
                  <label
                    for="exampleFormControlInput1"
                    className="font_size_18 font_bold color_light_black font-weight-normal"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control loginInput p-15px-imp login_Border"
                    id="exampleFormControlInput1"
                    placeholder="Enter Your Name"
                    name="name"
                    value={contact?.name}
                    onChange={(e) => handleonChangeSignup(e)}
                  />
                  <span className="font_size_12 font_bold color_red">{errors["firstName"]}</span>
                </div>
                <div className="mb-3 col-md-5 pt-60">
                  <label
                    for="exampleFormControlInput1"
                    className="font_size_18 font_bold color_light_black"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control loginInput p-15px-imp login_Border"
                    id="exampleFormControlInput1"
                    placeholder="Enter Your Email Address"
                    name="email"
                    value={contact?.email}
                    onChange={(e) => handleonChangeSignup(e)}
                  />
                  <span className="font_size_12 font_bold color_red">{errors["lastName"]}</span>
                </div>
              </div>
              <div className="ml-25">
                <div className="mb-3 col-md-10">
                  <label
                    for="exampleFormControlInput1"
                    className="font_size_18 font_bold color_light_black"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={contact?.message}
                    onChange={(e) => handleonChangeSignup(e)}
                    className="form-control loginInput p-15px-imp login_Border"
                    id="exampleFormControlInput1"
                    placeholder="Enter Message "
                  />
                  <span className="font_size_12 font_bold color_red">{errors["message"]}</span>
                </div>
              </div>
              <div className="d-flex ml-25 pt-3">
                <div className="mb-3">
                  <div
                    className=" px-5  py-2 text-white rounded linear_gradient pointer"
                    onClick={() => callsignup()}
                    disabled={button}
                  >
                    Send
                    {/* {loading && <CircularProgress color="secondary" />} */}
                    {loading && (
                      <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                  </div>
                </div>
                {/* <a id="pdfs" href={"src/app/pdf/ebook.pdf"} target="_blank"></a> */}
              </div>
            </Col>
            <Col md="4" className=" pt-25 pt-50">
              <div className="font_size_32 font_bold color_black mr-25">GET OFFICE INFO.</div>
              <a href="https://www.google.com/maps/place/Mizoram+State+Library/@23.7237511,92.7038226,17z/data=!4m14!1m7!3m6!1s0x374d94a4cb819f43:0xc41db39f478fa80!2sMizoram+State+Library!8m2!3d23.7237462!4d92.7080498!16s%2Fg%2F11c2j7tsnp!3m5!1s0x374d94a4cb819f43:0xc41db39f478fa80!8m2!3d23.7237462!4d92.7080498!16s%2Fg%2F11c2j7tsnp" target="_blank">
                <div className="d-flex justify-content-center align-items-center pt-60">
                  <Col md="1">
                    <GrLocation style={{ fontSize: "30px" }} />
                  </Col>
                  <Col md="11" className="ps-md-3">
                    <Row className="font_size_16 font_regular color_light_black">ADDRESS</Row>
                    <Row className="font_size_14 font_regular color_light_black mt-1">
                      Mizoram State Library, MINECO, Khatla, Aizawl, Mizoram – 796001
                    </Row>
                  </Col>
                </div>
              </a>
              <div className="d-flex justify-content-center align-items-center pt-15">
                <Col md="1">
                  {" "}
                  <FiPhone style={{ fontSize: "30px" }} />
                </Col>
                <Col md="11" className="ps-md-3">
                  <Row className="font_size_16 font_regular color_light_black">PHONE NUMBER</Row>
                  <Row className="font_size_14 font_regular color_light_black mt-1">
                    0389-2335695
                  </Row>
                </Col>
              </div>
              <div className="d-flex justify-content-center align-items-center pt-15">
                <Col md="1">
                  <FiMail style={{ fontSize: "30px" }} />
                </Col>
                <Col md="11" className="ps-md-3">
                  <Row className="font_size_16 font_regular color_light_black">EMAIL ADDRESS</Row>
                  <Row className="font_size_14 font_regular color_light_black mt-1">
                    mizoramstatelibrary@gmail.com
                  </Row>
                </Col>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Contact;
