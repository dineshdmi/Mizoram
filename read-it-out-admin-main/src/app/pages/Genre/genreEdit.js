import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  ApiPost,
  ApiGet,
  ApiPut,
  ApiGetNoAuth,
  Bucket,
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
    ApiGet("/genre/" + id)
      .then((res) => {
        setaccountData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/genreList");
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
    //       history.push("/postlist");
    //     } else {
    //       toast.error(err.message);
    //     }
    //   });

    getUpdate(false);
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!accountData.name) {
      formIsValid = false;
      errors["name"] = "*Please enter genre name";
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
          name: accountData.name,
          // image: setimage,
        };
        console.log(body);

        ApiPost("/genre/add", body)
          .then((res) => {
            toast.success(res.data.message);
            disableLoading();
            setTimeout(() => {
              history.push("/genreList");
            }, 2000);
          })
          .catch((err) => {
            if (err.status == 410) {
              history.push("/genreList");
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
    const idValue = queryString.parse(window.location.search);
    if (validateForm()) {
      try {
        if (setimage.length != 0) {
          accountData.image = setimage;
        }

        const body = {
          id: idValue.id,
          // image: accountData.image,
          name: accountData.name,
        };
        console.log(body);

        ApiPut("/genre/update", body)
          .then((res) => {
            toast.success(res.data.message);
            disableLoading();
            setTimeout(() => {
              history.push("/genreList");
            }, 2000);
          })
          .catch((err) => {
            if (err.status == 410) {
              history.push("/genreList");
              toast.success("Congrats");
            } else {
              toast.error(err.message);
            }
          });
      } catch (err) {}
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
          history.push("/genreList");
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
          history.push("/genreList");
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
                <Link to={"/genreList"}>Genre</Link>
              </BreadcrumbItem>
              {update === true ? (
                <BreadcrumbItem active>Add new genre</BreadcrumbItem>
              ) : (
                <BreadcrumbItem active>Edit genre</BreadcrumbItem>
              )}
            </Breadcrumb>
          </Col>
          <Card>
            <CardBody>
              <Form>
                <h2>
                  {update === true ? <b>Add new genre</b> : <b>Edit genre</b>}
                </h2>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>
                        Genre name<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.name}
                        name="name"
                        placeholder="Enter Genre Name"
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
                </Row>
                <Row>
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
                          onClick={() => history.push("/genreList")}
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
