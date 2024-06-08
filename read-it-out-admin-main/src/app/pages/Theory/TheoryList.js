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
  AiOutlineDelete,
  AiOutlineEdit,
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
  const [maincategory, setMainCategory] = useState([]);
  const [pages, SetPages] = useState(0);
  const [page, SetPage] = useState(1);
  const [pagesize, SetPageSize] = useState(10);
  const history = useHistory();
  const [statusp, Setstatusp] = useState("");

  const [columns2, setcolumn2] = useState([
    {
      Header: "Question",
      accessor: "question",
      filterable: false,
    },

    {
      Header: "Answer",
      accessor: "answer",
      filterable: false,
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
    history.push("/theoryEdit?id=" + row);
  };
  const handleClickOpen1 = (row) => {
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
    ApiDelete("/theory_question/delete/" + row)
      .then((res) => {
        if (res.status === 200) {
          handleClose1();
          toast.success(res.data.message);
          setTimeout(function() {
            contectus(10, 1);
          }, 2000);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/topicList");
        } else {
          toast.error(err.message);
        }
      });
  };
  const handleonChange = (e) => {
    Setstatusp(e.target.value);
    contectus(pagesize, 1, e.target.value);
  };

  console.log(category);
  const contectus = (limit, page, topicId) => {
    var body = {
      limit,
      page,
      topicId: topicId === "all" ? "" : topicId,
    };
    ApiPost("/theory_question/get_theory_question", body)
      .then((res) => {
        console.log("theory_question/get_theory_question", res.data.data);
        setCategory(res.data.data.theoryQuestion_data);
        SetPage(res.data.data.state.page);
        SetPages(res.data.data.state.page_limit);
        SetPageSize(res.data.data.state.limit);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/postlist");
        } else {
          toast.error(err.message);
        }
      });
  };

  const fetchData = (state) => {
    // setloading(true);
    if (state.page == 0) {
      contectus(state.pageSize, state.pageshow, statusp);
    } else {
      contectus(state.pageSize, state.page + 1, statusp);
    }
  };

  useEffect(() => {
    ApiGet("/topic/theory")
      .then((res) => {
        setMainCategory(res.data.data);
        console.log("Sucess");
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/mcqList");
        } else {
          toast.error(err.message);
        }
      });
  }, []);

  return (
    <Container style={position}>
      <Row></Row>
      <Row>
        <Col md={6}>
          <ToastContainer />
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/topicList">Topics</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Theory Test Questions</BreadcrumbItem>
          </Breadcrumb>
        </Col>
        <Col md={6} className="justify-content-end d-flex">
          <div md={1} className="d-flex justify-content-end">
            <button
              id="kt_login_signin_submit"
              type="submit"
              className={`btn btn-primary font-weight-bold px-8 py-2 my-3`}
              onClick={() => history.push("/theoryEdit")}
            >
              <span>Add Theory Questions</span>
              {loading && <span className="ml-3 spinner spinner-white"></span>}
            </button>
          </div>
        </Col>
        <Col md={12}>
          <Card>
            <CardBody>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      All Theory topics List
                      <span style={{ color: "red" }}> * </span>
                    </Label>
                    <Input
                      type="select"
                      name="topicId"
                      onChange={(e) => handleonChange(e)}
                      value={accountData.topicId}
                      placeholder="Select Theory topics List"
                    >
                      <option value="all">Select Theory topics List</option>
                      {maincategory.map((record, i) => {
                        return (
                          <option value={record._id}>{record.topicName}</option>
                        );
                      })}
                      {}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <div style={spacing}>
                <ReactTable
                  columns={columns2}
                  sortable={true}
                  filterable={true}
                  defaultFilterMethod={filterMethod}
                  showPagination={true}
                  defaultPageSize={10}
                  pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                  manual
                  onFetchData={fetchData}
                  data={category}
                  pages={pages}
                  pageshow={1}
                  // loading={loading}
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
                    Are you sure you want to Delete this Question?
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
