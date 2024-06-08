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

  const handleonChange = (e) => {
    let { name, value } = e.target;

    setaccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(accountData);

  const fetchData = async (id) => {
    ApiGet("/student/" + id)
      .then((res) => {
        setaccountData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/studentList");
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
    //       history.push("/studentList");
    //     } else {
    //       toast.error(err.message);
    //     }
    //   });

    getUpdate(false);
  };
  const componentConfig = {
    iconFiletypes: [".jpg", ".png"],
    showFiletypeIcon: true,
    postUrl: { postUrl: "no-url" },
  };
  const djsConfig = {
    uploadMultiple: true,
    addRemoveLinks: true,
    params: {
      myParameter: "I'm a parameter!",
    },
    acceptedFiles: "image/*",
    autoProcessQueue: false,
  };
  const eventHandlers = {
    addedfile: (file) => {
      file.previewElement.querySelector(".dz-progress").style.display = "none";
      file.previewElement.querySelector(".dz-success-mark").style.opacity = 1;

      const formData = new FormData();

      extra.push(file);

      formData.append("image", file);

      ApiUpload("upload/compress_image", formData)
        .then((res) => {
          setImage(res.data.data.image);
        })
        .catch((err) => {
          if (err.status == 410) {
            history.push("/postlist");
          } else {
            toast.error(err.message);
          }
        });
    },
    removedfile: () => {},
    drop: (file) => {},
    init: (dropZoneObj) => {},
  };

  const onSubmit = async (e) => {
    const body = {
      email: accountData.email,
      name: accountData.name,
      password: accountData.password,
      image: accountData.image,
      phoneNumber: accountData.phoneNumber,
      address: accountData.address,
      city: accountData.city,
      state: accountData.state,
      country: accountData.country,
      PINcode: accountData.PINcode,
      established_date: accountData.established_date,
      website: accountData.website,
    };
    console.log(body);

    ApiPost("/teacher/add", body)
      .then((res) => {
        toast.success(res.data.message);

        setTimeout(() => {
          history.push("/studentList");
        }, 2000);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/studentList");
        } else {
          toast.error(err.message);
        }
      });
  };
  const onUpdate = async (e) => {
    const idValue = queryString.parse(window.location.search);

    const body = {
      name: accountData.name,
      email: accountData.email,
      password: accountData.password,
      phoneNumber: accountData.phoneNumber,
      id: idValue.id,
    };
    console.log(body);

    ApiPut("/teacher/update", body)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          history.push("/studentList");
        }, 2000);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/studentList");
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
    ApiGet("/school")
      .then((res) => {
        setCategory(res.data.data);
        console.log("Sucess");
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/studentList");
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
                <Link to={"/studentList"}>User</Link>
              </BreadcrumbItem>
              {update === true ? (
                <BreadcrumbItem active>Add New User</BreadcrumbItem>
              ) : (
                <BreadcrumbItem active>Edit User</BreadcrumbItem>
              )}
            </Breadcrumb>
          </Col>
          <Card>
            <CardBody>
              <Form>
                <h2>
                  {update === true ? (
                    <b>Add New User</b>
                  ) : (
                    <b>Edit User</b>
                  )}
                </h2>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>
                       School<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="select"
                        name="schoolId"
                        onChange={(e) => handleonChange(e)}
                        value={accountData.schoolId}
                        placeholder="Select School"
                      >
                        <option>Select School</option>
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
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>
                        User Name<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.name}
                        name="name"
                        placeholder="Enter User Name"
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
                  <Col md={12}>
                    <FormGroup>
                      <Label>
                        User Email<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.email}
                        name="email"
                        placeholder="Enter User Email"
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
                        config={componentConfig}
                        eventHandlers={eventHandlers}
                        djsConfig={djsConfig}
                      />
                    </FormGroup>
                  </Col>
                </Row> */}

                {/* <Row>
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
                </Row> */}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
