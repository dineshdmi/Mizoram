import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";
import { toast, ToastContainer } from "react-toastify";
import { ApiPost, ApiPostNoAuth } from "../../helpers/API/ApiData";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@material-ui/core";
import { BsEye } from "react-icons/bs";
import OtpTimer from "otp-timer";
import * as userUtil from "../../utils/user.util";
import * as authUtil from "../../utils/auth.util";
import SabpaisaPaymentGateway from "./SabpaisaPaymentGateway";
import moment from "moment";
const Login = (props) => {
  const history = useHistory();
  const { state } = useLocation();
  const [flag, setFlag] = useState("create");
  const [otp, setOtp] = useState();
  const [otp1, setOtp1] = useState();
  const [logindata, setlogindata] = useState({});
  const [countrylist, setcountrylist] = useState([]);
  const [resetpassword, setResetPassword] = useState("");
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [button, setbutton] = useState(false);
  const [loadings, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const queryParameters = new URLSearchParams(window.location.search);
  const payername = queryParameters.get("payerName");
  const payeremail = queryParameters.get("payerEmail");
  const payermobile = queryParameters.get("payerMobile");
  const clientTxnId = queryParameters.get("clientTxnId");
  const amount = queryParameters.get("paidAmount");
  const paymentMode = queryParameters.get("paymentMode");
  const bankName = queryParameters.get("bankName");
  const status = queryParameters.get("status");
  const sabpaisaTxnId = queryParameters.get("sabpaisaTxnId");
  const bankTxnId = queryParameters.get("bankTxnId");
  const transDate = queryParameters.get("transDate");
  const dateObject = moment().format("YYYY-MM-DD");

  // Set hours, minutes, and seconds to zero
  // dateObject.set({ hour: 0, minute: 0, second: 0 });

  // const isoDate = dateObject.toISOString();
  // console.log("isoDate", isoDate);
  console.log("dateObject", dateObject);
  console.log("queryParameters", queryParameters);
  console.log("payername", payername);
  console.log("payeremail", payeremail);
  console.log("payermobile", payermobile);
  console.log("clientTxnId", clientTxnId);
  console.log("amount", amount);
  console.log("paymentMode", paymentMode);
  console.log("bankName", bankName);
  console.log("status", status);
  console.log("sabpaisaTxnId", sabpaisaTxnId);
  console.log("bankTxnId", bankTxnId);
  console.log("transDate", transDate);
  const token = JSON.parse(sessionStorage.getItem("userUtil"));
  console.log("token", token?.name);

  useEffect(() => {
    if (payername?.length > 0) {
      handelepayment();
    }
  }, [payername]);
  const handelepayment = async (i) => {
    const body = {
      name: payername,
      email: payeremail,
      mobile: payermobile,
      clientTxnId: clientTxnId,
      amount: amount,
      paymentMode: paymentMode,
      bankName: bankName,
      status: status,
      sabpaisaTxnId: sabpaisaTxnId,
      bankTxnId: bankTxnId,
      transDate: dateObject,
      userId: token?.id,
    };

    await ApiPost("/payment", body)
      .then((res) => {
        const userUtil1 = localStorage.getItem("userUtil");
        const authUtil1 = localStorage.getItem("authUtil");
        userUtil.setUserInfo(JSON.parse(userUtil1));
        authUtil.setToken(JSON.parse(authUtil1));
        history.push("/");
        console.log("res", res?.request?.response);
      })
      .catch((err) => {
        if (err.status == 410) {
          // refreshtoken();
        } else {
          toast.error(err.message);
        }
      });
  };
  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const click = (v) => {
    setFlag(v);
  };
  const otpInput = {
    width: "100%",
    padding: "20px 0",
    borderRadius: "5px",
    border: "none",
    margin: "0 5px",
  };
  const handleOtp = (e) => {
    setOtp(e);
  };

  const submit = () => {
    var body = {
      email: logindata.email,
    };
    console.log(body);

    ApiPostNoAuth("student/forgot_password", body)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        disableLoading();
        setbutton(false);
        setFlag("submit");
      })
      .catch((err) => {
        console.log(err);
        disableLoading();
        if (err?.status == 400) {
          toast.error(err?.message);
          // history.push("/postlist");
        } else {
          toast.error("Something Went Wrong");
        }
      });
  };

  const emailVarification = () => {
    if (state?.state === "loginNotVerifyOtp") {
      let body2 = {
        email: logindata?.email || JSON.parse(localStorage.getItem("email")),
        otp: otp,
        phone_otp: otp1,
      };

      ApiPostNoAuth("student/re_active_otp_verification", body2)
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          console.log("res.data.data :>> ", res.data.data);
          setResetPassword(res.data.data);
          if (state?.state === "signupVerifyOtp") {
            const userUtil1 = localStorage.getItem("userUtil");
            const authUtil1 = localStorage.getItem("authUtil");
            userUtil.setUserInfo(JSON.parse(userUtil1));
            authUtil.setToken(JSON.parse(authUtil1));
            history.push("/");
          } else if (state?.state === "loginNotVerifyOtp") {
            history.push("/signIn");
          } else {
            setFlag("reset");
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      let body2 = {
        email: logindata?.email || JSON.parse(localStorage.getItem("email")),
        otp: otp,
        phone_otp: otp1,
      };

      ApiPostNoAuth("student/otp_verification", body2)
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          setResetPassword(res.data.data);
          if (state?.state === "signupVerifyOtp") {
            const userUtil1 = localStorage.getItem("userUtil");
            const authUtil1 = localStorage.getItem("authUtil");
            userUtil.setUserInfo(JSON.parse(userUtil1));
            authUtil.setToken(JSON.parse(authUtil1));
            setIsOpen(true);

            // history.push("/");
          } else if (state?.state === "loginNotVerifyOtp") {
            history.push("/signIn");
          } else {
            setFlag("reset");
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };
  const handleonChange = (e) => {
    console.log(e.target);
    let { name, value } = e.target;

    setlogindata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const verifypassword = () => {
    if (logindata.password === logindata.confirmpassword) {
      var body = {
        password: logindata.password,
        id: resetpassword._id,
        authToken: otp,
      };
      console.log(body);

      ApiPostNoAuth("student/reset_password", body)
        .then((res) => {
          console.log(res);
          // toast.success(res.data.message);
          toast.success("Password has been reset successfully");
          setTimeout(() => {
            history.push("/signIn");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          if (err?.status == 410) {
            toast.error("Something Went Wrong");
            // history.push("/postlist");
          } else if (err?.status == 400) {
            toast.error(err?.message);
          } else {
            toast.error("Something Went Wrong");
          }
        });
    } else {
      toast.error("Password and conform password not match");
    }
  };

  const reSend = () => {
    let body = {
      email: logindata.email || JSON.parse(localStorage.getItem("email")),
    };
    console.log("reSend", body);
    ApiPostNoAuth("student/resend_otp", body)
      .then((res) => {
        console.log(res);
        // setResedOtp(!resendOtp);
        // setFlag("signIn");
      })
      .catch((err) => {
        console.log("err.message", err.message);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    console.log(props);
    if (props.location.state) {
      console.log(props.location.state);
      if (props.location.state == "in") {
        setFlag("signIn");
      } else if (props.location.state == "up") {
        setFlag("createAccount");
      }
      // fetchData(props.location.state);
    }
  }, [props]);
  useEffect(() => {
    let body = {};
    ApiPostNoAuth("student/get_country_state_city", body)
      .then((res) => {
        console.log(res);
        setcountrylist(res.data.data);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
    if (
      state?.state === "signupVerifyOtp" ||
      state?.state === "loginNotVerifyOtp"
    ) {
      setFlag("submit");
    }
    if (state?.state === "loginNotVerifyOtp") {
      setFlag("submit");
      toast.info(
        "Phone number verification is pending. We will send you OTP code right now. Lets verify and continue using platform."
      );
    }
  }, []);
  return (
    <div className="pt-50 pb-50 d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="col-md-7 col-sm-12 rounded linear_gradient p-5">
          <ToastContainer position="top-right" />
          {/* {flag === "signIn" ? ( */}
          {flag === "create" ? (
            <div className="">
              <div className="pb-3">
                <div className="textWhitefz26Bold">Forget password</div>
              </div>
              <div className="mb-3">
                <label
                  for="exampleFormControlInput1"
                  className=" textWhitefz18Light font-weight-normal"
                >
                  Email / Phone Number
                </label>
                <input
                  type="text"
                  name="email"
                  value={logindata.email}
                  onChange={handleonChange}
                  className="form-control loginInput login_Border"
                  id="exampleFormControlInput1"
                  placeholder="Enter your email/phone"
                />
              </div>
              <div className="d-flex pr-2 justify-content-center">
                <div className="col-md-3 pl-0 mr-2">
                  <button
                    className="signBtn rounded justify-content-center w-100 d-flex"
                    onClick={() => {
                      setbutton(true);
                      enableLoading();
                      submit();
                    }}
                  >
                    {" "}
                    {loadings ? (
                      <CircularProgress className="circle" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {flag === "submit" ? (
            <div className="">
              <div className="pb-3">
                <div className="textWhitefz26Bold">Verification</div>
                <div className="textWhitefz18">
                  Enter the code sent to your email/phone number
                </div>
              </div>
              {state?.state === "signupVerifyOtp" ? (
                <>
                  <div className="col-md-12 px-2">
                    <label
                      for="exampleFormControlInput1"
                      className=" textWhitefz18Light font-weight-normal"
                    >
                      Enter Email OTP
                    </label>
                    <OtpInput
                      value={otp}
                      inputStyle={otpInput}
                      onChange={(e) => setOtp(e)}
                      numInputs={6}
                      separator={<span> </span>}
                    />
                    <div className="float-end m-1 otpTimer">
                      <OtpTimer
                        textColor={"#ffff"}
                        buttonColor={"#64dbf2"}
                        background={"#ffff"}
                        borderRadius={5}
                        text="Resend OTP in "
                        seconds={30}
                        minutes={0}
                        className="otpTimer"
                        resend={reSend}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 px-2 mt-3">
                    <label
                      for="exampleFormControlInput1"
                      className=" textWhitefz18Light font-weight-normal"
                    >
                      Enter Phone OTP
                    </label>
                    <div className="mainDivOtp">
                      <OtpInput
                        value={otp1}
                        inputStyle={otpInput}
                        onChange={(e) => setOtp1(e)}
                        numInputs={6}
                        separator={<span> </span>}
                        className="w-100"
                      />
                    </div>
                    <div className="float-end m-1 otpTimer">
                      <OtpTimer
                        textColor={"#ffff"}
                        buttonColor={"#64dbf2"}
                        background={"#ffff"}
                        borderRadius={5}
                        text="Resend OTP in "
                        seconds={30}
                        minutes={0}
                        className="otpTimer"
                        resend={reSend}
                      />
                    </div>
                  </div>
                </>
              ) : state?.state === "loginNotVerifyOtp" ? (
                <>
                  <div className="col-md-12 px-2">
                    <label
                      for="exampleFormControlInput1"
                      className=" textWhitefz18Light font-weight-normal"
                    >
                      Enter Email OTP
                    </label>
                    <OtpInput
                      value={otp}
                      inputStyle={otpInput}
                      onChange={(e) => setOtp(e)}
                      numInputs={6}
                      separator={<span> </span>}
                    />
                    <div className="float-end m-1 otpTimer">
                      <OtpTimer
                        textColor={"#ffff"}
                        buttonColor={"#64dbf2"}
                        background={"#ffff"}
                        borderRadius={5}
                        text="Resend OTP in "
                        seconds={30}
                        minutes={0}
                        className="otpTimer"
                        resend={reSend}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 px-2 mt-3">
                    <label
                      for="exampleFormControlInput1"
                      className=" textWhitefz18Light font-weight-normal"
                    >
                      Enter Phone OTP
                    </label>
                    <div className="mainDivOtp">
                      <OtpInput
                        value={otp1}
                        inputStyle={otpInput}
                        onChange={(e) => setOtp1(e)}
                        numInputs={6}
                        separator={<span> </span>}
                        className="w-100"
                      />
                    </div>
                    <div className="float-end m-1 otpTimer">
                      <OtpTimer
                        textColor={"#ffff"}
                        buttonColor={"#64dbf2"}
                        background={"#ffff"}
                        borderRadius={5}
                        text="Resend OTP in "
                        seconds={30}
                        minutes={0}
                        className="otpTimer"
                        resend={reSend}
                      />
                    </div>
                  </div>
                </>
              ) : isNaN(logindata.email) ? (
                <>
                  <div className="col-md-12 px-2">
                    <label
                      for="exampleFormControlInput1"
                      className=" textWhitefz18Light font-weight-normal"
                    >
                      Enter Email OTP
                    </label>
                    <OtpInput
                      value={otp}
                      inputStyle={otpInput}
                      onChange={(e) => setOtp(e)}
                      numInputs={6}
                      separator={<span> </span>}
                    />
                    <div className="float-end m-1 otpTimer">
                      <OtpTimer
                        textColor={"#ffff"}
                        buttonColor={"#64dbf2"}
                        background={"#ffff"}
                        borderRadius={5}
                        text="Resend OTP in "
                        seconds={30}
                        minutes={0}
                        className="otpTimer"
                        resend={reSend}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-12 px-2 mt-3">
                    <label
                      for="exampleFormControlInput1"
                      className=" textWhitefz18Light font-weight-normal"
                    >
                      Enter Phone OTP
                    </label>
                    <div className="mainDivOtp">
                      <OtpInput
                        value={otp1}
                        inputStyle={otpInput}
                        onChange={(e) => setOtp1(e)}
                        numInputs={6}
                        separator={<span> </span>}
                        className="w-100"
                      />
                    </div>
                    <div className="float-end m-1 otpTimer">
                      <OtpTimer
                        textColor={"#ffff"}
                        buttonColor={"#64dbf2"}
                        background={"#ffff"}
                        borderRadius={5}
                        text="Resend OTP in "
                        seconds={30}
                        minutes={0}
                        className="otpTimer"
                        resend={reSend}
                      />
                    </div>
                  </div>
                </>
              )}
              <div className={`d-flex w-100 pr-2 justify-content-center`}>
                <div className="col-md-4 px-2">
                  <button
                    className="signBtn w-100 rounded"
                    onClick={emailVarification}
                  >
                    Verify
                  </button>
                </div>
                <div className="col-md-4 px-2">
                  <button
                    className="cancelBtn rounded"
                    onClick={() => setFlag("create")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {flag === "reset" ? (
            <div className="">
              <div className="pb-3">
                <div className="textWhitefz26Bold">Reset your Password</div>
              </div>
              <div className="mb-3">
                <label
                  for="exampleFormControlInput1"
                  className=" textWhitefz18Light font-weight-normal"
                >
                  Enter your new password
                </label>
                <div className="d-flex form-control align-items-center login_Border">
                  <input
                    type={hide2 ? "text" : "password"}
                    name="password"
                    value={logindata.password}
                    onChange={(e) => handleonChange(e)}
                    className="form-control border_none"
                    id="exampleFormControlInput1"
                    placeholder="Enter your new password"
                  />
                  <BsEye onClick={() => setHide2(!hide2)} color="#64dbf2" />
                </div>
              </div>
              <div className="mb-3">
                <label
                  for="exampleFormControlInput1"
                  className=" textWhitefz18Light font-weight-normal"
                >
                  Confirm your new password
                </label>
                <div className="d-flex form-control align-items-center login_Border">
                  <input
                    type={hide ? "text" : "password"}
                    name="confirmpassword"
                    value={logindata.confirmpassword}
                    onChange={(e) => handleonChange(e)}
                    className="form-control border_none"
                    id="exampleFormControlInput1"
                    placeholder="Enter your confirm password"
                  />
                  <BsEye onClick={() => setHide(!hide)} color="#64dbf2" />
                </div>
              </div>
              <div className="d-flex pr-2 justify-content-center">
                <div className="col-md-3 pl-0 mr-2">
                  <button
                    className="signBtn w-100 rounded"
                    onClick={() => verifypassword()}
                  >
                    {" "}
                    Reset
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* ) : (
            ""
          )}
          {flag === "forgot" ? ( */}
          {/* <div className="">
              <div className="pb-3">
                <div className="textWhitefz26Bold">Forgot Password</div>
                <div className="textWhitefz18">
                  Enter your email to reset your password
                </div>
              </div>
              <div className="mb-5 d-flex">
                <div className="col-md-12 px-2">
                  <label
                    for="exampleFormControlInput1"
                    className=" textWhitefz18Light font-weight-normal"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className=" loginInput login_Border rounded w-100"
                    id="exampleFormControlInput1"
                    placeholder="Enter Address"
                  />
                </div>
              </div>
              <div className="d-flex pr-2">
                <div className="col-md-4 px-2">
                  <button
                    className="signBtn rounded"
                    onClick={() => click("submit")}
                  >
                    Submit
                  </button>
                </div>
                <div className="col-md-4 px-2">
                  <button
                    className="cancelBtn rounded"
                    onClick={() => click("signIn")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div> */}
          {/* ) : (
            ""
          )}
          {flag === "createAccount" ? ( */}

          {/* ) : (
            ""
          )} */}
          <SabpaisaPaymentGateway
            payerName={token?.name}
            payerEmail={token?.email}
            payerMobile={token?.phoneNumber}
            isOpen={isOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
