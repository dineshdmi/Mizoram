import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import { ApiPost, ApiDelete, ApiGet } from "../../../helpers/API/ApiData";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Container, Row } from "reactstrap";
import { Tooltip } from "@material-ui/core";
import Card from "reactstrap/es/Card";
import Button from "reactstrap/es/Button";
import CardBody from "reactstrap/es/CardBody";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineMessage,
} from "react-icons/ai";

const spacing = {
  margin: "1%",
};

const position = {
  marginTop: "0px",
  maxWidth: "1317px",
};

export default function ContactUs() {
  const [category, setCategory] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [rowid, SetID] = useState();
  const [users, setUser] = useState();
  const [statusp, Setstatusp] = useState("public");
  const [loading, setloading] = useState(false);
  const [sorted1, setSorted] = useState([]);
  const history = useHistory();
  const [openMsgDialog, setOpenMsgDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [columns, setcolumn] = useState([
    {
      Header: "Name",
      accessor: "firstName",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Messages",
      accessor: "message",
    },
    {
      Header: "Action",
      filterable: false,
      minWidth: 40,

      Cell: (row) => {
        return (
          <div className="d-flex justify-content-center">
            <center>
              <Tooltip title="See full message" placement="top" arrow>
                <button
                  className="btn btn-light mr-2"
                  onClick={(e) => handleClickOpenMsg(row.original.message)}
                >
                  <AiOutlineMessage fontSize={20} />
                </button>
              </Tooltip>
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

  const columns2 = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Messages",
      accessor: "messages",
    },
  ];

  //   const reftoken = () => {
  //     const token = JSON.parse(localStorage.getItem("token"));
  //     const rtoken = JSON.parse(localStorage.getItem("ref_token"));
  //     const body = {
  //       old_token: token,
  //       refresh_token: rtoken,
  //     };
  //     ApiPostNoAuth("user/generate_token", body)
  //       .then(async (res) => {
  //         authUtil.setToken(res.data.data.token);
  //         authUtil.setRToken(res.data.data.refresh_token);
  //         getDate(1, 10, statusp);
  //       })
  //       .catch((err) => {});
  //   };
  //   const handleonChange1 = (e) => {
  //     let { name, value } = e.target;

  //     setaccountData((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   };
  //   const handleonChange = (e) => {
  //     Setstatusp(e.target.value);

  //     getDate(1, pagesize, e.target.value);
  //   };

  //   const handleClose2 = () => {
  //     setOpen2(false);
  //   };
  const handleClickOpen1 = (row) => {
    SetID(row);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClickOpenMsg = (message) => {
    setSelectedMessage(message);
    setOpenMsgDialog(true);
  };

  const filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true;
  };
  const BlockPage = (row) => {
    console.log("/contact_us" + row);
    ApiDelete(`/contact_us/${row}`)
      .then((res) => {
        if (res.status === 200) {
          handleClose1();
          toast.success(res.message);
          toast.success("Success");
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
          history.push("/postlist");
          console.log("This .then Block 410 Block");
        } else {
          toast.error(err.message);
          console.log("This .then Block 410 Else Block");
        }
      });
  };
  // For New Data At the Last //
  
  const getDate = async () => {
    await ApiGet("/contact_us")
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => {
        if (err.status == 500) {
        } else {
          toast.error(err.message);
        }
      });
  };
  // For New Data At the Top //

  // const getDate = async () => {
  //   await ApiGet("/contact_us")
  //     .then((res) => {
  //       const sortedData = res.data.data.sort((a, b) => {
  //         // Assuming 'createdAt' is a string in ISO format; otherwise, adjust the parsing
  //         return new Date(b.createdAt) - new Date(a.createdAt);
  //       });
  //       setCategory(sortedData);
  //     })
  //     .catch((err) => {
  //       if (err.status === 500) {
  //         // Handle server error
  //       } else {
  //         toast.error(err.message);
  //       }
  //     });
  // };
  const fetchData = (state) => {
    setloading(true);
    if (state.page == 0) {
      getDate(state.pageshow, state.pageSize, statusp);
    } else {
      getDate(state.page + 1, state.pageSize, statusp);
    }
  };
  useEffect(() => {
    getDate();
  }, []);

  return (
    <Container style={position}>
      <Row></Row>
      <Row>
        <Col md={12}>
          <ToastContainer />
          <Breadcrumb className="breNav">
            <BreadcrumbItem active>List of Contact Us</BreadcrumbItem>
          </Breadcrumb>
        </Col>
        <Col md={12}>
          <Card>
            <CardBody>
              <div style={spacing}>
                <ReactTable
                  columns={users === 3 ? columns2 : columns}
                  sortable={true}
                  //   showPagination={true}
                  defaultPageSize={10}
                  pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                  data={category}
                  pageshow={1}
                  onFetchData={fetchData}
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
                    Are you sure you want to Delete this Contact?
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
                open={openMsgDialog}
                onClose={() => setOpenMsgDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {selectedMessage}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setOpenMsgDialog(false)}
                    style={{ background: "#003366", color: "#FFFFFF" }}
                    autoFocus
                  >
                    Close
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
