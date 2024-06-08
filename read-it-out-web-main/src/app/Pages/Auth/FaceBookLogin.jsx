import React, { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";
import { TiSocialFacebookCircular } from "react-icons/ti";
import * as userUtil from "../../utils/user.util";
import * as authUtil from "../../utils/auth.util";
import { Modal } from "react-bootstrap";
import { ApiDelete, ApiPost, ApiPostNoAuth } from "../../helpers/API/ApiData";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router";
import CountryCode from "../../helpers/CounrtyCode.json";
import OtpInput from "react-otp-input";
import OtpTimer from "otp-timer";

const FaceBookLogin = (props) => {
  const history = useHistory();
  const [signupData, setsignupData] = useState({});
  const [otp, setOtp] = useState();
  const [otp2, setOtp2] = useState();
  const [userData, setUserData] = useState("");
  const [fbMail, setfbMail] = useState();
  const [fbEMail, setfbEMail] = useState();
  const [fbModalEmail, setFBModalEmail] = useState(false);
  const [fbModalPhone, setFBModalPhone] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [otpModal2, setOtpModal2] = useState(false);
  const [CountryValue, setCountryValue] = useState([]);
  const [errors, setError] = useState({});

  // var CountryValue = CountryCode.Data;

  const handleonChangeSignup = (e) => {
    let { name, value } = e.target;

    setsignupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOtp = (e) => {
    setOtp(e);
  };
  const handleOtp2 = (e) => {
    setOtp2(e);
  };
  const otpInput = {
    width: "100%",
    padding: "20px 0",
    borderRadius: "5px",
    border: "none",
    margin: "0 5px",
  };
  const callorder = (property, order) => {
    var sort_order = 1;
    if (order === "desc") {
      sort_order = -1;
    }
    return function (a, b) {
      // a should come before b in the sorted order
      if (parseInt(a[property]) < parseInt(b[property])) {
        return -1 * sort_order;
        // a should come after b in the sorted order
      } else if (parseInt(a[property]) > parseInt(b[property])) {
        return 1 * sort_order;
        // a and b are the same
      } else {
        return 0 * sort_order;
      }
    };
  };
  useEffect(() => {
    setCountryValue(CountryCode.Data.sort(callorder("dial_code", "asc")));
  }, []);
  const emailVarification = () => {
    if (otp) {
      let body2 = {
        otp: otp,
      };
      ApiPostNoAuth("student/otp_verification", body2)
        .then((res) => {
          setOtpModal(!otpModal);
          setOtpModal2(!otpModal2);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      toast.error("OTP is required");
    }
  };
  const emailVarification2 = () => {
    if (otp2) {
      let body2 = {
        phone_otp: otp2,
      };
      ApiPostNoAuth("student/otp_verification", body2)
        .then((res) => {
          setOtpModal2(!otpModal2);
          userUtil.setUserInfo({
            ...JSON.parse(localStorage.getItem("userinfo")),
            ...res.data.data,
          });
          history.push("/");
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      toast.error("OTP is required");
    }
  };

  const componentClicked = (response) => {
    if (response.accessToken) {
      const body = {
        accessToken: response.accessToken,
      };
      ApiPostNoAuth("student/facebook", body)
        .then((res) => {
          // toast.success(res.data.message);

          userUtil.setUserInfo(res.data.data);
          userUtil.setUserImage(res.data.data.image);
          userUtil.setUserName(res.data.data.name);
          authUtil.setToken(res.data.data.token);
          setfbMail(res.data.data.isEmailVerified);
          setfbEMail(res.data?.data?.email);
          setUserData(res.data.data._id);
          if (res.data.data.isEmailVerified === false) {
            setFBModalEmail(!fbModalEmail);
          }
          if (
            res.data.data.isEmailVerified === true &&
            res.data.data.isPhoneVerified === false
          ) {
            setFBModalEmail(!fbModalEmail);
          }
          if (
            res.data.data.isEmailVerified === true &&
            res.data.data.isPhoneVerified === true
          ) {
            history.push("/");
            window.location.reload();
          }

          // window.location.reload();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  const validation = () => {
    let errors = {};
    let formIsValid = true;

    // if (signupData.email2) {
    if (!signupData.email2) {
      formIsValid = false;
      // toast.error("Please Enter Email");
      errors["email2"] = "*Please enter email address";
    }
    // }
    // if (!signupData.phoneCode) {
    //
    //   formIsValid = false;
    //   // toast.error("Please Enter Email");
    //   errors["phoneCode"] = "*Please Select Country";
    // }
    if (
      !signupData.phoneNumber2 ||
      signupData.phoneNumber2 == undefined ||
      signupData.phoneNumber2 == null
    ) {
      formIsValid = false;
      // toast.error("Please Enter Email");
      errors["phoneNumber2"] = "*Please enter your phone number";
    }

    setError(errors);
    return formIsValid;
  };

  const fbLogin = () => {
    if (validation()) {
      try {
        let body = {
          // email: "shailesh.semicolon@gmail.com",
          id: userData,
          phoneNumber: signupData.phoneNumber2,
          countryCode: signupData?.phoneCode
            ? parseInt(signupData?.phoneCode)
            : 233,
        };
        if (signupData.email2) {
          body.email = signupData.email2;
        }

        ApiPost("/verify", body)
          .then((res) => {
            // setcountrylist(res.data.data);
            setFBModalEmail(!fbModalEmail);
            if (fbMail === false) {
              setOtpModal(!otpModal);
            } else {
              setOtpModal2(!otpModal2);
            }

            // setCategory(res.data.data);
          })
          .catch((err) => {
            if (err.status == 410) {
              history.push("/postlist");
            } else {
              toast.error(err.message);
            }
          });
      } catch (err) {}
    }
  };

  const backButton = () => {
    ApiDelete("/deleteAccount")
      .then((res) => {
        toast.success(res.data.message);
        localStorage.clear();
        history.push("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const reSend = () => {
    let body = {
      email: signupData.email2,
    };

    ApiPostNoAuth("student/resend_otp", body)
      .then((res) => {
        // setResedOtp(!resendOtp);
        // setFlag("signIn");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const reSend2 = () => {
    let body = {
      phoneNumber: signupData.phoneNumber2,
    };

    ApiPostNoAuth("student/resend_otp", body)
      .then((res) => {
        // setResedOtp2(!resendOtp2);
        // setFlag("signIn");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <FacebookLogin
        appId="160846316257690"
        autoLoad={false}
        fields="name,email,picture"
        callback={componentClicked}
        cssClass="my-facebook-button-class w-100"
        icon={<TiSocialFacebookCircular fontSize={20} className="mx-2" />}
        textButton="Login"
        // callback={responseFacebook}
      />
      <Modal
        show={fbModalEmail}
        centered
        // onHide={() => setModal(!modal)}
        className="loginModal"
        // size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body className="linear_gradient modalSelect rounded">
          {fbMail === false && (
            <div className="mb-3">
              <div className="col-md-12 px-2">
                <label
                  for="exampleFormControlInput1"
                  className=" textWhitefz18Light font-weight-normal"
                >
                  Email
                </label>

                <input
                  type="email"
                  name="email2"
                  value={signupData.email2}
                  onChange={(e) => handleonChangeSignup(e)}
                  className=" loginInput login_Border rounded w-100"
                  id="exampleFormControlInput1"
                  placeholder="Enter email"
                />
                <div className="font_size_14 color_red">{errors["email2"]}</div>
              </div>
            </div>
          )}
          <div className="mb-3 ">
            <div className="col-md-12 px-2">
              <label
                for="exampleFormControlInput1"
                className=" textWhitefz18Light font-weight-normal"
              >
                Select country
              </label>

              <select
                type="select"
                className=" loginInput rounded w-100"
                onChange={handleonChangeSignup}
                value={signupData.phoneCode}
                name="phoneCode"
              >
                <option value="233" selected>
                  233
                </option>
                {/* <option value="">Select CountryCode</option> */}
                {CountryValue.map((record, i) => {
                  //
                  return (
                    <option key={i} value={record.dial_code}>
                      {record.dial_code}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <div className="col-md-12 px-2">
              <label
                for="exampleFormControlInput1"
                className=" textWhitefz18Light font-weight-normal"
              >
                Phone number
              </label>

              <input
                type="number"
                name="phoneNumber2"
                value={signupData.phoneNumber2}
                onChange={(e) => handleonChangeSignup(e)}
                className=" loginInput login_Border rounded w-100"
                id="exampleFormControlInput1"
                placeholder="Enter phone number"
              />

              <div className="font_size_14 color_red">
                {errors["phoneNumber2"]}
              </div>
              {/* <div className="errorC">{errors["number"]}</div> */}
            </div>
          </div>
          {/* <div className="mb-3 px-2">
            <button
              type="submit"
              className="signBtn w-100 rounded"
              onClick={() => fbLogin()}
            >
              {" "}
              Submit
            </button>
          </div> */}
          <div className="d-flex pr-2 justify-content-center">
            <div className="col-md-5 px-2">
              <button
                className="cancelBtn rounded"
                onClick={() => backButton()}
              >
                Cancel
              </button>
            </div>
            <div className="col-md-5 px-2">
              <button
                // type="submit"
                className="signBtn w-100 rounded"
                onClick={() => fbLogin()}
              >
                {" "}
                Submit
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={otpModal}
        centered
        // onHide={() => setModal(!modal)}
        className="loginModal"
        // size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body className="linear_gradient modalSelect rounded">
          <div className="">
            <div className="pb-3">
              <div className="textWhitefz26Bold">Verification</div>
              <div className="textWhitefz18">
                Enter the code sent to your email
              </div>
            </div>
            <div className="mb-5 d-flex">
              <div className="col-md-12 px-2">
                <label
                  for="exampleFormControlInput1"
                  className=" textWhitefz18Light font-weight-normal"
                >
                  Enter code
                </label>
                <OtpInput
                  value={otp}
                  inputStyle={otpInput}
                  onChange={handleOtp}
                  numInputs={6}
                  separator={<span> </span>}
                />
                <div className="float-end m-1 otpTimer">
                  <OtpTimer
                    textColor={"#ffff"}
                    borderRadius={5}
                    text="Resend OTP in "
                    seconds={30}
                    minutes={0}
                    className="otpTimer"
                    resend={reSend}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex pr-2 justify-content-center">
              <div className="col-md-4 px-2">
                <button
                  className="cancelBtn rounded"
                  onClick={() => backButton()}
                >
                  Cancel
                </button>
              </div>
              <div className="col-md-4 px-2">
                <button
                  className="signBtn w-100 rounded"
                  onClick={emailVarification}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={otpModal2}
        centered
        // onHide={() => setModal(!modal)}
        className="loginModal"
        // size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body className="linear_gradient modalSelect rounded">
          <div className="">
            <div className="pb-3">
              <div className="textWhitefz26Bold">Verification</div>
              <div className="textWhitefz18">
                Enter the code sent to your phone number
              </div>
            </div>
            <div className="mb-5 d-flex">
              <div className="col-md-12 px-2">
                <label
                  for="exampleFormControlInput1"
                  className=" textWhitefz18Light font-weight-normal"
                >
                  Enter code
                </label>
                <OtpInput
                  value={otp2}
                  inputStyle={otpInput}
                  onChange={handleOtp2}
                  numInputs={6}
                  separator={<span> </span>}
                />
                <div className="float-end m-1 otpTimer">
                  <OtpTimer
                    textColor={"#ffff"}
                    borderRadius={5}
                    text="Resend OTP in "
                    seconds={30}
                    minutes={0}
                    className="otpTimer"
                    resend={reSend2}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex pr-2 justify-content-center">
              <div className="col-md-4 px-2">
                <button
                  className="cancelBtn rounded"
                  onClick={() => backButton()}
                >
                  Cancel
                </button>
              </div>
              <div className="col-md-4 px-2">
                <button
                  className="signBtn w-100 rounded"
                  onClick={emailVarification2}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FaceBookLogin;
