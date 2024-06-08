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

  const [maincategory, setMainCategory] = useState([]);
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(false);

  const [button, setbutton] = useState(false);
  var options = [];

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

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
  console.log(options);

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
  };

  // console.log(accountData);

  const fetchData = async (id) => {
    console.log("/computer_test/" + id);
    ApiGet("/computer_test/" + id)
      .then((res) => {
        if (res.data.data.type == 0) {
          res.data.data.type = "true";
        } else if (res.data.data.type == 1) {
          res.data.data.type = "false";
        } else if (res.data.data.type == 2) {
          res.data.data.type = 2;
        }

        setaccountData(res.data.data);
        console.log("ROOORORORORORP");
        console.log(res.data.data);
        setaccountData((option) => ({
          ...option,
          ["option1"]: res.data.data.option[0],
          ["option2"]: res.data.data.option[1],
          ["option3"]: res.data.data.option[2],
          ["option4"]: res.data.data.option[3],
        }));
        console.log(res.data.data);
        console.log("/computer_test/" + id);
      })

      .catch((err) => {
        if (err.status == 410) {
          history.push("/questionBank");
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

  console.log("accountData.option1", accountData.option1);
  console.log("accountData.option2", accountData.option2);
  console.log("accountData.option3", accountData.option3);
  console.log("accountData.option4", accountData.option4);
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
    if (!accountData.subjectId) {
      formIsValid = false;
      errors["subjectId"] = "*Please select subject";
    }

    setError(errors);
    return formIsValid;
  };

  const onSubmit = async (e) => {
    if (validateForm()) {
      setbutton(true);
      enableLoading();
      try {
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

        var isFREE;

        if (accountData.type == "true") {
          isFREE = 0;
        } else {
          isFREE = 1;
        }
        const body = {
          question: accountData.question,
          answer: accountData.answer,
          option: answers,
          subjectId: accountData.subjectId,
        };
        console.log(body);

        ApiPost("/computer_test/add", body)
          .then((res) => {
            toast.success(res.data.message);

            setTimeout(() => {
              history.push("/questionBank");
            }, 2000);
          })
          .catch((err) => {
            if (err.status == 410) {
              history.push("/questionBank");
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
        var isFREE;
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

        if (accountData.type == "true") {
          isFREE = 0;
        } else {
          isFREE = 1;
        }

        const body = {
          id: idValue.id,
          question: accountData.question,
          answer: accountData.answer,
          option: answers,
          subjectId: accountData.subjectId,
        };
        console.log(body);

        ApiPut("/computer_test/update", body)
          .then((res) => {
            toast.success(res.data.message);
            setTimeout(() => {
              history.push("/questionBank");
            }, 2000);
          })
          .catch((err) => {
            if (err.status == 410) {
              history.push("/questionBank");
              toast.success("Congrats");
            } else {
              toast.error(err.message);
            }
          });
      } catch (error) {
        console.log("error", error);
      }
    }
    // } catch (err) {}
    // }
  };

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userinfo"))[0]);
    const idValue = queryString.parse(window.location.search);
    console.log(idValue.id);
    if (
      idValue.id ||
      !idValue.id === undefined ||
      !idValue.id === "undefined"
    ) {
      fetchData(idValue.id);
    }
    ApiGet("/test/computer_test")
      .then((res) => {
        setMainCategory(res.data.data);
        console.log("Sucess");
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/questionBank");
        } else {
          toast.error(err.message);
        }
      });
  }, []);

  useEffect(() => {
    ApiGet("/course_subject")
      .then((res) => {
        setSubject(res.data.data);
        console.log("Sucess");
        console.log("course_subject", res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/questionBank");
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
                <Link to={"/questionBank"}>Computer training questions</Link>
              </BreadcrumbItem>
              {update === true ? (
                <BreadcrumbItem active>
                  Add new computer training questions
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem active>
                  Edit computer training questions
                </BreadcrumbItem>
              )}
            </Breadcrumb>
          </Col>
          <Card>
            <CardBody>
              <Form>
                <h2>
                  {update === true ? (
                    <b>Add new computer training questions</b>
                  ) : (
                    <b>Edit computer training questions</b>
                  )}
                </h2>

                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>
                        Select course
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="select"
                        onChange={handleonChange}
                        value={accountData.subjectId}
                        name="subjectId"
                        placeholder="Enter the Question of Test"
                        required
                      >
                        <option>Select Course</option>
                        {subject.map((sub, i) => {
                          return <option value={sub._id}>{sub.title}</option>;
                        })}
                      </Input>
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["subjectId"]}
                      </span>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
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
                      <Label>
                        Option 1<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.option1}
                        name="option1"
                        placeholder="Enter Option 1"
                        required
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["option1"]}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>
                        Option 2<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.option2}
                        name="option2"
                        placeholder="Enter Option 2"
                        required
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["option2"]}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>
                        Option 3<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.option3}
                        name="option3"
                        placeholder="Enter Option 3"
                        required
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["option3"]}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>
                        Option 4<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.option4}
                        name="option4"
                        placeholder="Enter Option 4"
                        required
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["option4"]}
                      </span>
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
                          onClick={() => history.push("/questionBank")}
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
