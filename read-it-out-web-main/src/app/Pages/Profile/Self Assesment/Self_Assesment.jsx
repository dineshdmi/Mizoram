import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { Button, Card, Col, Row } from "reactstrap";
import { $CombinedState } from "redux";
import MCQ_Test from "./MCQ_Test";
import Theory_test from "./Theory_test";

const Self_Assesment = () => {
  const history = useHistory();
  const [active, setActive] = useState("active");
  let { path, url } = useRouteMatch();
  console.log("path", path);
  console.log("url", url);
  console.log("history", history.location.pathname);

  return (
    <div>
      <Row className="mb-4">
        <Col
          md={6}
          className="rounded box_shadow  border-top border-bottom p-0"
        >
          <Row id="myDIV">
            <Col md={6} className="p-0">
              <Button
                className={`btn w-100 text-center  border_none py-3 ${
                  history.location.pathname === "/profile/selfAssesment"
                    ? "buttonAvtive"
                    : "bg-white color_light_gray"
                }`}
                onClick={() => history.push(`${path}`)}
              >
                MCQ Test
              </Button>
            </Col>
            <Col md={6} className="p-0">
              <Button
                className={`btn w-100 text-center  border_none py-3 ${
                  history.location.pathname ===
                  "/profile/selfAssesment/theoryTest"
                    ? "buttonAvtive"
                    : "bg-white color_light_gray"
                }`}
                onClick={() => history.push(`${path}/theoryTest`)}
                // to={`${url}/theoryTest`}
              >
                Theory Test
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Card>
        <Switch>
          <Route exact path={path} component={MCQ_Test} />
          <Route exact path={`${path}/theoryTest`} component={Theory_test} />
        </Switch>
      </Card>
    </div>
  );
};

export default Self_Assesment;
