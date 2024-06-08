import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { ApiPost, ApiGet, ApiPut } from "../../../helpers/API/ApiData";
import queryString from "query-string";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";

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
  const [errors, setError] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [update, getUpdate] = useState(true);
  const [loading, setloading] = useState(false);
  const [maincategory, setMainCategory] = useState([]);

  const handleonChange = (e) => {
    let { name, value } = e.target;
    if (e.target.value == "true") {
      e.target.value = 0;
    } else {
      e.target.value = 1;
    }
    console.log(e.target.value);

    setaccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // let { name, value } = e.target;

    // setData((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

  console.log(accountData);

  const fetchData = async (id) => {
    ApiGet("/theory_question/" + id)
      .then((res) => {
        setaccountData(res.data.data);
        console.log("ROOORORORORORP");
        console.log("theory", res.data.data);
        // setaccountData((option) => ({
        //   ...option,
        //   ["option1"]: res.data.data[0].option[0],
        //   ["option2"]: res.data.data[0].option[1],
        //   ["option3"]: res.data.data[0].option[2],
        //   ["option4"]: res.data.data[0].option[3],
        // }));
        console.log(res.data.data[0]);
      })

      .catch((err) => {
        if (err.status == 410) {
          history.push("/bookList");
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
      errors["answer"] = "*Please enter answer";
    }
    if (!accountData.question) {
      formIsValid = false;
      errors["question"] = "*Please enter question";
    }
    if (!accountData.topicId) {
      formIsValid = false;
      errors["topicId"] = "*Please select topics";
    }

    setError(errors);
    return formIsValid;
  };

  const onSubmit = async (e) => {
    if (validateForm()) {
      const body = {
        question: accountData.question,
        answer: accountData.answer,
        // option: answers,
        topicId: accountData.topicId,
      };
      console.log(body);

      ApiPost("/theory_question/add", body)
        .then((res) => {
          toast.success(res.data.message);

          setTimeout(() => {
            history.push("/theoryList");
          }, 2000);
        })
        .catch((err) => {
          if (err.status == 410) {
            history.push("/theoryList");
          } else {
            toast.error(err.message);
          }
        });
    }
  };
  const onUpdate = async (e) => {
    const idValue = queryString.parse(window.location.search);

    if (validateForm()) {
      const body = {
        id: idValue.id,
        question: accountData.question,
        answer: accountData.answer,
        // option: answers,
        topicId: accountData.topicId,
      };
      console.log(body);

      ApiPut("/theory_question/update", body)
        .then((res) => {
          toast.success(res.data.message);
          setTimeout(() => {
            history.push("/theoryList");
          }, 2000);
        })
        .catch((err) => {
          if (err.status == 410) {
            history.push("/theoryList");
          } else {
            toast.error(err.message);
          }
        });
    }
    // } catch (err) {}
    // }
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
      console.log("This is");
      console.log(idValue.id);
    }
  }, []);

  useEffect(() => {
    ApiGet("/topic/theory")
      .then((res) => {
        setMainCategory(res.data.data);
        console.log("Sucess");
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/mcqList");
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
                <Link to={"/theoryList"}>Theory Questions</Link>
              </BreadcrumbItem>
              {update === true ? (
                <BreadcrumbItem active>Add New Theory Questions</BreadcrumbItem>
              ) : (
                <BreadcrumbItem active>Edit Theory Questions</BreadcrumbItem>
              )}
            </Breadcrumb>
          </Col>
          <Card>
            <CardBody>
              <Form>
                <h2>
                  {update === true ? (
                    <b>Add New Theory Questions</b>
                  ) : (
                    <b>Edit Theory Questions</b>
                  )}
                </h2>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        All Topics List
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="select"
                        name="topicId"
                        onChange={(e) => handleonChange(e)}
                        value={accountData.topicId}
                        placeholder="Select Mcq Test List"
                      >
                        <option>Select Topics</option>
                        {maincategory.map((record, i) => {
                          return (
                            <option value={record._id}>
                              {record.topicName}
                            </option>
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
                        {errors["topicId"]}
                      </span>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <FormGroup>
                      <Label>
                        Question
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.question}
                        name="question"
                        placeholder="Enter the Question of Test"
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
                  <Col md={4}>
                    <FormGroup>
                      <Label>
                        Answer
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.answer}
                        name="answer"
                        placeholder="Enter the Answer of Test"
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
                          onClick={() => history.push("/theoryList")}
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
