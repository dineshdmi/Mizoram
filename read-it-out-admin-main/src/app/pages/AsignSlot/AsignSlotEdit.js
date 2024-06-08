import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  ApiPost,
  ApiGet,
  ApiPut,
  ApiUpload,
  Bucket,
} from "../../../helpers/API/ApiData";
import queryString from "query-string";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import moment from "moment";

import Radio from "@material-ui/core/Radio";

import "react-toastify/dist/ReactToastify.css";

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
const position = {
  maxWidth: "1322px",
  marginTop: "0px",
  marginBottom: "2%",
};
var extra = [];
export default function AsignSlotEdit({ slot, contectus, setModal, modal }) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [accountData, setaccountData] = useState({});
  const [block, setBlock] = useState(true);
  const [verify, setVerify] = useState(true);

  const handleBlock = (e) => {
    setBlock(e);
    // blockUser(e);
  };
  const handleVerify = (e) => {
    setVerify(e);
    // setModal(!modal);
  };
  const handleonChange = (e) => {
    let { name, value } = e.target;

    setaccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [category, setCategory] = useState([]);

  const onSubmit = () => {
    let body = {
      // time_slotId: slot.slotId,
      // facultyId: accountData.facultyId,
      // date: slot.date,
      // meeting_link: accountData.meeting_link,
      // subjectId: slot.courseId,
      // isFaculty: verify,
      // isStudent: block,
      batchId: slot._id,
      time_slotId: slot.time_slotId,
      facultyId: accountData.facultyId,
      date: slot.date,
      meeting_link: accountData.meeting_link,
      subjectId: slot.subjectId,
      isFaculty: verify,
      isStudent: block,
    };
    console.log(body);
    ApiPost("/assign_faculty/add", body)
      .then((res) => {
        toast.success(res.data.message);

        // disableLoading();
        // setbutton(false);
        setTimeout(() => {
          history.push("/slotList");
          contectus();
          setModal(!modal);
        }, 2000);
      })
      .catch((err) => {
        // disableLoading();
        // setbutton(false);

        if (err.status == 410) {
          history.push("/slotList");
        } else {
          toast.error(err.message);
        }
      });
  };

  useEffect(() => {
    ApiGet("/faculty")
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/slotList");
        } else {
          toast.error(err.message);
        }
      });
  }, []);
  return (
    <Container style={position}>
      <ToastContainer position="top-right" />
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <Form>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label>
                        Select course<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        // onChange={handleonChange}
                        value={slot.course}
                        name="subjectId"
                        placeholder="Enter Subject Name"
                        // required
                        disabled
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label>
                        Faculty<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="select"
                        name="facultyId"
                        onChange={(e) => handleonChange(e)}
                        // value={accountData.facultyId}
                        placeholder="Select Faculty"
                      >
                        <option>Select faculty</option>
                        {category.map((record, i) => {
                          return (
                            <option value={record._id}>{record.name}</option>
                          );
                        })}
                        {}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label>
                        Time slot<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        name="time_slotId"
                        // onChange={(e) => handleonChange(e)}
                        value={slot.start_time + " to " + slot.end_time}
                        placeholder="Select Time Slot"
                        disabled
                      ></Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label>
                        Date slot<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        name="date"
                        // onChange={(e) => handleonChange(e)}
                        value={moment(slot.date).format("DD-MM-YYYY")}
                        placeholder="Select Time Slot"
                        disabled
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col md={4} className="d-flex justify-content-between">
                    <div className="d-flex flex-column align-items-center mr-3">
                      <Label>Email to student</Label>
                      <BootstrapSwitchButton
                        checked={block}
                        onlabel={null}
                        onstyle="success"
                        offlabel={null}
                        offstyle="secondary"
                        style="w-50 mx-3"
                        className="switchButton"
                        onChange={handleBlock}
                      />
                    </div>
                    <div className="d-flex flex-column align-items-center ">
                      <Label>Email to faculty</Label>
                      <BootstrapSwitchButton
                        checked={verify}
                        onlabel="Block"
                        onstyle="success"
                        offlabel="Unblock"
                        offstyle="secondary"
                        style="w-50 mx-3"
                        onChange={handleVerify}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Meeting link<span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="textarea"
                        onChange={handleonChange}
                        // value={accountData.meeting_link}
                        name="meeting_link"
                        placeholder="Enter Meeting Link"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-center">
                    <Button
                      onClick={onSubmit}
                      style={{ marginTop: "19px", width: "166px" }}
                      className="btn-primary"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
