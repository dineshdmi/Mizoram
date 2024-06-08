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
    let extra5 = content.filter((x, i) => i != j);
    setYourChips(extra5);
  };

  const handleChangeImage = (e) => {
    let { name } = e.target;
    if (name == "image") {
      console.log(e.target.files);
      let file = e.target.files[0];
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      setImage([file]);
    } else if (name == "pdf") {
      let file = e.target.files[0];
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      setPdf([file]);
    } else if (name == "audio") {
      let file = e.target.files[0];
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      setAudio([file]);
    } else if (name == "video") {
      let file = e.target.files[0];
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      setVideo([file]);
    } else if (name == "epub") {
      let file = e.target.files[0];
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      setepub([file]);
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

  const uploadePub = async () => {
    let extraepub = [];

    for (let i = 0; i < epubs.length; i++) {
      if (epubs[i].fileURL) {
        const formData = new FormData();
        formData.append("file", epubs[i]);

        await ApiUpload("upload/file_upload/pdf", formData)
          .then((res) => {
            extraepub.push(res.data.data.image);
          })
          .catch((err) => {
            if (err.status == 410) {
              history.push("/postlist");
            } else {
              toast.error(err.message);
            }
          });
      } else {
        extraepub.push(epubs[i]);
      }
    }
    return extraepub;
  };

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

  const fetchData = async (id) => {
    // ApiGet("admin/book/" + id)
    // ApiGet("/book/" + id)
    ApiGet("/content/" + id)
      .then((res) => {
        setaccountData(res.data.data);
        setYourChips(res.data.data.content);
        if (res.data.data.pdf) {
          setPdf([res.data.data.pdf]);
        }

        if (res.data.data.video) {
          setVideo([res.data.data.video]);
        }
        if (res.data.data.ePub) {
          setepub([res.data.data.ePub]);
        }
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

  const onSubmit = async (e) => {
    setbutton(true);
    enableLoading();

    const video = await uploadvideo();
    const ePub = await uploadePub();
    const pdf = await uploadpdf();

    console.log(pdf, video, ePub);

    let body = {
      title: accountData.title,
      content: content,
      pdf: pdf[0],
    };
    if (video[0]) body.video = video[0];
    if (ePub[0]) body.ePub = ePub[0];
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
  };
  const onUpdate = async (e) => {
    const pdf = await uploadpdf();
    const video = await uploadvideo();
    const ePub = await uploadePub();
    const idValue = queryString.parse(window.location.search);

    let body = {
      id: accountData._id,
      title: accountData.title,
      content: content,
      pdf: pdf[0],
    };
    if (video[0]) body.video = video[0];
    if (ePub[0]) body.ePub = ePub[0];
    console.log(body);

    ApiPut("/content/update", body)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          history.push("/contentList");
        }, 2000);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/contentList");
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
                        Book title<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.title}
                        name="title"
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
                        Book description
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <ChipInput
                        value={content}
                        onAdd={(chip) => handleAddChip(chip)}
                        onDelete={(chip, index) =>
                          handleDeleteChip(chip, index)
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <div className="d-flex  mb-1">
                    <div className="mb-2  col-md-4">
                      <label htmlFor="" className="textBlackfz16">
                        Book PDF
                      </label>
                      <div className="d-flex justify-content-end bgInput">
                        <label
                          for="formFileMultiple"
                          class="form-label"
                        ></label>
                        <input
                          accept="application/pdf"
                          class="form-control"
                          type="file"
                          id="formFileMultiple"
                          name="pdf"
                          value={data.pdf}
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
                        <img
                          src="media/logos/pdf.png"
                          style={{ height: "82px" }}
                        />
                      ))}
                    </div>
                    <div className="mb-2  col-md-4">
                      <label htmlFor="" className="textBlackfz16">
                        Book video
                      </label>
                      <div className="d-flex justify-content-end bgInput">
                        <label
                          for="formFileMultiple"
                          class="form-label"
                        ></label>
                        <input
                          accept="video/*"
                          class="form-control"
                          type="file"
                          id="formFileMultiple"
                          name="video"
                          value={data.video}
                          onChange={handleChangeImage}
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
                      {videos.map((record, i) => (
                        // <img src={record?.fileURL ? record.fileURL : record} />
                        <img
                          src="media/logos/mp4.png"
                          style={{ height: "82px" }}
                        />
                      ))}
                    </div>
                    <div className="mb-2  col-md-4">
                      <label htmlFor="" className="textBlackfz16">
                        Book ePub
                      </label>
                      <div className="d-flex justify-content-end bgInput">
                        <label
                          for="formFileMultiple"
                          class="form-label"
                        ></label>
                        <input
                          accept="application/epub+zip"
                          class="form-control"
                          type="file"
                          id="formFileMultiple"
                          name="epub"
                          value={data.ePub}
                          onChange={handleChangeImage}
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
                      {epubs.map((record, i) => (
                        // <img src={record?.fileURL ? record.fileURL : record} />
                        <img
                          src="media/logos/mp3.png"
                          style={{ height: "82px" }}
                        />
                      ))}
                    </div>
                  </div>
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
