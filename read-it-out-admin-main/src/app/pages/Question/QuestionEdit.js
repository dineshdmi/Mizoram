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
import DropzoneComponent from "react-dropzone-component";

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

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  console.log(accountData);

  const fetchData = async (id) => {
    ApiGet("/theory_question/" + id)
      .then((res) => {
        setaccountData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/theoryQuestionList");
        } else {
          toast.error(err.message);
        }
      });

    getUpdate(false);
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!accountData.answer) {
      formIsValid = false;
      errors["answer"] = "*Please Enter Answer";
    }
    if (!accountData.question) {
      formIsValid = false;
      errors["question"] = "*Please Enter Question";
    }
    if (!accountData.theoryId) {
      formIsValid = false;
      errors["theoryId"] = "*Please Enter Theory";
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
          answer: accountData.answer,
          question: accountData.question,
          theoryId: accountData.theoryId,
        };
        console.log(body);

        ApiPost("/theory_question/add", body)
          .then((res) => {
            toast.success(res.data.message);
            disableLoading();
            setTimeout(() => {
              history.push("/theoryQuestionList");
            }, 2000);
          })
          .catch((err) => {
            if (err.status == 410) {
              history.push("/theoryQuestionList");
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
          answer: accountData.answer,
          question: accountData.question,
          id: accountData.idValue,
        };
        console.log(body);

        ApiPut("/theory_question/update", body)
          .then((res) => {
            toast.success(res.data.message);
            disableLoading();
            setTimeout(() => {
              history.push("/theoryQuestionList");
            }, 2000);
          })
          .catch((err) => {
            if (err.status == 410) {
              history.push("/theoryQuestionList");
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
    ApiGet("/theory")
      .then((res) => {
        setCategory(res.data.data);
        console.log("Sucess");
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/theoryQuestionList");
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
                <Link to={"/theoryQuestionList"}>Theory Question</Link>
              </BreadcrumbItem>
              {update === true ? (
                <BreadcrumbItem active>Add New Theory Question</BreadcrumbItem>
              ) : (
                <BreadcrumbItem active>Edit Theory Question</BreadcrumbItem>
              )}
            </Breadcrumb>
          </Col>
          <Card>
            <CardBody>
              <Form>
                <h2>
                  {update === true ? (
                    <b>Add New Theory Question</b>
                  ) : (
                    <b>Edit Theory Question</b>
                  )}
                </h2>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>
                        Main Category<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="select"
                        name="theoryId"
                        onChange={(e) => handleonChange(e)}
                        value={accountData.theoryId}
                        placeholder="Select Main Category"
                      >
                        <option>Select Main Category</option>
                        {category.map((record, i) => {
                          return (
                            <option value={record._id}>{record.title}</option>
                          );
                        })}
                        {}
                      </Input>
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["theoryId"]}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Question<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.question}
                        name="question"
                        placeholder="Enter Question"
                        required
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["question"]}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Answer<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.answer}
                        name="answer"
                        placeholder="Enter Answer"
                        required
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["answer"]}
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
                </Row>

                <Row>
                  <Col md={12}>
                    {update === true ? (
                      <Button
                        onClick={onSubmit}
                        disabled={button}
                        style={{
                          marginTop: "19px",
                          width: "166px",
                          backgroundColor: "#003366",
                          color: "white",
                        }}
                      >
                        Add{" "}
                      </Button>
                    ) : (
                      <Button
                        onClick={onUpdate}
                        style={{ marginTop: "19px", width: "166px" }}
                      >
                        Update{" "}
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
