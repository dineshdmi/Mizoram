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

const Theory_test = ({ match }) => {
  console.log("match", match);
  const history = useHistory();
  console.log("historyyyyyyy", history);
  const [topic, setTopic] = useState([]);
  const [question, setQuestion] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  let { path, url } = useRouteMatch();

  useEffect(() => {
    // let userAnswer = JSON.parse(localStorage.getItem("user_answer"));
    // console.log("userAnswer", userAnswer);
    ApiGet("/topic/theory")
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

  let newOne = [];
  console.log("userAnswer", userAnswer);
  console.log("newOne", newOne);
  return (
    <div className="rounded box_shadow p-3">
      {/* {!open ? ( */}
      {/* <> */}
      <h6 className="pb-3">Let's start quick test</h6>
      {/* <p>Choose Topic</p> */}
      <div className="my-2">
        {loading ? (
          topic.map((topics) => {
            console.log("topics", topics);
            console.log("topics._id", topics._id);
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
                        history.push(`/theory_test_question?id=${topics?._id}&name=${topics?.topicName}`)
                      }
                    >
                      Start Exam
                    </button>
                  </div>
                </Col>
              </Row>
            );
          })
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <Spin />
          </div>
        )}
      </div>
      {/* </> */}
      {/* // ) : (
      //   <div className="">
      //     <Button */}
      {/* //       className="text-white linear_gradient_desk border_none"
      //       onClick={() => setOpen(!oepn)}
      //     >
      //       Back
      //     </Button> */}
      {/* //   </div> */}
      {/* // )} */}
    </div>
  );
};

export default Theory_test;
