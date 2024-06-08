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
  const [setimage, setImage] = useState([]);
  const [maincategory, setMainCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [genre, setGenre] = useState([]);
  const [loading, setloading] = useState(false);
  const [data, setData] = useState([]);

  const handleonChange = (e) => {
    let { name, value } = e.target;
    if (name === "main_categoryId") {
      callsubcategory(value);
      setaccountData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setaccountData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const callsubcategory = (value) => {
    ApiGet("/main_category/category/" + value)
      .then((res) => {
        console.log(res);
        setSubCategory(res.data.data);
      })
      .catch((err) => {
        if (err.status == 502) {
          //   toast.error(err.message);
        } else {
          //   toast.error(err.message);
        }
      });
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
            history.push("/bookList");
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
    ApiGet("/sub_category/" + id)
      .then((res) => {
        setaccountData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/postlist");
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

    if (!accountData.name) {
      formIsValid = false;
      errors["name"] = "*Please Enter name";
    }

    setError(errors);
    return formIsValid;
  };

  const onSubmit = async (e) => {
    const body = {
      name: accountData.name,
      // image: setimage,

      main_categoryId: accountData.main_categoryId,
      categoryId: accountData.categoryId,
    };
    console.log(body);

    ApiPost("/sub_category/add", body)
      .then((res) => {
        toast.success(res.data.message);

        setTimeout(() => {
          history.push("/subCategoryList");
        }, 2000);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/subCategoryList");
        } else {
          toast.error(err.message);
        }
      });
  };
  const onUpdate = async (e) => {
    const idValue = queryString.parse(window.location.search);
    // if (validateForm()) {
    //   try {
    //     if (setimage.length != 0) {
    //       accountData.image = setimage;
    //     }

    const body = {
      id: idValue.id,
      // image: accountData.image,
      name: accountData.name,
      main_categoryId: accountData.main_categoryId,
      categoryId: accountData.categoryId,
    };
    console.log(body);

    ApiPut("/sub_category/update", body)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          history.push("/subCategoryList");
        }, 2000);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/subCategoryList");
          toast.success("Congrats");
        } else {
          toast.error(err.message);
        }
      });
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
    }

    ApiGet("/main_category")
      .then((res) => {
        setCategory(res.data.data);
        console.log("Sucess");
        // console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/subCategorylist");
        } else {
          toast.error(err.message);
        }
      });

    ApiGet("/category")
      .then((res) => {
        setSubCategory(res.data.data);
        console.log("Sucess");
        // console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/subCategorylist");
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
                <Link to={"/subCategorylist"}>Sub Category</Link>
              </BreadcrumbItem>
              {update === true ? (
                <BreadcrumbItem active>Add New Sub Category</BreadcrumbItem>
              ) : (
                <BreadcrumbItem active>Edit Sub Category</BreadcrumbItem>
              )}
            </Breadcrumb>
          </Col>
          <Card>
            <CardBody>
              <Form>
                <h2>
                  {update === true ? (
                    <b>Add New Sub Category</b>
                  ) : (
                    <b>Edit Sub Category</b>
                  )}
                </h2>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Main Category<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="select"
                        name="main_categoryId"
                        onChange={(e) => handleonChange(e)}
                        value={accountData.main_categoryId}
                        placeholder="Select Main Category"
                      >
                        <option>Select Main Category</option>
                        {category.map((record, i) => {
                          return (
                            <option value={record._id}>{record.name}</option>
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
                        Category<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="select"
                        name="categoryId"
                        onChange={(e) => handleonChange(e)}
                        value={accountData.categoryId}
                        placeholder="Select Category"
                      >
                        <option>Select Category</option>
                        {subcategory.map((record, i) => {
                          return (
                            <option value={record._id}>{record.name}</option>
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
                        Category Name<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.name}
                        name="name"
                        placeholder="Enter Category Name"
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
                          onClick={() => history.push("/categoryList")}
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
                      onClick={() => history.push("/categoryList")}
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
