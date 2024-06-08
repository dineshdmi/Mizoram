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

  const handleonChange = (e) => {
    let { name, value } = e.target;

    setaccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(accountData);

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

      ApiUpload("upload/category", formData)
        .then((res) => {
          setImage(res.data.data.image);
        })
        .catch((err) => {
          if (err.status == 410) {
            history.push("/theoryQuestionList");
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
    ApiGet("admin/theory_question/" + id)
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

    if (!accountData.name) {
      formIsValid = false;
      errors["name"] = "*Please Enter name";
    }

    setError(errors);
    return formIsValid;
  };

  const onSubmit = async (e) => {
    const body = {
      answer: accountData.answer,
      question: accountData.question,
      theoryId: accountData.theoryId,
    };
    console.log(body);

    ApiPost("admin/theory_question/add", body)
      .then((res) => {
        toast.success(res.data.message);

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
  };
  const onUpdate = async (e) => {
    const idValue = queryString.parse(window.location.search);

    const body = {
      answer: accountData.answer,
      question: accountData.question,
      id: accountData.idValue,
    };
    console.log(body);

    ApiPut("admin/theory_question/update", body)
      .then((res) => {
        toast.success(res.data.message);
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
    ApiGet("admin/theory")
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
                        {errors["categoryid"]}
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
                        {errors["name"]}
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
