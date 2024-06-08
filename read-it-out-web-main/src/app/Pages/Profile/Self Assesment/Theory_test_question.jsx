import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ApiGet } from "app/helpers/API/ApiData";
import queryString from "query-string";
import { Popover } from "antd";
import { BiArrowBack } from "react-icons/bi";

import { Spin } from "antd";


const Theory_test_question = () => {
  const history = useHistory();
  const [topic, setTopic] = useState([]);
  const [value, setValue] = useState();
  const [state, setstate] = useState(0)
  const [loader, setLoader] = useState(false)


  useEffect(() => {
    const idValue = queryString.parse(window.location.search);
    setValue(idValue);

    ApiGet(`/theory_question/topic/${idValue.id}`)
      .then((res) => {
        console.log("/topic", res.data.data);
        setTopic(res.data?.data?.question_data);
        setLoader(!loader)
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
  return (
    <div className="my-3">
      <Container className="box_shadow rounded">
        <Card>
          <CardBody>
            {/* <Row> */}
            <div className="d-flex justify-content-between align-items-center">
              <div className="">
                <BiArrowBack
                  className="color_blue pointer my-2"
                  fontSize={20}
                  onClick={() => history.push("/profile/selfAssesment/theoryTest")}
                />
              </div>
              {state === topic?.length - 1 && <Button className="rounded linear_gradient_desk px-4 border_none"
                onClick={() => {
                  history.push({
                    pathname: "invoice",
                    state: { topic, name: value?.name },
                  });
                }}
              >
                Download PDF
              </Button>}
            </div>

            <div className="font_size_18 color_blue text-center">
              {value?.name}
            </div>


            {/* </Row> */}
            {
              loader ?
                <Row className="justify-content-center">
                  {console.log("lastIndex", topic?.lastIndexOf())}
                  {/* {topic?.map((topics, i) => ( */}
                  <Col md={8} className="rounded box_shadow my-2 py-2">
                    <div className="text-center">
                      <div className="color_light_gray font_size_18 my-4">
                        Quetion {state + 1}

                      </div>
                      <span className="color_blue font_size_16">
                        {topic && topic[state]?.question}
                      </span>
                      <div className="my-4">
                        {
                          state > 0 &&
                          <Button className="viewAllBtn mx-1 px-4 border_none"
                            onClick={() => setstate(state - 1)}
                          >
                            Privious
                          </Button>
                        }
                        {
                          state !== topic?.length - 1 &&
                          <Button className="rounded linear_gradient_desk px-4 border_none"
                            onClick={() => setstate(state + 1)}
                          >
                            Next
                          </Button>
                        }
                      </div>
                    </div>
                  </Col>
                  {/* ))} */}
                </Row> :
                <Row className="d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
                  <Spin />
                </Row>
            }
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default Theory_test_question;
