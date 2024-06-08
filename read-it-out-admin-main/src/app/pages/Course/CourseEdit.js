import React, { useEffect, useState } from "react";
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
import queryString from "query-string";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import {
  ApiGet,
  ApiPost,
  ApiPut,
  ApiUpload,
  Bucket,
} from "../../../helpers/API/ApiData";
import {
  OutlinedInput,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  makeStyles,
} from "@material-ui/core";
// import Multiselect from "multiselect-react-dropdown";
// import Select from "react-select";
import Multiselect from "multiselect-react-dropdown";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const position = {
  maxWidth: "1322px",
  marginTop: "0px",
  marginBottom: "2%",
};

let optinsType = [];

const useStyles = makeStyles({
  select: {
    "&:before": {
      // borderColor: "red",
    },
    "&:after": {
      // borderColor: "red",
    },
  },
});

const CourseEdit = () => {
  const classes = useStyles();
  const [update, getUpdate] = useState(true);
  const [button, setbutton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeField, setTimeField] = useState("");

  const [data, setData] = useState([]);
  const [errors, setError] = useState({});
  const [pdfs, setPdf] = useState([]);
  const [epubs, setepub] = useState([]);
  const [images, setimage] = useState([]);
  const [document, setDocument] = useState([]);
  const [category, setCategory] = useState([]);
  const [timeSlot, setTimeSlot] = useState([]);
  const [time, setTime] = useState([]);
  const [optionID, setOptionID] = useState([]);
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState();
  const [personName, setPersonName] = useState([]);
  const [count, setCount] = useState(100);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const handleonChange = (e) => {
    let { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeImage = (e) => {
    let { name } = e.target;
    if (name == "pdf") {
      let file = e.target.files[0];
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      setPdf([file]);
    } else if (name == "epub") {
      let file = e.target.files[0];
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      setepub([file]);
    } else if (name == "image") {
      let file = e.target.files[0];
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      setimage([file]);
    } else if (name == "pdf_document") {
      let file = e.target.files[0];
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      setDocument([file]);
    }
  };

  const validateForm = () => {
    console.log("valid");
    let errors = {};
    let formIsValid = true;
    if (!data.title) {
      console.log("a");
      formIsValid = false;
      errors["title"] = "*Please enter course title";
    }
    if (!data.description) {
      console.log("b");
      formIsValid = false;
      errors["description"] = "*Please enter description";
    }
    if (!data.duration) {
      console.log("c");
      formIsValid = false;
      errors["duration"] = "*Please enter duration";
    }
    if (!data.passing_marks) {
      console.log("c");
      formIsValid = false;
      errors["passing_marks"] = "*Please enter passing mark";
    }
    if (!data.question_select) {
      console.log("c");
      formIsValid = false;
      errors["question_select"] = "*Please enter number of question";
    }
    if (images.length === 0) {
      console.log("n");
      formIsValid = false;
      errors["image"] = "*Please enter image";
    }

    setError(errors);

    return formIsValid;
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

  const uploadpdfDocument = async () => {
    let extrapdf = [];

    for (let i = 0; i < document.length; i++) {
      if (document[i].fileURL) {
        const formData = new FormData();
        formData.append("file", document[i]);

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
        extrapdf.push(document[i]);
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
  const uploadImage = async () => {
    let extraimage = [];

    for (let i = 0; i < images.length; i++) {
      if (images[i].fileURL) {
        const formData = new FormData();
        formData.append("image", images[i]);

        await ApiUpload("upload/profile_image", formData)
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

  const onSubmit = async (e) => {
    if (validateForm()) {
      setbutton(true);
      enableLoading();
      const ePub = await uploadePub();
      const pdf = await uploadpdf();
      const image = await uploadImage();
      const pdf_document = await uploadpdfDocument();
      try {
        let body = {
          title: data.title,
          description: data.description,
          duration: data.duration,
          ePub: ePub[0],
          pdf: pdf[0],
          image: image[0],
          passing_marks: data.passing_marks,
          question_select: data.question_select,
          pdf_document: pdf_document[0],
          training_typeId: personName,
          time_slotId: timeField === "timer" ? time : [],
        };
        console.log("body123", body);
        ApiPost("/course_subject/add", body)
          .then((res) => {
            toast.success(res.data.message);
            disableLoading();
            setbutton(false);
            setTimeout(() => {
              history.push("/courseList");
            }, 2000);
          })
          .catch((err) => {
            disableLoading();
            setbutton(false);

            if (err.status == 410) {
              history.push("/courseList");
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
      const ePub = await uploadePub();
      const pdf = await uploadpdf();
      const image = await uploadImage();
      const pdf_document = await uploadpdfDocument();

      try {
        let body = {
          _id: data._id,
          title: data.title,
          description: data.description,
          duration: data.duration,
          ePub: ePub[0],
          pdf: pdf[0],
          image: image[0],

          passing_marks: data.passing_marks,
          question_select: data.question_select,
          pdf_document: pdf_document[0],
          training_typeId: personName,
          time_slotId: timeField === "timer" ? time : "",
        };
        console.log("body", body);
        ApiPut("/course_subject/update", body)
          .then((res) => {
            toast.success(res.data.message);
            disableLoading();
            setbutton(false);
            setTimeout(() => {
              history.push("/courseList");
            }, 2000);
          })
          .catch((err) => {
            disableLoading();
            setbutton(false);
            if (err.status == 410) {
              history.push("/courseList");
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

  const fetchData = (i) => {
    ApiGet("/course_subject/" + i)
      .then((res) => {
        console.log("res.data.data", res.data.data);
        setData(res.data.data[0]);
        if (res.data.data[0].pdf) {
          setPdf([res.data.data[0].pdf]);
        }
        if (res.data.data[0].image) {
          setimage([res.data.data[0].image]);
        }
        if (res.data.data[0].ePub) {
          setepub([res.data.data[0].ePub]);
        }
        if (res.data.data[0].ePub) {
          setepub([res.data.data[0].ePub]);
        }
        if (res.data.data[0].pdf_document) {
          setDocument([res.data.data[0].pdf_document]);
        }
        if (res.data.data[0].training) {
          setPersonName(res.data.data[0].training.map((item) => item._id));
          setSelectedOption(res.data.data[0].training.map((item) => item.name));
        }
        if (res.data.data[0].time_slotId) {
          setTime(res.data.data[0].time_slotId);
        }
        let opt = res.data.data[0].training.map((item) => item.optionType);
        opt.map((itm) => {
          console.log(itm);
          if (itm === 1) {
            setTimeField("timer");
          }
        });
      })

      .catch((err) => {
        if (err.status == 410) {
          history.push("/courseList");
        } else {
          toast.error(err.message);
        }
      });

    getUpdate(false);
  };

  useEffect(() => {
    const idValue = queryString.parse(window.location.search);
    if (
      idValue.id ||
      !idValue.id === undefined ||
      !idValue.id === "undefined"
    ) {
      fetchData(idValue.id);
    }
  }, []);

  // const handleOption = (v) => {
  //   console.log("handleOption", v);
  //   setPersonName(v.target.value);
  // };

  // const onSelect1 = (e) => {
  //   // console.log("onSelect1", e);
  // };
  const onSelect = (e) => {
    setOptionID(e);
    console.log("onSelect", e);
    e.map((time) => {
      if (time.optionType === 1) {
        setTimeField("timer");
      }
    });
  };
  console.log("optionID", optionID);
  const onRemove = (e) => {
    console.log("onRemove", e);
    e.map((time) => {
      if (time.optionType !== 1) {
        setTimeField("");
      }
    });
    e.length === 0 && setTimeField("");
  };

  const [options, setOptions] = useState([]);
  useEffect(() => {
    ApiGet("/training_type")
      .then((res) => {
        setCategory(res.data.data);
        // let dropdown = res.data.data;
        // const dropDownValue = dropdown.map((response) => ({
        //   value: response._id,
        //   label: response.name,
        //   option: response.optionType,
        // }));
        // setOptions(dropDownValue);
        // console.log("Sucess");
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/slotList");
        } else {
          toast.error(err.message);
        }
      });

    ApiGet("/time_slot")
      .then((res) => {
        console.log("/time_slot", res.data.data);
        setTimeSlot(res.data.data);

        // console.log("Sucess");
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/slotList");
        } else {
          toast.error(err.message);
        }
      });
  }, []);

  console.log("option", options);
  const onChange = (e) => {
    console.log("onChange", e);
    setOptionID(e);
    if (e) {
      e.map((time) => {
        console.log("time", time);
        if (time.option === 1) {
          setTimeField("timer");
        } else {
          setTimeField("");
        }
      });
    } else {
      setTimeField("");
    }
    // if (option.optionType) {

    // }
  };
  const handleChange = (e) => {
    console.log("hhhhhhhhhhhh", e.target.value);
    setPersonName(e.target.value);
    let opt = e.target.value.find((e) => e == "6124ad46f6ce0f1d0453b5dd");
    console.log(opt);
    if (opt === "6124ad46f6ce0f1d0453b5dd") {
      setTimeField("timer");
    } else {
      setTimeField("");
    }
    // for (let index = 0; index < e.target.value.length; index++) {
    //   if (e.target.value[index] === "6124ad46f6ce0f1d0453b5dd") {
    //     setTimeField("timer");
    //   } else if (e.target.value[index] !== "6124ad46f6ce0f1d0453b5dd") {
    //     setTimeField("");
    //   }
    // }
  };
  const handleChangeTime = (e) => {
    console.log("hhhhhhhhhhhh", e.target.value);
    setTime(e.target.value);

    // for (let index = 0; index < e.target.value.length; index++) {
    //   if (e.target.value[index] === "6124ad46f6ce0f1d0453b5dd") {
    //     setTimeField("timer");
    //   } else if (e.target.value[index] !== "6124ad46f6ce0f1d0453b5dd") {
    //     setTimeField("");
    //   }
    // }
  };

  console.log("iiiiiiiiiiiiiiiii", selectedOption);
  // const dropDownValue = category.map((response) => ({
  //   value: response._id,
  //   label: response.name,
  // }));
  // setOptions(dropDownValue);
  return (
    <Container style={position}>
      <ToastContainer position="top-right" />
      <Row>
        <Col md={12}>
          <Col md={12}>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to={"/courseList"}>Course</Link>
              </BreadcrumbItem>
              {update === true ? (
                <BreadcrumbItem active>Add new course</BreadcrumbItem>
              ) : (
                <BreadcrumbItem active>Edit course</BreadcrumbItem>
              )}
            </Breadcrumb>
          </Col>
          <Card>
            <CardBody>
              <Form>
                <h2>
                  {update === true ? <b>Add New course</b> : <b>Edit course</b>}
                </h2>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>
                        Course title<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={data.title}
                        name="title"
                        placeholder="Enter Course title"
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
                    <FormGroup>
                      <Label>
                        Course description
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="textarea"
                        onChange={handleonChange}
                        value={data.description}
                        name="description"
                        placeholder="Enter Course Description"
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
                    <FormGroup>
                      <Label>
                        Course duration
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        value={data.duration}
                        name="duration"
                        placeholder="Enter Course Duration"
                        required
                      />

                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["duration"]}
                      </span>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Passing marks<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="number"
                        name="passing_marks"
                        value={data.passing_marks}
                        onChange={handleonChange}
                        placeholder="Enter Passing Marks"
                        required
                      />

                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["passing_marks"]}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Number of question
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="number"
                        name="question_select"
                        value={data.question_select}
                        onChange={handleonChange}
                        placeholder="Enter Passing Marks"
                        required
                      />

                      <span
                        style={{
                          color: "red",

                          top: "5px",
                          fontSize: "10px",
                        }}
                      >
                        {errors["question_select"]}
                      </span>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  {console.log("select", category)}
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Select training option
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <FormControl className="w-100">
                        <Select
                          multiple
                          value={personName}
                          onChange={handleChange}
                          name="optionTpoy"
                          className={classes.select}
                          input={<OutlinedInput label="Name" />}
                          // MenuProps={MenuProps}
                        >
                          {category.map((name) => {
                            console.log("name", name);
                            return (
                              <MenuItem
                                key={name._id}
                                value={name._id}

                                // style={getStyles(name, personName, theme)}
                              >
                                {name.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </FormGroup>
                    {/* <FormGroup>
                      <Label>
                        Passing Marks<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Multiselect
                        options={category} // Options to display in the dropdown
                        // displayValue={options.start_time}
                        selectedValues={selectedOption} // Preselected value to persist in dropdown
                        onSelect={onSelect} // Function will trigger on select event
                        onRemove={onRemove} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                      />
                    </FormGroup> */}
                  </Col>
                  {timeField === "timer" && (
                    <Col md={6}>
                      {/* <FormGroup>
                        <Label>
                          Select time slot
                          <span style={{ color: "red" }}> * </span>
                        </Label>
                        <Input
                          type="select"
                          name="time_slotId"
                          onChange={(e) => handleonChange(e)}
                          value={data.time_slotId}
                          placeholder="Select Main Category"
                        >
                          <option>Select Main Category</option>
                          {timeSlot.map((record, i) => {
                            return (
                              <option value={record._id}>
                                {record.start_time + " to " + record.end_time}
                              </option>
                            );
                          })}
                          {}
                        </Input>
                      </FormGroup> */}
                      <FormGroup>
                        <Label>
                          Select time slot
                          <span style={{ color: "red" }}> * </span>
                        </Label>
                        <FormControl className="w-100">
                          <Select
                            multiple
                            value={time}
                            onChange={handleChangeTime}
                            name="time_slotId"
                            className={classes.select}
                            input={<OutlinedInput label="Name" />}
                            // MenuProps={MenuProps}
                          >
                            {timeSlot.map((name) => {
                              console.log("name", name);
                              return (
                                <MenuItem
                                  key={name._id}
                                  value={name._id}

                                  // style={getStyles(name, personName, theme)}
                                >
                                  {name.start_time + " to " + name.end_time}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </FormGroup>
                    </Col>
                  )}
                </Row>
                <div className="d-flex  mb-1">
                  <div className="mb-2  col-md-6">
                    <label htmlFor="" className="textBlackfz16">
                      Course image<span style={{ color: "red" }}> * </span>
                    </label>
                    <div className="d-flex justify-content-end bgInput">
                      <label for="formFileMultiple" class="form-label"></label>
                      <input
                        accept="image/gif, image/jpeg, image/png"
                        class="form-control"
                        type="file"
                        id="formFileMultiple"
                        name="image"
                        // value={data.image}
                        onChange={handleChangeImage}
                      />
                      {/* <img src={images} alt="" /> */}
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
                  </div>
                  <div className="mb-2  col-md-6">
                    <label htmlFor="" className="textBlackfz16">
                      Course completion form
                    </label>
                    <div className="d-flex justify-content-end bgInput">
                      <label for="formFileMultiple" class="form-label"></label>
                      <input
                        accept="application/pdf"
                        class="form-control"
                        type="file"
                        id="formFileMultiple"
                        name="pdf_document"
                        // value={data.image}
                        onChange={handleChangeImage}
                      />
                      {/* <img src={images} alt="" /> */}
                    </div>
                    <span
                      style={{
                        color: "red",

                        top: "5px",
                        fontSize: "10px",
                      }}
                    >
                      {errors["pdf_document"]}
                    </span>
                    {document.map((record, i) => (
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
                <div className="d-flex  mb-1">
                  <div className="mb-2  col-md-6">
                    <label htmlFor="" className="textBlackfz16">
                      Course PDF
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
                    </div>
                    <span
                      style={{
                        color: "red",

                        top: "5px",
                        fontSize: "10px",
                      }}
                    >
                      {errors["pdf"]}
                    </span>
                    {/* <a
                      href={pdfs.fileURL ? pdfs.fileURL : Bucket + pdfs}
                      target="_blank"
                    >
                      <img
                        src="media/logos/pdf.png"
                        style={{ height: "82px" }}
                      />
                    </a> */}
                    {pdfs.map((record, i) => {
                      console.log("PDFS", record);
                      return (
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
                      );
                    })}
                  </div>

                  <div className="mb-2  col-md-6">
                    <label htmlFor="" className="textBlackfz16">
                      Course ePub
                    </label>
                    <div className="d-flex justify-content-end bgInput">
                      <label for="formFileMultiple" class="form-label"></label>
                      <input
                        accept="application/epub+zip"
                        class="form-control"
                        type="file"
                        id="formFileMultiple"
                        name="epub"
                        // value={data.ePub}
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
                          onClick={() => history.push("/courseList")}
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
};

export default CourseEdit;
