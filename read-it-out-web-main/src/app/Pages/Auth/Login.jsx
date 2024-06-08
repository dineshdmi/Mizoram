import React, { useEffect, useState } from "react";
import sign from "../../media/sign.png";
import { useHistory } from "react-router-dom";
import google from "../../media/icons/google.png";
import fb from "../../media/icons/fb.png";

import { toast, ToastContainer } from "react-toastify";
import * as userUtil from "../../utils/user.util";
import * as authUtil from "../../utils/auth.util";
import GoogleLogin from "react-google-login";
import { TransverseLoading } from "react-loadingg";
import CountryCode from "../../helpers/CounrtyCode.json";
import OtpInput from "react-otp-input";
import OtpTimer from "otp-timer";
import { useDispatch } from "react-redux";
// import { ActionType } from "../../store/action/actionType";

import {
  ApiDelete,
  ApiGetNoAuth,
  ApiGet,
  ApiPostNoAuth,
  Bucket,
  ApiPost,
} from "../../helpers/API/ApiData";
import "react-toastify/dist/ReactToastify.css";
import OtpScreen from "./OtpScreen";
import { Modal } from "react-bootstrap";
import FaceBookLogin from "./FaceBookLogin";
import { CircularProgress } from "@material-ui/core";
import { BsEye } from "react-icons/bs";
import { loginUser } from "app/store/action/action";
import SabpaisaPaymentGateway from "./SabpaisaPaymentGateway";
import moment from "moment";
const Login = (props) => {
  const history = useHistory();
  const [flag, setFlag] = useState("signIn");
  const [otp, setOtp] = useState();
  const [otp2, setOtp2] = useState();
  const [otp3, setOtp3] = useState();
  const [OTPscreen, setOPTscreen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [otpModal2, setOtpModal2] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState(false);
  const [logindata, setlogindata] = useState({});
  const [signupData, setsignupData] = useState({});
  const [countrylist, setcountrylist] = useState([]);
  const [regionlist, setregionlist] = useState([]);
  const [citylist, setcitylist] = useState([]);
  const [userData, setUserData] = useState("");
  const [fetchUserData, setFetchUserData] = useState("");
  const [fbMail, setfbMail] = useState();
  const [errors, setError] = useState({});
  const [button, setbutton] = useState(false);
  const [loadings, setLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const [activateModal, setActivateModal] = useState(false);
  const [reActivateEmailSent, setReActivateEmailSent] = useState(false);
  const [username, setUsername] = useState("");
  const [useemail, setUserEmail] = useState("");
  const [usephone, setUserphone] = useState("");
  const [userid, setUserid] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [CountryValue, setCountryValue] = useState([]);
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
  console.log("userid", userid);
  const id = sessionStorage.getItem("id");
  console.log("id", id);
  const dispatch = useDispatch();
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
      userId: id,
    };
    console.log("body", body);
    await ApiPost("/payment", body)
      .then((res) => {
        if (res?.status === 200) {
          console.log("afterpayment");
          sessionStorage.removeItem("id");
          history.push("/");
        }

        console.log("res", res?.request?.response);
      })
      .catch((err) => {
        if (err.status === 410) {
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

  // var CountryValue = CountryCode.Data;

  const click = (v) => {
    setFlag(v);
  };
  const validateForm = () => {
    // let errors = {};
    let formIsValid = true;

    if (!logindata.email) {
      formIsValid = false;
      toast.error("Please Enter Email");
      return;
      // errors["name"] = "*Please Enter name";
    }
    if (!logindata.password) {
      formIsValid = false;
      toast.error("Please Enter Password");
      return;
      // errors["categoryId"] = "*Please Select category";
    }

    // setError(errors);
    return formIsValid;
  };
  const forgot = (e) => {
    history.push("forgotPassword");
  };
  const handleonChange = (e) => {
    let { name, value } = e.target;
    if (name === "email") {
      setlogindata((prevState) => ({
        ...prevState,
        [name]: value.toLowerCase(),
      }));
    } else {
      setlogindata((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const submit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      // enableLoading();
      try {
        var body = {
          email: logindata.email,
          password: logindata.password,
        };
        ApiPostNoAuth("student/common_login", body)
          .then(async (res) => {
            if (res?.data?.status === 205) {
              setActivateModal(true);
              return setLoading(false);
            }
            if (
              res.data.data.otpScreen === true ||
              res.data.data.otpScreen === null
            ) {
              setOPTscreen(true);
            } else if (
              res.data.data.phone_otpScreen === true ||
              res.data.data.phone_otpScreen === null
            ) {
              setOPTscreen(true);
              setPhoneOtp(true);
            } else {
              console.log("res", res);
              toast.success(res.data.message);
              userUtil.setUserInfo(res.data.data);
              userUtil.setUserImage(res.data.data.image);
              userUtil.setUserName(res.data.data.name);
              authUtil.setToken(res.data.data.token);

              // await getBook();
              dispatch(loginUser(res.data.data));
              history.push("/book");

              // window.location.reload();
            }
            setLoading(false);
            //
            // disableLoading();
            // window.location.reload();
            // setCategory(res.data.data);
          })
          .catch(async (err) => {
            // toast.error(err?.message);
            if (err?.status === 401) {
              sessionStorage.setItem("id", err?.data?._id);
              setLoading(false);
              setUserid(err?.data?._id);
              console.log("err", err);
              setUsername(err?.data?.name);
              setUserEmail(err?.data?.email);
              setUserphone(err?.data?.phoneNumber);
              // return;
              setIsOpen(true);
              // setTimeout(() => {
              //   setIsOpen(true);
              // }, 5000);
              return;
            }
            if (err?.status === 402) {
              localStorage.setItem("email", JSON.stringify(logindata.email));
              await ApiPostNoAuth("student/re_active", {
                email: logindata?.email,
              })
                .then((res) => {
                  toast.success(res.data.message);
                  setTimeout(() => {
                    history.push("/forgotPassword", {
                      state: "loginNotVerifyOtp",
                    });
                  }, 4000);
                })
                .catch((err) => {
                  if (err?.status === 400) {
                    toast.error(err?.message);
                  } else {
                    toast.error("Something Went Wrong");
                  }
                });
              return setLoading(false);
            }
            if (err?.status === 410) {
              // history.push("/postlist");
            } else {
              toast.error(err?.message);
            }
            setLoading(false);
          });
      } catch (err) {
        // disableLoading();
        setLoading(false);
      }
    } else {
      // disableLoading();
      setLoading(false);
    }
  };

  const handleonChangeSignup = (e) => {
    let { name, value } = e.target;
    if (name === "country") {
      setsignupData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      callfilter(value);
    } else if (name === "region") {
      setsignupData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      callfilter1(value);
    } else {
      setsignupData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const responseGoogle = (response) => {
    if (response.tokenId) {
      const body = {
        idToken: response.tokenId,
        accessToken: response.accessToken,
      };

      ApiPostNoAuth("student/google", body)
        .then((res) => {
          // toast.success(res.data.message);
          userUtil.setUserInfo(res.data.data);
          userUtil.setUserImage(res.data.data.image);
          userUtil.setUserName(res.data.data.name);
          authUtil.setToken(res.data.data.token);
          setfbMail(res.data.data.isEmailVerified);
          setUserData(res.data.data);
          if (
            res.data.data.isEmailVerified === true &&
            res.data.data.isPhoneVerified === false
          ) {
            setLoginModal(!loginModal);
          }
          if (
            res.data.data.isEmailVerified === true &&
            res.data.data.isPhoneVerified === true
          ) {
            history.push("/");
            window.location.reload();
          }

          // history.push("/");
          //
          // window.location.reload();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  const callfilter = (i) => {
    let body = {
      countryId: i,
    };
    ApiPostNoAuth("student/get_country_state_city", body)
      .then((res) => {
        setregionlist(res.data.data);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        if (err.status === 410) {
          history.push("/postlist");
        } else {
          toast.error(err.message);
        }
      });
  };
  const callfilter1 = (i) => {
    let body = {
      countryId: signupData.country,
      stateId: i,
    };
    ApiPostNoAuth("student/get_country_state_city", body)
      .then((res) => {
        setcitylist(res.data.data);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        if (err.status === 410) {
          history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
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
      let body2 = {
        otp: otp,
      };
      ApiPostNoAuth("student/otp_verification", body2)
        .then((res) => {
          setOtpModal(!otpModal);
          setOtpModal2(!otpModal2);
          userUtil.setUserInfo({
            ...JSON.parse(localStorage.getItem("userinfo")),
            ...res.data.data,
          });
          toast.success(res.data.message);
          // history.push("/");
          // window.location.reload();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      toast.error("OTP is required");
    }
  };

  const emailVarification2 = (e) => {
    e.preventDefault();
    if (otp2) {
      enableLoading();
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
          toast.success(res.data.message);
          disableLoading();
          history.push("/");
          window.location.reload();
        })
        .catch((err) => {
          disableLoading();
          toast.error(err.message);
        });
    } else {
      disableLoading();
      toast.error("OTP is required");
    }
  };
  const emailVerification3 = (e) => {
    e.preventDefault();
    if (otp3) {
      enableLoading();
      let body3 = {
        email: logindata?.email,
        otp: otp3,
      };
      ApiPostNoAuth("teacher/otpVerification", body3)
        .then((res) => {
          setActivateModal(false);
          setReActivateEmailSent(false);
          toast.success(res.data.message);
          disableLoading();
        })
        .catch((err) => {
          disableLoading();
          toast.error(err.message);
        });
    } else {
      disableLoading();
      toast.error("OTP is required");
    }
  };
  const reactivateEmailVerifyBtn = async (e) => {
    e.preventDefault();
    enableLoading();
    let body = {
      email: logindata?.email,
    };
    await ApiPostNoAuth("teacher/sendOtp", body)
      .then((res) => {
        console.log("res", res);
        setReActivateEmailSent(true);
        disableLoading();
      })
      .catch((err) => {
        toast.error(err?.message);
        disableLoading();
      });
  };
  useEffect(() => {
    if (props.flag === true) {
      setLoginModal(!loginModal);
    }

    if (props.Fmodal === true) {
      setLoginModal(true);
    }

    // if (props.location.state) {
    //
    //   if (props.location.state == "in") {
    //     setFlag("signIn");
    //   } else if (props.location.state == "up") {
    //     setFlag("createAccount");
    //   }
    //   // fetchData(props.location.state);
    // }
  }, [props]);
  useEffect(() => {
    let body = {};
    ApiPostNoAuth("student/get_country_state_city", body)
      .then((res) => {
        setcountrylist(res.data.data);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        if (err?.status === 410) {
          history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
  }, []);

  const validation = () => {
    let errors = {};
    let formIsValid = true;

    if (signupData.email) {
    }
    // if (!signupData.phoneCode) {
    //
    //   formIsValid = false;
    //   // toast.error("Please Enter Email");
    //   errors["phoneCode"] = "*Please Select Country";
    // }

    if (
      !signupData.phoneNumber ||
      signupData.phoneNumber == undefined ||
      signupData.phoneNumber == null
    ) {
      formIsValid = false;
      // toast.error("Please Enter Email");
      errors["phoneNumber"] = "*Please enter your phone number";
    }

    setError(errors);
    return formIsValid;
  };

  const phoneSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        const body = {
          id: userData._id ? userData._id : fetchUserData?._id,

          phoneNumber: signupData?.phoneNumber,
          countryCode: signupData?.phoneCode
            ? parseInt(signupData?.phoneCode)
            : 233,
        };

        if (signupData?.email) {
          //
          body.email = signupData?.email;
        }

        ApiPost("/verify", body)
          .then((res) => {
            // setcountrylist(res.data.data);
            setLoginModal(!loginModal);
            if (fetchUserData.isEmailVerified === false) {
              setOtpModal(!otpModal);
            } else {
              setOtpModal2(!otpModal2);
            }
            // setCategory(res.data.data);
          })
          .catch((err) => {
            if (err.status === 410) {
              history.push("/postlist");
            } else {
              toast.error(err.message);
            }
          });
      } catch (err) {}
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userinfo"));

    if (userInfo?._id) {
      setFetchUserData(userInfo);
    }

    if (userInfo?.isPhoneVerified === false) {
      setLoginModal(!loginModal);
    }
  }, []);

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
  // const back = () => {
  //   setOtpModal(!otpModal);
  //   setLoginModal(!loginModal);
  // };
  // const back2 = () => {
  //   setOtpModal2(!otpModal2);
  //   setLoginModal(!loginModal);
  // };

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

  return (
    <div className="pt-50 pb-50 d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="col-md-7 col-sm-12 rounded linear_gradient p-5">
          <ToastContainer position="top-right" />
          {/* {flag === "signIn" ? ( */}
          {OTPscreen === true ? (
            <OtpScreen
              OTPscreen={OTPscreen}
              setOPTscreen={setOPTscreen}
              setPhoneOtp={setPhoneOtp}
              phoneOtp={phoneOtp}
              signupData={logindata}
            />
          ) : (
            <form className="" onSubmit={submit}>
              <div className="pb-3">
                <div className="textWhitefz26Bold">Sign in</div>
                <div className="textWhitefz18">
                  New here?{" "}
                  <span
                    className="text-bold text-dark cursor-pointer"
                    onClick={() => history.push("/signUp")}
                  >
                    Create account
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <label
                  for="exampleFormControlInput12"
                  className=" textWhitefz18Light font-weight-normal"
                >
                  Your Email / Phone
                </label>
                <input
                  type="text"
                  name="email"
                  value={logindata.email}
                  onChange={handleonChange}
                  className="form-control loginInput login_Border"
                  id="exampleFormControlInput12"
                  placeholder="Enter your email/phone"
                />
              </div>
              <div className="mb-5">
                <div className="d-flex justify-content-between font-weight-bold">
                  <label
                    for="exampleFormControlInput1"
                    className=" textWhitefz18Light font-weight-normal"
                  >
                    Password
                  </label>
                  <label
                    for="exampleFormControlInput1"
                    className="form-label font-weight-bold cursor-pointer"
                    onClick={forgot}
                  >
                    Forgot password
                  </label>
                </div>

                <div className="d-flex form-control align-items-center login_Border">
                  <input
                    name="password"
                    value={logindata.password}
                    type={hide ? "text" : "password"}
                    onChange={handleonChange}
                    className="form-control border_none px-0"
                    id="exampleFormControlInput1"
                    placeholder="Enter your password"
                  />
                  <BsEye onClick={() => setHide(!hide)} color="#64dbf2" />
                </div>
              </div>
              <div className="row pr-2">
                {/* <div className="col-lg-4">
                  <GoogleLogin
                    clientId="657602942505-j9b64174kuuljpak612nbrq1ote4alht.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    // onFailure={responseGoogle}
                    className="googleBtn"
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
                <div className="col-lg-4 responsive_my">
                  <FaceBookLogin />
                </div> */}
                <div className="col-lg-4 mx-auto">
                  <button
                    type="submit"
                    className="signBtn w-100 rounded d-flex justify-content-center"
                    onClick={() => {
                      // enableLoading();
                      // submit();
                    }}
                  >
                    {" "}
                    {loadings ? (
                      <CircularProgress className="circle" />
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
        <Modal
          show={loginModal}
          centered
          // onHide={() => setModal(!modal)}
          className="loginModal"
          // size="lg"
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Body className="linear_gradient modalSelect rounded">
            <form onSubmit={phoneSubmit}>
              {fetchUserData.isEmailVerified === false && (
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
                      name="email"
                      value={signupData.email}
                      onChange={handleonChangeSignup}
                      className=" loginInput login_Border rounded w-100"
                      id="exampleFormControlInput1"
                      placeholder="Enter email"
                    />

                    <div className="font_size_14 color_red">
                      {errors["email2"]}
                    </div>
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
                    <option value="233">233</option>;
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
                  <div className="font_size_14 color_red">
                    {errors["phoneCode"]}
                  </div>
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
                    name="phoneNumber"
                    value={signupData.phoneNumber}
                    onChange={handleonChangeSignup}
                    className=" loginInput login_Border rounded w-100"
                    id="exampleFormControlInput1"
                    placeholder="Enter phone number"
                  />

                  <div className="font_size_14 color_red">
                    {errors["phoneNumber"]}
                  </div>
                </div>
              </div>

              <div className="d-flex pr-2 justify-content-center">
                <div className="col-md-5 px-2">
                  <button
                    type="button"
                    className="cancelBtn rounded"
                    onClick={() => backButton()}
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-md-5 px-2">
                  <button
                    type="submit"
                    className="signBtn w-100 rounded"
                    // onClick={() => phoneSubmit()}
                  >
                    {" "}
                    Submit
                  </button>
                </div>
              </div>
            </form>
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
            <form className="" onSubmit={emailVarification}>
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
                    onClick={() => backButton()}
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-md-4 px-2">
                  <button
                    type="submit"
                    className="signBtn w-100 rounded"
                    // onClick={emailVarification}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
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
            <form className="" onSubmit={emailVarification2}>
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
                    onClick={() => backButton()}
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-md-4 px-2">
                  <button
                    type="submit"
                    className="signBtn w-100 rounded"
                    // onClick={emailVarification2}
                  >
                    {loadings ? (
                      <CircularProgress className="circle" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        <Modal
          show={activateModal}
          centered
          onHide={() => setActivateModal(false)}
          className="loginModal"
        >
          <Modal.Body className="linear_gradient modalSelect rounded-3">
            <form>
              <div>
                <div className="textWhitefz26Bold">
                  Re-Activate Your Account
                </div>
                {!reActivateEmailSent && (
                  <>
                    <div className="textWhitefz18 pb-3">
                      You account has been deactivated please reactivate by
                      verifying your email now
                    </div>
                    <button
                      type="submit"
                      className="signBtn w-100 rounded"
                      onClick={reactivateEmailVerifyBtn}
                    >
                      {loadings ? (
                        <CircularProgress className="circle" />
                      ) : (
                        "Verify"
                      )}
                    </button>
                  </>
                )}
                {reActivateEmailSent && (
                  <>
                    <div className="mb-3 d-flex">
                      <div className="col-md-12 px-2">
                        <label
                          for="OtpActivate"
                          className="mt-3 textWhitefz18Light"
                        >
                          Enter OTP
                        </label>
                        <OtpInput
                          value={otp3}
                          inputStyle={otpInput}
                          onChange={setOtp3}
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
                            resend={reactivateEmailVerifyBtn}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="signBtn w-100 rounded"
                      onClick={emailVerification3}
                    >
                      {loadings ? (
                        <CircularProgress className="circle" />
                      ) : (
                        "Verify"
                      )}
                    </button>
                  </>
                )}
              </div>
            </form>
          </Modal.Body>
        </Modal>
        <SabpaisaPaymentGateway
          payerName={username}
          payerEmail={useemail}
          payerMobile={usephone}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
};

export default Login;
