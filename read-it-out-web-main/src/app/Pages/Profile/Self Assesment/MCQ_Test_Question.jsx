import React, { useState, useEffect, useRef, useCallback } from "react";
import purple from "../../../media/purple.png";
import green from "../../../media/green.png";
import moment from "moment";
import {
  ApiDelete,
  ApiGetNoAuth,
  ApiGet,
  ApiPost,
  ApiPostNoAuth,
  Bucket,
} from "../../../helpers/API/ApiData";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import queryString from "query-string";
import { Spin } from "antd";
import "antd/dist/antd.css";
import Countdown from "react-countdown";
import * as userUtil from "../../../utils/user.util";
import _ from "underscore";

let currntobj = {};
let listofQuestion = [];
let section = [];
let currentoutof10 = "";
let flag = 1;
let main = [];
let anwser_que = 0;
let unanwser_que = 0;
let mini = 1;
let sece = 1;
let emptyArray = [];
let score = 0;

const MCQ_Test_Question = (props) => {
  window.history.pushState(null, "", window.location.href);
  window.onpopstate = function () {
    window.history.pushState(null, "", window.location.href);
  };

  const [questions, setQuestion] = useState();
  const [IDs, setIDs] = useState();
  const [ID, setID] = useState();
  const [msg, setMessage] = useState("");
  // const [timres, setTimers] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [count, setcount] = useState(100);
  const [totalQuestion, setTotalQuestion] = useState([]);
  const [addAnswer, setAddAnswer] = useState([]);
  const [isFailed, setIsFailed] = useState(false);
  const [disabledButton, setDisabledButton] = useState();
  const [active, setActive] = useState("");
  const [timeZone, setTime] = useState();
  const [data, setData] = useState(
    { date: Date.now(), delay: 1800000 } //10 seconds
  );
  const wantedDelay = 1800000; //10 ms

  // const [score, setScore] = useState(0);

  const history = useHistory();
  // console.log(currntobj);
  let btnRef = useRef();

  const resultSubmit = (i) => {
    // history.push("/profile/selfAssesment");
    let a = []
    a = JSON.parse(localStorage.getItem('user_answer')) || [];
    a.push({ _id: ID, userAns: listofQuestion })

    a = _.uniq(a, true /* array already sorted */, function (item) {
      console.log("itemssss", item);
      return item._id;
    });
    console.log("aaaaaaaaaa", a);


    // Find item index using _.findIndex (thanks @AJ Richardson for comment)
    var index = _.findIndex(a, { _id: ID });
    console.log("indexxxx", index);
    a.splice(index, 1, { _id: ID, userAns: listofQuestion });
    localStorage.setItem('user_answer', JSON.stringify(a));


    history.push({
      pathname: "/profile/selfAssesment",
    });

  };


  const setthecurruntque = (i, j) => {
    if (j == "nex") {
      // console.log(listofQuestion.length - 1);
      if (i == listofQuestion.length - 1) {
        alert("question is over");
      } else {
        // console.log(i);
        // if(i=="undefined" || i==undefined){
        //   console.log(listofQuestion[0])
        //   currntobj = listofQuestion[0]
        //   currntobj.ind = 0
        //   currentoutof10 = 1
        //   setcount(count+1)
        // }else{

        // outoften = outoften.split(".")[1]
        currntobj = listofQuestion[i + 1];
        currntobj.ind = i + 1;
        let ext1 = i + 2;
        let outoften = (ext1 / 10).toString();
        // console.log(outoften.split(".")[1]);
        // console.log(outoften.split(".")[0]);
        let seflagggg = parseInt(outoften.split(".")[0]);
        if (outoften.split(".")[1] == undefined) {
          currentoutof10 = 10;
          flag = seflagggg;
        } else {
          currentoutof10 = outoften.split(".")[1];

          flag = seflagggg + 1;
        }

        setcount(count + 1);
      }
      setcount(count + 1);
      // }
    } else {
      // console.log(listofQuestion.length - 1);
      if (i == 0) {
        alert("question is over");
      } else {
        // console.log(i);
        // if(i=="undefined" || i==undefined){
        //   console.log(listofQuestion[0])
        //   currntobj = listofQuestion[0]
        //   currntobj.ind = 0
        //   currentoutof10 = 1
        //   setcount(count+1)
        // }else{

        // outoften = outoften.split(".")[1]
        currntobj = listofQuestion[i - 1];
        currntobj.ind = i - 1;
        let ext1 = i;
        let outoften = (ext1 / 10).toString();
        // console.log(outoften.split(".")[1]);
        // console.log(outoften.split(".")[0]);
        let seflagggg1 = parseInt(outoften.split(".")[0]);
        if (outoften.split(".")[1] == undefined) {
          currentoutof10 = 10;
          flag = seflagggg1;
        } else {
          currentoutof10 = outoften.split(".")[1];
          flag = seflagggg1 + 1;
        }
        setcount(count + 1);
      }
      setcount(count + 1);
      // }
    }
  };
  const mainsetqueastion = (i, j, k) => {
    // console.log(i, k);
    currntobj = listofQuestion[i];
    currntobj.ind = i;
    currentoutof10 = j;
    flag = k;
    setcount(count + 1);
  };

  const arrayIncludesInObj = (arr, key, valueToCheck) => {
    return arr.some((value) => value[key] === valueToCheck);
  };

  const setAnswer = (e, id, index) => {
    // setDisabledButton(false);
    // console.log("index", index);
    // console.log("currntobj?.option[0]", currntobj);
    setActive(e);
    if (arrayIncludesInObj(addAnswer, "_id", id)) {
      let filterData = addAnswer.filter((v) => {
        return v._id !== id;
      });
      let final = [...filterData, { _id: id, answer: e }];
      setAddAnswer(final);
    } else {
      setAddAnswer([
        ...addAnswer,
        {
          _id: id,
          answer: e,
        },
      ]);
    }
    const finalList = listofQuestion.map((item) => {
      if (item._id === id) {
        return { ...item, user_answer: e };
      } else {
        return item;
      }
    });
    listofQuestion = finalList;
    callsidearray(listofQuestion);
    currntobj = listofQuestion[index];

  };
  // console.log("addAnswer", addAnswer);
  // console.log("active", active);
  // console.log("unanwser_que", unanwser_que);
  const setFlag = (i) => {
    // console.log(i);
    // console.log((i - 1) * 10);
    currntobj = listofQuestion[(i - 1) * 10];
    currntobj.ind = (i - 1) * 10;
    currentoutof10 = 1;
    flag = i;
    setcount(count + 1);
  };
  const setthecurruntqueint = () => {
    currntobj = listofQuestion[0];
    currntobj.ind = 0;
    currentoutof10 = 1;
    setcount(count + 1);
  };
  // console.log(currntobj);
  const callsidearray = (i) => {
    // console.log(i);
    main = [];
    let k = [];
    for (let j = 0; j < i.length; j++) {
      // console.log((j + 1) % 10);
      if ((j + 1) % 10 == 0) {
        i[j].ind = j;
        k.push(i[j]);
        main.push(k);
        k = [];
      } else {
        i[j].ind = j;
        // console.log("ELSE");
        k.push(i[j]);
        if (j == i.length - 1) {
          main.push(k);
        }
      }
      // main.push(k)
    }
    console.log("main", main);
  };
  // console.log(mini, sece);
  useEffect(() => {
    const idValue = queryString.parse(window.location.search);
    setID(idValue.id);
    currntobj = {};
    listofQuestion = [];
    section = [];
    currentoutof10 = "";
    flag = 1;
    main = [];
    anwser_que = 0;
    unanwser_que = 0;
    ApiGet("/mcq_question/topic/" + idValue.id)
      .then((res) => {
        console.log("/mcq_question/topic/", res.data.data);

        // anwser_que = res.data.data.answered_question.count;

        // unanwser_que = res.data.data.unanswered_question.count;
        setQuestion(res.data.data?.question_data[0].topicId);
        setTotalQuestion(res.data.data?.question_data);
        setTime(moment(new Date()).format());
        let ext = Math.ceil(res.data.data.question_data.length / 10);

        for (let i = 1; i <= ext; i++) {
          section.push(i);
        }

        // console.log(section);

        listofQuestion = res.data.data.question_data;
        // console.log("listofQuestion", listofQuestion);
        callsidearray(res.data.data.question_data);
        // setlistofQuestion(res.data.data);
        setthecurruntqueint();
        // setCategory(res.data.data);
      })
      .catch((err) => {
        // console.log(err);
        if (err.status == 410) {
          history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
  }, []);

  // useEffect(() => {
  //   const savedDate = getLocalStorageValue("end_date");
  //   if (savedDate != null && !isNaN(savedDate)) {
  //     const currentTime = Date.now();
  //     const delta = parseInt(savedDate, 10) - currentTime;
  //     // console.log("delta", delta);
  //     //Do you reach the end?
  //     if (delta > wantedDelay) {
  //       //Yes we clear uour saved end date
  //       if (localStorage.getItem("end_date").length > 0)
  //         localStorage.removeItem("end_date");
  //     } else {
  //       //No update the end date with the current date
  //       setData({ date: currentTime, delay: delta });
  //     }
  //   }
  // }, []);

  useEffect(() => {
    setDisabledButton(true);
    // toggleFullScreen();
  }, []);

  const cancelModal = () => {
    setModal(!modal);
    score = 0;
  };
  console.log("listofQuestion", listofQuestion);

  // console.log("currntobj", currntobj);
  const handleChange = (e) => {
    // console.log(e);
    mini = e.minutes;
    sece = e.seconds;
    // setcount(count + 1);
  };

  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  document.onkeydown = function (e) {
    // debugger;

    if (e.keyCode == 123) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
      return false;
    }
  };

  const handleUserKeyPress = (e) => {
    // console.log("keydown", e);
    if (e.keyCode === 116) {
      e.preventDefault();
    }
    if (e.keyCode === 122) {
      e.preventDefault();
    }
    if (e.keyCode === 27) {
      e.preventDefault();
    }

    if (e.ctrlKey === true) {
      if (e.keyCode === 82) {
        e.preventDefault();
      }
    }
    if (e.altKey === true) {
      if (e.keyCode === 68) {
        e.preventDefault();
      }
    }
  };

  window.addEventListener("keydown", handleUserKeyPress);

  window.onbeforeunload = function () {
    return false;
  };

  return (
    <div>
      <ToastContainer position="top-right" />
      <div className="container">
        <div className=" px-3 py-3">
          <div className="d-flex flexColumn align-items-center px-3 py-3 justify-content-between box_shadow rounded">
            <h3 className="font_size_22 font_medium color_gray">
              {totalQuestion[0]?.subject}
            </h3>
            <div className="d-flex align-items-center justify-content-between px-2 py-2">
              <h5 className="font_size_18 font_medium color_blue pr-5">
                {" "}
                Total Marks: {listofQuestion.length}
              </h5>
              <h5 className="d-flex font_size_18 font_medium color_gray pr-5">
                {" "}
                Time:{" "}
                <div id="countdown2">
                  <Countdown
                    date={data.date + data.delay}
                    renderer={(props) => (
                      <span>
                        {props.hours}:{props.minutes}:{props.seconds}
                      </span>
                    )}
                    // onStart={(delta) => {
                    //   //Save the end date
                    //   if (localStorage.getItem("end_date") == null)
                    //     localStorage.setItem(
                    //       "end_date",
                    //       JSON.stringify(data.date + data.delay)
                    //     );
                    // }}
                    onComplete={() => resultSubmit()}
                  />
                </div>
                / 00:30:00
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-3 ">
        <div className="row">
          <div className="col-md-9 position-relative">
            {/* <div className="d-flex">
              {section &&
                section.map((book, i) => {
                  return (
                    <div
                      className={`col text-center py-3 border rounded font_size_18 font_regular color_light_gray pointer ${
                        flag === book && `linear_gradient text-white`
                      }`}
                      onClick={() => setFlag(book)}
                    >
                      Section {book}
                    </div>
                  );
                })}
            
            </div> */}

            {disabledButton === true ? (
              <div className="box_shadow rounded_1 p-5 ">
                <h3 className="font_size_18 font_medium color_gray py-1 select_none">
                  {currntobj?.question}
                </h3>
                {/* <h4 className="font_size_16 font_regular color_blue py-1">
                Question {currentoutof10} of {totalQuestion?.length}
              </h4> */}
                <div className=" rounded mt-3" style={{ height: "240px" }}>
                  {(currntobj?.option && currntobj?.option[0] === "") ||
                    (currntobj?.option && currntobj?.option[0] === " ") ||
                    (currntobj?.option && currntobj?.option[0] === "  ") ||
                    (currntobj?.option && currntobj?.option[0] === "   ") ||
                    (currntobj?.option && currntobj?.option[0] === "    ") ||
                    (currntobj?.option && currntobj?.option[0] === "     ") ||
                    (currntobj?.option && currntobj?.option[0] === null) ? (
                    ""
                  ) : (
                    <button
                      className={`px-3 py-2 d-flex align-items-center rounded box_shadow my-2 pointer w-100 ${currntobj?.option &&
                        currntobj?.option[0] === currntobj?.user_answer &&
                        `bg_light_blue box_shadow2`
                        }`}
                      // disabled={disabledButton}
                      onClick={() =>
                        setAnswer(
                          currntobj?.option[0],
                          currntobj?._id,
                          currntobj?.ind
                        )
                      }
                    >
                      <h4
                        className={`font_size_16 font_regular  px-3 py-2 rounded-circle ${currntobj?.option &&
                          currntobj?.option[0] === currntobj?.user_answer
                          ? `color_blue borderBlue `
                          : `color_gray border`
                          }`}
                      >
                        A
                      </h4>
                      <h4
                        className={`font_size_16 font_regular  px-2 select_none ${currntobj?.option &&
                          currntobj?.option[0] === currntobj?.user_answer
                          ? `color_blue`
                          : `color_gray`
                          }`}
                      >
                        {currntobj?.option && currntobj?.option[0]}
                      </h4>
                    </button>
                  )}
                  {(currntobj?.option && currntobj?.option[1] === "") ||
                    (currntobj?.option && currntobj?.option[1] === " ") ||
                    (currntobj?.option && currntobj?.option[1] === "  ") ||
                    (currntobj?.option && currntobj?.option[1] === "   ") ||
                    (currntobj?.option && currntobj?.option[1] === "    ") ||
                    (currntobj?.option && currntobj?.option[1] === "     ") ||
                    (currntobj?.option && currntobj?.option[1] === null) ? (
                    ""
                  ) : (
                    <button
                      className={`px-3 py-2 d-flex align-items-center rounded box_shadow my-2 pointer w-100 ${currntobj?.option &&
                        currntobj?.option[1] === currntobj?.user_answer &&
                        `bg_light_blue box_shadow2`
                        }`}
                      // disabled={disabledButton}
                      onClick={() =>
                        setAnswer(
                          currntobj?.option[1],
                          currntobj?._id,
                          currntobj?.ind
                        )
                      }
                    >
                      <h4
                        className={`font_size_16 font_regular  px-3 py-2 rounded-circle ${currntobj?.option &&
                          currntobj?.option[1] === currntobj?.user_answer
                          ? `color_blue borderBlue `
                          : `color_gray border`
                          }`}
                      >
                        B
                      </h4>
                      <h4
                        className={`font_size_16 font_regular  px-2 select_none ${currntobj?.option &&
                          currntobj?.option[1] === currntobj?.user_answer
                          ? `color_blue`
                          : `color_gray`
                          }`}
                      >
                        {currntobj?.option && currntobj?.option[1]}
                      </h4>
                    </button>
                  )}
                  {(currntobj?.option && currntobj?.option[2] === "") ||
                    (currntobj?.option && currntobj?.option[2] === " ") ||
                    (currntobj?.option && currntobj?.option[2] === "  ") ||
                    (currntobj?.option && currntobj?.option[2] === "   ") ||
                    (currntobj?.option && currntobj?.option[2] === "    ") ||
                    (currntobj?.option && currntobj?.option[2] === "     ") ||
                    (currntobj?.option && currntobj?.option[2] === null) ? (
                    ""
                  ) : (
                    <button
                      className={`px-3 py-2 d-flex align-items-center rounded box_shadow my-2 pointer w-100 ${currntobj?.option &&
                        currntobj?.option[2] === currntobj?.user_answer &&
                        `bg_light_blue box_shadow2`
                        }`}
                      // disabled={disabledButton}
                      onClick={() =>
                        setAnswer(
                          currntobj?.option[2],
                          currntobj?._id,
                          currntobj?.ind
                        )
                      }
                    >
                      <h4
                        className={`font_size_16 font_regular  px-3 py-2 rounded-circle ${currntobj?.option &&
                          currntobj?.option[2] === currntobj?.user_answer
                          ? `color_blue borderBlue `
                          : `color_gray border`
                          }`}
                      >
                        C
                      </h4>
                      <h4
                        className={`font_size_16 font_regular  px-2 select_none ${currntobj?.option &&
                          currntobj?.option[2] === currntobj?.user_answer
                          ? `color_blue`
                          : `color_gray`
                          }`}
                      >
                        {currntobj?.option && currntobj?.option[2]}
                      </h4>
                    </button>
                  )}
                  {(currntobj?.option && currntobj?.option[3] === "") ||
                    (currntobj?.option && currntobj?.option[3] === " ") ||
                    (currntobj?.option && currntobj?.option[3] === "  ") ||
                    (currntobj?.option && currntobj?.option[3] === "   ") ||
                    (currntobj?.option && currntobj?.option[3] === "    ") ||
                    (currntobj?.option && currntobj?.option[3] === "     ") ||
                    (currntobj?.option && currntobj?.option[3] === null) ? (
                    ""
                  ) : (
                    <button
                      className={`px-3 py-2 d-flex align-items-center rounded box_shadow my-2 pointer w-100 ${currntobj?.option &&
                        currntobj?.option[3] === currntobj?.user_answer &&
                        `bg_light_blue box_shadow2`
                        }`}
                      // disabled={disabledButton}
                      onClick={() =>
                        setAnswer(
                          currntobj?.option[3],
                          currntobj?._id,
                          currntobj?.ind
                        )
                      }
                    >
                      <h4
                        className={`font_size_16 font_regular  px-3 py-2 rounded-circle ${currntobj?.option &&
                          currntobj?.option[3] === currntobj?.user_answer
                          ? `color_blue borderBlue `
                          : `color_gray border`
                          }`}
                      >
                        D
                      </h4>
                      <h4
                        className={`font_size_16 font_regular  px-2 select_none ${currntobj?.option &&
                          currntobj?.option[3] === currntobj?.user_answer
                          ? `color_blue`
                          : `color_gray`
                          }`}
                      >
                        {currntobj?.option && currntobj?.option[3]}
                      </h4>
                    </button>
                  )}
                </div>

                <div className=" pt-200 d-flex justify-content-center">
                  {currntobj.ind == 0 ? (
                    ""
                  ) : (
                    <button
                      className="rounded border-none py-2 mx-2 viewAllBtn"
                      onClick={() => setthecurruntque(currntobj?.ind, "pre")}
                    >
                      Previous
                    </button>
                  )}
                  {currntobj.ind == listofQuestion.length - 1 ? (
                    ""
                  ) : (
                    <button
                      className="rounded border-none py-2 mx-2 linear_gradient Btn"
                      onClick={() => setthecurruntque(currntobj?.ind, "nex")}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="box_shadow rounded_1 p-5 mt-5 text-center d-flex align-items-center justify-content-center h-75">
                <Spin />
              </div>
            )}
          </div>
          <div className="col-md-3 ">
            <div className="">
              {addAnswer.length ? (
                <button
                  className="rounded border-none py-3 text-white font_bold linear_gradient w-100"
                  onClick={() => resultSubmit()}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="rounded border-none py-3 text-white font_bold linear_gradient w-100"
                  onClick={() => setModal3(!modal3)}
                >
                  Submit
                </button>
              )}
            </div>
            <div className=" box_shadow rounded_1 border p-3 my-3">
              <h3 className="font_size_22 font_medium color_gray">Questions</h3>
              <div className="d-flex justify-content-between py-2">
                <div className="d-flex">
                  <img src={purple} alt="" />
                  <p className="font_size_14 font_medium color_light_gray px-2">
                    Answered{" "}
                    <span className="font_size_14 font_bold color_gray">
                      {addAnswer?.length}
                    </span>
                  </p>
                </div>
                <div className="d-flex">
                  <img src={green} alt="" />
                  <p className="font_size_14 font_medium color_light_gray px-2">
                    Unanswered{" "}
                    <span className="font_size_14 font_bold color_gray">
                      {totalQuestion.length - addAnswer?.length}
                    </span>
                  </p>
                </div>
              </div>

              <div className="scroll">
                {main &&
                  main.map((book, i) => {
                    return (
                      <div className="">
                        <p className="font_size_14 font_medium color_gray py-1">
                          Section {i + 1}
                        </p>

                        <div className="d-flex flex-wrap">
                          {book &&
                            book.map((book1, j) => {
                              // console.log("book1", book1);
                              return (
                                <div
                                  className={
                                    !book1?.user_answer
                                      ? "fixwidth rounded-pill text-center mx-1 my-1 text-white px-2 py-2 bg_blue pointer"
                                      : "fixwidth rounded-pill text-center mx-1 my-1 text-white px-2 py-2 bg_purple pointer"
                                  }
                                  onClick={() =>
                                    mainsetqueastion(book1.ind, j + 1, i + 1)
                                  }
                                >
                                  {j + 1}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={modal}
        centered
        onHide={() => setModal(!modal)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body>
          <span className="text-center font_size_20 font_bold color_light_gray">
            Are You Sure Submit Answer
          </span>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <button
              // type="button"
              // onClick={() => submitAnwser(IDs)}
              className="viewAllBtn rounded py-2 mx-2"
            >
              Submit
            </button>
            <button
              // type="button"
              onClick={() => cancelModal()}
              className="viewAllBtn rounded py-2"
            >
              Cancel
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modal3}
        centered
        onHide={() => setModal3(!modal3)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body>
          <span className="text-center font_size_20 font_bold color_light_gray">
            Give atleast one answer
          </span>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <button
              // type="button"
              onClick={() => setModal3(!modal3)}
              className="viewAllBtn rounded py-2"
            >
              OK
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modal2}
        centered
        // onHide={() => setModal2(!modal2)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body>
          <span className="text-center font_size_20 font_bold color_light_gray">
            {msg}
          </span>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <button
              // type="button"
              onClick={() => {
                isFailed === true
                  ? setTimeout(() => {
                    window.location.reload();
                  }, 1000)
                  : setTimeout(() => {
                    history.push("/training");
                    window.location.reload();
                  }, 1000);
              }}
              className="viewAllBtn rounded py-2 mx-2"
            >
              Ok
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MCQ_Test_Question;
