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
import moment from "moment";
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

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const handleonChange = (e) => {
    let { name, value } = e.target;

    setaccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(accountData);

  const fetchData = async (id) => {
    ApiGet("/school/" + id)
      .then((res) => {
        setaccountData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/schoolList");
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
    //       history.push("/schoolList");
    //     } else {
    //       toast.error(err.message);
    //     }
    //   });

    getUpdate(false);
  };
  if (accountData.established_date) {
    accountData.established_date = moment(accountData.established_date).format(
      "YYYY-MM-DD"
    );
  }
  const validateForm = () => {
    console.log("valid");
    let errors = {};
    let formIsValid = true;
    if (!accountData.name) {
      console.log("a");
      formIsValid = false;
      errors["name"] = "*Please Enter Name";
    }
    if (!accountData.email) {
      console.log("a");
      formIsValid = false;
      errors["email"] = "*Please Enter Email";
    }
    if (!accountData.address) {
      console.log("a");
      formIsValid = false;
      errors["address"] = "*Please Enter Address";
    }
    if (!accountData.phoneNumber) {
      console.log("a");
      formIsValid = false;
      errors["phoneNumber"] = "*Please Enter Phonenumber";
    }
    if (!accountData.established_date) {
      console.log("a");
      formIsValid = false;
      errors["established_date"] = "*Please Select Date";
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
          phoneNumber: accountData.phoneNumber,
          address: accountData.address,
          established_date: accountData.established_date,
        };
        console.log(body);

        ApiPost("/school/add", body)
          .then((res) => {
            toast.success(res.data.message);
            disableLoading();
            setTimeout(() => {
              history.push("/schoolList");
            }, 2000);
          })
          .catch((err) => {
            if (err.status == 410) {
              history.push("/schoolList");
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
          id: idValue.id,
          email: accountData.email,
          name: accountData.name,
          phoneNumber: accountData.phoneNumber,
          address: accountData.address,
          established_date: accountData.established_date,
        };
        console.log(body);

        ApiPut("/school/update", body)
          .then((res) => {
            toast.success(res.data.message);
            disableLoading();
            setTimeout(() => {
              history.push("/schoolList");
            }, 2000);
          })
          .catch((err) => {
            if (err.status == 410) {
              history.push("/schoolList");
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
    ApiGet("/main_category")
      .then((res) => {
        setCategory(res.data.data);
        console.log("Sucess");
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/schoolList");
        } else {
          toast.error(err.message);
        }
      });

    ApiGet("/category")
      .then((res) => {
        setSubCategory(res.data.data);
        console.log("Sucess");
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/schoolList");
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
                <Link to={"/schoolList"}>School</Link>
              </BreadcrumbItem>
              {update === true ? (
                <BreadcrumbItem active>Add New School</BreadcrumbItem>
              ) : (
                <BreadcrumbItem active>Edit School</BreadcrumbItem>
              )}
            </Breadcrumb>
          </Col>
          <Card>
            <CardBody>
              <Form>
                <h2>
                  {update === true ? <b>Add New School</b> : <b>Edit School</b>}
                </h2>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>
                        School Name<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.name}
                        name="name"
                        placeholder="Enter School Name"
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
                        School Number<span style={{ color: "red" }}> * </span>
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
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        School Email<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.email}
                        name="email"
                        placeholder="Enter School Email"
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
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>
                        School Address<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.address}
                        name="address"
                        placeholder="Enter School Address"
                        required
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["address"]}
                      </span>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        School Established Date
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="date"
                        onChange={handleonChange}
                        value={accountData.established_date}
                        name="established_date"
                        placeholder="Enter School Established Date"
                        required
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["established_date"]}
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
                          onClick={() => history.push("/schoolList")}
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
                    </>
                  ) : (
                    <Col className="d-flex justify-content-center">
                      <Button
                        onClick={onUpdate}
                        disabled={button}
                        style={{ marginTop: "19px", width: "166px" }}
                      >
                        Update{" "}
                        {loading && (
                          <span className="ml-3 spinner spinner-white"></span>
                        )}
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
