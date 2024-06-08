import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { ApiPost, ApiPostNoAuth } from "../../../../helpers/API/ApiData";
import * as userUtil from "../../../../utils/user.util";
import * as authUtil from "../../../../utils/auth.util";
const initialValues = {
  email: "",
  password: "",
};

function Login(props) {
  const { intl } = props;
  const History = useHistory();
  const [loading, setLoading] = useState(false);
  const [button, setbutton] = useState(false);
  const [user, setuser] = useState("admin");
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setbutton(true);
      setTimeout(() => {
        var accountData1 = {
          email: values.email,
          password: values.password,
        };
        // ApiPostNoAuth(user+"/login", accountData1)
        ApiPostNoAuth(
          user == "admin"
            ? "admin/login"
            : user == "sub_admin"
            ? "sub_admin/login"
            : user == "auditor"
            ? "auditor/login"
            : "",
          accountData1
        )
          .then((res) => {
            // console.log(res);
            // if (res.data.status === 200) {
            toast.success(res.data.message);
            userUtil.setUserInfo(res.data.data);
            authUtil.setToken(res.data.data.token);
            authUtil.setRToken(res.data.data.refresh_token);
            disableLoading();
            props.login({
              token: "Bearer " + res.data.data.token,
              user: accountData1,
            });
            // setTimeout(function() {
            if (user === "auditor") {
              History.push("/publisher/bookList");
            } else {
              History.push("/dashboard");
            }
            // }, 2000);
            setbutton(false);
            // } else if (res.data.status !== 200) {
            //   disableLoading();
            //   toast(res.data.message);
            //   setTimeout(function() {
            //     window.location.reload();
            //   }, 2000);
            // }
          })
          .catch((err) => {
            console.log(err);
            disableLoading();
            setbutton(false);
            toast.error(err.message);

            setTimeout(function() {
              window.location.reload();
            }, 2000);
          });
      }, 1000);
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      <ToastContainer position="top-right" />

      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-10">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your username and password
        </p>
      </div>
      {/* end::Head */}
      <div className="d-flex justify-content-between mb-10">
        <button
          id="kt_login_signin_submit"
          // type="submit"
          onClick={() => setuser("admin")}
          // disabled={formik.isSubmitting}
          className={
            user == "admin"
              ? `btn btn-primary font-weight-bold px-9 py-4 my-3`
              : `btn font-weight-bold px-9 py-4 my-3`
          }
        >
          <span>Admin</span>
          {loading && <span className="ml-3 spinner spinner-white"></span>}
        </button>
        <button
          id="kt_login_signin_submit"
          onClick={() => setuser("auditor")}
          // type="submit"
          // disabled={formik.isSubmitting}
          className={
            user == "auditor"
              ? `btn btn-primary font-weight-bold px-9 py-4 my-3`
              : `btn font-weight-bold px-9 py-4 my-3`
          }
        >
          <span>Publisher</span>
          {loading && <span className="ml-3 spinner spinner-white"></span>}
        </button>
      </div>
      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {formik.status ? (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        ) : (
          <></>
        )}

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-center align-items-center">
          {/* <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
          </Link> */}
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Sign In</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
