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
  const [maincategory, setMainCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [genre, setGenre] = useState([]);
  const [data, setData] = useState([]);
  const [images, setImage] = useState([]);
  const [pdfs, setPdf] = useState([]);
  const [audios, setAudio] = useState([]);
  const [videos, setVideo] = useState([]);
  const [epubs, setepub] = useState([]);
  const [content, setYourChips] = useState([]);
  const [subject, setSubject] = useState([]);
  const [ID, setID] = useState([]);

  const [button, setbutton] = useState(false);
  const [show, setShow] = useState(false);
  const handleonChange = (e) => {
    let { name, value } = e.target;
    if (e.target.value == "true") {
      e.target.value = 0;
    } else {
      e.target.value = 1;
    }
    console.log(e.target.value);
    if (name === "video") {
      setShow(true);
    }
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

  const handleAddChip = (e) => {
    setYourChips((post) => [...post, e]);
  };
  const handleDeleteChip = (e, j) => {
    let extra5 = content.filter((x, i) => i != j);
    setYourChips(extra5);
  };

  const handleChangeImage = (e) => {
    let { name } = e.target;
    if (name == "video") {
      let file = e.target.files[0];
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      setVideo([file]);
    }
    if (name == "pdf") {
      let file = e.target.files[0];
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      setPdf([file]);
    }
  };

  const uploadpdf = async () => {
    let extrapdf = [];

    for (let i = 0; i < pdfs.length; i++) {
      if (pdfs[i].fileURL) {
        const formData = new FormData();
        formData.append("file", pdfs[i]);

        await ApiUpload("upload/file_upload/pdf", formData)
          .then((res) => {
            extrapdf.push(res.data.data.image);
          })
          .catch((err) => {
            if (err.status == 410) {
              history.push("/postlist");
            } else {
              toast.error(err.message);
            }
          });
      } else {
        extrapdf.push(pdfs[i]);
      }
    }
    return extrapdf;
  };

  // const uploadePub = async () => {
  //   let extraepub = [];

  //   for (let i = 0; i < epubs.length; i++) {
  //     if (epubs[i].fileURL) {
  //       const formData = new FormData();
  //       formData.append("file", epubs[i]);

  //       await ApiUpload("upload/file_upload/pdf", formData)
  //         .then((res) => {
  //           extraepub.push(res.data.data.image);
  //         })
  //         .catch((err) => {
  //           if (err.status == 410) {
  //             history.push("/postlist");
  //           } else {
  //             toast.error(err.message);
  //           }
  //         });
  //     } else {
  //       extraepub.push(epubs[i]);
  //     }
  //   }
  //   return extraepub;
  // };

  const uploadvideo = async () => {
    let extravideo = [];

    for (let i = 0; i < videos.length; i++) {
      if (videos[i].fileURL) {
        const formData = new FormData();
        formData.append("file", videos[i]);

        await ApiUpload("upload/file_upload/video", formData)
          .then((res) => {
            extravideo.push(res.data.data.image);
          })
          .catch((err) => {
            if (err.status == 410) {
              history.push("/postlist");
            } else {
              toast.error(err.message);
            }
          });
      } else {
        extravideo.push(videos[i]);
      }
    }
    return extravideo;
  };

  const fetchData = (id) => {
    // ApiGet("admin/book/" + id)
    // ApiGet("/book/" + id)
    ApiGet("/content/" + id)
      .then((res) => {
        setShow(true);
        console.log(res.data.data);
        setaccountData(res.data.data);
        setYourChips(res.data.data.content);
        if (res.data.data.pdf) {
          setPdf([res.data.data.pdf]);
        }

        if (res.data.data.video) {
          setVideo([res.data.data.video]);
        }
        // if (res.data.data.ePub) {
        //   setepub([res.data.data.ePub]);
        // }
        console.log(res.data.data);
      })

      .catch((err) => {
        if (err.status == 410) {
          history.push("/contentList");
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
    if (!accountData.subjectId) {
      console.log("a");
      formIsValid = false;
      errors["subjectId"] = "*Please select course";
    }
    if (!accountData.title) {
      console.log("b");
      formIsValid = false;
      errors["title"] = "*Please enter title";
    }
    if (content.length === 0) {
      console.log("c");
      formIsValid = false;
      errors["content"] = "*Please enter at list one content";
    }

    setError(errors);

    return formIsValid;
  };

  const onSubmit = async (e) => {
    if (validateForm()) {
      setbutton(true);
      enableLoading();
      console.log("first");
      // const video = await uploadvideo();
      // const ePub = await uploadePub();
      try {
        const pdf = await uploadpdf();
        let videotemp = accountData.video;
        console.log("second");

        let trimVideo = videotemp?.trim();
        console.log("third");

        // console.log(pdf, video, ePub);

        let body = {
          subjectId: accountData.subjectId,
          title: accountData.title,
          content: content,
          video: trimVideo,
          pdf: pdf[0],
        };
        // if (accountData.video) body.accountData.video = trimVideo;
        console.log("four");
        // if (ePub[0]) body.ePub = ePub[0];
        console.log(body);
        console.log(content);

        ApiPost("/content/add", body)
          .then((res) => {
            toast.success(res.data.message);
            disableLoading();
            setbutton(false);
            setTimeout(() => {
              history.push("/contentList");
            }, 2000);
          })
          .catch((err) => {
            disableLoading();
            setbutton(false);

            if (err.status == 410) {
              history.push("/contentList");
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
        const pdf = await uploadpdf();
        let videotemp = accountData.video;
        let trimVideo = videotemp?.trim();
        // const ePub = await uploadePub();
        const idValue = queryString.parse(window.location.search);

        let body = {
          id: accountData._id,
          subjectId: accountData.subjectId,
          title: accountData.title,
          content: content,
          pdf: pdf[0],
        };
        if (accountData.video) body.video = trimVideo;
        console.log(body);

        ApiPut("/content/update", body)
          .then((res) => {
            toast.success(res.data.message);
            disableLoading();
            setbutton(false);
            setTimeout(() => {
              history.push("/contentList");
            }, 2000);
          })
          .catch((err) => {
            disableLoading();
            setbutton(false);
            if (err.status == 410) {
              history.push("/contentList");
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
      setID(idValue.id);
      fetchData(idValue.id);
    }
  }, []);

  useEffect(() => {
    ApiGet("/course_subject/" + ID)
      .then((res) => {
        setSubject(res.data.data);
        console.log("subject", res.data.data);
      })

      .catch((err) => {
        if (err.status == 410) {
          history.push("/contentList");
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
                <Link to={"/contentList"}>Content</Link>
              </BreadcrumbItem>
              {update === true ? (
                <BreadcrumbItem active>Add new content</BreadcrumbItem>
              ) : (
                <BreadcrumbItem active>Edit content</BreadcrumbItem>
              )}
            </Breadcrumb>
          </Col>
          <Card>
            <CardBody>
              <Form>
                <h2>
                  {update === true ? (
                    <b>Add new content</b>
                  ) : (
                    <b>Edit content</b>
                  )}
                </h2>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>
                        Select course<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="select"
                        onChange={handleonChange}
                        value={accountData.subjectId}
                        name="subjectId"
                        placeholder="Enter Subject Name"
                        required
                      >
                        <option>Select course</option>
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
                  <Col md={12}>
                    <FormGroup>
                      <Label>
                        Section title<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.title}
                        name="title"
                        placeholder="Enter Section title"
                        required
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["title"]}
                      </span>
                    </FormGroup>
                  </Col>

                  <Col md={12}>
                    <FormGroup className="d-flex flex-column">
                      <Label>
                        Content ( Press enter to add multiple content )
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <ChipInput
                        value={content}
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
                        {errors["content"]}
                      </span>
                    </FormGroup>
                  </Col>
                </Row>

                <div className="d-flex">
                  <div className="mb-2  col-md-6">
                    <label htmlFor="" className="textBlackfz16">
                      Traning video
                    </label>
                    <div className="d-flex justify-content-end bgInput">
                      <label for="formFileMultiple" class="form-label"></label>
                      <input
                        accept="video/*"
                        class="form-control"
                        type="text"
                        id="formFileMultiple"
                        name="video"
                        placeholder="Ex : example.mp4"
                        value={
                          accountData?.video?.split("/")[
                            accountData.video.split("/")?.length - 1
                          ]
                        }
                        onChange={handleonChange}
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["email"]}
                      </span>
                    </div>

                    {show === true && (
                      <a
                        href={videos.fileURL ? videos.fileURL : Bucket + videos}
                        target="_blank"
                      >
                        <img
                          src="media/logos/mp4.png"
                          style={{ height: "82px" }}
                        />
                      </a>
                    )}
                  </div>
                  <div className="mb-2  col-md-6">
                    <label htmlFor="" className="textBlackfz16">
                      Content PDF
                    </label>
                    <div className="d-flex justify-content-end bgInput">
                      <label for="formFileMultiple" class="form-label"></label>
                      <input
                        accept="application/pdf"
                        class="form-control"
                        type="file"
                        id="formFileMultiple"
                        name="pdf"
                        // value={data.pdf}
                        onChange={handleChangeImage}
                      />
                      {/* <img src={images} alt="" /> */}
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["email"]}
                      </span>
                    </div>
                    {pdfs.map((record, i) => (
                      <>
                        <div>
                          <a
                            href={
                              record.fileURL ? record.fileURL : Bucket + record
                            }
                            target="_blank"
                          >
                            <img
                              src="media/logos/pdf.png"
                              style={{ height: "82px" }}
                            />
                          </a>
                        </div>
                      </>
                    ))}
                  </div>
                </div>

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
                          onClick={() => history.push("/contentList")}
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
