import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  ApiPost,
  ApiGet,
  ApiPut,
  ApiGetNoAuth,
  ApiUpload,
} from "../../../helpers/API/ApiData";
import queryString from "query-string";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Col,
  Container,
  CardBody,
  Card,
  Row,
  Form,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { DropzoneComponent } from "react-dropzone-component";
const position = {
  maxWidth: "1322px",
  marginTop: "0px",
  marginBottom: "2%",
};
var extra = [];
export default function CreateSubCategory() {
  const history = useHistory();
  const [accountData, setaccountData] = useState({});
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [errors, setError] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [update, getUpdate] = useState(true);
  const [setimage, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const [button, setbutton] = useState(false);

  const handleonChange = (e) => {
    let { name, value } = e.target;

    setaccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(accountData);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const fetchData = async (id) => {
    ApiGet("/faculty/" + id)
      .then((res) => {
        setaccountData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/facultyList");
        } else {
          toast.error(err.message);
        }
      });
    // ApiGet("admin/main_category/" + id)
    //   .then((res) => {
    //     setaccountData(res.data.data);
    //     console.log(res.data.data);
    //   })
    //   .catch((err) => {
    //     if (err.status == 410) {
    //       history.push("/teacherList");
    //     } else {
    //       toast.error(err.message);
    //     }
    //   });

    getUpdate(false);
  };
  const validateForm = () => {
    console.log("valid");
    let errors = {};
    let formIsValid = true;
    if (!accountData.email) {
      console.log("a");
      formIsValid = false;
      errors["email"] = "*Please email";
    }
    if (!accountData.name) {
      console.log("b");
      formIsValid = false;
      errors["name"] = "*Please enter name";
    }
    if (!accountData.password) {
      console.log("b");
      formIsValid = false;
      errors["password"] = "*Please enter password";
    }
    if (!accountData.phoneNumber) {
      console.log("b");
      formIsValid = false;
      errors["phoneNumber"] = "*Please enter phone number";
    }

    setError(errors);

    return formIsValid;
  };

  const onSubmit = async (e) => {
    if (validateForm()) {
      setbutton(true);
      enableLoading();
      try {
        const body = {
          email: accountData.email,
          name: accountData.name,
          password: accountData.password,
          phoneNumber: accountData.phoneNumber,
        };
        console.log(body);

        ApiPost("/faculty/add", body)
          .then((res) => {
            toast.success(res.data.message);
            disableLoading();
            setbutton(false);

            setTimeout(() => {
              history.push("/facultyList");
            }, 2000);
          })
          .catch((err) => {
            disableLoading();
            setbutton(false);
            if (err.status == 410) {
              history.push("/facultyList");
            } else {
              toast.error(err.message);
            }
          });
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const onUpdate = async (e) => {
    if (validateForm()) {
      setbutton(true);
      enableLoading();
      try {
        const idValue = queryString.parse(window.location.search);

        const body = {
          name: accountData.name,
          email: accountData.email,
          password: accountData.password,
          phoneNumber: accountData.phoneNumber,
          id: idValue.id,
          schoolId: accountData.schoolId,
        };
        console.log(body);

        ApiPut("/faculty/update", body)
          .then((res) => {
            toast.success(res.data.message);
            setTimeout(() => {
              history.push("/facultyList");
            }, 2000);
          })
          .catch((err) => {
            if (err.status == 410) {
              history.push("/facultyList");
              toast.success("Congrats");
            } else {
              toast.error(err.message);
            }
          });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userinfo"))[0]);
    const idValue = queryString.parse(window.location.search);
    if (
      idValue.id ||
      !idValue.id === undefined ||
      !idValue.id === "undefined"
    ) {
      fetchData(idValue.id);
    }
    ApiGet("/school")
      .then((res) => {
        setCategory(res.data.data);
        console.log("Sucess");
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/facultyList");
        } else {
          toast.error(err.message);
        }
      });
  }, []);

  return (
    <Container style={position}>
      <ToastContainer position="top-right" />
      <Row>
        <Col md={12}>
          <Col md={12}>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to={"/facultyList"}>Faculty</Link>
              </BreadcrumbItem>
              {update === true ? (
                <BreadcrumbItem active>Add new faculty</BreadcrumbItem>
              ) : (
                <BreadcrumbItem active>Edit faculty</BreadcrumbItem>
              )}
            </Breadcrumb>
          </Col>
          <Card>
            <CardBody>
              <Form>
                <h2>
                  {update === true ? (
                    <b>Add new faculty</b>
                  ) : (
                    <b>Edit faculty</b>
                  )}
                </h2>

                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Faculty name<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.name}
                        name="name"
                        placeholder="Enter Faculty Name"
                        required
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["name"]}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Faculty number<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.phoneNumber}
                        name="phoneNumber"
                        placeholder="Enter School Number"
                        required
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["phoneNumber"]}
                      </span>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Faculty email<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.email}
                        name="email"
                        placeholder="Enter Faculty Email"
                        required
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["email"]}
                      </span>
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    {update === true ? (
                      <FormGroup>
                        <Label>
                          Faculty password
                          <span style={{ color: "red" }}> * </span>
                        </Label>
                        <Input
                          type="text"
                          onChange={handleonChange}
                          value={accountData.password}
                          name="password"
                          placeholder="Enter Faculty password"
                          required
                        />
                        <span
                          style={{
                            color: "red",

                            top: "5px",
                            fontSize: "10px",
                          }}
                        >
                          {errors["password"]}
                        </span>
                      </FormGroup>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>

                {/* <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>
                        Image<span style={{ color: "red" }}> * </span>
                      </Label>
                      <DropzoneComponent
                        init={() => {}}
                        config={componentConfig}
                        eventHandlers={eventHandlers}
                        djsConfig={djsConfig}
                      />
                    </FormGroup>
                  </Col>
                </Row> */}

                <Row>
                  {update === true ? (
                    <>
                      <Col className="d-flex justify-content-center">
                        <Button
                          onClick={onSubmit}
                          disabled={button}
                          className={`btn btn-primary font-weight-bold px-8 py-2 my-3`}
                          style={{
                            marginTop: "19px",
                            width: "166px",
                            backgroundColor: "#3699ff",
                            color: "white",
                          }}
                        >
                          Add{" "}
                          {loading && (
                            <span className="ml-3 spinner spinner-white"></span>
                          )}
                        </Button>
                        <Button
                          onClick={() => history.push("/facultyList")}
                          className={`ml-3 btn btn-primary font-weight-bold px-8 py-2 my-3`}
                          style={{
                            marginTop: "19px",
                            width: "166px",
                            backgroundColor: "#e4e6ef",
                            color: "#3f4254",
                          }}
                        >
                          Cancel{" "}
                        </Button>
                      </Col>
                      {/* <Col md='1'>  <button
                          id="kt_login_signin_submit"
                          type="submit"
                          className={`btn btn-primary font-weight-bold px-8 py-2 my-3`}
                          // onClick={() => history.push("/genreEdit")}
                           onClick={onSubmit}
                           
   
                        >
                          <span>&nbsp;Add&nbsp;</span>
                          {loading && (
                            <span className="ml-3 spinner spinner-white"></span>
                          )}
                        </button></Col>
   
                         <Col md='1'>  <button
                          id="kt_login_signin_submit"
                          type="submit"
                          className={`btn btn-secondary font-weight-bold px-8 py-2 my-3`}
                          onClick={() => history.push("/teacherList")}
                           // onClick={onSubmit}
   
                        >
                          <span>&nbsp;Cancel&nbsp;</span>
                          {loading && (
                            <span className="ml-3 spinner spinner-white"></span>
                          )}
                        </button></Col> */}
                    </>
                  ) : (
                    <Col className="d-flex justify-content-center">
                      <Button
                        onClick={onUpdate}
                        style={{ marginTop: "19px", width: "166px" }}
                      >
                        Update{" "}
                      </Button>
                    </Col>
                  )}
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
