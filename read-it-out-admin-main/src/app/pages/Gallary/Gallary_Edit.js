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

const position = {
  maxWidth: "1322px",
  marginTop: "0px",
  marginBottom: "2%",
};

let extra;
export default function Gallary_Edit() {
  const history = useHistory();
  const [accountData, setaccountData] = useState({});
  const [errors, setError] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [update, getUpdate] = useState(true);
  const [images, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false)

  const handleonChange = (e) => {
    let { name, value, files } = e.target;

    if (name === 'image') {
      let file = files[0];
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      // }
      console.log(file);
      setImage(file);
    }


  };

  const fetchData = async (id) => {
    ApiGet("/gallery/" + id)
      .then((res) => {
        setImage(res.data.data?.image)
      })
      .catch((err) => {
        if (err.status === 410) {
          history.push("/postlist");
        } else {
          toast.error(err.message);
        }
      });

    getUpdate(false);
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;


    if (images.length === 0) {
      console.log("n");
      formIsValid = false;
      errors["image"] = "*Please enter image";
    }

    setError(errors);
    return formIsValid;
  };

  const uploadimage = async () => {
    // console.log("image");
    let extraimage = '';

    if (images.fileURL) {
      const formData = new FormData();
      formData.append("image", images);

      await ApiUpload("upload/gallery", formData)
        .then((res) => {
          extraimage = res.data.data.image;
        })
        .catch((err) => {
          if (err.status == 410) {
            history.push("/postlist");
          } else {
            toast.error(err.message);
          }
        });
    } else {
      extraimage = images;
    }

    return extraimage;
  };

  const onSubmit = async (e) => {
    setIsLoading(true)
    if (validateForm()) {
      try {
        const image = await uploadimage();
        const body = {
          image,
        };

        ApiPost("/gallery/add", body)
          .then((res) => {
            history.push("/gallery");
            toast.success(res.data.message);
            setIsLoading(false)
          })
          .catch((err) => {
            setIsLoading(false)
            if (err.status === 410) {
              history.push("/gallery");
            } else {
              toast.error(err.message);
            }
          });
      } catch (err) { setIsLoading(false) }
    }
  };

  const onUpdate = async (e) => {
    setIsLoading(true)
    const idValue = queryString.parse(window.location.search);
    const image = await uploadimage();
    // if (validateForm()) {
    //   try {
    //     if (setimage.length != 0) {
    //       accountData.image = setimage;
    //     }

    const body = {
      image: image,
      id: idValue.id,
      // image: accountData.image,
      name: accountData.name,
    };
    console.log(body);

    ApiPut("/main_category/update", body)
      .then((res) => {

        history.push("/gallery");
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        if (err.status === 410) {
          history.push("/postlist");
          toast.success("Congrats");
        } else {
          toast.error(err.message);
        }
      });
    //   } catch (err) {}
    // }
  };

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userinfo"))[0]);
    const idValue = queryString.parse(window.location.search);

    extra = [];

    if (
      idValue.id ||
      !idValue.id === undefined ||
      !idValue.id === "undefined"
    ) {
      fetchData(idValue.id);
    }

  }, []);
  console.log('images', images)
  return (
    <Container style={position}>
      <ToastContainer position="top-right" />
      <Row>
        <Col md={12}>
          <Col md={12}>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to={"/gallery"}>Photo</Link>
              </BreadcrumbItem>
              {update === true ? (
                <BreadcrumbItem active>Add Photo</BreadcrumbItem>
              ) : (
                <BreadcrumbItem active>Edit Photo</BreadcrumbItem>
              )}
            </Breadcrumb>
          </Col>
          <Card>
            <CardBody>
              <Form>
                <h2>
                  {update === true ? (
                    <b>Add Photo</b>
                  ) : (
                    <b>Edit Photo</b>
                  )}
                </h2>

                <Row>


                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Image
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="file"
                        onChange={handleonChange}
                        // value={accountData.name}
                        accept="image/gif, image/jpeg, image/png"
                        className="form-control"
                        name="image"
                        placeholder="Enter Main Category Name"
                        required
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["image"]}
                      </span>
                      <img
                        width="100px"
                        src={
                          images?.fileURL ? images.fileURL : Bucket + images
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  {update === true ? (
                    <>
                      <Col className="d-flex justify-content-center">
                        <Button
                          onClick={onSubmit}
                          disabled={isLoading}
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
                          onClick={() => history.push("/gallery")}
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
                        disabled={isLoading}
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
