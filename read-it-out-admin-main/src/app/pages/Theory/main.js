import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import {
  ApiPost,
  ApiDelete,
  ApiPostNoAuth,
} from "../../../helpers/API/ApiData";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Container, Row, FormGroup, Label, Input } from "reactstrap";
import Card from "reactstrap/es/Card";
import Button from "reactstrap/es/Button";
import CardBody from "reactstrap/es/CardBody";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
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
  const [statusp, Setstatusp] = useState("public");
  const [loading, setloading] = useState(false);
  const [page, SetPage] = useState(1);
  const [pages, SetPages] = useState(0);
  const [pagesize, SetPageSize] = useState(10);
  const [sorted1, setSorted] = useState([]);
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
              <AiFillEdit
                size="25"
                color="deepskyblue"
                onClick={(e) => EditItem(row.original._id)}
                style={{ marginRight: "19px" }}
              />

              <AiFillDelete
                size="25"
                color="red"
                onClick={(e) => handleDelete(row.original._id)}
                style={{ marginRight: "19px" }}
              />
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

  const EditItem = (row) => {
    history.push("/theoryEdit?id=" + row);
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
    console.log("/theory_question/delete/" + row);
    ApiDelete("/theory_question/delete/" + row)
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
          history.push("/mcqList");
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
      status: q,
    };
    const Id2 = JSON.parse(localStorage.getItem("token"));
    ApiPost("/theory_question/get_theory_question", body)
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
  useEffect(() => {}, []);
  return (
    <Container style={position}>
      <Row></Row>
      <Row>
        <Col md={10}>
          <ToastContainer />
          <Breadcrumb>
            <BreadcrumbItem active>List of All Theory MCQ</BreadcrumbItem>
          </Breadcrumb>
        </Col>
        <Col md={2} className="d-flex justify-content-end">
          <button
            id="kt_login_signin_submit"
            type="submit"
            className={`btn btn-primary font-weight-bold px-8 py-2 my-3`}
            onClick={() => history.push("/theoryEdit")}
          >
            <span>Add Questions</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </Col>
        <Col md={12}>
          <Card>
            <CardBody>
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
