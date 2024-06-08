import { ApiGet } from "app/helpers/API/ApiData";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import MCQ_Test_Question from "./MCQ_Test_Question";
import { Spin } from "antd";
import { BsSquareFill } from "react-icons/bs";
import _ from "underscore";


let answ = 0
let Wansw = 0
let Unansw = 0
const MCQ_Test = ({ match }) => {
  console.log("match", match);
  const history = useHistory();
  console.log("historyyyyyyy", history);
  const [topic, setTopic] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState([]);
  // const [result1, setResult1] = useState();
  const [index, setIndex] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);

  useEffect(() => {
    let user_answer = JSON.parse(localStorage.getItem("user_answer"));
    console.log("user_answer", user_answer);
    // console.log("user_answer", user_answer.length > 0);
    setUserAnswer(user_answer);


  }, []);

  // if (userAnswer.length > 0) {
  let result1 = topic.filter(function (o1) {
    return userAnswer?.length > 0 && !userAnswer?.some(function (o2) {    //  for diffrent we use NOT (!) befor obj2 here
      return o1._id == o2._id;          // id is unnique both array object
    });
  });
  // console.log("result1", result1);

  // setResult1(r1)
  let result2 = topic.filter(function (o1) {
    return userAnswer?.length > 0 && userAnswer?.some(function (o2) {    //  for diffrent we use NOT (!) befor obj2 here
      return o1._id == o2._id;          // id is unnique both array object
    });
  });
  // console.log("result2", result2);
  // setResult2(r2)
  // }
  useEffect(() => {
    // let userAnswer = JSON.parse(localStorage.getItem("user_answer"));
    // console.log("userAnswer", userAnswer);
    ApiGet("/topic/mcq")
      .then((res) => {
        console.log("/topic", res.data.data);
        setTopic(res.data?.data);

        setLoading(!loading);
        //   setList(res.data.data[0].training);
        //   setIsLoading(true);
        // setResult(res.data.data[0]);
        // setOptions(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          // refreshtoken();
        } else {
          toast.error(err.message);
        }
      });
  }, []);


  const resultSubmit = (i) => {
    setOpen(true)
    setIndex(i)

    userAnswer && userAnswer[i]?.userAns?.map((item) => {
      console.log("right", item);
      if (item?.user_answer) {
        if (item.answer?.trim() === item.user_answer?.trim()) {
          answ = answ + 1

        } else if (item.answer?.trim() !== item.user_answer?.trim()) {
          Wansw = Wansw + 1
        }

      } else if (!item?.user_answer?.trim()) {
        Unansw = Unansw + 1
      }
      // setLoader(!loader)
    })


  }


  const restartExam = (id) => {
    answ = 0;
    Wansw = 0;
    Unansw = 0;
    history.push(`/mcq_test_question?id=${id}`)
  }



  console.log("result1", result1);
  console.log("result2", result2);
  console.log("answ,Unansw, Wansw", answ, Unansw, Wansw);
  return (
    <div className="rounded box_shadow p-3">
      {!open ? (
        <>
          <h6 className="pb-3">Let's start quick test</h6>
          {/* <p>Choose Topic</p> */}
          <div className="my-2">
            {loading ? (
              <>
                {
                  result2?.length > 0 &&
                  result2?.map((topics, i) => {


                    // console.log("topics._id", topics._id);
                    return (
                      <Row>
                        <Col md={8}>
                          <div className="d-flex border rounded my-2 p-2">
                            <div className="color_blue flex-grow-1 py-2">
                              {topics.topicName}
                            </div>

                            <button
                              className="rounded text-white linear_gradient_desk px-4"
                              // onClick={() => getQuestion(topics?._id)}
                              onClick={() => resultSubmit(i)
                              }
                            >
                              Result
                            </button>

                          </div>
                        </Col>
                      </Row>

                    );
                  })
                } {
                  result1?.length > 0 &&
                  result1?.map((topics) => {


                    // console.log("topics._id", topics._id);
                    return (
                      <Row>
                        <Col md={8}>
                          <div className="d-flex border rounded my-2 p-2">
                            <div className="color_blue flex-grow-1 py-2">
                              {topics.topicName}
                            </div>

                            <button
                              className="rounded text-white linear_gradient_desk px-4"
                              // onClick={() => getQuestion(topics?._id)}
                              onClick={() =>
                                history.push(`/mcq_test_question?id=${topics?._id}`)
                              }
                            >
                              Start Exam
                            </button>

                          </div>
                        </Col>
                      </Row>

                    );
                  })


                }
                {
                  result1?.length === 0 && result2?.length === 0 &&
                  topic?.map((topics) => {


                    // console.log("topics._id", topics._id);
                    return (
                      <Row>
                        <Col md={8}>
                          <div className="d-flex border rounded my-2 p-2">
                            <div className="color_blue flex-grow-1 py-2">
                              {topics.topicName}
                            </div>

                            <button
                              className="rounded text-white linear_gradient_desk px-4"
                              // onClick={() => getQuestion(topics?._id)}
                              onClick={() =>
                                history.push(`/mcq_test_question?id=${topics?._id}`)
                              }
                            >
                              Start Exam
                            </button>

                          </div>
                        </Col>
                      </Row>

                    );
                  })
                }


              </>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <Spin />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="">
          <Button
            className="text-white linear_gradient_desk border_none"
            onClick={() => {
              answ = 0;
              Wansw = 0;
              Unansw = 0;
              setOpen(false)
            }}
          >
            Back
          </Button>
          <Row>
            <Col md={9} className="p-0">
              <CardBody>
                {userAnswer[index].userAns.map(
                  (que) => {

                    return que.user_answer ? (
                      <div className="rounded box_shadow my-2 p-2">
                        <div className="font_size_16 color_light_gray">Question : <span className="font_size_16 color_blue">{que?.question}</span></div>
                        {que.option.map((opt) => {
                          return opt === "" ||
                            opt === " " ||
                            opt === "  " ||
                            opt === "   " ||
                            opt === "    " ||
                            opt === "     " ||
                            opt === null ? (
                            ""
                          ) : opt === que.user_answer ? (
                            opt.trim() === que.answer ? (
                              <div className="px-3 py-2 d-flex align-items-center rounded box_shadow bg_light_blue box_shadow2 my-2 pointer w-100 ">
                                {opt}
                              </div>
                            ) : (
                              <div className="px-3 py-2 d-flex align-items-center rounded box_shadow bg_light_red box_shadow3 my-2 pointer w-100 ">
                                {opt}
                              </div>
                            )
                          ) : opt.trim() === que.answer ? (
                            <div className="px-3 py-2 d-flex align-items-center rounded box_shadow bg_light_blue box_shadow2 my-2 pointer w-100 ">
                              {opt}
                            </div>
                          ) : (
                            <div className="px-3 py-2 d-flex align-items-center rounded box_shadow my-2 pointer w-100 ">
                              {opt}
                            </div>
                          )
                        }


                        )}
                      </div>
                    )
                      :
                      <div className="rounded bg_light_gray box_shadow my-2 p-2">
                        <div className="font_size_16 color_light_gray">Question : <span className="font_size_16 color_blue">{que?.question}</span></div>
                        {que.option.map((opt) => {
                          return opt === "" ||
                            opt === " " ||
                            opt === "  " ||
                            opt === "   " ||
                            opt === "    " ||
                            opt === "     " ||
                            opt === null ? (
                            ""
                          ) : opt.trim() === que.answer ? (
                            <div className="px-3 py-2 d-flex align-items-center rounded box_shadow bg_light_blue box_shadow2 my-2 pointer w-100 ">
                              {opt}
                            </div>
                          ) : (
                            <div className="px-3 py-2 d-flex align-items-center rounded box_shadow my-2 pointer w-100 ">
                              {opt}
                            </div>
                          )
                        }


                        )}
                      </div>
                  }
                )}
              </CardBody>
            </Col>
            <Col md={3} className="p-0">
              <CardBody className="px-0">
                <div className="rounded box_shadow my-2 p-2">
                  <CardBody>
                    <div className="font_size_16 color_light_gray rounded p-2 bg_gray_shad">Your Result</div>
                    <div className="d-flex justify-content-between my-1 font_size_16 color_light_gray rounded p-2 bg_purple">
                      <span>Total Question </span>
                      <span>{userAnswer[index]?.userAns?.length}</span>
                    </div>
                    <div className="d-flex justify-content-between my-1 rounded p-2 bg_light_blue">
                      <div className="d-flex p-0 align-items-center">
                        <div className="">
                          <BsSquareFill color="00bde2" />
                        </div>
                        <div className="color_light_gray font_size_14 mx-2">Correct Answers</div>
                      </div>
                      <div className="color_light_gray font_size_16">{answ}</div>
                    </div>
                    <div className="d-flex justify-content-between my-1 rounded p-2 bg_light_red">
                      <div className="d-flex p-0 align-items-center">
                        <div className="">
                          <BsSquareFill color="#FF4343" />
                        </div>
                        <div className="color_light_gray font_size_14 mx-2">Wrong Answers</div>
                      </div>
                      <div className="color_light_gray font_size_16">{Wansw}</div>
                    </div>
                    <div className="d-flex justify-content-between my-1 rounded p-2 bg_light_gray">
                      <div className="d-flex p-0 align-items-center">
                        <div className="">
                          <BsSquareFill color="#D7D7F3" />
                        </div>
                        <div className="color_light_gray font_size_14 mx-2"> Un-Answers</div>
                      </div>
                      <div className="color_light_gray font_size_16">{Unansw}</div>
                    </div>

                    <button className="w-100 rounded p-2 bg_blue text-white" onClick={() => restartExam(userAnswer[index]?._id)
                    }>

                      Restart Exam
                    </button>

                  </CardBody>
                </div>
              </CardBody>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default MCQ_Test;
