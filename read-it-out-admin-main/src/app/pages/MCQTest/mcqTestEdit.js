import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  ApiPost,
  ApiGet,
  ApiPut,
  ApiGetNoAuth,
  // uploadURL,
  ApiUpload,
  Bucket,
} from "../../../helpers/API/ApiData";
import queryString from "query-string";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import DropzoneComponent from "react-dropzone-component";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import moment from "moment";

import Radio from "@material-ui/core/Radio";

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
  var options = [];

  options.push(
    accountData.option1 === undefined ? "" : accountData.option1?.trim()
  );
  options.push(
    accountData.option2 === undefined ? "" : accountData.option2?.trim()
  );
  options.push(
    accountData.option3 === undefined ? "" : accountData.option3?.trim()
  );
  options.push(
    accountData.option4 === undefined ? "" : accountData.option4?.trim()
  );

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
    ApiGet("/question/" + id)
      .then((res) => {
        if (res.data.data[0].type == 0) {
          res.data.data[0].type = "true";
        } else if (res.data.data[0].type == 1) {
          res.data.data[0].type = "false";
        }

        setaccountData(res.data.data[0]);
        console.log("ROOORORORORORP");
        console.log(res.data.data[0]);
        setaccountData((option) => ({
          ...option,
          ["option1"]: res.data.data[0].option[0],
          ["option2"]: res.data.data[0].option[1],
          ["option3"]: res.data.data[0].option[2],
          ["option4"]: res.data.data[0].option[3],
        }));
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
  if (accountData.published_date) {
    accountData.published_date = moment(accountData.published_date).format(
      "YYYY-MM-DD"
    );
  }

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
      var answers = [];

      answers.push(
        accountData.option1 === undefined ? "" : accountData.option1?.trim()
      );
      answers.push(
        accountData.option1 === undefined ? "" : accountData.option2?.trim()
      );
      answers.push(
        accountData.option1 === undefined ? "" : accountData.option3?.trim()
      );
      answers.push(
        accountData.option1 === undefined ? "" : accountData.option4?.trim()
      );
      console.log(answers);

      // var options = array.push[accountData.option1, ]

      const body = {
        question: accountData.question,
        answer: accountData.answer,
        option: answers,
        topicId: accountData.topicId,
      };
      console.log(body);

      ApiPost("/question/add", body)
        .then((res) => {
          toast.success(res.data.message);

          setTimeout(() => {
            history.push("/mcqList");
          }, 2000);
        })
        .catch((err) => {
          if (err.status == 410) {
            history.push("/mcqList");
          } else {
            toast.error(err.message);
          }
        });
    }
  };
  const onUpdate = async (e) => {
    const idValue = queryString.parse(window.location.search);
    if (validateForm()) {
      var answers = [];
      answers.push(
        accountData.option1 === undefined ? "" : accountData.option1?.trim()
      );
      answers.push(
        accountData.option1 === undefined ? "" : accountData.option2?.trim()
      );
      answers.push(
        accountData.option1 === undefined ? "" : accountData.option3?.trim()
      );
      answers.push(
        accountData.option1 === undefined ? "" : accountData.option4?.trim()
      );

      const body = {
        id: idValue.id,
        question: accountData.question,
        answer: accountData.answer,
        option: answers,
        topicId: accountData.topicId,
      };
      console.log(body);

      ApiPut("/question/update", body)
        .then((res) => {
          toast.success(res.data.message);
          setTimeout(() => {
            history.push("/mcqList");
          }, 2000);
        })
        .catch((err) => {
          if (err.status == 410) {
            history.push("/mcqList");
            toast.success("Congrats");
          } else {
            toast.error(err.message);
          }
        });

      // } catch (err) {}
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
    ApiGet("/topic")
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
                <Link to={"/mcqList"}>MCQ Questions</Link>
              </BreadcrumbItem>
              {update === true ? (
                <BreadcrumbItem active>Add New MCQ Questions</BreadcrumbItem>
              ) : (
                <BreadcrumbItem active>Edit MCQ Questions</BreadcrumbItem>
              )}
            </Breadcrumb>
          </Col>
          <Card>
            <CardBody>
              <Form>
                <h2>
                  {update === true ? (
                    <b>Add New MCQ Questions</b>
                  ) : (
                    <b>Edit MCQ Questions</b>
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
                </Row>

                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label>Option 1</Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.option1}
                        name="option1"
                        placeholder="Enter Option 1"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>Option 2</Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.option2}
                        name="option2"
                        placeholder="Enter Option 2"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>Option 3</Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.option3}
                        name="option3"
                        placeholder="Enter Option 3"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>Option 4</Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.option4}
                        name="option4"
                        placeholder="Enter Option 4"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Select answer<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="select"
                        onChange={(e) => handleonChange(e)}
                        value={accountData.answer}
                        name="answer"
                        placeholder="Enter the Answer of Test"
                        required
                      >
                        <option>Choose answer</option>
                        {options.map((record, i) => {
                          return <option>{record}</option>;
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
                          onClick={() => history.push("/mcqList")}
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
