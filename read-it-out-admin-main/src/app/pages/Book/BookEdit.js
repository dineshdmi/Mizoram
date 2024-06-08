import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  ApiPost,
  ApiGet,
  ApiPut,
  ApiUpload,
  Bucket,
} from "../../../helpers/API/ApiData";
import queryString from "query-string";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import { toast } from "react-toastify";
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
import { FormControl } from "react-bootstrap";
const position = {
  maxWidth: "1322px",
  marginTop: "0px",
  marginBottom: "2%",
};
var extra = [];
export default function CreateSubCategory() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [accountData, setaccountData] = useState([]);
  const [errors, setError] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [update, getUpdate] = useState(true);
  const [maincategory, setMainCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [genre, setGenre] = useState([]);
  const [auditor, setAuditor] = useState([]);
  const [data, setData] = useState([]);
  const [images, setImage] = useState([]);
  const [pdfs, setPdf] = useState([]);
  const [previews, setPreview] = useState([]);
  const [previewsVideo, setPreviewVideo] = useState("");
  const [audios, setAudio] = useState([]);
  const [videos, setVideo] = useState("");
  const [epubs, setepub] = useState([]);
  const [button, setbutton] = useState(false);
  const [show, setShow] = useState(false);

  let videoTrim = accountData.video;
  console.log("videoTrim", videoTrim);
  console.log("accountData.isFree", accountData);

  const userData = JSON.parse(localStorage.getItem("userinfo"));
  console.log("userData", userData);
  // let trimVideo = videoTrim.trim();
  // console.log("trimVideo", trimVideo);
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

    // let { name, value } = e.target;
    if (name === "main_categoryId") {
      callsubcategory(value);
      // setData({ ...data });
    } else if (name === "categoryId") {
      callcategory(value);
      // setData({ ...data });
    } else {
      setaccountData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const callsubcategory = (value) => {
    ApiGet("/main_category/category/" + value)
      .then((res) => {
        console.log(res);
        setCategory(res.data.data);
      })
      .catch((err) => {
        if (err.status == 502) {
          //   toast.error(err.message);
        } else {
          //   toast.error(err.message);
        }
      });
  };
  const callcategory = (value) => {
    ApiGet("/category/sub_category/" + value)
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

  console.log("videos", videos);

  console.log(accountData);
  const handleChangeImage = (e) => {
    let { name } = e.target;
    if (name == "image") {
      console.log(e.target.files);
      let file = e.target.files[0];
      // const fileArray = Array.from(e.target.files).map((file) =>
      //   URL.createObjectURL(file)
      // );
      // uploadImg(fileArray);
      // for(let i=0;i<e.target.files.length;i++){
      // console.log(e.target.files[i])
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      // }
      setImage([file]);
      // let fileURL = URL.createObjectURL(file);
      // file.fileURL = fileURL;
      // setImage((preImg) => preImg.concat(fileArray));
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
    } else if (name == "preview") {
      let file = e.target.files[0];
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      setPreview([file]);
    }
  };
  console.log(images);

  const uploadimage = async () => {
    // console.log("image");
    let extraimage = [];

    for (let i = 0; i < images.length; i++) {
      if (images[i].fileURL) {
        const formData = new FormData();
        formData.append("image", images[i]);

        await ApiUpload("upload/book", formData)
          .then((res) => {
            extraimage.push(res.data.data.image);
          })
          .catch((err) => {
            if (err.status == 410) {
              history.push("/postlist");
            } else {
              toast.error(err.message);
            }
          });
      } else {
        extraimage.push(images[i]);
      }
    }
    return extraimage;
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

  const uploadpreview = async () => {
    let extrapreview = [];

    for (let i = 0; i < previews.length; i++) {
      if (previews[i].fileURL) {
        const formData = new FormData();
        formData.append("file", previews[i]);

        await ApiUpload("upload/file_upload/pdf", formData)
          .then((res) => {
            extrapreview.push(res.data.data.image);
          })
          .catch((err) => {
            if (err.status == 410) {
              history.push("/postlist");
            } else {
              toast.error(err.message);
            }
          });
      } else {
        extrapreview.push(previews[i]);
      }
    }
    return extrapreview;
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

  const uploadaudio = async () => {
    let extraaudio = [];

    for (let i = 0; i < audios.length; i++) {
      if (audios[i].fileURL) {
        const formData = new FormData();
        formData.append("file", audios[i]);

        await ApiUpload("upload/file_upload/audio", formData)
          .then((res) => {
            extraaudio.push(res.data.data.image);
          })
          .catch((err) => {
            if (err.status == 410) {
              history.push("/postlist");
            } else {
              toast.error(err.message);
            }
          });
      } else {
        extraaudio.push(audios[i]);
      }
    }
    return extraaudio;
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
    ApiGet("/book/" + id)
      .then((res) => {
        setShow(true);
        if (res.data.data.isFree == true) {
          res.data.data.isFree = "true";
        } else if (res.data.data.isFree == false) {
          res.data.data.isFree = "false";
        }
        console.log("GetBook", res.data.data);
        setaccountData(res.data.data);
        if (res.data.data.image) {
          setImage([res.data.data.image]);
        }
        if (res.data.data.pdf) {
          setPdf([res.data.data.pdf]);
        }
        if (res.data.data.audio) {
          setAudio([res.data.data.audio]);
        }
        if (res.data.data.video) {
          setVideo(res.data.data.video);
        }
        if (res.data.data.ePub) {
          setepub([res.data.data.ePub]);
        }
        if (res.data.data.preview) {
          setPreview([res.data.data.preview]);
        }
        if (res.data.data.preview_video) {
          setPreviewVideo(res.data.data.preview_video);
        }
        console.log(res.data.data);
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
    console.log("valid");
    let errors = {};
    let formIsValid = true;
    if (!accountData.main_categoryId) {
      console.log("a");
      formIsValid = false;
      errors["main_categoryId"] = "*Please enter main category";
    }
    if (!accountData.categoryId) {
      console.log("b");
      formIsValid = false;
      errors["categoryId"] = "*Please enter category";
    }
    if (!accountData.genreId) {
      console.log("e");
      formIsValid = false;
      errors["genreId"] = "*Please enter genre";
    }
    if (!accountData.title) {
      console.log("f");
      formIsValid = false;
      errors["title"] = "*Please enter title";
    }
    if (!accountData.author) {
      console.log("g");
      formIsValid = false;
      errors["author"] = "*Please enter author name";
    }
    if (!accountData.description) {
      console.log("h");
      formIsValid = false;
      errors["description"] = "*Please enter description";
    }
    if (!accountData.page) {
      console.log("i");
      formIsValid = false;
      errors["page"] = "*Please enter page";
    }
    if (!accountData.published_date) {
      console.log("j");
      formIsValid = false;
      errors["published_date"] = "*Please enter date";
    }
    if (accountData.isFREE === "true") {
      if (!accountData.cost) {
        console.log("k");
        formIsValid = false;
        errors["cost"] = "*Please enter price";
      }
    }
    // if (!accountData.auditorId) {
    //   console.log("l");
    //   formIsValid = false;
    //   errors["publisher"] = "*Please enter publisher";
    // }
    if (!accountData.publishers) {
      console.log("p");
      formIsValid = false;
      errors["publishers"] = "*Please enter publisher name";
    }
    if (!accountData.edition) {
      console.log("m");
      formIsValid = false;
      errors["edition"] = "*Please enter edition";
    }

    if (images.length === 0) {
      console.log("n");
      formIsValid = false;
      errors["image"] = "*Please enter image";
    }

    // if (audios.length === 0) {
    //   console.log("o");
    //   formIsValid = false;
    //   errors["audio"] = "*Please Enter Audio";
    // }
    // if (videos.length === 0) {
    //   console.log("p");
    //   formIsValid = false;
    //   errors["video"] = "*Please Enter Video";
    // }
    // if (ePubs.length === 0) {
    //   console.log("p");
    //   formIsValid = false;
    //   errors["ePub"] = "*Please Enter Video";
    // }

    setError(errors);
    console.log("valid1");
    console.log(formIsValid);
    return formIsValid;
  };

  const onSubmit = async (e) => {
    // debugger;
    console.log("hhhhhh");
    if (validateForm()) {
      console.log("if");
      setbutton(true);
      enableLoading();
      try {
        console.log("ffffffffffffffff", accountData.video);
        const image = await uploadimage();
        const pdf = await uploadpdf();
        const audio = await uploadaudio();
        // const video = await uploadvideo();
        const ePub = await uploadePub();
        // const preview = await uploadpreview();
        console.log(image, pdf, audio, ePub);
        // console.log("VIDEO", video);
        var isFREE;
        let videotemp = accountData.video;
        let trimVideo = videotemp?.trim();

        let prevideotemp = accountData.preview_video;
        let pretrimVideo = prevideotemp?.trim();
        console.log("trim", trimVideo);
        console.log("pretrim", pretrimVideo);
        if (accountData.isFree == "true") {
          isFREE = true;
        } else {
          isFREE = false;
        }
        let body = {
          main_categoryId: accountData.main_categoryId,
          categoryId: accountData.categoryId,
          subCategoryId: accountData.subCategoryId,
          genreId: accountData.genreId,
          title: accountData.title,
          author: accountData.author,
          description: accountData.description,
          pdf: pdf[0],
          page: accountData.page,
          published_date: accountData.published_date,
          // auditorId: accountData.auditorId,
          // isFree: true,
          image: image[0],
          publishers: accountData.publisher,
          edition: accountData.edition,
        };
        if (accountData.video) body.video = trimVideo;
        if (accountData.preview_video) body.preview_video = pretrimVideo;
        if (audio[0]) body.audio = audio[0];
        if (ePub[0]) body.ePub = ePub[0];
        // if (preview[0]) body.preview = preview[0];
        if (!isFREE) body.cost = accountData.cost;
        console.log("submitt", body);
        console.log("sssssssssssssssssss");

        ApiPost("/book/add", body)
          .then((res) => {
            toast.success(res.data.message);
            disableLoading();
            setbutton(false);
            history.push("/bookList");
          })
          .catch((err) => {
            disableLoading();
            setbutton(false);

            if (err.status == 410) {
              history.push("/bookList");
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
      const image = await uploadimage();
      const pdf = await uploadpdf();
      const audio = await uploadaudio();
      // const video = await uploadvideo();
      const ePub = await uploadePub();
      const preview = await uploadpreview();

      const idValue = queryString.parse(window.location.search);
      var isFREE;

      if (accountData.isFree == "true") {
        isFREE = true;
      } else {
        isFREE = false;
      }
      let fetchURL = accountData?.video?.split("/")[
        accountData.video.split("/")?.length - 1
      ];
      let videotemps = fetchURL ? fetchURL : accountData.video;
      let trimVideos = videotemps?.trim();
      console.log("trimVideos", trimVideos);

      let fetchPreviewVideo = accountData?.preview_video?.split("/")[
        accountData.preview_video.split("/")?.length - 1
      ];
      let prevideotemp = fetchPreviewVideo
        ? fetchPreviewVideo
        : accountData.preview_video;
      let pretrimVideo = prevideotemp?.trim();
      console.log("pretrimVideo", pretrimVideo);

      let body = {
        id: accountData._id,
        main_categoryId: accountData.main_categoryId,
        categoryId: accountData.categoryId,
        genreId: accountData.genreId,
        title: accountData.title,
        author: accountData.author,
        description: accountData.description,
        pdf: pdf[0],
        // auditorId: accountData.auditorId,
        page: accountData.page,
        // cost: isFREE === true ? 0 : accountData.cost,
        published_date: accountData.published_date,
        image: image[0],

        // publishers: accountData.publisher,
        edition: accountData.edition,
      };
      if (accountData.video) body.video = trimVideos;
      if (accountData.preview_video) body.preview_video = pretrimVideo;
      if (audio[0]) body.audio = audio[0];
      if (ePub[0]) body.ePub = ePub[0];
      if (preview[0]) body.preview = preview[0];

      if (!isFREE) body.cost = accountData.cost;
      console.log(body);

      ApiPut("/book/update", body)
        .then((res) => {
          toast.success(res.data.message);
          disableLoading();
          setbutton(false);
          history.push("/bookList");
        })
        .catch((err) => {
          disableLoading();
          setbutton(false);
          if (err.status == 410) {
            history.push("/bookList");
            toast.success("Congrats");
          } else {
            toast.error(err.message);
          }
        });
    } else {
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
    ApiGet("/main_category")
      .then((res) => {
        setMainCategory(res.data.data);
        console.log("Sucess");
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/bookList");
        } else {
          toast.error(err.message);
        }
      });
    ApiGet("/category")
      .then((res) => {
        setCategory(res.data.data);
        console.log("Sucess");
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/bookList");
        } else {
          toast.error(err.message);
        }
      });
    ApiGet("/sub_category")
      .then((res) => {
        setSubCategory(res.data.data);
        console.log("Sucess");
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/bookList");
        } else {
          toast.error(err.message);
        }
      });
    ApiGet("/genre")
      .then((res) => {
        setGenre(res.data.data);
        console.log("Sucess");
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/bookList");
        } else {
          toast.error(err.message);
        }
      });
    ApiGet("/auditor")
      .then((res) => {
        setAuditor(res.data.data);
        console.log("Success");
        console.log("auditor", res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/bookList");
        } else {
          toast.error(err.message);
        }
      });
  }, []);

  return (
    <Container style={position}>
      <Row>
        <Col md={12}>
          <Col md={12}>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to={"/bookList"}>Book</Link>
              </BreadcrumbItem>
              {update === true ? (
                <BreadcrumbItem active>Add new book</BreadcrumbItem>
              ) : (
                <BreadcrumbItem active>Edit book</BreadcrumbItem>
              )}
            </Breadcrumb>
          </Col>
          <Card>
            <CardBody>
              <Form>
                <h2>
                  {update === true ? <b>Add new book</b> : <b>Edit book</b>}
                </h2>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Main category<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="select"
                        name="main_categoryId"
                        onChange={(e) => handleonChange(e)}
                        value={accountData.main_categoryId}
                        placeholder="Select Main Category"
                      >
                        <option>Select Main Category</option>
                        {maincategory.map((record, i) => {
                          return (
                            <option value={record._id}>{record.name}</option>
                          );
                        })}
                      </Input>
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["main_categoryId"]}
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
                        onChange={handleonChange}
                        value={accountData.categoryId}
                        placeholder="Select Category"
                      >
                        <option>Select Category</option>
                        {category.map((record, i) => {
                          return (
                            <option value={record._id}>{record.name}</option>
                          );
                        })}
                      </Input>
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["categoryId"]}
                      </span>
                    </FormGroup>
                  </Col>
                  {/* <Col md={6}>
                    <FormGroup>
                      <Label>
                        Sub category<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="select"
                        name="subCategoryId"
                        onChange={(e) => handleonChange(e)}
                        value={accountData.subCategoryId}
                        placeholder="Select Sub Category"
                      >
                        <option>Select Sub Category</option>
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
                        {errors["subCategoryId"]}
                      </span>
                    </FormGroup>
                  </Col> */}
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Genre<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="select"
                        name="genreId"
                        onChange={(e) => handleonChange(e)}
                        value={accountData.genreId}
                        placeholder="Select Genre"
                      >
                        <option>Select Genre</option>
                        {genre.map((record, i) => {
                          return (
                            <option value={record._id}>{record.name}</option>
                          );
                        })}
                      </Input>
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["genreId"]}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
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
                        {errors["title"]}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Book author<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.author}
                        name="author"
                        placeholder="Enter Book Author"
                        required
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["author"]}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Book description
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="textarea"
                        onChange={handleonChange}
                        value={accountData.description}
                        name="description"
                        placeholder="Enter Book Description"
                        required
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
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Number of pages
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="number"
                        onChange={handleonChange}
                        value={accountData.page}
                        name="page"
                        placeholder="Enter Number of Pages"
                        required
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["page"]}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Book published date
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="date"
                        onChange={handleonChange}
                        value={accountData.published_date}
                        name="published_date"
                        placeholder="Enter Book Published Date"
                        required
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["published_date"]}
                      </span>
                    </FormGroup>
                  </Col>
                </Row>
                {/* <Row>
                  <Col md={6}>
                    <Label>
                      Book is free ?<span style={{ color: "red" }}> * </span>
                    </Label>
                    <RadioGroup
                      aria-label="isFree"
                      name="isFree"
                      value={accountData.isFree}
                      onChange={(e) => handleonChange(e)}
                      defaultValue="true"
                    >
                      <Row>
                        <Col md="2">
                          <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label="Yes"
                            // checked={accountData.isFree === "true"}
                            // defaultChecked={true}
                          />
                        </Col>
                        <Col md="2">
                          <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label="No"
                            checked={accountData.isFree === "false"}
                          />
                        </Col>
                      </Row>
                    </RadioGroup>
                  </Col>
                  {accountData.isFree == "false" ? (
                    <Col md={6}>
                      <FormGroup>
                        <Label>
                          Book price
                          <span style={{ color: "red" }}> * </span>
                        </Label>
                        <Input
                          type="text"
                          onChange={handleonChange}
                          value={accountData.cost}
                          name="cost"
                          placeholder="Enter Book Cost"
                          required
                        />
                        <span
                          style={{
                            color: "red",

                            top: "5px",
                            fontSize: "10px",
                          }}
                        >
                          {errors["cost"]}
                        </span>
                      </FormGroup>
                    </Col>
                  ) : (
                    ""
                  )}
                </Row> */}
                <Row>
                  {userData.userType !== 4 && (
                    // <Col md={6}>
                    //   <FormGroup>
                    //     <Label>
                    //       Publisher
                    //       <span style={{ color: "red" }}>*</span>
                    //     </Label>
                    //     <Input
                    //       type="select"
                    //       onChange={handleonChange}
                    //       value={accountData.auditorId}
                    //       defaultValue="n"
                    //       name="auditorId"
                    //       placeholder="Select Publisher"
                    //     >
                    //       <option value="n" disabled>
                    //         Select Publisher
                    //       </option>
                    //       {auditor.map((record, i) => {
                    //         return (
                    //           <option value={record._id}>{record.name}</option>
                    //         );
                    //       })}
                    //     </Input>
                    //     <span
                    //       style={{
                    //         color: "red",

                    //         top: "5px",
                    //         fontSize: "10px",
                    //       }}
                    //     >
                    //       {errors["publisher"]}
                    //     </span>
                    //   </FormGroup>
                    // </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>
                          Publisher
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="text"
                          onChange={handleonChange}
                          value={accountData.publishers}
                          name="publishers"
                          placeholder="Enter Publisher"
                          required
                        />
                        <span
                          style={{
                            color: "red",
                            top: "5px",
                            fontSize: "10px",
                          }}
                        >
                          {errors["publishers"]}
                        </span>
                      </FormGroup>
                    </Col>
                  )}
                  <Col md={userData.userType === 4 ? 12 : 6}>
                    <FormGroup>
                      <Label>
                        Edition
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={accountData.edition}
                        name="edition"
                        placeholder="Enter Edition"
                        required
                      />
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["edition"]}
                      </span>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col md={6}>
                    <label htmlFor="" className="textBlackfz16">
                      Book cover image
                      <span style={{ color: "red" }}> * </span>
                    </label>
                    <div className="d-flex justify-content-end bgInput">
                      <label for="formFileMultiple" class="form-label"></label>
                      <input
                        accept="image/gif, image/jpeg, image/png"
                        class="form-control"
                        type="file"
                        id="formFileMultiple"
                        multiple
                        name="image"
                        // value={accountData.image}
                        onChange={handleChangeImage}
                      />
                    </div>
                    <span
                      style={{
                        color: "red",

                        top: "5px",
                        fontSize: "10px",
                      }}
                    >
                      {errors["image"]}
                    </span>
                    {images.map((record, i) => (
                      <img
                        width="100px"
                        src={record?.fileURL ? record.fileURL : Bucket + record}
                      />
                    ))}
                  </Col>
                  <Col md={6}>
                    <label htmlFor="" className="textBlackfz16">
                      Book audio
                    </label>
                    <div className="d-flex justify-content-end bgInput">
                      <label for="formFileMultiple" class="form-label"></label>
                      <input
                        accept="audio/*"
                        class="form-control"
                        type="file"
                        id="formFileMultiple"
                        name="audio"
                        // value={accountData.audio}
                        onChange={handleChangeImage}
                      />
                    </div>
                    {audios.map((record, i) => (
                      // <img src={record?.fileURL ? record.fileURL : record} />

                      <a
                        href={record.fileURL ? record.fileURL : Bucket + record}
                        target="_blank"
                      >
                        <img
                          src="media/logos/mp3.png"
                          style={{ height: "82px" }}
                        />
                      </a>
                    ))}
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col md={6}>
                    <label htmlFor="" className="textBlackfz16">
                      Book ePub
                    </label>
                    <div className="d-flex justify-content-end bgInput">
                      <label for="formFileMultiple" class="form-label"></label>
                      <input
                        accept="application/epub+zip"
                        class="form-control"
                        type="file"
                        id="formFileMultiple"
                        name="epub"
                        // value={accountData.ePub}
                        onChange={handleChangeImage}
                      />
                    </div>
                    {epubs.map((record, i) => (
                      // <img src={record?.fileURL ? record.fileURL : record} />

                      <a
                        href={record.fileURL ? record.fileURL : Bucket + record}
                        target="_blank"
                      >
                        <img
                          src="media/logos/ePub.png"
                          style={{ height: "82px" }}
                        />
                      </a>
                    ))}
                  </Col>
                  <Col>
                    <label htmlFor="" className="textBlackfz16">
                      Preview PDF
                    </label>
                    <div className="d-flex justify-content-end bgInput">
                      <label for="formFileMultiple" class="form-label"></label>
                      <input
                        accept="application/pdf"
                        class="form-control"
                        type="file"
                        id="formFileMultiple"
                        name="preview"
                        // value={accountData.preview}
                        onChange={handleChangeImage}
                      />
                    </div>
                    {previews.map((record, i) => (
                      // <img src={record?.fileURL ? record.fileURL : record} />

                      <a
                        href={record.fileURL ? record.fileURL : Bucket + record}
                        target="_blank"
                      >
                        <img
                          src="media/logos/pdf.png"
                          style={{ height: "82px" }}
                        />
                      </a>
                    ))}
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col md={6}>
                    <label htmlFor="" className="textBlackfz16">
                      Book PDF
                    </label>
                    <div className="d-flex justify-content-end bgInput">
                      <label for="formFileMultiple" class="form-label"></label>
                      <input
                        accept="application/pdf"
                        class="form-control"
                        type="file"
                        id="formFileMultiple"
                        name="pdf"
                        // value={accountData.pdf}
                        onChange={handleChangeImage}
                      />
                      {/* <img src={images} alt="" /> */}
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
                  </Col>
                </Row>
                {/* <div className="container-fluid">
                  <div className="d-flex  mb-1">
                    <div className="mb-2  col-md-4">
                      <label htmlFor="" className="textBlackfz16">
                        Book cover image
                        <span style={{ color: "red" }}> * </span>
                      </label>
                      <div className="d-flex justify-content-end bgInput">
                        <label
                          for="formFileMultiple"
                          class="form-label"
                        ></label>
                        <input
                          accept="image/gif, image/jpeg, image/png"
                          class="form-control"
                          type="file"
                          id="formFileMultiple"
                          multiple
                          name="image"
                          // value={accountData.image}
                          onChange={handleChangeImage}
                        />
                      </div>
                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["image"]}
                      </span>
                      {images.map((record, i) => (
                        <img
                          width="100px"
                          src={
                            record?.fileURL ? record.fileURL : Bucket + record
                          }
                        />
                      ))}
                    </div>
                    <div className="mb-2  col-md-4">
                      <label htmlFor="" className="textBlackfz16">
                        Book audio
                      </label>
                      <div className="d-flex justify-content-end bgInput">
                        <label
                          for="formFileMultiple"
                          class="form-label"
                        ></label>
                        <input
                          accept="audio/*"
                          class="form-control"
                          type="file"
                          id="formFileMultiple"
                          name="audio"
                          // value={accountData.audio}
                          onChange={handleChangeImage}
                        />
                      </div>
                      {audios.map((record, i) => (
                        // <img src={record?.fileURL ? record.fileURL : record} />

                        <a
                          href={
                            record.fileURL ? record.fileURL : Bucket + record
                          }
                          target="_blank"
                        >
                          <img
                            src="media/logos/mp3.png"
                            style={{ height: "82px" }}
                          />
                        </a>
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
                          // value={accountData.ePub}
                          onChange={handleChangeImage}
                        />
                      </div>
                      {epubs.map((record, i) => (
                        // <img src={record?.fileURL ? record.fileURL : record} />

                        <a
                          href={
                            record.fileURL ? record.fileURL : Bucket + record
                          }
                          target="_blank"
                        >
                          <img
                            src="media/logos/ePub.png"
                            style={{ height: "82px" }}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="d-flex  mb-1">
                    <div className="mb-2  col-md-6">
                      <label htmlFor="" className="textBlackfz16">
                        Preview PDF
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
                          name="preview"
                          // value={accountData.preview}
                          onChange={handleChangeImage}
                        />
                      </div>
                      {previews.map((record, i) => (
                        // <img src={record?.fileURL ? record.fileURL : record} />

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
                      ))}
                    </div>
                    <div className="mb-2  col-md-6">
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
                          // value={accountData.pdf}
                          onChange={handleChangeImage}
                        />
                        <img src={images} alt="" />
                      </div>
                      {pdfs.map((record, i) => (
                        <>
                          <div>
                            <a
                              href={
                                record.fileURL
                                  ? record.fileURL
                                  : Bucket + record
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
                  <div className="d-flex  mb-1">
                    <div className="mb-2  col-md-6">
                      <label htmlFor="" className="textBlackfz16">
                        Preview video
                      </label>
                      <div className="d-flex justify-content-end bgInput">
                        <label
                          for="formFileMultiple"
                          class="form-label"
                        ></label>
                        <input
                          accept="video/*"
                          class="form-control"
                          type="text"
                          placeholder="Ex : example.mp4"
                          name="preview_video"
                          value={
                            accountData?.preview_video?.split("/")[
                              accountData.preview_video.split("/")?.length - 1
                            ]
                          }
                          onChange={handleonChange}
                        />
                      </div>
                      {previewsVideo !== "" && (
                        <a
                          href={
                            previewsVideo.fileURL
                              ? previewsVideo.fileURL
                              : Bucket + previewsVideo
                          }
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
                        Book video
                      </label>
                      <div className="d-flex flex-column justify-content-end bgInput">
                        <input
                          accept="video/*"
                          class="form-control"
                          type="text"
                          name="video"
                          placeholder="Ex : example.mp4"
                          value={
                            accountData?.video?.split("/")[
                              accountData.video.split("/")?.length - 1
                            ]
                          }
                          onChange={handleonChange}
                        />

                        <label
                          for="formFileMultiple"
                          class="form-label"
                        ></label>
                        <input
                          accept="video/*"
                          class="form-control"
                          type="file"
                          id="formFileMultiple"
                          name="audio"
                          // value={accountData.audio}
                          onChange={handleChangeImage}
                        />
                      </div>
                      {videos !== "" && (
                        <a
                          href={
                            videos.fileURL ? videos.fileURL : Bucket + videos
                          }
                          target="_blank"
                        >
                          <img
                            src="media/logos/mp4.png"
                            style={{ height: "82px" }}
                          />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="d-flex  mb-1"></div>
                </div>
                <div className="container">
                  <div className="d-flex  mb-1"></div>
                </div> */}

                {/* <Row>
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
                  <Col>
                    {update === false ? (
                      <div style={{ paddingTop: "16px" }}>
                        
                        Uploaded PDF
                      </div>
                    ) : null}
                  </Col>
                </Row> */}

                <Row>
                  {update === true ? (
                    <>
                      {/* <Button
                        onClick={onSubmit}
                        style={{
                          marginTop: "19px",
                          width: "166px",
                          backgroundColor: "#003366",
                          color: "white",
                        }}
                      >
                        Add{" "}
                      </Button> */}
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
                          onClick={() => history.push("/bookList")}
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
                       className={`btn btn-primary font-weight-bold px-8 py-2 my-3`}
                 
                       // onClick={() => history.push("/genreEdit")}
                        onClick={onSubmit}

                     >
                       <span>&nbsp;Add&nbsp;</span>
                       {loading && (
                         <span className="ml-3 spinner spinner-white"></span>
                       )}
                     </button></Col> */}

                      {/* <Col md='1'>  <button
                       id="kt_login_signin_submit"
                       type="submit"
                       className={`btn btn-secondary font-weight-bold px-8 py-2 my-3`}
                       onClick={() => history.push("/bookList")}
                        // onClick={onSubmit}

                     >
                       <span>&nbsp;Cancel&nbsp;</span>
                       {loading && (
                         <span className="ml-3 spinner spinner-white"></span>
                       )}
                     </button></Col> */}
                    </>
                  ) : (
                    // <Col className='d-flex justify-content-center'>
                    // <button
                    //   id="kt_login_signin_submit"
                    //   type="submit"
                    //   className={`btn btn-primary font-weight-bold px-8 py-2 my-3`}
                    //   // onClick={() => history.push("/genreEdit")}
                    //   onClick={onUpdate}
                    // >
                    //   <span>Update</span>
                    //   {loading && (
                    //     <span className="ml-3 spinner spinner-white"></span>
                    //   )}
                    // </button>
                    // </Col>
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
