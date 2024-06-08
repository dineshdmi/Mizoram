import moment from "moment";
import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { Card, CardBody, Col, Row, Table } from "reactstrap";

const Invoice = React.forwardRef((props, ref) => {
  const componentRef = useRef();
  const [userData, setUserData] = useState(props.userData);
  return (
    <div ref={ref}>
      <div id="capture">
        <Row>
          <Col md={12}>
            <Card style={{ border: "none" }}>
              <CardBody>
                <div className="text-primary" style={{ fontSize: "16px" }}>
                  Course Details
                </div>
                <Row>
                  <Col>
                    <Table
                      style={{
                        border: "1px solid",
                      }}
                      className="mt-3"
                    >
                      <thead>
                        <tr>
                          <th
                            className="t_border bg text-primary font-weight-bold"
                            style={{ fontSize: "16px" }}
                          >
                            Course{" "}
                          </th>
                          <th
                            className="t_border bg text-primary font-weight-bold"
                            style={{ fontSize: "16px" }}
                          >
                            Date
                          </th>
                          <th
                            className="t_border bg text-primary font-weight-bold"
                            style={{ fontSize: "16px" }}
                          >
                            Start Time
                          </th>
                          <th
                            className="t_border bg text-primary font-weight-bold"
                            style={{ fontSize: "16px" }}
                          >
                            End Time
                          </th>
                          <th
                            className="t_border bg text-primary font-weight-bold"
                            style={{ fontSize: "16px" }}
                          >
                            Total Student
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="t_border">
                            {userData && userData[0]?.course}
                          </td>
                          <td className="t_border">
                            {userData &&
                              moment(userData[0]?.date).format("DD-MM-YYYY")}
                          </td>
                          <td className="t_border">
                            {userData && userData[0]?.start_time}
                          </td>
                          <td className="t_border">
                            {userData && userData[0]?.end_time}
                          </td>
                          <td className="t_border">
                            {userData && userData[0]?.userCount}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Card style={{ border: "none" }}>
              <CardBody>
                <div className="text-primary" style={{ fontSize: "16px" }}>
                  Student Information
                </div>
                <Row>
                  <Col>
                    <Table
                      style={{
                        border: "1px solid",
                      }}
                      className="mt-3"
                    >
                      <thead>
                        <tr>
                          <th
                            className="t_border bg text-primary font-weight-bold"
                            style={{ fontSize: "16px" }}
                          >
                            Name{" "}
                          </th>
                          <th
                            className="t_border bg text-primary font-weight-bold"
                            style={{ fontSize: "16px" }}
                          >
                            Email
                          </th>
                          <th
                            className="t_border bg text-primary font-weight-bold"
                            style={{ fontSize: "16px" }}
                          >
                            Phone
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData &&
                          userData[0]?.userData?.map((item) => (
                            <>
                              <tr>
                                <td>{item?.name}</td>
                                <td>{item?.email}</td>
                                <td>{item?.phoneNumber}</td>
                              </tr>
                            </>
                          ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
});

export default Invoice;
