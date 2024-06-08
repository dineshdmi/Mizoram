import { data } from "jquery";
import React, { useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ApiPost, ApiPostNoAuth } from "../../helpers/API/ApiData";
import * as userUtil from "../../utils/user.util";
import * as authUtil from "../../utils/auth.util";
import { toast, ToastContainer } from "react-toastify";
const Change_Password = () => {
  const history = useHistory();
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const [button, setbutton] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = () => {
    if (data.new_password === data.conform_password) {
      setbutton(true)
      let body = {
        old_password: data.old_password,
        new_password: data.new_password,
      };
      console.log(body);
      ApiPost("/change_password", body)
        .then((res) => {
          console.log(res);
          setModal(!modal);
          setbutton(false)
          //   history.push("/home");
          //   setcitylist(res.data.data);

          // setCategory(res.data.data);
        })
        .catch((err) => {
          console.log(err);
          setbutton(false)
          //   setError(err.message);
          if (err.status == 410) {
            // history.push("/postlist");
          } else {
            toast.error(err.message);
          }
        });
    } else {
      setError("Passwords Do not Match");
    }
  };
  const contiNue = () => {
    const info = JSON.parse(localStorage.getItem("userinfo"));
    // console.log(email);
    var body = {
      email: info.email,
      password: data.new_password,
    };
    ApiPostNoAuth("student/common_login", body)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        userUtil.setUserInfo(res.data.data);
        authUtil.setToken(res.data.data.token);
        setModal(!modal);
        history.push("/home");
        console.log("jjjj");
        // window.location.reload();
        // setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 410) {
          // history.push("/postlist");
        } else {
          toast.error(err.message);
        }
      });
  };
  const logOut = () => {
    localStorage.clear();
    history.push("/signIn");
  };
  return (
    <>
      <div className="rounded box_shadow">
        <ToastContainer position="top-right" />
        <div className="bg-light-grey">
          <div className="  ">
            <Row>
              <Col className="font_size_26 font_bold color_gray px-4 py-3 border-bottom">
                Change Password
              </Col>
            </Row>
            <div className=" emp-profile">
              <div className="row pb-30">
                <Row className="">
                  <div className="d-flex flex-column align-items-center p-4">
                    <div className="mb-3 col-md-6 d-flex">
                      <div className="col-md-12 px-2">
                        <label
                          for="exampleFormControlInput1"
                          className=" font_size_16 font_bold color_gray mb-1 font-weight-normal"
                        >
                          Current Password
                        </label>
                        <input
                          type="password"
                          name="old_password"
                          value={data.old_password}
                          onChange={handleChange}
                          // className=" loginInput login_Border rounded w-100"
                          className="form-control loginInput login_Border w-100"
                          id="exampleFormControlInput1"
                          placeholder="Enter Current Password"
                        />
                      </div>
                    </div>
                    <div className="mb-3 col-md-6 d-flex">
                      <div className="col-md-12 px-2">
                        <label
                          for="exampleFormControlInput1"
                          className=" font_size_16 font_bold color_gray mb-1 font-weight-normal"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          name="new_password"
                          value={data.new_password}
                          onChange={handleChange}
                          // className=" loginInput login_Border rounded w-100"
                          className="form-control loginInput login_Border w-100"
                          id="exampleFormControlInput1"
                          placeholder="Enter New Password"
                        />
                      </div>
                    </div>
                    <div className="mb-3 col-md-6 d-flex">
                      <div className="col-md-12 px-2">
                        <label
                          for="exampleFormControlInput1"
                          className=" font_size_16 font_bold color_gray mb-1 font-weight-normal"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          name="conform_password"
                          value={data.conform_password}
                          onChange={handleChange}
                          // className=" loginInput login_Border rounded w-100"
                          className="form-control loginInput login_Border w-100"
                          id="exampleFormControlInput1"
                          placeholder="Enter Confirm Password"
                        />
                        <label htmlFor="">{error}</label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 pt-60 d-flex justify-content-center text-center">
                    <Col md="2" className=" px-2">
                      <button
                        className="viewAllBtn rounded border-none px-3 py-2"
                        onClick={() =>
                          setData((post) => ({
                            ...post,
                            ["old_password"]: "",
                            ["new_password"]: "",
                            ["conform_password"]: "",
                          }))
                        }
                      >
                        Reset
                      </button>
                    </Col>
                    <Col md="2" className=" px-2">
                      <button
                        className="w-100 linear_gradient text-white rounded border-none px-3 py-2"
                        onClick={submit}
                        disabled={button}
                      >
                        {button ? (
                          <div
                            className="spinner-border text-light"
                            role="status"
                          >
                            {/* <span className="sr-only">Loading...</span> */}
                          </div>
                        ) : "Save"}
                      </button>
                    </Col>
                  </div>
                </Row>
              </div>
            </div>
          </div>
        </div>
        <Modal
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
              Password Changed
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
        </Modal>
      </div>
    </>
  );
};
export default Change_Password;
