import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  ApiPost,
  ApiGet,
  ApiPut,
  ApiUpload,
  Bucket,
} from "../../../helpers/API/ApiData";
import ChipInput from "material-ui-chip-input";
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
const position = {
  maxWidth: "1322px",
  marginTop: "0px",
  marginBottom: "2%",
};
var extra = [];
export default function CreateSubCategory() {
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const [accountData, setaccountData] = useState({});
  const [errors, setError] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [update, getUpdate] = useState(true);
  const [data, setData] = useState([]);
  const [description, setYourChips] = useState([]);
  const [optiontype, SetOptionType] = useState([]);

  const [button, setbutton] = useState(false);
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

    setData((prevState) => ({
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

  const handleAddChip = (e) => {
    setYourChips((post) => [...post, e]);
  };
  const handleDeleteChip = (e, j) => {
    let extra5 = description.filter((x, i) => i != j);
    setYourChips(extra5);
  };

  const fetchData = async (id) => {
    // ApiGet("admin/book/" + id)
    // ApiGet("/book/" + id)
    ApiGet("/training_type/" + id)
      .then((res) => {
        setaccountData(res.data.data);
        setYourChips(res.data.data.description);

        console.log(res.data.data);
      })

      .catch((err) => {
        if (err.status == 410) {
          history.push("/trainingTypeList");
        } else {
          toast.error(err.message);
        }
      });

    getUpdate(false);
  };
  const validateForm = () => {
    console.log("valid");
    let errors = {};
    let formIsValid = true;
    if (!accountData.name) {
      console.log("a");
      formIsValid = false;
      errors["name"] = "*Please Name";
    }
   
    if (description.length === 0) {
      console.log("c");
      formIsValid = false;
      errors["description"] = "*Please Enter At list One Description";
    }

    setError(errors);

    return formIsValid;
  };
  const onSubmit = async (e) => {
    if (validateForm()) {
      setbutton(true);
      enableLoading();
      try {
    let body = {
      name: accountData.name,
      description: description,
      optionType: optiontype.length,
    };

    ApiPost("/training_type/add", body)
      .then((res) => {
        toast.success(res.data.message);
        disableLoading();
        setbutton(false);
        setTimeout(() => {
          history.push("/trainingTypeList");
        }, 2000);
      })
      .catch((err) => {
        disableLoading();
        setbutton(false);

        if (err.status == 410) {
          history.push("/trainingTypeList");
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

    let body = {
      id: accountData._id,
      name: accountData.name,
      description: description,
    };

    console.log(body);

    ApiPut("/training_type/update", body)
      .then((res) => {
        toast.success(res.data.message);
        disableLoading();
        setbutton(false);
        setTimeout(() => {
          history.push("/trainingTypeList");
        }, 2000);
      })
      .catch((err) => {
        disableLoading();
        setbutton(false);
        if (err.status == 410) {
          history.push("/trainingTypeList");
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

    ApiGet("/training_type")
      .then((res) => {
        SetOptionType(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/trainingTypeList");
        } else {
          toast.error(err.message);
        }
      });
  }, []);
  console.log(optiontype.length);
  return (
    <Container style={position}>
      <ToastContainer position="top-right" />
      <Row>
        <Col md={12}>
          <Col md={12}>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to={"/trainingTypeList"}>Training Type</Link>
              </BreadcrumbItem>
              {update === true ? (
                <BreadcrumbItem active>Add New Training Type</BreadcrumbItem>
              ) : (
                <BreadcrumbItem active>Edit Training Type</BreadcrumbItem>
              )}
            </Breadcrumb>
          </Col>
          <Card>
            <CardBody>
              <Form>
                <h2>
                  {update === true ? (
                    <b>Add New Training Type</b>
                  ) : (
                    <b>Edit Training Type</b>
                  )}
                </h2>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>
                        Book title<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.name}
                        name="name"
                        placeholder="Enter Book title"
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

                  <Col md={12}>
                    <FormGroup className="d-flex flex-column">
                      <Label>
                        Book Description
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <ChipInput
                        value={description}
                        onAdd={(chip) => handleAddChip(chip)}
                        onDelete={(chip, index) =>
                          handleDeleteChip(chip, index)
                        }
                      />
                       <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["description"]}
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
                          onClick={() => history.push("/trainingTypeList")}
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
