import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import {
  ApiPost,
  ApiDelete,
  ApiPostNoAuth,
  ApiGet,
} from "../../../helpers/API/ApiData";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  AiFillEye,
  AiFillInteraction,
  AiFillDelete,
  AiFillEdit,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import * as authUtil from "../../../utils/auth.util";
const spacing = {
  margin: "1%",
};

const position = {
  marginTop: "0px",
  maxWidth: "1317px",
};
const imagePosition = {
  width: "50%",
  height: "50%",
  marginLeft: "25%",
};
export default function SellerDashboard(props) {
  const [category, setCategory] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [rowid, SetID] = useState();
  const [statusp, Setstatusp] = useState("select");
  const [loading, setloading] = useState(false);
  const [page, SetPage] = useState(1);
  const [pages, SetPages] = useState(0);
  const [pagesize, SetPageSize] = useState(10);
  const [sorted1, setSorted] = useState([]);
  const [subject, setSubject] = useState([]);
  const history = useHistory();
  const [accountData, setaccountData] = useState({});
  const [columns, setcolumn] = useState([
    {
      Header: "Question",
      accessor: "question",
    },

    {
      Header: "Answer",
      accessor: "answer",
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
                onClick={(e) => EditItem(row.original._id)}
              >
                <AiOutlineEdit fontSize={20} />
              </button>
              <button
                className="btn btn-light-danger mr-2"
                onClick={(e) => handleDelete(row.original._id)}
              >
                <AiOutlineDelete fontSize={20} />
              </button>
            </center>
          </div>
        );
      },
    },
  ]);

  const reftoken = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const rtoken = JSON.parse(localStorage.getItem("ref_token"));
    const body = {
      old_token: token,
      refresh_token: rtoken,
    };
    ApiPostNoAuth("user/generate_token", body)
      .then(async (res) => {
        authUtil.setToken(res.data.data.token);
        authUtil.setRToken(res.data.data.refresh_token);
        getDate(1, 10, statusp);
      })
      .catch((err) => {});
  };
  const handleonChange1 = (e) => {
    let { name, value } = e.target;

    setaccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleonChange = (e) => {
    const { name, value } = e.target;
    console.log("value", value);
    Setstatusp(e.target.value);
    setaccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    getDate(1, pagesize, value);
  };

  const EditItem = (row) => {
    history.push("/questionBankEdit?id=" + row);
  };
  const ViewQuestion = (row) => {
    history.push("/mainCategoryview?id=" + row);
    // console.log(row);
  };
  const PandingQuestion = (row) => {
    SetID(row);
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleDelete = (row) => {
    SetID(row);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true;
  };
  const BlockPage = (row) => {
    console.log("/computer_test/delete/" + row);
    ApiDelete("/computer_test/delete/" + row)
      .then((res) => {
        if (res.status === 200) {
          handleClose1();
          toast.success(res.message);
          toast.success("Question Deleted Successfully");
          setTimeout(function() {
            window.location.reload();
          }, 2000);
        } else {
          toast.error(res.message);
          console.log("This .then Block");
        }
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/questionBank");
          console.log("This .then Block 410 Block");
        } else {
          toast.error(err.message);
          console.log("This .then Block 410 Else Block");
        }
      });
  };

  const getDate = (s, p, q) => {
    var body = {
      limit: p,
      page: s,
      search: "",
      subjectId: q === "select" ? "" : q ? q : "",
    };
    const Id2 = JSON.parse(localStorage.getItem("token"));
    ApiPost("/computer_test/get_question", body)
      .then((res) => {
        setCategory(res.data.data.question_data);
        SetPage(res.data.data.state.page);
        SetPages(res.data.data.state.page_limit);
        SetPageSize(res.data.data.state.limit);
        setloading(false);
        console.log("Roop");
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          reftoken();
        } else {
          toast.error(err.message);
        }
      });
  };
  const fetchData = (state) => {
    setloading(true);
    if (state.page == 0) {
      getDate(state.pageshow, state.pageSize, statusp);
    } else {
      getDate(state.page + 1, state.pageSize, statusp);
    }
  };
  useEffect(() => {
    getDate(page, pagesize);
    ApiGet("/course_subject")
      .then((res) => {
        setSubject(res.data.data);
        console.log("Sucess");
        console.log("course_subject", res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/questionBank");
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
            <BreadcrumbItem active>List of all MCQ</BreadcrumbItem>
            <button
              id="kt_login_signin_submit"
              type="submit"
              className={`btn btn-primary font-weight-bold px-8 py-2`}
              onClick={() => history.push("/questionBankEdit")}
            >
              <span>Add questions</span>
            </button>
          </Breadcrumb>
        </Col>
        <Col md={12}>
          <Card>
            <CardBody>
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
                      <option value="select">Select course</option>
                      {subject.map((sub, i) => {
                        return <option value={sub._id}>{sub.title}</option>;
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </div>
              <div style={spacing}>
                <ReactTable
                  columns={columns}
                  sortable={true}
                  defaultFilterMethod={filterMethod}
                  showPagination={true}
                  defaultPageSize={10}
                  pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                  manual
                  data={category}
                  pages={pages}
                  pageshow={1}
                  loading={loading}
                  onFetchData={fetchData}
                  sorted={sorted1}
                  onSortedChange={(newSort, column) => {
                    setSorted(newSort);
                  }}
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
                    Are you sure you want to delete this question?
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
              <Dialog
                open={open2}
                onClose={handleClose2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    please give your response?
                  </DialogContentText>
                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <Label>
                          Message<span style={{ color: "red" }}> * </span>
                        </Label>
                        <Input
                          type="textarea"
                          onChange={handleonChange1}
                          value={accountData.description}
                          name="description"
                          placeholder="Enter description"
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </DialogContent>
              </Dialog>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
