import React, { useEffect, useState } from "react";
import sign from "../../media/sign.png";
import { useHistory } from "react-router-dom";
import google from "../../media/icons/google.png";
import fb from "../../media/icons/fb.png";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as userUtil from "../../utils/user.util";
import * as authUtil from "../../utils/auth.util";
import CountryCode from "../../helpers/CounrtyCode.json";
import {
  ApiDelete,
  ApiGetNoAuth,
  ApiGet,
  ApiPostNoAuth,
  Bucket,
  ApiPost,
  ApiUpload,
  BaseURL,
} from "../../helpers/API/ApiData";
import "react-toastify/dist/ReactToastify.css";
import OtpScreen from "./OtpScreen";
import { Input } from "reactstrap";
import { Modal } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { TiSocialFacebookCircular } from "react-icons/ti";
import OtpInput from "react-otp-input";
import FaceBookLogin from "./FaceBookLogin";
import { CircularProgress } from "@material-ui/core";
import { BsEye } from "react-icons/bs";
import "./signup.css";
import OtpTimer from "otp-timer";
import { useDispatch } from "react-redux";
import { registerUser } from "app/store/action/action";
import { Checkbox, Radio } from "antd";
import axios from "axios";
import { Button } from "react-bootstrap";
import SabpaisaPaymentGateway from "./SabpaisaPaymentGateway";
import { encrypt } from "app/helpers/utils";
import { useLocation } from "react-router-dom";
let dummy = "123456";
const SignUp = () => {
  const location = useLocation();
  const history = useHistory();
  const [errors, setError] = useState({});
  const [CountryValue, setCountryValue] = useState([]);
  // var CountryValue = [];
  const [flag, setFlag] = useState("create");
  const [logindata, setlogindata] = useState({});
  const [signupData, setsignupData] = useState({ userType: 0 });
  const [authData, setAuthData] = useState({
    authwv: "",
    authkey: "",
    mcc: "",
    clientcode: "",
    clientid: "",
  });
  const [countrylist, setcountrylist] = useState([]);
  const [regionlist, setregionlist] = useState([]);
  const [schools, setSchool] = useState([]);
  const [OTPscreen, setOPTscreen] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState(false);
  const [value, setValue] = useState();
  const [otp, setOtp] = useState("");
  const [loginModal, setLoginModal] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [check, setCheck] = useState(false);
  const [userData, setUserData] = useState({});
  const [fetchUserData, setFetchUserData] = useState("");
  const [checkError, setCheckError] = useState("");
  const [fbMail, setfbMail] = useState();
  const [otp2, setOtp2] = useState();
  const [otpModal2, setOtpModal2] = useState(false);
  const [button, setbutton] = useState(false);
  const [loadings, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [hide, setHide] = useState(false);
  const [staticOTP, setstaticOTP] = useState("");
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const resutfromResponse = location?.state?.data;
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

  const handleChange = (event) => {
    const { value, name } = event.target;

    setAuthData({ ...authData, [name]: value.trimStart() });
  };

  const handelconfirme = () => {
    console.log("clickyes");
    setIsOpen(true);
    setShow(false);
  };
  const token = JSON.parse(sessionStorage.getItem("authUtil"));

  console.log("token", token);
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
      transDate: transDate,
    };
    const headers = {
      authorization: token,
    };
    await ApiPost("/payment", body, headers)
      .then((res) => {
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

  console.log("authData", authData);
  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!signupData.name) {
      formIsValid = false;
      errors["name"] = "*Please enter your name";
    }
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signupData.email) ==
      false
    ) {
      formIsValid = false;
      errors["email1"] = "*Please enter valid email address";
    }
    if (
      !signupData.phoneNumber ||
      signupData.phoneNumber == undefined ||
      signupData.phoneNumber == null
    ) {
      formIsValid = false;
      errors["phoneNumber"] = "*Please enter your phone number";
    }

    if (!signupData.password) {
      formIsValid = false;
      errors["password"] = "*Please enter your password";
    }
    if (!signupData.confirmPassword) {
      formIsValid = false;
      errors["confirmPassword"] = "*Please enter your confirm Password";
    }
    if (!signupData.address) {
      formIsValid = false;
      errors["address"] = "*Please enter your address";
    }
    if (!signupData.dob) {
      formIsValid = false;
      errors["dob"] = "*Please enter your date of birth";
    }
    if (!signupData.gender) {
      formIsValid = false;
      errors["gender"] = "*Please select your gender";
    }
    // if (!signupData.district) {
    //   formIsValid = false;
    //   errors["district"] = "*Please select your district";
    // }
    // if (!signupData.image) {
    //   formIsValid = false;
    //   errors["image"] = "*Please select your image";
    // }

    setError(errors);

    return formIsValid;
  };
  console.log("signupData", signupData);

  const handleonChangeSignup = (e) => {
    let { name, value } = e.target;
    if (name === "email") {
      setsignupData((prevState) => ({
        ...prevState,
        [name]: value?.toLowerCase()?.trimStart(),
      }));
    } else if (name == "country") {
      callfilter(value);
      setsignupData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      callfilter(value);
    } else if (name == "region") {
      setsignupData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      // callfilter1(value);
    } else {
      setsignupData((prevState) => ({
        ...prevState,
        [name]: value?.trimStart(),
      }));
    }
  };

  const callsignup = (e) => {
    e.preventDefault();
    setLoading(true);
    if (validateForm()) {
      if (signupData?.password !== signupData?.confirmPassword) {
        toast.error("Confirm password not match");
        setLoading(false);
        return;
      }
      enableLoading();
      try {
        var body = {
          name: signupData?.name,
          email: signupData?.email.toLowerCase(),
          gender: Number(signupData?.gender),
          countryCode: 91,
          phoneNumber: signupData?.phoneNumber,
          address: signupData?.address,
          // district: signupData?.district,
          image: signupData?.image,
          dob: signupData?.dob,
          password: signupData?.password,
          // countryCode: signupData?.countryCode
          //   ? JSON?.parse(signupData?.countryCode)
          //   : 233,
          country: signupData?.country,
          region: signupData?.region,
          // city:  signupData.country,
          userType: signupData?.userType,
          // cityId: signupData.city,
          // regionId: signupData.region,
          // countryId: signupData.country,
        };
        localStorage.setItem("email", JSON.stringify(signupData?.email));
        ApiPostNoAuth("student/signUp", body)
          .then((res) => {
            toast.success(res.data.message);
            // setFlag("submit");
            // disableLoading();
            dispatch(registerUser(body));
            setLoading(false);
            sessionStorage.setItem("userUtil", JSON.stringify(res?.data?.data));
            localStorage.setItem("userinfo", JSON.stringify(res?.data?.data));
            sessionStorage?.setItem(
              "authUtil",
              JSON?.stringify(res?.data?.data?.token)
            );
            localStorage?.setItem(
              "token",
              JSON?.stringify(res?.data?.data?.token)
            );
            // userUtil.setUserInfo(res.data.data);
            // authUtil.setToken(res.data.data.token);
            history.push("/forgotPassword", { state: "signupVerifyOtp" });
            //
            // window.location.reload()
            // setCategory(res.data.data);
          })
          .catch((err) => {
            // disableLoading();
            if (err.status == 410) {
              toast.error(err.message);
              setLoading(false);
              // history.push("/postlist");
            } else {
              toast.error(err.message);
              setLoading(false);
            }
          });
      } catch (err) {}
    } else {
      // disableLoading();
      setLoading(false);
    }
  };

  const callfilter = (i) => {
    let body = {
      country_name: i ? i : "India",
    };
    ApiPostNoAuth("student/get_country_state_city", body)
      .then((res) => {
        setregionlist(res.data.data);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        if (err?.status === 410) {
          //   history.push("/postlist");
        } else {
          toast.error(err?.message);
        }
      });
  };

  useEffect(() => {
    callfilter();
  }, []);
  // const callfilter1 = (i) => {
  //   let body = {
  //     country_name: signupData.country,
  //     state_name: i,

  //   };
  //   ApiPostNoAuth("student/get_country_state_city", body)
  //     .then((res) => {
  //
  //       setcitylist(res.data.data);

  //       // setCategory(res.data.data);
  //     })
  //     .catch((err) => {
  //
  //       if (err.status == 410) {
  //         //   history.push("/postlist");
  //       } else {
  //         // toast.error(err.message);
  //       }
  //     });
  // };
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
    let body = {};
    ApiPostNoAuth("student/get_country_state_city", body)
      .then((res) => {
        setcountrylist(res.data.data);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        if (err?.status == 410) {
          history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
    // var CountryValue = CountryCode.Data;
    setCountryValue(CountryCode?.Data.sort(callorder("dial_code", "asc")));
    // callorder("dial_code","asc")
  }, []);

  const hndlePhone = (e) => {};
  ////////////////////////////////////////  Google face Book \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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
  const componentClicked = (response) => {
    if (response.accessToken) {
      const body = {
        accessToken: response.accessToken,
      };
      ApiPostNoAuth("student/facebook", body).then((res) => {
        toast.success(res.data.message);

        userUtil.setUserInfo(res.data.data);
        userUtil.setUserImage(res.data.data.image);
        userUtil.setUserName(res.data.data.name);
        authUtil.setToken(res.data.data.token);
        history.push("/");

        window.location.reload();
      });
    }
  };
  const emailVarification = () => {
    if (otp) {
      let body2 = {
        email: signupData.email,
        otp: otp,
      };
      ApiPostNoAuth("student/otp_verification", body2)
        .then((res) => {
          setOtpModal(!otpModal);
          setOtpModal2(!otpModal2);
          setOtp2("123456");
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

  const emailVarification2 = () => {
    if (otp2) {
      let body2 = {
        phoneNumber: signupData.phoneNumber,
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

  const validation = () => {
    let errors = {};
    let formIsValid = true;

    if (signupData.email2) {
      if (!signupData.email2) {
        formIsValid = false;
        // toast.error("Please Enter Email");
        errors["email2"] = "*Please Enter Email Address";
      }
    }
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
      errors["phoneNumber"] = "*Please enter your phone number";
    }

    setError(errors);
    return formIsValid;
  };
  const imageChange = async (e) => {
    let file = e.target.files[0];
    let fileURL = URL.createObjectURL(file);
    file.fileURL = fileURL;
    let formData = new FormData();
    formData.append("image", file);
    let returnImg = "";
    await axios
      .post(BaseURL + "upload/profile_image", formData)
      .then((res) => {
        setsignupData({ ...signupData, image: res?.data?.data?.image });
      })
      .catch((err) => console.log("res_blob", err));
    return returnImg;
  };
  const phoneSubmit = () => {
    if (validation()) {
      try {
        const body = {
          id: userData._id ? userData._id : fetchUserData?._id,
          phoneNumber: signupData.phoneNumber2,
          countryCode: signupData?.phoneCode
            ? parseInt(signupData?.phoneCode)
            : 233,
        };
        if (signupData.email2) {
          //
          body.email = signupData.email2;
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
            if (err.status == 410) {
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
  useEffect(() => {
    let body = null;
    ApiPostNoAuth("student/get_school_data", body)
      .then((res) => {
        // setcountrylist(res.data.data);
        setSchool(res.data.data);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        if (err?.status == 410) {
          // history.push("/postlist");
        } else {
          // toast.error(err?.message);
        }
      });
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
    <div className="pt-50 pb-50 d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="col-md-7 rounded linear_gradient p_5">
          <ToastContainer position="top-right" />
          {flag === "create" ? (
            <form className="" onSubmit={callsignup}>
              <div className="pb-3">
                <div className="textWhitefz26Bold text-center">Sign Up</div>
                <div className="textWhitefz18 text-center">
                  Account will be active for 90 days, Easy re-activation.
                </div>
              </div>
              <div className="mb-3 d-flex flexColumn">
                <div className="col-md-12 px-2">
                  <label
                    for="exampleFormControlInput1"
                    className=" textWhitefz18Light font-weight-normal"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={signupData.name}
                    onChange={(e) => handleonChangeSignup(e)}
                    className=" loginInput login_Border rounded w-100"
                    id="exampleFormControlInput1"
                    placeholder="Enter full name"
                  />
                  <div className="errorC ">{errors["name"]}</div>
                </div>
              </div>
              <div className="mb-3 row">
                <div className="col-lg-6 px-2">
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
                    placeholder="Enter your email"
                  />
                  <div className="errorC ">{errors["email"]}</div>
                  <div className="errorC ">{errors["email1"]}</div>
                </div>
                <div className="col-md-6 px-2 pt-3 pt-lg-0">
                  <label
                    for="exampleFormControlInput1"
                    className=" textWhitefz18Light font-weight-normal"
                  >
                    Gender
                  </label>
                  <div className="w-100 d-flex">
                    <div className="w-50 py-3">
                      <input
                        type="radio"
                        name="gender"
                        value={0}
                        onClick={handleonChangeSignup}
                        style={{ accentColor: "blue" }}
                        id="male1"
                        placeholder="Enter your email"
                      />{" "}
                      <label htmlFor="male1" className="textWhitefz18Light">
                        Male
                      </label>
                    </div>
                    <div className="w-50 py-3">
                      <input
                        type="radio"
                        name="gender"
                        value={1}
                        onClick={handleonChangeSignup}
                        style={{ accentColor: "blue" }}
                        id="female1"
                        placeholder="Enter your email"
                      />{" "}
                      <label htmlFor="female1" className="textWhitefz18Light">
                        Female
                      </label>
                    </div>
                  </div>
                  <div className="errorC ">{errors["gender"]}</div>
                </div>
                <div className="col-lg-6 px-2 mt-3">
                  <label
                    for="exampleFormControlInput1"
                    className=" textWhitefz18Light font-weight-normal"
                  >
                    Phone number
                  </label>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="loginInput px-2 me-2"
                      value="+91"
                      style={{ width: "40px" }}
                    />
                    <input
                      type="number"
                      name="phoneNumber"
                      value={signupData.phoneNumber}
                      onChange={(e) => handleonChangeSignup(e)}
                      className=" loginInput login_Border rounded w-100"
                      id="exampleFormControlInput1"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="errorC">{errors["phoneNumber"]}</div>
                </div>
                <div className="col-lg-6 px-2 mt-3 d-md-flex gap-3">
                  <div className="w-100">
                    <label
                      for="exampleFormControlInput1"
                      className=" textWhitefz18Light font-weight-normal"
                    >
                      Date of Birth
                    </label>
                    <div>
                      <input
                        type="date"
                        name="dob"
                        value={signupData?.dob}
                        onChange={handleonChangeSignup}
                        className="loginInput w-100"
                      />
                    </div>
                    <div className="errorC">{errors["dob"]}</div>
                  </div>
                </div>
              </div>
              <div className="mb-3 d-flex flexColumn">
                <div className="col-md-12 px-2">
                  <label
                    for="exampleFormControlInput1"
                    className=" textWhitefz18Light font-weight-normal"
                  >
                    Address
                  </label>
                  <input
                    type="textarea"
                    name="address"
                    value={signupData.address}
                    onChange={(e) => handleonChangeSignup(e)}
                    className=" loginInput login_Border rounded w-100"
                    id="exampleFormControlInput1"
                    placeholder="Enter address"
                  />
                  <div className="errorC ">{errors["address"]}</div>
                </div>
              </div>
              <div className="mb-3 row flexColumn">
                <div className="col-md-6 px-2">
                  <div className="w-100">
                    <label
                      for="exampleFormControlInput1"
                      className=" textWhitefz18Light font-weight-normal"
                    >
                      Country
                    </label>
                    <select
                      type="select"
                      className="loginInput w-100 login_Border rounded ps-1 pe-0 me-2"
                      onChange={handleonChangeSignup}
                      value={signupData?.country}
                      name="country"
                    >
                      <option value="" selected>
                        Select Country
                      </option>
                      {countrylist.map((record, i) => {
                        return (
                          <option key={i} value={record.country}>
                            {record.country}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-md-6 px-2">
                  <div className="w-100 ps-1">
                    <label
                      for="exampleFormControlInput1"
                      className=" textWhitefz18Light font-weight-normal"
                    >
                      State
                    </label>
                    <select
                      type="select"
                      className="loginInput w-100 login_Border rounded ps-1 pe-0 me-2"
                      onChange={handleonChangeSignup}
                      value={signupData.region}
                      name="region"
                    >
                      <option value="" selected>
                        Select State
                      </option>
                      {regionlist.map((record, i) => {
                        return (
                          <option key={i} value={record.state}>
                            {record.state}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                {/* <div className="col-md-4 px-2">
                  <div className="w-100">
                    <label
                      for="exampleFormControlInput1"
                      className=" textWhitefz18Light font-weight-normal"
                    >
                      District
                    </label>
                    <select
                      name="district"
                      onChange={(e) => handleonChangeSignup(e)}
                      value={signupData.district}
                      className="loginInput login_Border rounded w-100"
                      aria-label="Default select example"
                    >
                      <option value="" disabled selected>Select district</option>
                      <option value="Aizawl">Aizawl</option>
                      <option value="Champhai">Champhai</option>
                      <option value="Hnahthial">Hnahthial</option>
                      <option value="Khawzawl">Khawzawl</option>
                      <option value="Kolasib">Kolasib</option>
                      <option value="Lawngtlai">Lawngtlai</option>
                      <option value="Lunglei">Lunglei</option>
                      <option value="Mamit">Mamit</option>
                      <option value="Saiha">Saiha</option>
                      <option value="Saitual">Saitual</option>
                      <option value="Serchhip">Serchhip</option>
                    </select>
                  </div>
                  <div className="errorC ">{errors["district"]}</div>
                </div> */}
              </div>
              <div className="mb-3 d-flex flexColumn">
                <div className="col-md-12 px-2">
                  <div className="overflow-hidden">
                    <label
                      for="exampleFormControlInput1"
                      className=" textWhitefz18Light font-weight-normal"
                    >
                      Upload Profile Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={imageChange}
                      style={{ padding: "12px 10px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3 d-flex flexColumn">
                <div className="col-md-6 px-2">
                  <label className=" textWhitefz18Light font-weight-normal">
                    Password
                  </label>
                  <div className="d-flex form-control align-items-center login_Border">
                    <input
                      type={hide ? "text" : "password"}
                      className="form-control border_none px-0"
                      name="password"
                      value={signupData.password}
                      onChange={(e) => handleonChangeSignup(e)}
                      id=""
                      placeholder="Enter password"
                    />
                    <BsEye onClick={() => setHide(!hide)} color="#64dbf2" />
                  </div>
                  <div className="errorC ">{errors["password"]}</div>
                </div>
                <div className="col-md-6 px-2">
                  <label className=" textWhitefz18Light font-weight-normal">
                    Confirm Password
                  </label>
                  <div className="d-flex form-control align-items-center login_Border">
                    <input
                      type={hide ? "text" : "password"}
                      className="form-control border_none px-0"
                      name="confirmPassword"
                      value={signupData?.confirmPassword}
                      onChange={(e) => handleonChangeSignup(e)}
                      id=""
                      placeholder="Enter confirm password"
                    />
                    <BsEye onClick={() => setHide(!hide)} color="#64dbf2" />
                  </div>
                  <div className="errorC ">{errors["confirmPassword"]}</div>
                </div>
              </div>
              {/* <div className="mb-4 d-flex">
                <div className="col-md-12 px-2">
                  <div className="">
                    <Checkbox
                      name="checks"
                      className=""
                      checked={check}
                      onChange={(e) => setCheck(e.target.checked)}
                    ></Checkbox>
                    <span className="text-white mx-3">
                      By creating an account, I accept the{" "}
                      <a
                        className="color_light_black"
                        onClick={() => history.push("/term")}
                      >
                        Terms & Conditions
                      </a>{" "}
                      &{" "}
                      <a
                        className="color_light_black"
                        onClick={() => history.push("/policy")}
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </div>
                  <div className="errorC ">{errors["checks"]}</div>
                </div>
              </div> */}

              <div className="row pr-2 mt-5">
                {/* <div className="col-md-4">
                  <GoogleLogin
                    clientId="657602942505-j9b64174kuuljpak612nbrq1ote4alht.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    // onFailure={responseGoogle}
                    className="googleBtn"
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
                <div className="col-md-4 responsive_my">
                  <FaceBookLogin />
                </div> */}
                <div className="col-md-4 mx-auto  ">
                  <button
                    type="submit"
                    className="signBtn w-100 rounded d-flex justify-content-center"
                    // onClick={() => {
                    //   callsignup();
                    // }}
                  >
                    {" "}
                    {loadings ? (
                      <CircularProgress className="circle" />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </div>
              <div className="textWhitefz18 mt-3 text-center">
                Already have an account?{" "}
                <span
                  className="text-bold text-dark cursor-pointer"
                  onClick={() => history.push("/signIn")}
                >
                  Sign in
                </span>
              </div>
              {/* <span
                className="text-bold text-dark cursor-pointer"
                onClick={() => setShow(true)}
              >
                Paymnet modal
              </span> */}
            </form>
          ) : (
            ""
          )}
          {flag === "submit" ? (
            <OtpScreen
              setOPTscreen={setOPTscreen}
              setFlag={setFlag}
              signupData={signupData}
              phoneOtp={phoneOtp}
              setPhoneOtp={setPhoneOtp}
            />
          ) : (
            ""
          )}
        </div>
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
                  name="email2"
                  value={signupData.email2}
                  onChange={(e) => handleonChangeSignup(e)}
                  className=" loginInput login_Border rounded w-100"
                  id="exampleFormControlInput1"
                  placeholder="Enter email"
                />
                <div className="font_size_14 color_red">
                  {errors["email2"]}{" "}
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
                {errors["phoneCode"]}{" "}
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
                name="phoneNumber2"
                value={signupData.phoneNumber2}
                onChange={(e) => handleonChangeSignup(e)}
                className=" loginInput login_Border rounded w-100"
                id="exampleFormControlInput1"
                placeholder="Enter phone number"
              />

              <div className="font_size_14 color_red">
                {errors["phoneNumber2"]}{" "}
              </div>
            </div>
          </div>
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
                type="submit"
                className="signBtn w-100 rounded"
                onClick={() => phoneSubmit()}
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
        // show={true}
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
                Enter the code sent to your Email
              </div>
            </div>
            <div className="mb-5 d-flex">
              <div className="col-md-12 px-2">
                <label
                  for="exampleFormControlInput1"
                  className=" textWhitefz18Light font-weight-normal"
                >
                  Enter Code
                </label>

                <OtpInput
                  value={otp}
                  // defaultValue={123456}
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
                Enter the code sent to your Phone Number
              </div>
            </div>
            <div className="mb-5 d-flex">
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
                    seconds={10}
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

      {/* payment modal */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        className="text-white"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Are you sure, do you want to remove book from library ? */}
          <div className="mb-3 row">
            <div className="col-md-6 px-2 pt-3 pt-lg-0">
              <label
                for="exampleFormControlInput1"
                className=" textWhitefz18Light font-weight-normal"
              >
                Full name
              </label>
              <input
                type="text"
                name="name"
                value={signupData.name}
                onChange={(e) => handleonChangeSignup(e)}
                className=" loginInput login_Border rounded w-100"
                id="exampleFormControlInput1"
                placeholder="Enter full name"
              />
              <div className="errorC ">{errors["name"]}</div>
            </div>
            <div className="col-lg-6 px-2">
              <label
                for="exampleFormControlInput1"
                className=" textWhitefz18Light font-weight-normal"
              >
                AuthWv
              </label>
              <input
                type="text"
                name="authwv"
                value={authData.authwv}
                onChange={handleChange}
                className=" loginInput login_Border rounded w-100"
                id="exampleFormControlInput1"
                placeholder="Enter your Authwv"
              />
              {/* <div className="errorC ">{errors["email"]}</div>
              <div className="errorC ">{errors["email1"]}</div> */}
            </div>
            <div className="col-lg-6 px-2 mt-3">
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
                placeholder="Enter your email"
              />
              <div className="errorC ">{errors["email"]}</div>
              <div className="errorC ">{errors["email1"]}</div>
            </div>
            <div className="col-lg-6 px-2 mt-3">
              <label
                for="exampleFormControlInput1"
                className=" textWhitefz18Light font-weight-normal"
              >
                Auth Key
              </label>
              <input
                type="text"
                name="authkey"
                value={authData.authkey}
                onChange={handleChange}
                className=" loginInput login_Border rounded w-100"
                id="exampleFormControlInput1"
                placeholder="Enter auth key"
              />
              {/* <div className="errorC ">{errors["address"]}</div> */}
            </div>
            <div className="col-lg-6 px-2 mt-3 d-md-flex gap-3">
              <div className="w-100">
                <label
                  for="exampleFormControlInput1"
                  className=" textWhitefz18Light font-weight-normal"
                >
                  Address
                </label>
                <input
                  type="textarea"
                  name="address"
                  value={signupData.address}
                  onChange={(e) => handleonChangeSignup(e)}
                  className=" loginInput login_Border rounded w-100"
                  id="exampleFormControlInput1"
                  placeholder="Enter address"
                />
                <div className="errorC ">{errors["address"]}</div>
              </div>
            </div>
            <div className="col-lg-6 px-2 mt-3 d-md-flex gap-3">
              <div className="w-100">
                <label
                  for="exampleFormControlInput1"
                  className=" textWhitefz18Light font-weight-normal"
                >
                  Mcc
                </label>
                <input
                  type="text"
                  name="mcc"
                  value={authData.mcc}
                  onChange={handleChange}
                  className=" loginInput login_Border rounded w-100"
                  id="exampleFormControlInput1"
                  placeholder="Enter mcc"
                />
                {/* <div className="errorC ">{errors["address"]}</div> */}
              </div>
            </div>
            <div className="col-lg-6 px-2 mt-3 d-md-flex gap-3">
              <div className="w-100">
                <label
                  for="exampleFormControlInput1"
                  className=" textWhitefz18Light font-weight-normal"
                >
                  Phone number
                </label>
                <div className="d-flex">
                  <input
                    type="text"
                    className="loginInput px-2 me-2"
                    value="+91"
                    style={{ width: "40px" }}
                  />
                  <input
                    type="number"
                    name="phoneNumber"
                    value={signupData.phoneNumber}
                    onChange={(e) => handleonChangeSignup(e)}
                    className=" loginInput login_Border rounded w-100"
                    id="exampleFormControlInput1"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="errorC">{errors["phoneNumber"]}</div>
              </div>
            </div>
            <div className="col-lg-6 px-2 mt-3 d-md-flex gap-3">
              <div className="w-100">
                <label
                  for="exampleFormControlInput1"
                  className=" textWhitefz18Light font-weight-normal"
                >
                  Client Code
                </label>
                <input
                  type="text"
                  name="clientcode"
                  value={authData.clientcode}
                  onChange={handleChange}
                  className=" loginInput login_Border rounded w-100"
                  id="exampleFormControlInput1"
                  placeholder="Enter client code"
                />
                {/* <div className="errorC ">{errors["address"]}</div> */}
              </div>
            </div>
            <div className="col-lg-6 px-2 mt-3 d-md-flex gap-3">
              <div className="w-100">
                <label
                  for="exampleFormControlInput1"
                  className=" textWhitefz18Light font-weight-normal"
                >
                  Amount
                </label>
                <input
                  type="number"
                  name="mcc"
                  value={signupData.address}
                  onChange={(e) => handleonChangeSignup(e)}
                  className=" loginInput login_Border rounded w-100"
                  id="exampleFormControlInput1"
                  placeholder="Enter Amount"
                />
                {/* <div className="errorC ">{errors["address"]}</div> */}
              </div>
            </div>
            <div className="col-lg-6 px-2 mt-3 d-md-flex gap-3">
              <div className="w-100">
                <label
                  for="exampleFormControlInput1"
                  className=" textWhitefz18Light font-weight-normal"
                >
                  Client id
                </label>
                <input
                  type="number"
                  name="clientid"
                  value={authData.clientid}
                  onChange={handleChange}
                  className=" loginInput login_Border rounded w-100"
                  id="exampleFormControlInput1"
                  placeholder="Enter clientid"
                />
                {/* <div className="errorC ">{errors["address"]}</div> */}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            No
          </Button>
          <Button variant="secondary" onClick={() => handelconfirme()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <SabpaisaPaymentGateway
        payerName={signupData.name}
        payerEmail={signupData.email}
        payerMobile={signupData.phoneNumber}
        isOpen={isOpen}
      /> */}
    </div>
  );
};

export default SignUp;
