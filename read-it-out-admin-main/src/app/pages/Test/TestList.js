import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import { ApiDelete, ApiGet, ApiPost } from "../../../helpers/API/ApiData";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import {
  Col,
  Container,
  Row,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Modal,
  Label,
  Input,
} from "reactstrap";
import Card from "reactstrap/es/Card";
import Button from "reactstrap/es/Button";
import CardBody from "reactstrap/es/CardBody";
import { useHistory, Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { MdDelete } from "react-icons/md";
const spacing = {
  margin: "3%",
};

const position = {
  marginTop: "0px",
  maxWidth: "1317px",
};

export default function SellerDashboard(props) {
  const [loading, setloading] = useState(false);

  const [category, setCategory] = useState([]);
  const [accountData, setaccountData] = useState({});
  const [flag, setflag] = useState(true);
  const [open2, setOpen2] = useState(false);
  const [rowid, SetID] = useState();
  const [open1, setOpen1] = useState(false);

  const history = useHistory();

  const [columns2, setcolumn2] = useState([
    {
      Header: "Topic name",
      filterable: false,
      accessor: "topicName",
      Cell: (row) => {
        console.log(row.original);
        return <div>{row.original.topicName}</div>;
      },
    },
    {
      Header: "Marks",
      accessor: "passing_marks",
      filterable: false,
    },
    {
      Header: "Number of Questions",
      accessor: "question_select",
      filterable: false,
    },
    {
      Header: "Duration",
      filterable: false,
      accessor: "duration",
    },
    // {
    //   Header: "Test Type",
    //   filterable: false,

    //   Cell: (row) => {
    //     return (
    //       <div>
    //         {row.original.type == 0
    //           ? "MCQ Test"
    //           : row.original.type == 1
    //           ? "Theory Test"
    //           : "Computer Training"}
    //       </div>
    //     );
    //   },
    // },
    {
      Header: "Action",
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
    history.push("/topicEdit?id=" + row);
  };
  const handleClickOpen1 = (row) => {
    SetID(row);
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleonChange1 = (e) => {
    let { name, value } = e.target;

    setaccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const PandingQuestion = (row) => {
    SetID(row);
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true;
  };
  const BlockPage = (row) => {
    ApiDelete("/topic/delete/" + row)
      .then((res) => {
        console.log("res.data.message", res.data.message);
        toast.success(res.data.message);
        handleClose1();

        setTimeout(function() {
          contectus();
        }, 2000);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/topicList");
          console.log("This .then Block 410 Block");
        } else {
          toast.error(err.message);
          console.log("This .then Block 410 Else Block");
        }
      });
  };

  console.log(category);
  const contectus = (i) => {
    ApiGet("/topic")
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/postlist");
        } else {
          toast.error(err.message);
        }
      });
  };
  useEffect(() => {
    contectus("true");
  }, []);
  return (
    <Container style={position}>
      <ToastContainer position="top-right" />
      <Row></Row>
      <Row>
        <Col md={12}>
          <Breadcrumb className="breNav">
            <BreadcrumbItem active>Topics List</BreadcrumbItem>
            <div md={2} className="d-flex justify-content-end mr-2">
              <button
                id="kt_login_signin_submit"
                type="submit"
                className={`btn btn-primary font-weight-bold px-8 py-2`}
                onClick={() => history.push("/mcqList")}
              >
                <span>MCQ Test</span>
              </button>
              <button
                id="kt_login_signin_submit"
                type="submit"
                className={`btn btn-primary font-weight-bold px-8 py-2 mx-3`}
                onClick={() => history.push("/theoryList")}
              >
                <span>Theory Test</span>
              </button>
              <button
                id="kt_login_signin_submit"
                type="submit"
                className={`btn btn-primary font-weight-bold px-8 py-2 ml-3`}
                onClick={() => history.push("/topicEdit")}
              >
                <span>Add</span>
              </button>
            </div>
          </Breadcrumb>
        </Col>
        <Col md={6} className="justify-content-end d-flex"></Col>
        <Col md={12}>
          <Card>
            <CardBody>
              <Row>
                <Col md={11} lg={11}></Col>
              </Row>

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
                    Are you sure you want to Delete this Test?
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
