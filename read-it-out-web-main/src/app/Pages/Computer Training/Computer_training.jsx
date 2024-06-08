import React, { useEffect, useState } from "react";
import { Carousel, Modal } from "react-bootstrap";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import c1 from "../../media/c1.png";
import c2 from "../../media/c2.png";
import Course_Content from "./Course_Content";
import Live_Video from "./Live_Video";
import Recorded_Video from "./Recorded_Video";
import * as userUtil from "../../utils/user.util";
import {
  ApiGet,
  ApiGetNoAuth,
  ApiPost,
  ApiPut,
  ApiUpload,
  Bucket,
} from "../../helpers/API/ApiData";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import { Input } from "reactstrap";
import { CircularProgress } from "@material-ui/core";
import OptionType0 from "./Option/OptionType0";
import OptionType1 from "./Option/OptionType1";
import OptionType2 from "./Option/OptionType2";
import { Document, Page, pdfjs } from "react-pdf";
import ControlPanel from "../PDF Reader/ControlPanel";
import { data } from "jquery";
import { Alert, Radio } from "antd";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

let array = [];

const Computer_training = () => {
  const token = userUtil.getUserInfo();
  const history = useHistory();
  const [value, setValue] = useState();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toggler, setToggler] = useState(false);
  const [buttons, setButtons] = useState(false);
  const [buttons1, setButtons1] = useState(false);
  const [buttons2, setButtons2] = useState(false);
  const [disable, setDisable] = useState(false);
  const [alerts, setAlert] = useState(false);
  const [rattingSubmit, setRattingSubmit] = useState(false);
  const [rattingModal, setRattingModal] = useState(false);
  const [state, setState] = useState("");
  const [Index, setIndex] = useState("");
  const [Epub, setEPUB] = useState("");
  const [PDF, setPDF] = useState("");
  const [item, setItem] = useState("");
  const [options, setOptions] = useState();
  const [datas, setData] = useState([]);
  const [pdfs, setPdf] = useState([]);
  const [result, setResult] = useState();
  const [loader, setIsLoader] = useState(false);
  const [accountData, setaccountData] = useState([]);
  const [category, setCategory] = useState([]);
  const [list, setList] = useState([]);
  const [subject, setSubject] = useState([]);
  const [review, setReview] = useState([]);
  const [valueRatting, setValueRatting] = useState([]);
  const [errors, setError] = useState({});
  const [certi, setCerti] = useState("");
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [Loading, setLoading] = useState(true);
  const [datePrint, setDatePrint] = useState(new Date());
  // const [modal, setModal] = useState(false);
  const [IDs, setIDs] = useState();
  const [titleName, setTitleName] = useState("");
  const Id = JSON.parse(localStorage.getItem("token"));

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoading(false);
  }

  const download = (v) => {
    setDisable(true);

    ApiGet("/result/certificate/" + v.subjectId)
      .then((res) => {
        fetch(Bucket + res.data.data, { method: "GET" })
          .then((res) => {
            return res.blob();
          })
          .then((blob) => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = `${v.name}_${v.subject_name}.pdf`;
            document.body.appendChild(a);
            a.click();
            setTimeout((_) => {
              window.URL.revokeObjectURL(url);
            }, 60000);
            a.remove();
          })
          .catch((err) => {});
        setDisable(false);
      })
      .catch((err) => {
        if (err.status == 410) {
          // history.push("/slotList");
        } else {
          toast.error(err.message);
        }
      });
  };

  const pdf = (i, j) => {
    let body = { id: i, title: j };
    history.push({ pathname: "/epub", state: body });
  };

  const pdfReader = (v) => {
    setModal(!modal);
    setIDs(v.pdf);
    setTitleName(v.title);
    // window.location.reload();
  };

  const AddOption = async (i) => {
    const body = {
      optionType: i,
      subjectId: Index,
    };

    await ApiPost("/training_option/add", body)
      .then((res) => {
        setOptions(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          // refreshtoken();
        } else {
          toast.error(err.message);
        }
      });
  };
  const updateOption = async (i) => {
    setIsLoader(true);
    const body = {
      id: options._id,
      optionType: i,
      subjectId: Index,
    };

    await ApiPut("/training_option/update", body)
      .then((res) => {
        trainingOption(Index);
        setIsLoader(false);
      })
      .catch((err) => {
        setIsLoader(false);
        if (err.status == 410) {
        } else {
          toast.error(err.message);
        }
      });
  };

  const active = async (i) => {
    // setIndex(i);
    if (token === undefined) {
      setOpen(!open);
      // history.push("/signIn");
    } else {
      if (i === 1) {
        // await AddtimeSlot(i);
        // await getTimeSelected(Index);
        // await timeSlotget(Index);
        await AddOption(i);
      } else {
        await AddOption(i);
        // await timeSlotget(Index);
      }

      // await PDFupload(i);
    }
  };
  const activeUpdate = async (i) => {
    // setIndex(i);

    if (i === 1) {
      // await AddtimeSlot(i);
      // await getTimeSelected(Index);
      // await timeSlotget(Index);
      await updateOption(i);
    } else {
      await updateOption(i);
      // await timeSlotget(Index);
    }
  };

  const toggle = (v) => {
    setState(v);
  };

  const submit = (i) => {
    if (i === 0) {
      setValue(0);
      // setOpen(!open);
    }
    if (i === 1) {
      setValue(1);
      // setOpen(!open);
    }
    if (i === 2) {
      setValue(2);
      // setOpen(!open);
    }
  };

  const courseSubject = (v) => {
    ApiGet("/course_subject/content/" + v)
      .then((res) => {
        setaccountData(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          // refreshtoken();
        } else {
          toast.error(err.message);
        }
      });
  };

  const trainingOption = async (v) => {
    await ApiGet("/training_option/subject/" + v)
      .then((res) => {
        setOptions(res.data.data);
        setPdf(res.data?.data?.documents[0]?.document_image || "");
        setIsLoading(true);
      })
      .catch((err) => {
        if (err.status == 410) {
          // refreshtoken();
        } else {
          toast.error(err.message);
        }
      });
  };

  const enterContent = (v) => {
    if (token === undefined) {
      history.push("/signIn");
    } else {
      setIndex(v._id);
      setPDF(v);
      setEPUB(v.epub);
      setItem(v.item);
      setToggler(true);
      setValue();

      ApiGet("/training_type/subject/" + v._id)
        .then((res) => {
          setList(res.data.data[0].training);
          setIsLoading(true);
        })
        .catch((err) => {
          if (err.status == 410) {
            // refreshtoken();
          } else {
            toast.error(err.message);
          }
        });

      courseSubject(v._id);
      // getTimeOption(v._id);

      trainingOption(v._id);

      ApiGet("/result/subject/" + v._id)
        .then((res) => {
          setResult(res.data.data[0]);
          setIsLoading(true);
        })
        .catch((err) => {
          if (err.status == 410) {
            // refreshtoken();
          } else {
            toast.error(err.message);
          }
        });

      // getTimeSelected(v._id);
    }
  };

  const startExam = () => {
    history.push("/mcqTest");
    // window.location.reload();
  };
  const handleonChange = (e, i) => {
    const { name, value } = e.target;

    setData((preVal) => ({
      ...preVal,
      [name]: value,
    }));
  };
  const handleDate = (date) => {
    setDatePrint(date.format("DD-MM-YYYY"));
  };

  const back = () => {
    setToggler(false);
    setButtons(false);
    setIsLoading(false);
  };

  useEffect(() => {
    ApiGet("/review_question")
      .then((res) => {
        setReview(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/slotList");
        } else {
          toast.error(err.message);
        }
      });
  }, []);

  useEffect(() => {
    ApiGetNoAuth("teacher/course_subject")
      .then((res) => {
        setSubject(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          // refreshtoken();
        } else {
          toast.error(err.message);
        }
      });
  }, []);

  const arrayIncludesInObj = (arr, key, valueToCheck) => {
    return arr.some((value) => value[key] === valueToCheck);
  };

  const handleSubmit = (e, id) => {
    //
    //

    if (arrayIncludesInObj(valueRatting, "questionId", id)) {
      let filterData = valueRatting.filter((v) => {
        return v.questionId !== id;
      });
      let final = [...filterData, { questionId: id, ans: e.target.value }];
      setValueRatting(final);
    } else {
      setValueRatting([
        ...valueRatting,
        {
          questionId: id,
          ans: e.target.value,
        },
      ]);
    }
  };

  const openReviewModal = (v) => {
    setRattingModal(!rattingModal);
    setCerti(v);
  };
  const submitRatting = () => {
    setRattingSubmit(true);
    if (valueRatting.length === 3) {
      ApiPost("/review_answer/add", {
        subjectId: Index,
        question: valueRatting,
      })
        .then((res) => {
          toast.success(res.data.message);
          setTimeout(() => {
            setRattingModal(!rattingModal);
            setRattingSubmit(false);
          }, 2000);
        })
        .catch((err) => {
          setRattingSubmit(false);
          if (err.status == 410) {
            history.push("/slotList");
          } else {
            toast.error(err.message);
          }
        });
    } else {
      setAlert(true);
      setRattingSubmit(false);
    }
  };

  return (
    <div className="bgColor">
      <ToastContainer />
      <Carousel
        fade
        nextIcon={false}
        prevIcon={false}
        indicators={true}
        className="carousel_"
      >
        <Carousel.Item>
          <img className="d-block w-100" src={c1} alt="First slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={c2} alt="Second slide" />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={c1} alt="Third slide" />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={c2} alt="Third slide" />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="container  py-4">
        <div className="row">
          {toggler === false ? (
            subject.map((sub, i) => {
              return (
                <div className="col-md-4 my-2">
                  <div className="card box_shadow rounded d-flex flex-column justify-content-between h-100">
                    <div className="">
                      <img
                        src={Bucket + sub.image}
                        alt=""
                        // width="100%"

                        height="240"
                        className=" rounded mx-auto w-100"
                      />
                    </div>
                    <Typography className="px-3 pt-2 font_size_18 font_medium color_blue font_capital responsivEllipsis1">
                      {sub.title}
                    </Typography>
                    <div className="">
                      <Typography className="font_size_12 font_medium color_light_gray px-3 py-2 mb-3  responsivEllipsis">
                        {sub && sub?.description}
                      </Typography>
                    </div>
                    {Id && (
                      <div className="px-3 pb-4 d-flex justify-content-end">
                        <button
                          className="py-1 px-4  borderBlue bg-transparent color_blue rounded text-center text-decoration-none ml-2"
                          onClick={() => enterContent(sub)}
                        >
                          Details
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : value === 0 ? (
            <Recorded_Video
              accountData={accountData}
              setValue={setValue}
              PDF={PDF}
              pdfFile={pdfs}
              // setPdf={setPdf}
              courseSubject={courseSubject}
            />
          ) : (
            <>
              <div className="box_shadow position-relative rounded d-flex justify-content-center py-2 mb-3 align-items-center">
                <div className="position-absolute left_15">
                  <IoArrowBack
                    onClick={() => back()}
                    color="#00bde2"
                    fontSize={20}
                  />
                </div>
                <h3
                  className={`font_size_20 font_bold color_blue px-5 mx-5 font_capital`}
                >
                  {isLoading === true ? (
                    accountData[0]?.title
                  ) : (
                    <CircularProgress
                      style={{
                        color: "#64dbf2",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  )}
                </h3>
              </div>
              {/* <div className="box_shadow rounded d-flex justify-content-between py-2 mb-3 align-items-center">
                <div className="">
                  {" "}
                  {PDF ? (
                    <button
                      className="py-1 viewAllBtn border-none rounded text-center text-decoration-none "
                      onClick={() => pdfReader(PDF, Index)}
                    >
                      Read PDF
                    </button>
                  ) : (
                    ""
                  )}
                  {Epub ? (
                    <button
                      className="py-1 viewAllBtn border-none rounded text-center text-decoration-none ml-2"
                      onClick={() => pdf(Epub, item)}
                    >
                      Read EPub
                    </button>
                  ) : (
                    ""
                  )}
                </div>
               
              </div> */}
              <div className="bgWhite box_shadow rounded_1">
                {isLoading === true ? (
                  options && options?.optionType === 0 ? (
                    <OptionType0
                      submit={submit}
                      download={download}
                      result={result}
                      disable={disable}
                      title={accountData[0]?.title}
                      setToggler={setToggler}
                      list={list}
                      active={activeUpdate}
                      options={options}
                      setIsLoader={setIsLoader}
                      loader={loader}
                      openReviewModal={openReviewModal}
                    />
                  ) : options && options?.optionType === 1 ? (
                    <OptionType1
                      submit={submit}
                      download={download}
                      result={result}
                      disable={disable}
                      datas={datas}
                      title={accountData[0]?.title}
                      setToggler={setToggler}
                      list={list}
                      active={activeUpdate}
                      options={options}
                      setIsLoader={setIsLoader}
                      loader={loader}
                      openReviewModal={openReviewModal}
                    />
                  ) : options && options?.optionType === 2 ? (
                    <OptionType2
                      submit={submit}
                      download={download}
                      result={result}
                      disable={disable}
                      title={accountData[0]?.title}
                      setToggler={setToggler}
                      list={list}
                      active={activeUpdate}
                      options={options}
                      setIsLoader={setIsLoader}
                      loader={loader}
                      openReviewModal={openReviewModal}
                    />
                  ) : (
                    <>
                      <div className="py-2  border-bottom">
                        <h3 className="font_size_20 font_medium color_gray px-3 py-2">
                          Choose Training Option
                        </h3>
                      </div>
                      <div className="">
                        {/* {isLoading === true ? ( */}
                        {list.map((item, i) => {
                          return (
                            <Accordion className="accordionBG">
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                onClick={() => toggle(item.name)}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography className="px-3 py-2 font_size_18 font_medium color_blue font_capital">
                                  {state === item.name ? (
                                    <MdRadioButtonChecked
                                      className="mx-2"
                                      fontSize={25}
                                    />
                                  ) : (
                                    <MdRadioButtonUnchecked
                                      className="mx-2"
                                      fontSize={25}
                                    />
                                  )}
                                  {item.name}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className="d-flex flex-column">
                                <Typography className="font_size_14 font_medium color_light_gray px-3 py-2 font_capital">
                                  <ul>
                                    {item?.description.map((sub, i) => {
                                      return (
                                        <li>
                                          <div>{sub}</div>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </Typography>

                                <div className="">
                                  {/* {i === 1 && (
                                    <>
                                      <div className="mt-5 d-flex justify-content-center pb-3">
                                        <div className="col-md-6">
                                          <h3 className="font_size_28 font_medium text-center color_gray pb-4">
                                            Select Date & Time slot
                                          </h3>
                                          <div className="d-flex justify-content-between pb-4">
                                            <div className="col-md-6 px-1">
                                            
                                              <Input
                                                type="date"
                                                name="dates"
                                                id="date"
                                                value={datas.dates}
                                                onChange={(e) =>
                                                  handleonChange(e, i)
                                                }
                                                className="border_none  box_shadow rounded "
                                              />
                                              <span
                                                style={{
                                                  color: "red",

                                                  top: "5px",
                                                  fontSize: "10px",
                                                }}
                                              >
                                                {errors["dates"]}
                                              </span>
                                            </div>

                                            <div className="col-md-6 px-1">
                                              <Input
                                                type="select"
                                                onChange={(e) =>
                                                  handleonChange(e, i)
                                                }
                                                placeholder="Select Faculty"
                                                name="time"
                                                value={datas.time}
                                                className="border_none  box_shadow rounded "
                                                aria-label="Default select example"
                                              >
                                                <option value="" selected>
                                                  Select Timeslot
                                                </option>

                                                {category.map((record, i) => {
                                                  
                                                  return (
                                                    <option value={record._id}>
                                                      {record.start_time} -{" "}
                                                      {record.end_time}
                                                    </option>
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
                                                {errors["time"]}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )} */}

                                  <div className="d-flex justify-content-center pb-4">
                                    <button
                                      className="py-1 text-white font_bold width50 rounded border-none linear_gradient mx-1"
                                      onClick={() => active(i)}
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </AccordionDetails>
                            </Accordion>
                          );
                        })}
                      </div>
                    </>
                  )
                ) : (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "300px" }}
                  >
                    <CircularProgress style={{ color: "#64dbf2" }} />
                  </div>
                )}
              </div>

              <div className="mt-4 p-0">
                {isLoading === true ? (
                  <Course_Content
                    accountData={accountData}
                    pdfReader={pdfReader}
                    pdf={pdf}
                    PDF={PDF}
                    Epub={Epub}
                    Index={Index}
                    item={item}
                  />
                ) : (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "300px" }}
                  >
                    <CircularProgress style={{ color: "#64dbf2" }} />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Modal
        show={modal}
        centered
        // onHide={() => setModal(!modal)}
        size="xl"
        // aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton onClick={() => setModal(!modal)}>
          <Modal.Title
            id="contained-modal-title-vcenter "
            className="color_blue font_size_20"
          >
            {titleName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section
            id="pdf-section"
            className="d-flex flex-column align-items-center w-100 bg_gray paddingBottom45 position-relative"
          >
            <ControlPanel
              scale={scale}
              setScale={setScale}
              numPages={numPages}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              file={Bucket + IDs}
            />
            <Document
              file={Bucket + IDs}
              onLoadSuccess={onDocumentLoadSuccess}
              // className="w-100"
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                // className="Page_ mx-2"
              />
            </Document>
          </section>
        </Modal.Body>
        <Modal.Footer>
          <div></div>
        </Modal.Footer>
      </Modal>
      <Modal
        show={rattingModal}
        centered
        // onHide={() => setModal(!modal)}
        size="lg"
        // aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter "
            className="color_light_gray font_size_16"
          >
            Submit Your Feedback
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section
            id="pdf-section"
            className="d-flex flex-column align-items-center "
          >
            <div className="w-100 p-3">
              {alerts && valueRatting.length < 3 && (
                <Alert
                  className=" alertIcon rounded mb-3 px-0 bg-none font_size_14 font_regular color_red font_capital"
                  type="warning"
                  message="Please selects the option below"
                  banner
                />
              )}
              {review?.map((reviews) => (
                <>
                  <div className="font_size_14 font_bold color_light_black  font_capital">
                    {reviews.question}
                  </div>
                  <Radio.Group
                    className="mb-3"
                    onChange={(e) => handleSubmit(e, reviews._id)}
                  >
                    {reviews.option?.map((option) => (
                      <Radio
                        className="font_size_14 font_regular color_light_gray py-2 font_capital"
                        value={option}
                      >
                        {option}
                      </Radio>
                    ))}
                  </Radio.Group>
                </>
              ))}
            </div>
          </section>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <button
              className="btn text-white  text-decoration-none text-center border_none rounded py-1 mx-1"
              // disabled={rattingSubmit}
              onClick={() => {
                setRattingModal(!rattingModal);
                setDisable(false);
              }}
            >
              Cancel
            </button>
            <button
              className="btn text-white linear_gradient text-decoration-none text-center border_none rounded py-1 mx-1"
              disabled={rattingSubmit}
              onClick={submitRatting}
            >
              Submit
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Computer_training;
