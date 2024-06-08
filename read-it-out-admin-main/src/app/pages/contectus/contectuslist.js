import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import {
  ApiDelete,
  ApiGet,
  ApiPost
} from "../../../helpers/API/ApiData";
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
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
const spacing = {
  margin: "1%",
};

const position = {
  marginTop: "0px",
  maxWidth: "1317px",
};

export default function SellerDashboard(props) {
  const [category, setCategory] = useState([]);
  const [accountData, setaccountData] = useState({});
  const [flag,setflag]= useState(true)
  const [open2, setOpen2] = useState(false);
  const [rowid, SetID] = useState();

  const history = useHistory();

  const [columns, setcolumn] = useState([
    {
        Header: "Name",
        filterable: false,
        Cell: (row) => {
          return (
           <div>
           {row.original.firstName} {row.original.lastName}
           </div>
          );
        },
      },
    {
      Header: "Email",
      accessor: "email",
    },
    {
        Header: "Message",
        accessor: "message",
    },
    
    {
      Header: "Action",
      filterable: false,
      Cell: (row) => {
        return (
          <center>
            {!row.original.isResponded ? <AiFillEdit size="25" color="green" onClick={(e) => PandingQuestion(row.original._id)}
              style={{ marginRight: "19px" }}/>:""}
            {/* <MdDelete size="25" color="red" onClick={(e) => PandingQuestion(row.original._id)}
              style={{ marginRight: "19px" }}/> */}
          </center>
        );
      },
    },
  ]);
  const [columns2, setcolumn2] = useState([
    {
        Header: "Name",
        filterable: false,
        Cell: (row) => {
          return (
           <div>
           {row.original.firstName} {row.original.lastName}
           </div>
          );
        },
      },
    {
      Header: "Email",
      accessor: "email",
    },
    {
        Header: "Message",
        accessor: "message",
    },
    {
        Header: "Admin Replay",
        accessor: "message",
        Cell: (row) => {
            return (
             <div>
             {row.original.responseMessage[0]}
             </div>
            );
          },
    },
    
    // {
    //   Header: "Action",
    //   filterable: false,
    //   Cell: (row) => {
    //     return (
    //       <center>
    //         {!row.original.isResponded ? <AiFillEdit size="25" color="green" onClick={(e) => PandingQuestion(row.original._id)}
    //           style={{ marginRight: "19px" }}/>:""}
    //         {/* <MdDelete size="25" color="red" onClick={(e) => PandingQuestion(row.original._id)}
    //           style={{ marginRight: "19px" }}/> */}
    //       </center>
    //     );
    //   },
    // },
  ]);
  const handleonChange = (e) =>{
      console.log(e.target.value)
      if(e.target.value=="true"){
        setflag(true)
      }else{
        setflag(false)
      }
      
      contectus(e.target.value)
  }
  const EditQuestion = (row) => {
    history.push("/categoryedit?id=" + row);
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
  const BlockPage1 = (row) => {
      const body ={
        id:row,
        responseMessage:accountData.description
      }
    ApiPost("contact_us/response" , body)
      .then((res) => {
        handleClose2();
        toast.success(res.data.message);
        setTimeout(function() {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        if(err.status==410){
          history.push("/contectuslist")
        }else{
          toast.error(err.message);
        }
      });
  };
  const contectus = (i) =>{
    ApiGet("contact_us?isResponded="+i)
    .then((res) => {
      setCategory(res.data.data);
    })
    .catch((err) => {
      if(err.status==410){
        history.push("/postlist")
      }else{
        toast.error(err.message);
      }
    });
  }
  useEffect(() => {
    contectus("true")
  }, []);
  return (
    <Container style={position}>
      <Row></Row>
      <Row>
        <Col md={12}>
          <ToastContainer />
          <Breadcrumb>
            <BreadcrumbItem active>Category</BreadcrumbItem>
          </Breadcrumb>
        </Col>
        <Col md={12}>
          <Card>
            <CardBody>
              <Row>
                <Col md={11} lg={11}></Col>
                
              </Row>
              <Row>
                <Col md={4} lg={4}>
                  <FormGroup>
                    <Label>
                      Select Filter<span style={{ color: "red" }}> * </span>
                    </Label>
                    <Input
                      type="select"
                      name="categoryId"
                      placeholder="Select categoryId"
                      onChange={(e) => handleonChange(e)}
                    >
                      <option value="true">Responded</option>
                      <option value="false">Not Responded</option>


                    </Input>

                  </FormGroup>
                </Col>
              </Row>
              <div style={spacing}>
                <ReactTable
                  data={category}
                  columns={flag?columns2:columns}
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
                    Send
                  </Button>
                  <Button
                    onClick={() => handleClose2()}
                    style={{ background: "#003366", color: "#FFFFFF" }}
                    autoFocus
                  >
                    Cancel
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
