import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import { ApiDelete, ApiGet } from "../../../helpers/API/ApiData";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import { Col, Container, Row, Table } from "reactstrap";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import AsignSlotEdit from "./AsignSlotEdit";
import ReactExport from "react-export-excel";

import { HiDownload } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";

import moment from "moment";
const spacing = {
  margin: "3%",
};

const position = {
  marginTop: "0px",
  maxWidth: "1317px",
};

export default function SellerDashboard(props) {
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState([]);

  const [accountData, setaccountData] = useState({});
  const [open1, setOpen1] = useState(false);
  const [toggler, setToggler] = useState(false);
  const [slot, setSlot] = useState({});
  const [userId, setUserId] = useState();

  const history = useHistory();

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const columns = [
    { title: "Course", field: "course" },
    { title: "Date", field: "date" },
    { title: "Start Time", field: "start_time" },
    { title: "End Time", field: "end_time" },
    { title: "Total Student", field: "totalStudent" },
    { title: "Student Information", field: "userData" },
  ];
  const [columns2, setcolumn2] = useState([
    {
      Header: "Course",
      filterable: false,
      minWidth: 250,
      Cell: (row) => {
        return <div>{row?.original?.course}</div>;
      },
    },
    {
      Header: "Date",
      filterable: false,
      Cell: (row) => {
        return <div>{moment(row.original.date).format("YYYY-MM-DD")}</div>;
      },
    },

    {
      Header: "Start Time",
      filterable: false,
      Cell: (row) => {
        return <div>{row.original.start_time}</div>;
      },
    },
    {
      Header: "End Time",
      filterable: false,
      Cell: (row) => {
        return <div>{row.original.end_time}</div>;
      },
    },

    {
      Header: "Total Student",
      minWidth: 100,
      filterable: false,

      Cell: (row) => {
        return <div>{row.original.userCount}</div>;
      },
    },
    {
      Header: "Asign Faculty",
      minWidth: 150,
      filterable: false,

      Cell: (row) => {
        return row.original.faculty ? (
          <button
            className="btn btn-light-success"
            // onClick={() => handleClickOpen1(row.original)}
          >
            {" "}
            {row.original.faculty}
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => handleClickOpen1(row.original)}
          >
            {" "}
            Asign Faculty
          </button>
        );
      },
    },
    {
      Header: "",
      minWidth: 150,
      filterable: false,

      Cell: (row) => {
        let a = [];
        // // let b = [];
        a.push(row.original);
        // b.push(row.original.userData);
        // console.log("Download Faculty", a);

        return (
          <>
            <button
              className="btn btn-light-primary mr-2"
              onClick={() => {
                history.push({
                  pathname: "invoice",
                  state: a,
                });
              }}
            >
              <HiDownload fontSize={20} />
            </button>
            {/* {!row.original.faculty && (
              <button
                className="btn btn-light-danger"
                onClick={() => {
                  deleteBatch(row.original);
                }}
              >
                <AiOutlineDelete fontSize={20} />
              </button>
            )} */}
          </>
        );
      },
    },
  ]);

  const deleteBatch = (row) => {
    console.log(row);
    setToggler(!toggler);
    setUserId(row._id);
  };
  const handleClickOpen1 = (row) => {
    setModal(!modal);
    setSlot(row);
    console.log("row", row);
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

  const filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true;
  };

  console.log(category);
  const contectus = (i) => {
    ApiGet("/assign_faculty")
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
  };
  useEffect(() => {
    contectus("true");
  }, []);

  const deleted = () => {
    console.log("deleted", userId);
    ApiDelete("/user_batch/delete/" + userId)
      .then((res) => {
        if (res.status === 200) {
          handleClose1();
          setToggler(!toggler);
          toast.success(res.message);
          setTimeout(function() {
            contectus();
            // window.location.reload();
          }, 1000);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        if (err.status == 410) {
          console.log("This .then Block 410 Block");
        } else {
          toast.error(err.message);
          console.log("This .then Block 410 Else Block");
        }
      });
  };

  var connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  var type = connection.effectiveType;

  function updateConnectionStatus() {
    console.log(
      "Connection type changed from " + type + " to " + connection.effectiveType
    );
    type = connection.effectiveType;
  }

  let preloadVideo = true;
  var connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  if (connection) {
    if (connection.effectiveType === "slow-2g") {
      preloadVideo = false;
    }
  }
  console.log("preloadVideo", preloadVideo);
  connection.addEventListener("change", updateConnectionStatus);

  return (
    <>
      <Container style={position}>
        <Row></Row>
        <Row>
          <Col md={12}>
            <ToastContainer />
            <Breadcrumb>
              <BreadcrumbItem active>
                List of all Assigned Faculty
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>

          <Col md={12}>
            <Card>
              <CardBody>
                <Row className="justify-content-end">
                  <button
                    className="btn btn-light-primary"
                    onClick={() => history.push("batchManagment")}
                  >
                    Batch Create
                  </button>
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal
        show={modal}
        centered
        // onHide={() => setModal(!modal)}
        size="xl"
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
              onClick={() => setModal(!modal)}
            >
              X
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AsignSlotEdit
            slot={slot}
            contectus={contectus}
            setModal={setModal}
            modal={modal}
          />
        </Modal.Body>
        <Modal.Footer>
          <div></div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={toggler}
        centered
        // onHide={() => setModal(!modal)}
        size="md"
        // aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header
          closeButton
          className="d-flex
        "
        >
          <Modal.Title id="contained-modal-title-vcenter " className="">
            Are you want delete this batch...?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-end">
          <button className="btn btn-light-danger mr-2" onClick={deleted}>
            Ok
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setToggler(!toggler)}
          >
            Cancel
          </button>
        </Modal.Body>
        <Modal.Footer>
          <div></div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
