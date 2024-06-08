import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import { ApiDelete, ApiGet, ApiPost } from "../../../helpers/API/ApiData";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import Card from "reactstrap/es/Card";
import Button from "reactstrap/es/Button";
import CardBody from "reactstrap/es/CardBody";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { FcApproval, FcLike, FcDownload } from "react-icons/fc";
import { BiBlock } from "react-icons/bi";
import queryString from "query-string";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { FormGroup, Label, Input } from "reactstrap";
const spacing = {
  margin: "3%",
};

const position = {
  marginTop: "0px",
  maxWidth: "1317px",
};
let search = "";
export default function SellerDashboard(props) {
  const [loading, setloading] = useState(false);

  const [category, setCategory] = useState([]);
  const [accountData, setaccountData] = useState({});
  const [flag, setflag] = useState(true);
  const [open2, setOpen2] = useState(false);
  const [rowid, SetID] = useState();
  const [open1, setOpen1] = useState(false);
  const [ID, setID] = useState("");
  const [count, setCount] = useState(100);
  const history = useHistory();
  const [page, SetPage] = useState(1);
  const [pages, SetPages] = useState(0);
  const [pagesize, SetPageSize] = useState(10);
  const [subject, setSubject] = useState([]);
  const [columns2, setcolumn2] = useState([
    {
      Header: "Title",
      filterable: false,
      minWidth: 200,

      Cell: (row) => {
        console.log(row);
        return <div>{row.original.title}</div>;
      },
    },

    {
      Header: "Video",
      filterable: false,

      Cell: (row) => {
        return (
          <div>
            <center>
              {row.original.video ? (
                <div>
                  <FcApproval
                    size="25"
                    color="green"
                    style={{ marginRight: "19px" }}
                  />
                </div>
              ) : (
                <div>
                  <BiBlock
                    size="25"
                    color="red"
                    style={{ marginRight: "19px" }}
                  />
                </div>
              )}
            </center>
          </div>
        );
      },
    },

    {
      Header: "Action",
      minWidth: 150,
      filterable: false,

      Cell: (row) => {
        return (
          <div className="d-flex justify-content-center">
            <center>
              <button
                className="btn btn-light-primary mr-2"
                onClick={(e) => EditQuestion(row.original._id)}
              >
                <AiOutlineEdit fontSize={20} />
              </button>
              <button
                className="btn btn-light-danger mr-2"
                onClick={(e) => handleClickOpen1(row.original._id)}
              >
                <AiOutlineDelete fontSize={20} />
              </button>
            </center>
          </div>
        );
      },
    },
  ]);

  const EditQuestion = (row) => {
    history.push("/contentEdit?id=" + row);
  };
  const handleClickOpen1 = (row) => {
    SetID(row);
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleonChange = (e) => {
    let { name, value } = e.target;

    console.log(name, value);

    setaccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    contectus(value);
  };
  console.log("accountData", accountData);
  const filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true;
  };
  const BlockPage = (row) => {
    console.log("/content/delete/" + row);
    ApiDelete("/content/delete/" + row)
      .then((res) => {
        if (res.status === 200) {
          handleClose1();
          toast.success(res.message);
          toast.success("Content Successfully Deleted");
          setTimeout(function() {
            contectus();
          }, 2000);
        } else {
          toast.error(res.message);
          console.log("This .then Block");
        }
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/contentList");
          console.log("This .then Block 410 Block");
        } else {
          toast.error(err.message);
          console.log("This .then Block 410 Else Block");
        }
      });
  };

  console.log(category);

  const contectus = (v) => {
    var body = {
      subjectId: v === "select" ? "" : v ? v : "",
    };
    ApiPost("/content/get_content", body)
      .then((res) => {
        console.log("contentList", res.data.data);
        setCategory(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/contentList");
        } else {
          toast.error(err.message);
        }
      });
  };

  useEffect(() => {
    contectus();

    ApiGet("/course_subject")
      .then((res) => {
        setSubject(res.data.data);
        console.log("subject", res.data.data);
      })

      .catch((err) => {
        if (err.status == 410) {
          history.push("/contentList");
        } else {
          toast.error(err.message);
        }
      });
  }, []);
  return (
    <Container style={position}>
      <Row></Row>
      <Row>
        <Col md={12}>
          <ToastContainer />
          <Breadcrumb className="breNav">
            <BreadcrumbItem active>List of all Content</BreadcrumbItem>
            <button
              id="kt_login_signin_submit"
              type="submit"
              className={`btn btn-primary font-weight-bold px-8 py-2`}
              onClick={() => history.push("/contentEdit")}
            >
              <span>Add content</span>
            </button>
          </Breadcrumb>
        </Col>
        <Col md={6} className="justify-content-end d-flex">
          <div md={1} className="d-flex justify-content-end"></div>
        </Col>
        <Col md={12}>
          <Card>
            <CardBody>
              <Row>
                <Col md={11} lg={11}></Col>
              </Row>
              <div className="d-flex justify-content-end">
                <Col md={3}>
                  <FormGroup>
                    <Label>
                      Select course<span style={{ color: "red" }}> * </span>
                    </Label>
                    <Input
                      type="select"
                      onChange={handleonChange}
                      value={accountData.subjectId}
                      name="subjectId"
                      placeholder="Enter Subject Name"
                      required
                    >
                      <option value="select">Select Course</option>
                      {subject.map((sub, i) => {
                        return <option value={sub._id}>{sub.title}</option>;
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </div>
              <div style={spacing}>
                <ReactTable
                  data={category}
                  columns={columns2}
                  sortable={true}
                  filterable={true}
                  defaultFilterMethod={filterMethod}
                  showPagination={true}
                  defaultPageSize={10}
                  resizable={true}
                  className="-striped -highlight"
                />
              </div>
              <Dialog
                open={open1}
                onClose={handleClose1}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this content?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => BlockPage(rowid)}
                    style={{ background: "#003366", color: "#FFFFFF" }}
                    autoFocus
                  >
                    YES
                  </Button>
                  <Button
                    onClick={handleClose1}
                    style={{ background: "#003366", color: "#FFFFFF" }}
                    autoFocus
                  >
                    NO
                  </Button>
                </DialogActions>
              </Dialog>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
