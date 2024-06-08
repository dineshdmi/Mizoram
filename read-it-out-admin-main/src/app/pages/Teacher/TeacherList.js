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
import moment from "moment";
import {
  Col,
  Container,
  Row,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
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
} from "react-icons/ai";
import ReactExport from "react-export-excel";
import * as authUtil from "../../../utils/auth.util";
import { Modal } from "react-bootstrap";
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
let search = "";

export default function SellerDashboard() {
  const [category, setCategory] = useState([]);
  const [exportCategory, setExportCategory] = useState([]);
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
  const [count, setCount] = useState(100);
  const [boolenUnblock, SetboolenUnblock] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const [columns, setcolumn] = useState([
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
    },

    {
      Header: "Email",
      accessor: "email",
    },

    // {
    //   Header: "School Name",
    //   Cell: (row) => {
    //     return (
    //       <div className="d-flex justify-content-center">
    //         <center>{row.original.school[0].name}</center>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   Header: "School Name",
    //   Cell: (row) => {
    //     return (
    //       <div className="d-flex justify-content-center">
    //         <center>{row.original.school}</center>
    //       </div>
    //     );
    //   },
    // },

    {
      Header: "Action",
      minWidth: 150,
      filterable: false,

      Cell: (row) => {
        return (
          <div className="d-flex justify-content-center">
            <center>
              {/* <AiFillEdit
                size="25"
                color="deepskyblue"
                onClick={(e) => EditItem(row.original._id)}
                style={{ marginRight: "19px" }}
              /> */}

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
  const handleonChange1 = (e) => {
    let { name, value } = e.target;

    setaccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleonChangeSearch = (e) => {
    search = e.target.value;
    console.log(e.target.value);
    getDate(page, pagesize);
    setCount(count + 1);
  };
  const handleonChange = (e) => {
    Setstatusp(e.target.value);

    getDate(1, pagesize, e.target.value);
  };

  const EditItem = (row) => {
    history.push("/teacherEdit?id=" + row);
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
    console.log("/teacher/delete/" + row);
    ApiDelete("/teacher/delete/" + row)
      .then((res) => {
        if (res.status === 200) {
          handleClose1();
          toast.success(res.message);
          toast.success("Users Deleted Successfully");
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
          history.push("/teacherList");
          console.log("This .then Block 410 Block");
        } else {
          toast.error(err.message);
          console.log("This .then Block 410 Else Block");
        }
      });
  };
  const BlockPage1 = (row, i) => {
    var body = {
      postId: row,
      status: i,
      message: accountData.description,
    };
    ApiPost("post/action_on_post", body)
      .then((res) => {
        handleClose2();
        toast.success(res.data.message);
        setTimeout(function() {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/teacherList");
        } else {
          toast.error(err.message);
        }
      });
  };
  const exportSheet = async () => {
    setIsLoading(true);

    console.log(pages * pagesize);
    let body = {
      page: 1,
      limit: pages * pagesize,
    };

    await ApiPost("/teacher/get_teacher", body)
      .then((res) => {
        console.log(res);

        setCategory(res.data?.data?.teacher_data);

        // res.data?.data?.service_data?.map((data) => data?.appointment?.appointment_assign.length > 0 && array.push(data?.appointment?.appointment_assign))        // setAppointment(array)
        SetboolenUnblock(!boolenUnblock);

        setIsLoading(false);
      })
      .catch((err) => {
        if (err.status == 410) {
          // history.push("/postlist")
        } else {
          toast.error(err.message);
        }
      });
  };
  const getDate = (s, p) => {
    var body = {
      limit: p,
      page: s,
      search: search,
    };
    const Id2 = JSON.parse(localStorage.getItem("token"));
    ApiPost("/teacher/get_teacher", body)
      .then(async (res) => {
        setCategory(res.data.data.teacher_data);
        SetPage(res.data.data.state.page);
        SetPages(res.data.data.state.page_limit);
        SetPageSize(res.data.data.state.limit);
        setloading(false);
        await ApiPost("/teacher/get_teacher", {
          page: 1,
          limit: 20000,
          search: "",
        })
          .then((response) => {
            setExportCategory(response?.data?.data?.teacher_data);
          })
          .catch((error) => console.log("error", error));
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
        <Col md={8}>
          <ToastContainer />
          <Breadcrumb>
            <BreadcrumbItem active>List of All Users</BreadcrumbItem>
          </Breadcrumb>
        </Col>
        
        <Col md={4} className="d-flex justify-content-end align-content-center">
          <button
            id="kt_login_signin_submit"
            type="submit"
            className={`btn btn-primary font-weight-bold px-8 py-2 my-3 mr-3`}
            onClick={() => history.push("/teacherEdit")}
          >
            <span>Add</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>

          <div className="my-3">
            <ExcelFile
              element={
                <button className="btn btn-primary font-weight-bold px-8 py-2" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>
                  Export ExcelSheet
                </button>
              }
              filename="UserList Data"
            >
              <ExcelSheet data={exportCategory} name="Employees">
                <ExcelColumn label="Full Name" value={(col) => col.name} />
                <ExcelColumn
                  label="Phone Number"
                  value={(col) => col.phoneNumber}
                />
                <ExcelColumn label="Email" value={(col) => col.email} />
              </ExcelSheet>
            </ExcelFile>
          </div>
        </Col>


        <Col md={12}>
          <Card>
            <CardBody>
              {/* <Row>
                <Col md={4} lg={4}>
                  <FormGroup>
                    <Label>
                      Category<span style={{ color: "red" }}> * </span>
                    </Label>
                    <Input
                      type="select"
                      name="categoryId"
                      placeholder="Select categoryId"
                      onChange={(e) => handleonChange(e)}
                    >
                      <option value="public">Public</option>
                      <option value="reject">Rejected</option>
                      <option value="pending">Pending</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row> */}
              <div className="d-flex justify-content-end">
                <Col md={3}>
                  <FormGroup>
                    <Label>
                      Search Users<span style={{ color: "red" }}> * </span>
                    </Label>
                    <Input
                      type="text"
                      onChange={handleonChangeSearch}
                      value={search}
                      name="search"
                      placeholder="Enter Users Name"
                      required
                    />
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
                    Are you sure you want to Delete this User?
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
                <DialogActions>
                  <Button
                    onClick={() => BlockPage1(rowid, "public")}
                    style={{ background: "#003366", color: "#FFFFFF" }}
                    autoFocus
                  >
                    Public
                  </Button>
                  <Button
                    onClick={() => BlockPage1(rowid, "reject")}
                    style={{ background: "#003366", color: "#FFFFFF" }}
                    autoFocus
                  >
                    Reject
                  </Button>
                </DialogActions>
              </Dialog>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal
        show={boolenUnblock}
        // centered
        onHide={() => SetboolenUnblock(!boolenUnblock)}
        size="lg"
        // aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header
          closeButton
          className="d-flex justify-content-end
        "
        >
          <Modal.Title id="contained-modal-title-vcenter " className="">
            <button
              className="btn btn-light-danger"
              onClick={() => SetboolenUnblock(!boolenUnblock)}
            >
              X
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <div>
            <ExcelFile
              element={
                <Button color="primary" className="square" outline>
                  Export ExcelSheet1234
                </Button>
              }
              filename="Appointment Details"
            >
              <ExcelSheet data={category} name="Employees">
                <ExcelColumn label="Full Name" value={(col) => col.name} />
                <ExcelColumn
                  label="Phone Number"
                  value={(col) => col.phoneNumber}
                />
                <ExcelColumn label="Email" value={(col) => col.email} />
              </ExcelSheet>
            </ExcelFile>
            <div
              className="btn btn-danger"
              //  onClick={() => deleteTheory(Id)}
            >
              Delete
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
