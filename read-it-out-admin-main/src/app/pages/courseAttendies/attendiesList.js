import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import {
  ApiPost,
  ApiDelete,
  ApiPostNoAuth,
  ApiGet,
  Bucket,
} from "../../../helpers/API/ApiData";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiBlock } from "react-icons/bi";
// import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlineQuestionCircle } from "react-icons/ai";
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
import { FcApproval, FcLike, FcDownload } from "react-icons/fc";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Alert, Space, Spin, Tag } from "antd";

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
export default function SellerDashboard(props) {
  const [category, setCategory] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [rowid, SetID] = useState();
  const [statusp, Setstatusp] = useState("");
  const [loading, setloading] = useState(false);
  const [page, SetPage] = useState(1);
  const [pages, SetPages] = useState(0);
  const [pagesize, SetPageSize] = useState(10);
  const [sorted1, setSorted] = useState([]);
  const [questionData, setQuetionData] = useState([]);
  const [rattingData, setRattingData] = useState([]);
  const history = useHistory();
  const [rowidblock, SetIDBlock] = useState();
  const [boolen, Setboolen] = useState();
  const [openblock, setOpenBlock] = useState(false);
  const [blockButton, SetblockButton] = useState();
  const [rowid1, SetID1] = useState();
  const [boolenUnblock, SetboolenUnblock] = useState();
  const [open, setOpen] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [accountData, setaccountData] = useState({});
  const [viewData, setViewData] = useState({});
  console.log(
    "🚀 ~ file: attendiesList.js ~ line 77 ~ SellerDashboard ~ viewData",
    viewData
  );
  const [count, setCount] = useState(100);
  const [button, setbutton] = useState(false);
  const [loadings, setLoading] = useState(false);
  const [recordCount, setRecordCount] = useState();

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const [columns, setcolumn] = useState([
    {
      Header: "Name",
      filterable: false,
      Cell: (row) => {
        // console.log("document", row);
        return (
          <div>
            {row.original.user.map((user) => {
              // console.log("user", user.name);
              return <div>{user.name}</div>;
            })}
          </div>
        );
      },
    },
    {
      Header: "Course",
      filterable: false,
      Cell: (row) => {
        // console.log("document", row);
        return (
          <div>
            {row.original.isCourse === true ? (
              <div>{row.original.subjectName}</div>
            ) : (
              <div>No Select Course</div>
            )}
            {/* {row.original.subject.map((user) => {
              // console.log("user", user.name);
              return <div>{user.title}</div>;
            })} */}
          </div>
        );
      },
    },
    {
      Header: "Training Option",
      filterable: false,
      Cell: (row) => {
        // console.log("document", row);
        return (
          <div>
            {row.original.optionType === 0 ? (
              <div>Recorded Video Training</div>
            ) : row.original.optionType === 1 ? (
              <div>Live Video Training</div>
            ) : (
              <div>Physical Training</div>
            )}
          </div>
        );
      },
    },
    {
      Header: "Document",
      // accessor: "name",
      filterable: false,
      Cell: (row) => {
        console.log("document", row.original.documents[0]);
        return (
          <div>
            {row.original.isDocument === true ? (
              row.original.documents[0].document_image === null ? (
                <div>No Document Upload</div>
              ) : (
                <a
                  href={Bucket + row?.original?.documents[0]?.document_image}
                  target="_blank"
                >
                  <img
                    src={Bucket + row?.original?.documents[0]?.document_image}
                    height="30px"
                    width="30px"
                    className="mx-1 rounded"
                  />
                </a>
              )
            ) : (
              <div>No Document Upload</div>
            )}
            {/* {row.original.documents.length === 0 ? (
              <div>No Document Submit</div>
            ) : (
              row.original.documents.map((pdf, i) => {
                // console.log("doc", pdf);
                return (
                  <a href={Bucket + pdf.document_image} target="_blank">
                    <img
                      src={Bucket + pdf.document_image}
                      height="30px"
                      width="30px"
                      className="mx-1 rounded"
                    />
                  </a>
                );
              })
            )} */}
          </div>
        );
      },
    },

    {
      Header: "Exam Given",
      filterable: false,

      Cell: (row) => {
        return (
          <div>
            <center>
              {row.original.isExamGiven ? (
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
      Header: "Details",
      filterable: false,
      Cell: (row) => {
        // console.log("document", row);
        return (
          <div>
            <button
              className="border-0 btn btn-primary px-3 py-2 text-white bg-primary rounded"
              onClick={() => viewDetails(row)}
            >
              View
            </button>
          </div>
        );
      },
    },
    {
      Header: "Approve",
      filterable: false,

      Cell: (row) => {
        return (
          <div>
            {row.original.result.length === 0 ? (
              ""
            ) : row?.original?.result[0]?.isApprove === false ? (
              <button
                className="border-0 btn btn-primary px-3 py-2 text-white bg-primary rounded"
                onClick={() => approval(row.original)}
              >
                Approve
              </button>
            ) : (
              <button
                className="border-0 btn btn-success px-3 py-2 text-white bg-success rounded"
                // onClick={() => approval(row.original)}
              >
                Certified
              </button>
            )}
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

    //         {row.original.status == "pending" ?
    //         <AiFillInteraction size="25" color="red" onClick={(e) => PandingQuestion(row.original._id)}
    //         style={{ marginRight: "19px" }}/>
    //         : ""}
    //       </center>
    //     );
    //   },
    // },
  ]);

  const viewDetails = (data) => {
    console.log(
      "🚀 ~ file: attendiesList.js ~ line 288 ~ viewDetails ~ data",
      data
    );
    setOpenViewModal(!openViewModal);
    setViewData(data.original);
    const body = {
      createdBy: data.original?.user[0]?._id,
      subjectId: data.original?.subjectId,
    };
    ApiPost(`/review_answer/subject/get`, body)
      .then((res) => {
        console.log(res.data.data);
        setQuetionData(res.data.data[0]?.questionId);
        setRattingData(res.data.data[0]?.question);
        // toast.success(res.data.message);
        // getDate(1, 10);
      })
      .catch((err) => {
        // disableLoading();
        // setbutton(false);

        if (err.status == 410) {
          // history.push("/courseList");
        } else {
          toast.error(err.message);
        }
      });
  };

  const approval = (v) => {
    console.log("v", v);
    const body = {
      resultId: v.result[0]._id,
      email: v.user[0].email,
    };
    console.log(body);
    ApiPost("/student/approve", body)
      .then((res) => {
        toast.success(res.data.message);
        getDate(1, 10);
      })
      .catch((err) => {
        // disableLoading();
        // setbutton(false);

        if (err.status == 410) {
          // history.push("/courseList");
        } else {
          toast.error(err.message);
        }
      });
  };

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

  const handleCheck = (checked) => {
    console.log("check", checked);
  };

  const handleClickOpenBlock = (row) => {
    SetIDBlock(row);
    Setboolen("false");
    setOpenBlock(true);
    SetblockButton(true);
  };
  const handleCloseBlock = () => {
    setOpenBlock(false);
  };
  const handleClickOpenUnblock = (row) => {
    SetID1(row);
    SetboolenUnblock("true");
    setOpen(true);
    SetblockButton(true);
  };

  const handleCloseUnblock = () => {
    setOpen(false);
  };

  const handleonChange = (e) => {
    Setstatusp(e.target.value);
  };

  const EditQuestion = (row) => {
    history.push("/bookEdit?id=" + row);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleonChangeSearch = (e) => {
    search = e.target.value;
    console.log(e.target.value);
    // getDate(page, pagesize);
    // setCount(count + 1);
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
    console.log("/book/delete/" + row);
    ApiDelete("/book/delete/" + row)
      .then((res) => {
        if (res.status === 200) {
          handleClose1();
          toast.success(res.message);
          toast.success("Book Successfully Deleted");
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
  const UnBlockPage = (row) => {
    const Id3 = JSON.parse(localStorage.getItem("token"));
    ApiGet("/" + row + "-" + boolenUnblock)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setTimeout(function() {
            window.location.reload();
          }, 2000);
        } else {
          toast.error("Error Occured");
        }
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/postlist");
        } else {
          toast.error(err.message);
        }
      });
  };
  const BlockPageBlock = (row) => {
    const Id3 = JSON.parse(localStorage.getItem("token"));
    ApiGet("/" + row + "-" + boolen)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setTimeout(function() {
            window.location.reload();
          }, 2000);
        } else {
          toast.error("Error Occured");
        }
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/postlist");
        } else {
          toast.error(err.message);
        }
      });
    console.log("Thisiisisisisi");
    console.log("/" + row + "-" + boolen);
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
          history.push("/postlist");
        } else {
          toast.error(err.message);
        }
      });
  };
  const getDate = (s, p, search) => {
    var body = {
      limit: p,
      page: s,
      search,
    };
    console.log("getDdata", body);
    const Id2 = JSON.parse(localStorage.getItem("token"));
    ApiPost("/student/status", body)
      .then((res) => {
        setRecordCount(res.data.data);
        setCategory(res.data.data.student_data);
        SetPage(res.data.data.state.page);
        SetPages(res.data.data.state.page_limit);
        SetPageSize(res.data.data.state.limit);
        disableLoading();
        setbutton(false);
        setloading(false);
        console.log("Roop");
        console.log("/student/status", res.data.data.student_data);
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
        <Col md={12}>
          <ToastContainer />
          <Breadcrumb>
            <BreadcrumbItem active>List of All Attendees</BreadcrumbItem>
          </Breadcrumb>
        </Col>

        <Col md={12}>
          {console.log("category", category)}
          <Card>
            <CardBody>
              <div className="d-flex justify-content-end align-items-center">
                <Col>
                  <Breadcrumb className="m-0">
                    Rcorded: &nbsp;{" "}
                    {loading === true ? (
                      <Space size="middle">
                        <Spin size="small" />
                      </Space>
                    ) : (
                      <Tag color="#2db7f5">{recordCount?.recorded_count}</Tag>
                    )}
                  </Breadcrumb>
                </Col>
                <Col>
                  <Breadcrumb className="m-0">
                    Live: &nbsp;{" "}
                    {loading === true ? (
                      <Space size="middle">
                        <Spin size="small" />
                      </Space>
                    ) : (
                      <Tag color="#2db7f5">{recordCount?.live_count}</Tag>
                    )}
                  </Breadcrumb>
                </Col>
                <Col>
                  <Breadcrumb className="m-0">
                    Physical: &nbsp;{" "}
                    {loading === true ? (
                      <Space size="middle">
                        <Spin size="small" />
                      </Space>
                    ) : (
                      <Tag color="#2db7f5">{recordCount?.physical_count}</Tag>
                    )}
                  </Breadcrumb>
                </Col>
                <Col md={4}>
                  <FormGroup className="d-flex align-items-end ">
                    <div className="w-100">
                      <Label>
                        Search
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Input
                        type="text"
                        onChange={handleonChange}
                        placeholder="Enter Name"
                        required
                      />
                    </div>
                    <button
                      type=""
                      className="btn btn-primary mx-2"
                      disabled={button}
                      onClick={() => {
                        setbutton(true);
                        enableLoading();
                        getDate(1, pagesize, statusp);
                      }}
                    >
                      {loadings ? (
                        <div
                          className="spinner-border text-light"
                          style={{ width: "19px", height: "19px" }}
                          role="status"
                        >
                          {/* <span className="sr-only">Loading...</span> */}
                        </div>
                      ) : (
                        "search"
                      )}
                    </button>
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
                open={open}
                onClick={handleCloseUnblock}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to Unblock the User?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => UnBlockPage(rowid1, boolenUnblock)}
                    style={{ background: "#003366", color: "#FFFFFF" }}
                    autoFocus
                  >
                    YES
                  </Button>
                  <Button
                    onClick={handleCloseUnblock}
                    style={{ background: "#003366", color: "#FFFFFF" }}
                    autoFocus
                  >
                    NO
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={openblock}
                onClick={handleCloseBlock}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to Block the User?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => BlockPageBlock(rowidblock, boolen)}
                    style={{ background: "#003366", color: "#FFFFFF" }}
                    autoFocus
                  >
                    YES
                  </Button>
                  <Button
                    onClick={handleCloseBlock}
                    style={{ background: "#003366", color: "#FFFFFF" }}
                    autoFocus
                  >
                    NO
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog
                open={open1}
                onClose={handleClose1}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to Delete this Book?
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
              <Modal
                show={openViewModal}
                centered
                onHide={() => setOpenViewModal(!openViewModal)}
                size="xl"
                // aria-labelledby="example-modal-sizes-title-lg"
              >
                <Modal.Header>
                  <Modal.Title
                    id="contained-modal-title-vcenter "
                    className="color_blue font_size_20"
                  >
                    Attendees Details
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="d-flex flex-column align-items-center ">
                    <div className="w-100 p-3">
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <Label>Name</Label>
                            <Input
                              type="text"
                              // onChange={handleonChange}
                              value={viewData?.user && viewData?.user[0]?.name}
                              name="title"
                              placeholder="Enter Book title"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label>Email</Label>
                            <Input
                              type="email"
                              // onChange={handleonChange}
                              value={viewData?.user && viewData?.user[0]?.email}
                              name="title"
                              placeholder="Enter Book title"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label>Training Option</Label>
                            <Input
                              type="email"
                              // onChange={handleonChange}
                              value={
                                viewData?.optionType === 0
                                  ? "Recorded Video"
                                  : viewData?.optionType === 0
                                  ? "Live Taining"
                                  : "Physical Training"
                              }
                              name="title"
                              placeholder="Enter Book title"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <Label>Exam Given</Label>
                            <Input
                              type="email"
                              // onChange={handleonChange}
                              value={
                                viewData?.isExamGiven === true ? "Yes" : "No"
                              }
                              name="title"
                              placeholder="Enter Book title"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup className="d-flex flex-column mt-1">
                            <Label>Document</Label>
                            <a
                              href={
                                viewData?.documents &&
                                Bucket + viewData?.documents[0]?.document_image
                              }
                              target="_blank"
                            >
                              <img
                                src={
                                  viewData?.documents &&
                                  Bucket +
                                    viewData?.documents[0]?.document_image
                                }
                                className="img-fluid rounded border"
                                width="80px"
                                height="120px"
                              />
                            </a>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div
                            className="py-3 border-bottom font-weight-bold"
                            style={{ fontSize: "18px" }}
                          >
                            Review Details
                          </div>
                          <div
                            className="py-3 color_light_gray my-3 px-2"
                            style={{ fontSize: "16px" }}
                          >
                            Subject : {viewData.subjectName}
                          </div>
                          <div className="py-3 row">
                            <div className="col-md-10">
                              {questionData?.map((ratting) => (
                                <div className="d-flex align-items-center">
                                  <div className="mx-2">
                                    {/* <GoPrimitiveDot color="#00bde2" /> */}
                                    <AiOutlineQuestionCircle color="#00bde2" />
                                  </div>
                                  <span
                                    class="color_light_gray my-2"
                                    style={{ fontSize: "14px" }}
                                  >
                                    {ratting?.question} :
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="col-md-2">
                              {rattingData?.map((question) => (
                                <div
                                  class="color_light_gray my-3"
                                  style={{ fontSize: "14px" }}
                                >
                                  {question?.ans}
                                </div>
                              ))}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div>
                    <button
                      className="btn text-white linear_gradient text-decoration-none text-center border_none rounded py-1 mx-1"
                      // disabled={rattingSubmit}
                      onClick={() => setOpenViewModal(!openViewModal)}
                    >
                      Cancel
                    </button>
                  </div>
                </Modal.Footer>
              </Modal>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
