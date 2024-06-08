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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const position = {
  maxWidth: "1322px",
  marginTop: "0px",
  marginBottom: "2%",
};

let extra;
export default function CreateSubCategory() {
  const history = useHistory();
  const [accountData, setaccountData] = useState({});
  const [errors, setError] = useState({});
  const [setimage, setImage] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [update, getUpdate] = useState(true);
  const [category, setCategory] = useState([]);
  const [Software, setSoftware] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);
  const [loading, setloading] = useState(false);

  const handleonChange = (e) => {
    let { name, value } = e.target;
    if (name === "canShareWithDifferent") {
      accountData[name] = e.target.checked;
      setaccountData({ ...accountData });
    } else if (name === "canShareWithSame") {
      accountData[name] = e.target.checked;
      setaccountData({ ...accountData });
    } else if (name === "requestSignature") {
      accountData[name] = e.target.checked;
      setaccountData({ ...accountData });
    } else {
      setaccountData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const componentConfig2 = {
    iconFiletypes: [".jpg", ".png"],
    showFiletypeIcon: true,
    postUrl: { postUrl: "no-url" },
  };
  const djsConfig2 = {
    uploadMultiple: true,
    addRemoveLinks: true,
    params: {
      myParameter: "I'm a parameter!",
    },
    acceptedFiles: "image/*",
    autoProcessQueue: false,
  };
  const eventHandlers2 = {
    addedfile: (file) => {
      file.previewElement.querySelector(".dz-progress").style.display = "none";
      file.previewElement.querySelector(".dz-success-mark").style.opacity = 1;

      const formData = new FormData();

      extra.push(file);

      formData.append("image", file);

      ApiUpload("upload/main_category", formData)
        .then((res) => {
          setImage(res.data.data.image);
        })
        .catch((err) => {
          if (err.status == 410) {
            history.push("/auditorList");
          } else {
            toast.error(err.message);
          }
        });
    },
    removedfile: () => {},
    drop: (file) => {},
    init: (dropZoneObj) => {},
  };
  const fetchData = async (id) => {
    ApiGet("/auditor/" + id)
      .then((res) => {
        setaccountData(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/auditorList");
        } else {
          toast.error(err.message);
        }
      });

    getUpdate(false);
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!accountData.name) {
      formIsValid = false;
      errors["name"] = "*Please enter name";
    }

    setError(errors);
    return formIsValid;
  };

  const onSubmit = async (e) => {
    if (validateForm()) {
      try {
        const Id3 = JSON.parse(localStorage.getItem("token"));

        const body = {
          // image: setimage,
          name: accountData.name,
          phoneNumber: accountData.phoneNumber,
          password: accountData.password,
          email: accountData.email,
        };

        ApiPost("/auditor/add", body)
          .then((res) => {
            history.push("/auditorList");
            toast.success(res.data.message);
          })
          .catch((err) => {
            if (err.status == 410) {
              history.push("/auditorList");
            } else {
              toast.error(err.message);
            }
          });
      } catch (err) {}
    }
  };

  const onUpdate = async (e) => {
    const idValue = queryString.parse(window.location.search);

    const body = {
      name: accountData.name,
      phoneNumber: accountData.phoneNumber,
      password: accountData.password,
      email: accountData.email,
      id: idValue.id,
    };
    console.log(body);

    ApiPut("/auditor/update", body)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          history.push("/auditorList");
        }, 2000);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/auditorList");
          toast.success("Congrats");
        } else {
          toast.error(err.message);
        }
      });
    //   } catch (err) {}
    // }
  };

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userinfo"))[0]);
    const idValue = queryString.parse(window.location.search);

    extra = [];

    if (
      idValue.id ||
      !idValue.id === undefined ||
      !idValue.id === "undefined"
    ) {
      fetchData(idValue.id);
    }
    ApiGetNoAuth("category")
      .then((res) => {
        setCategory(res.data.data.menu_categories);
        setSoftware(res.data.data.software_categories);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/auditorList");
        } else {
          toast.error(err.message);
        }
      });
    ApiGet("sub_category")
      .then((res) => {
        setSubCategory(res.data.data.menu_categories);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/auditorList");
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
                <Link to={"/auditorList"}>publisher</Link>
              </BreadcrumbItem>
              {update === true ? (
                <BreadcrumbItem active>Add publisher</BreadcrumbItem>
              ) : (
                <BreadcrumbItem active>Edit publisher</BreadcrumbItem>
              )}
            </Breadcrumb>
          </Col>
          <Card>
            <CardBody>
              <Form>
                <h2>
                  {update === true ? (
                    <b>Add publisher</b>
                  ) : (
                    <b>Edit publisher</b>
                  )}
                </h2>

                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        publisher name
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.name}
                        name="name"
                        placeholder="Enter publisher Name"
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
                        publisher phone number
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.phoneNumber}
                        name="phoneNumber"
                        placeholder="Enter publisher Phone Number"
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
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        publisher email
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.email}
                        name="email"
                        placeholder="Enter publisher Email"
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
                        publisher password
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="password"
                        onChange={handleonChange}
                        value={accountData.password}
                        name="password"
                        placeholder="Enter publisher Password"
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
                </Row>

                {/* <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>
                        Image<span style={{ color: "red" }}> * </span>
                      </Label>
                      <DropzoneComponent
                        init={() => {}}
                        config={componentConfig2}
                        eventHandlers={eventHandlers2}
                        djsConfig={djsConfig2}
                      />
                    </FormGroup>
                  </Col>
                </Row> */}
                {/* <Row>
                  <Col>
                    {update === false ? (
                      <div style={{ paddingTop: "16px" }}>
                        <img
                          src={Bucket + accountData.image}
                          style={{
                            backgroundColor: "lightgray",
                            borderRadius: "10px",
                            width: "auto",
                            height: "165px",
                          }}
                          alt=""
                        />
                      </div>
                    ) : null}
                  </Col>
                </Row> */}
                <Row>
                  {update === true ? (
                    <>
                      <Col className="d-flex justify-content-center">
                        <Button
                          onClick={onSubmit}
                          className={`btn btn-primary font-weight-bold px-8 py-2 my-3`}
                          style={{
                            marginTop: "19px",
                            width: "166px",
                            backgroundColor: "#3699ff",
                            color: "white",
                          }}
                        >
                          Add{" "}
                        </Button>
                        <Button
                          onClick={() => history.push("/auditorList")}
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
                       onClick={() => history.push("/bookList")}
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
