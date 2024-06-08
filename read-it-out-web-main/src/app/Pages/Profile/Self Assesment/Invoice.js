import moment from "moment";
import React, { useRef, useState } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";

const Invoice = React.forwardRef((props, ref) => {
    const componentRef = useRef();
    const [userData, setUserData] = useState(props.userData);
    console.log("userData", userData);
    return (
        <div ref={ref}>
            <div id="capture">
                <Row>
                    <Col md={12}>
                        <Card style={{ border: "none" }}>
                            <CardBody className="rounded box_shadow ">
                                <div className="color_light_gray font_size_18 font_bold" style={{ fontSize: "16px" }}>
                                    Topic : <span className="color_blue font_size_16 font_medium">{userData?.name}</span>
                                </div>
                                <Row>
                                    <Col>
                                        <Table
                                            style={{
                                                border: "1px solid",

                                            }}
                                            className="mt-3 rounded"
                                        >
                                            <thead>
                                                <tr>
                                                    <th
                                                        className="t_border color_blue font-weight-bold"
                                                        style={{ fontSize: "16px", minWidth: '275px' }}
                                                    >
                                                        Question
                                                    </th>
                                                    <th
                                                        className="t_border color_blue font-weight-bold"
                                                        style={{ fontSize: "16px" }}
                                                    >
                                                        Answer
                                                    </th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    userData?.topic?.map((que) => (
                                                        <tr>
                                                            <td className="t_border">
                                                                {que.question}
                                                            </td>
                                                            <td className="t_border">
                                                                {que.answer}
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
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
