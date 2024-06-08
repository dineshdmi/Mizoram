import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FiPhone, FiMail } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import likeRed from "../../media/likeRed.png";
import img1 from "../../media/img/1.png";
import Checkbox from "@material-ui/core/Checkbox";
const CheckOut = () => {
  const [checked, setChecked] = useState(true);
  const [toggle, setToggle] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  console.log(toggle);
  return (
    <div className="bg-light-grey pt-25 pb-30 ">
      <div className="container bg-white  ">
        <div className="box_shadow rounded">
          <Row className="p-4 border-bottom">
            <Col className="font_size_26 font_bold color_gray ">Checkout</Col>
          </Row>
          <div className="px-4">
            <Row className="pt-25 ">
              <Col className="   border_top bg_light_blue">
                <div className="pt-15 pl-15 text7 pb-18">
                  Have a Coupon ?{" "}
                  <span
                    className="pointer"
                    style={{ color: "#00BDE2" }}
                    onClick={() => setToggle(!toggle)}
                  >
                    Click here to enter the code
                  </span>
                </div>
              </Col>
            </Row>
            <Row className="pt-15">
              {toggle && (
                <Col className=" res_col border border-2 rounded d-flex">
                  <Col md="2" className=" d-flex MR2 ">
                    <div className="mt-2 mb-2">
                      <div className="light_grey border-bottom pt-15 _pb-10">
                        <input
                          type="text"
                          className="border-none inputField "
                          placeholder="Coupon Code"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="3" className=" d-flex">
                    <div className="mt-2 mb-2">
                      <div className=" rounded text-white pl-70 pr-70 font_bold pt-15 pb-15 linear_gradient">
                        Apply Code
                      </div>
                    </div>
                  </Col>
                </Col>
              )}
            </Row>
            <Row className="pt-40">
              <Col md="4" className=" border border-1 rounded flex_column">
                <Row className=" d-flex flex-column align_items-center ">
                  <Col className="pt-15 d-flex ">
                    {" "}
                    <div className="just_Center d-flex">
                      <img
                        src={img1}
                        alt="logo"
                        className="rounded"
                        width="150px"
                        height="200px"
                      />
                    </div>
                  </Col>
                  <Col className="ml-3 mt-2 py-4 h-100">
                    <div className="">
                      <div className="">
                        <div className="font_size_18 font_bold color_black">
                          Reading On The Worlds
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="pt-30 border_bottom_ pb-30">
                  <Col className="flex_column_res2">
                    <div className="d-flex align-items-center">
                      {" "}
                      <Checkbox
                        // defaultChecked
                        color="primary"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                        className="pl_0"
                      />
                      <div className="text9">Read Online</div>
                    </div>
                    {/* <div className="d-flex align-items-center">
                      {" "}
                      <Checkbox
                        // defaultChecked
                        color="primary"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                        className="pl_0"
                      />
                      <div className="text9">Download PDF</div>
                    </div> */}
                    <div className="d-flex align-items-center mt-3">
                      {" "}
                      <Checkbox
                        defaultChecked
                        color="primary"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                        className="pl_0"
                      />
                      <div className="text10">Physical Book</div>
                    </div>
                  </Col>
                </Row>
                <Row className="pt-25 mb-2">
                  <div className="d-flex justify-content-between">
                    <div className="text8">Total</div>
                    <div className="text8">$35</div>
                  </div>
                </Row>
              </Col>
              <Col md="8" className="res_top">
                <div className="pl-15">
                  <div className=" font_size_22 font_bold color_black px-2">
                    Billing Details
                  </div>
                  <div className="mb-3 d-flex pt-30">
                    <div className="col-md-12 px-2 w-100">
                      <label
                        for="exampleFormControlInput1"
                        className="  font-weight-normal"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className=" loginInput login_Border form-control w-100"
                        id="exampleFormControlInput1"
                        placeholder="Enter Full Name"
                      />
                    </div>
                  </div>
                  <div className="mb-3 f_col d-flex pt-30">
                    <div className="col-md-8 col-sm-12 px-2">
                      <label
                        for="exampleFormControlInput1"
                        className="  font-weight-normal"
                      >
                        Adress
                      </label>
                      <input
                        type="text"
                        className=" loginInput login_Border form-control w-100"
                        id="exampleFormControlInput1"
                        placeholder="Enter Your Adress"
                      />
                    </div>
                    <div className="col-md-4 res_top px-2">
                      <label
                        for="exampleFormControlInput1"
                        className="  font-weight-normal"
                      >
                        Pincode
                      </label>
                      <input
                        type="text"
                        className=" loginInput login_Border form-control w-100"
                        id="exampleFormControlInput1"
                        placeholder="Enter Pincode"
                      />
                    </div>
                  </div>
                  <div className="mb-3 f_col d-flex pt-30">
                    <div className="col-md-4 px-2">
                      <label
                        for="exampleFormControlInput1"
                        className="  font-weight-normal"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        className=" loginInput login_Border form-control w-100"
                        id="exampleFormControlInput1"
                        placeholder="Enter City"
                      />
                    </div>
                    <div className="col-md-4 px-2 res_top">
                      <label
                        for="exampleFormControlInput1"
                        className="  font-weight-normal"
                      >
                        State
                      </label>
                      <input
                        type="email"
                        className=" loginInput login_Border form-control w-100"
                        id="exampleFormControlInput1"
                        placeholder="Enter State"
                      />
                    </div>
                    <div className="col-md-4 px-2 res_top">
                      <label
                        for="exampleFormControlInput1"
                        className="  font-weight-normal"
                      >
                        Country
                      </label>
                      <input
                        type="email"
                        className=" loginInput login_Border form-control w-100"
                        id="exampleFormControlInput1"
                        placeholder="Enter Country"
                      />
                    </div>
                  </div>
                  <div className="mb-3 f_col d-flex pt-30">
                    <div className="col-md-6 px-2">
                      <label
                        for="exampleFormControlInput1"
                        className="  font-weight-normal"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        className=" loginInput login_Border form-control w-100"
                        id="exampleFormControlInput1"
                        placeholder="Enter Email Address"
                      />
                    </div>
                    <div className="col-md-6 px-2 res_top">
                      <label
                        for="exampleFormControlInput1"
                        className="  font-weight-normal"
                      >
                        Phone Number
                      </label>
                      <input
                        type="number"
                        className=" loginInput login_Border form-control w-100"
                        id="exampleFormControlInput1"
                        placeholder="Enter Phone Number"
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <div className="d-flex justify-content-center pt-85">
                  <div className="mb-4">
                    <div className="pl-70 pr-70 rounded text-white font_bold pt-15 pb-15 linear_gradient">
                      Purchase Now
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckOut;
