import React, { useState, useEffect } from "react";
import queryString from "query-string";

import { ApiGet, ApiPost, ApiUpload, Bucket } from "../../helpers/API/ApiData";
import * as userUtil from "../../utils/user.util";
import { Document, Page, pdfjs } from "react-pdf";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { IoArrowBack } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import SVG from "react-inlinesvg";
import ControlPanel from "../PDF Reader/ControlPanel";
import { Modal } from "react-bootstrap";
import moment from "moment";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

var i = 0;
let id;
const Recorded_Video = ({
  accountData,
  setValue,
  PDF,
  courseSubject,
  pdfFile,
}) => {
  const history = useHistory();
  const token = userUtil.getUserInfo();
  const [buttons, setButtons] = useState(false);
  const [pdfs, setPdf] = useState([]);
  const [maincategory, setMainCategory] = useState([]);
  const [state, setstate] = useState(0);
  const [flag, setFlag] = useState(false);
  const [val, setVal] = useState(accountData[0]?.subject[0]?.title);
  const [userInfo, setUserInfo] = useState({});
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [IDs, setIDs] = useState();
  const [userID, setUserID] = useState();
  const [titleName, setTitleName] = useState("");
  const [topicCover, setTopicCover] = useState();
  const [updateTopic, setUpdateTopic] = useState();
  // console.log("date", new Date());
  console.log("accountData", accountData);
  const toggle = (id, i, index) => {
    console.log("idddddd", id);
    console.log("indexOf:", index);
    history.push({
      pathname: "training",
      state: id,
    });
    setVal(i);
    setstate(index);
  };

  const pdfReader = (v, title) => {
    console.log(v);
    setModal(!modal);
    setIDs(v);
    setTitleName(title);

    // window.location.reload();
  };
  // let videoData = accountData[0]?.subject
  const updateVideoLog = (i) => {
    let body = {
      logUserId: userID,
      subjectId: accountData[0]._id,
      logLatestDate: moment(new Date()).format(),
      topicCovered: i + 1,
      // isCompleted: true,
    };
    console.log("uderGet", body);

    ApiPost(`/video_training_log/add`, body)
      .then((res) => {
        console.log("video_training_log", res);
        setUpdateTopic(res.data.data?.topicCovered);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 410) {
          // history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
  };
  const nextVideo = (i) => {
    console.log("index", i + 1);
    setstate(i + 1);
    // console.log("pageNumber", pageNumber);
    // console.log("topicCover", topicCover);
    // console.log("Before", topicCover < i + 1 + 1);
    if (topicCover < i + 1 + 1) {
      console.log("More");
      updateVideoLog(i + 1);
    }

    // console.log("val", i + 1);
  };
  // console.log("topicCover", topicCover);
  const preVideo = (i) => {
    setstate(i - 1);
    setFlag(false);
    // console.log("val", i + 1);
  };

  const uploadDoc = (i) => {
    // setstate(i + 1);
    setFlag(true);
  };

  const downloadPdf = (v) => {
    console.log("PDF", v);
    fetch(Bucket + v.pdf_document, { method: "GET" })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = `${v.title}.pdf`;
        document.body.appendChild(a);
        a.click();
        setTimeout((_) => {
          window.URL.revokeObjectURL(url);
        }, 60000);
        a.remove();
      })
      .catch((err) => {
        console.error("err: ", err);
      });
    // const link = document.createElement("a");
    // let url = Bucket + v;
    // link.href = url;
    // link.setAttribute("download", v);
    // document.body.appendChild(link);
    // link.click();

    // URL.revokeObjectURL(a.href);
  };

  const handleChangeImage2 = (e, i) => {
    console.log("jpbro2");
    console.log("3", i);
    // console.log("handleChangeImage", i);
    let { name } = e.target;
    if (name == "pdf_document") {
      let file = e.target.files[0];
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      setPdf([file]);
    }
    setButtons(true);

    // setCount(count + 1);
  };

  const uploadpdf = async () => {
    let extrapdf = [];

    for (let i = 0; i < pdfs.length; i++) {
      if (pdfs[i].fileURL) {
        const formData = new FormData();
        formData.append("file", pdfs[i]);

        await ApiUpload("upload/file_upload/form_image", formData)
          .then((res) => {
            extrapdf.push(res.data.data.image);
            // setButtons(true);
          })
          .catch((err) => {
            if (err.status == 410) {
              history.push("/postlist");
            } else {
              toast.error(err.message);
              console.log("upload", err.message);
            }
          });
      } else {
        extrapdf.push(pdfs[i]);
      }
    }
    return extrapdf;
  };

  const PDFupload = async () => {
    const pdf = await uploadpdf();
    const body3 = {
      document_image: pdf[0],
      subjectId: accountData[0]._id,
    };
    console.log("body3", body3);
    await ApiPost("/form/add", body3)
      .then((res) => {
        console.log("/form/add", res);
        courseSubject(accountData[0]._id);
        setstate(accountData[0]?.subject.length - 1);
        setFlag(false);
        // setOptions(res.data.data);
        // window.location.reload();
      })
      .catch((err) => {
        if (err.status == 410) {
          // refreshtoken();
        } else {
          toast.error(err.message);
          console.log("formAdd", err.message);
        }
      });
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  const backWord = () => {
    setValue(1);
    // setTrigger(!trigger);
  };
  const getVideoLog = (i, iD) => {
    ApiGet(`/video_training_log/${i}`)
      .then((res) => {
        console.log("video_training_log", res.data.data);
        console.log("topicCoverrrrrrr", res.data.data[0]?.topicCovered);
        setTopicCover(
          res.data.data[0]?.topicCovered === undefined
            ? 1
            : res.data.data[0]?.topicCovered
        );
        if (res.data.data.length === 0) {
          console.log(1);
          let body = {
            logUserId: i,
            subjectId: accountData[0]._id,
            logLatestDate: moment(new Date()).format(),
            topicCovered: 1,
            // isCompleted: true,
          };
          console.log("uderGet", body);
          ApiPost(`/video_training_log/add`, body)
            .then((res) => {
              console.log("video_training_log", res);

              // setCategory(res.data.data);
            })
            .catch((err) => {
              console.log(err);
              if (err.status == 410) {
                // history.push("/postlist");
              } else {
                // toast.error(err.message);
              }
            });
        }

        // setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 410) {
          // history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
  };

  useEffect(() => {
    setPdf([pdfFile]);
  }, []);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userinfo"));
    setUserID(userInfo.id);
    getVideoLog(userInfo.id);
  }, [state]);

  console.log("userID", userID);
  return (
    <div className="row">
      <div className="box_shadow rounded d-flex position-relative justify-content-center py-2 mb-3 align-items-center">
        <div className="position-absolute left_15">
          <IoArrowBack
            onClick={() => backWord(1)}
            color="#00bde2"
            fontSize={20}
          />
        </div>
        <h3
          className={`font_size_20 font_bold color_blue px-5 mx-5 font_capital`}
        >
          {accountData[0]?.title}
        </h3>
      </div>
      <div className="col-md-3 pl-0">
        <div className="box_shadow rounded">
          <h3 className="font_size_22 font_bold color_gray px-3 py-3 border-bottom ">
            Topic
          </h3>
          <div className="pb-4">
            {accountData[0]?.subject.map((item, i) => {
              id = i;
              console.log("id", id);
              return (
                <p
                  key={i}
                  className={`px-3 pt-4 font_size_16 font_capital pointer ${
                    // val === item.title
                    state === i
                      ? "font_bold color_blue"
                      : "font_regular color_light_gray"
                    }`}
                // onClick={() => toggle(item._id, item.title, i)}
                >
                  {item.title}
                </p>
              );
            })}
          </div>
        </div>
        {accountData[0]?.isExamGiven === false && (
          <>
            <div className="py-3">
              {state === accountData[0]?.subject.length - 1 && (
                <button
                  className="linear_gradient rounded border-none text-white font_bold font_capital py-2 w-100"
                  // onClick={() => history.push("/mcqTest?id=" + accountData[0]._id)}
                  onClick={() => uploadDoc(accountData[0]?.subject.length)}
                >
                  Upload Document
                </button>
              )}
            </div>
            <div className="">
              {accountData && accountData[0]?.isDocument === true && (
                <button
                  className="linear_gradient rounded border-none text-white font_bold font_capital py-2 w-100"
                  onClick={() =>
                    history.push("/mcqTest?id=" + accountData[0]._id)
                  }
                // onClick={() => uploadDoc(accountData[0]?.subject.length)}
                >
                  Start Exam
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <div className="col-md-9 pr-0  rounded">
        {/* <video
          // onEnded={() => ended()}
          autoPlay
          width="100%"
          height="500px"
          // frameborder="0"
        >
          <source
            src={Bucket + accountData[0]?.subject[i].video}
            type="video/mp4"
          />
        </video> */}

        {/* {accountData[0]?.subject.map((title, i) => {
          console.log("index", i);
          return val === title.title ? (
            <>
              <h3
                className={`font_size_32 font_bold color_gray px-3 font_capital`}
              >
                {title.title}
              </h3>
              <div className="px-3 py-3">
                {title.video ? (
                  <iframe
                    src={Bucket + title.video}
                    width="100%"
                    height="500px"
                    frameborder="0"
                  ></iframe>
                ) : (
                  <div className="font_size_32 font_bold color_gray px-3 font_capital text-center">
                    <img
                      src="assets/media/noVideo.png"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            ""
          );
        })} */}
        {console.log(accountData, "state", state)}
        {/* <h1>{accountData[0]?.subject[state]?.title}</h1> */}
        {flag === true ? (
          <div className="box_shadow rounded d-flex px-2 py-3 align-items-center justify-content-between flex-column">
            <div
              className="text-end px-2 w-100 color_blue font_bold pointer"
              onClick={() => setFlag(false)}
            >
              X
            </div>
            <div className="font_size_32 letter_spacing font_bold color_gray text-center pt-4">
              Congratulations !
            </div>
            <div className="font_size_20 py-3 font_medium color_gray text-center">
              You have successfully completed your coursework for{" "}
              <span className="font_size_20 py-3 font_medium color_blue text-capitalize">
                {accountData[0].title}
              </span>
            </div>
            <div className="font_size_20 py-3  color_light_gray text-center">
              Just a few steps to your certification. <br></br>
              You are required to download and complete the Attestation Form by
              clicking the link below.
            </div>
            <button
              // href={Bucket + PDF}

              className="py-2 text-white font_bold  rounded border_none text-decoration-none text-center linear_gradient px-4 mx-1"
              onClick={() => downloadPdf(PDF)}
            // onClick={() => history.push("/mcqTest")}
            >
              Download Attestation Form
            </button>
            <div className="font_size_20 py-3  color_light_gray text-center">
              Upload the form back on Aizawl using the upload link below.{" "}
              <br></br>
              You will be able to proceed with your certification examination
              after the form is duly submitted.
            </div>
            <div className="d-flex justify-content-center py-3 w-60">
              <div className="d-flex justify-content-center bgInput w-100">
                <label
                  for="formFileMultiple3"
                  class=" py-2 UploadField color_blue d-flex flex-column align-items-center justify-content-center  w-100 rounded border-none  mx-1 "
                >
                  {" "}
                  {pdfs.length ? (
                    pdfs.map((pdf) => {
                      console.log("pdf", pdf);
                      return (
                        <>
                          <div className="position-relative">
                            {pdf ? (
                              <>
                                <img
                                  src={pdf.fileURL ? pdf.fileURL : Bucket + pdf}
                                  className="rounded position-relative"
                                  width="100px"
                                  height="100px"
                                />
                                <MdCancel
                                  className="pointer position-absolute right_-5 top_-5"
                                  color="red"
                                  fontSize={22}
                                  onClick={() => setPdf([])}
                                />{" "}
                              </>
                            ) : (
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <SVG
                                  src="assets/media/svg/files/file.svg"
                                  width="50px"
                                />
                                <div className="">Upload Signed Form</div>
                              </div>
                            )}
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <>
                      <SVG src="assets/media/svg/files/file.svg" width="50px" />
                      <div className="">Upload Signed Form</div>
                    </>
                  )}
                </label>
                <input
                  accept="image/jpeg, image/png"
                  class="form-control"
                  type="file"
                  id="formFileMultiple3"
                  name="pdf_document"
                  hidden
                  // value={data.pdf}
                  onChange={(e) => handleChangeImage2(e)}
                />
              </div>
            </div>
            {pdfs.length !== 0 && (
              <button
                className="py-2 text-white font_bold width50 rounded border-none linear_gradient mx-1"
                onClick={() => PDFupload()}
              // onClick={() => history.push("/mcqTest")}
              >
                Submit
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="box_shadow rounded d-flex  py-2 mb-3 align-items-center justify-content-between">
              <div className="col-md-8">
                {state === accountData[0]?.subject.length - 1 ? (
                  <button
                    className="linear_gradient rounded border-none w-25 text-white font_bold font_capital py-1 ml-3"
                    onClick={() => preVideo(state)}
                  >
                    Previous
                  </button>
                ) : (
                  <>
                    {state !== 0 && (
                      <button
                        className="linear_gradient rounded border-none w-25 text-white font_bold font_capital py-1 ml-3"
                        onClick={() => preVideo(state)}
                      >
                        Previous
                      </button>
                    )}
                    <button
                      className="linear_gradient rounded border-none w-25 text-white font_bold font_capital py-1 mx-3"
                      onClick={() => nextVideo(state)}
                    >
                      Next
                    </button>
                  </>
                )}
              </div>
              <div className="col-md-4 d-flex justify-content-end">
                {accountData[0]?.subject[state]?.pdf && (
                  <button
                    className="rounded viewAllBtn border-none py-1 mx-3"
                    onClick={() =>
                      pdfReader(
                        accountData[0]?.subject[state]?.pdf,
                        accountData[0]?.subject[state]?.title
                      )
                    }
                  >
                    Read PDF
                  </button>
                )}
              </div>
            </div>
            {accountData[0]?.subject[state]?.video ? (
              // <iframe
              //   src={Bucket + accountData[0]?.subject[state]?.video}
              //   width="100%"
              //   height="500px"
              //   key={state}
              //   frameborder="0"
              // ></iframe>
              <video
                width="100%"
                style={{ borderRadius: "7px" }}
                controls
                controlsList="nodownload"
                key={state}
              >
                <source
                  src={Bucket + accountData[0]?.subject[state]?.video}
                  type="video/mp4"
                />
              </video>
            ) : (
              <div
                className="box_shadow rounded d-flex align-items-center justify-content-center color_blue font_size_20"
                style={{ height: "300px" }}
              >
                No Video Available for this topic. Plaease Read the Resource
                Material in PDF
              </div>
            )}
          </>
        )}
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
            <Document file={Bucket + IDs} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} scale={scale} />
            </Document>
          </section>
        </Modal.Body>
        <Modal.Footer>
          <div></div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Recorded_Video;
