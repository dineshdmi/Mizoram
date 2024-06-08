import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useHistory } from "react-router";
import { ApiPostNoAuth } from "../../helpers/API/ApiData";
import { toast, ToastContainer } from "react-toastify";
import Countdown from "react-countdown";
import OtpTimer from "otp-timer";
import { CircularProgress } from "@material-ui/core";

const OtpScreen = ({
  setOPTscreen,
  setFlag,
  signupData,
  phoneOtp,
  setPhoneOtp,
}) => {
  const history = useHistory();
  const [otp, setOtp] = useState();
  const [otp2, setOtp2] = useState();
  const [loadings, setLoading] = useState(false);
  const [button, setbutton] = useState(false);
  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
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

  const emailVarification = (e) => {
    e.preventDefault();

    if (otp) {
      setLoading(true);
      // enableLoading();
      let body2 = {
        email: signupData?.email,
        otp: otp,
      };

      ApiPostNoAuth("student/otp_verification", body2)
        .then((res) => {
          setPhoneOtp(!phoneOtp);
          disableLoading();
          setbutton(false);
          // setFlag("signIn");
        })
        .catch((err) => {
          disableLoading();

          toast.error(err.message);

          setbutton(true);
        });
    } else {
      setLoading(false);
      toast.error("OTP is required");
      disableLoading();
      // setLoading(false);
      // setbutton(true);
    }
  };
  const emailVarification2 = (e) => {
    e.preventDefault();
    if (otp2) {
      setLoading(true);
      // enableLoading();
      let body = {
        email: signupData?.email,
        // phoneNumber: signupData?.phoneNumber,
        phone_otp: otp2,
      };

      ApiPostNoAuth("student/otp_verification", body)
        .then((res) => {
          setOPTscreen(false);
          history.push("/signIn");
          setLoading(false);
          // disableLoading();
          // setbutton(false);
          // setFlag("signIn");
        })
        .catch((err) => {
          toast.error(err.message);
          setLoading(false);
          // disableLoading();
          // setbutton(true);
        });
    } else {
      toast.error("OTP is required");
      // disableLoading();
      setLoading(false);
      // setbutton(true);
    }
  };

  const reSend = () => {
    let body = {
      email: signupData.email,
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
      phoneNumber: signupData.phoneNumber,
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
  return !phoneOtp ? (
    <form className="" onSubmit={emailVarification}>
      <div className="pb-3">
        <div className="textWhitefz26Bold">Verification</div>
        <div className="textWhitefz18">Enter the code sent to your email</div>
      </div>
      <div className="mb-4 d-flex">
        <div className="col-md-12 px-2">
          <label
            for="exampleFormControlInput1"
            className=" textWhitefz18Light font-weight-normal"
          >
            Enter Code
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
              seconds={59}
              minutes={4}
              className="otpTimer"
              resend={reSend}
            />
          </div>
        </div>
      </div>
      <div className="d-flex pr-2 justify-content-center">
        <div className="col-md-4 px-2">
          <button
            type="button"
            className="cancelBtn rounded"
            onClick={() => history.push("/home")}
          >
            Cancel
          </button>
        </div>
        <div className="col-md-4 px-2">
          <button
            type="submit"
            className="signBtn w-100 rounded d-flex justify-content-center"
            // onClick={() => {
            //   emailVarification();
            //   // setbutton(true);
            // }}
            // disabled={button}
          >
            {loadings ? <CircularProgress className="circle" /> : "Submit"}{" "}
          </button>
        </div>
      </div>
    </form>
  ) : (
    <form className="" onSubmit={emailVarification2}>
      <div className="pb-3">
        <div className="textWhitefz26Bold">Verification</div>
        <div className="textWhitefz18">
          Enter the code sent to your Phone Number
        </div>
      </div>
      <div className="mb-4 d-flex">
        <div className="col-md-12 px-2">
          <label
            for="exampleFormControlInput1"
            className=" textWhitefz18Light font-weight-normal"
          >
            Enter Code
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
              seconds={59}
              minutes={4}
              className="otpTimer"
              resend={reSend2}
            />
          </div>
        </div>
      </div>
      <div className="d-flex pr-2 justify-content-center">
        <div className="col-md-4 px-2">
          <button
            type="button"
            className="cancelBtn rounded"
            onClick={() => history.push("/home")}
          >
            Cancel
          </button>
        </div>
        <div className="col-md-4 px-2">
          <button
            type="submit"
            className="signBtn w-100 rounded d-flex justify-content-center"
            // onClick={() => {
            //   emailVarification2();
            //   // setbutton(true);
            // }}
          >
            {loadings ? <CircularProgress className="circle" /> : "Submit"}{" "}
          </button>
        </div>
      </div>
    </form>
  );
};

export default OtpScreen;
