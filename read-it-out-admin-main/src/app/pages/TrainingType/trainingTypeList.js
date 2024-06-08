import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import { ApiDelete, ApiGet } from "../../../helpers/API/ApiData";
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

import { AiFillEdit, AiFillDelete, AiOutlineEdit } from "react-icons/ai";
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
      Header: "Name",
      accessor: "name",
      filterable: false,
    },

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
              {/* <button
                className="btn btn-light-danger mr-2"
                onClick={(e) => handleClickOpen1(row.original._id)}
              >
                <AiOutlineDelete fontSize={20} />
              </button> */}

              {/* <AiFillDelete
                size="25"
                color="red"
                onClick={(e) => handleClickOpen1(row.original._id)}
                style={{ marginRight: "19px" }}
              /> */}
            </center>
          </div>
        );
      },
    },
  ]);

  const EditQuestion = (row) => {
    history.push("/trainingTypeEdit?id=" + row);
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

  const filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true;
  };
  const BlockPage = (row) => {
    console.log("/training_type/delete/" + row);
    ApiDelete("/training_type/delete/" + row)
      .then((res) => {
        if (res.status === 200) {
          handleClose1();
          toast.success(res.message);
          toast.success("Content Successfully Deleted");
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
          history.push("/trainingTypeList");
          console.log("This .then Block 410 Block");
        } else {
          toast.error(err.message);
          console.log("This .then Block 410 Else Block");
        }
      });
  };

  console.log(category);
  const contectus = (i) => {
    ApiGet("/training_type")
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/trainingTypeList");
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
      <Row></Row>
      <Row>
        <Col md={12}>
          <ToastContainer />
          <Breadcrumb>
            <BreadcrumbItem active>List of Training Types</BreadcrumbItem>
          </Breadcrumb>
        </Col>
        {/* <Col md={6} className="justify-content-end d-flex">
          <div md={1} className="d-flex justify-content-end">
            <button
              id="kt_login_signin_submit"
              type="submit"
              className={`btn btn-primary font-weight-bold px-8 py-2 my-3`}
              onClick={() => history.push("/contentEdit")}
            >
              <span>Add Content</span>
              {loading && <span className="ml-3 spinner spinner-white"></span>}
            </button>
          </div>
        </Col> */}
        {/* <Col md={2} className="d-flex justify-content-end">
          <button
            id="kt_login_signin_submit"
            type="submit"
            className={`btn btn-primary font-weight-bold px-8 py-2 my-3`}
            onClick={() => history.push("/trainingTypeEdit")}
          >
            <span>Add</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </Col> */}
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
                    Are you sure you want to Delete this Training Type?
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
