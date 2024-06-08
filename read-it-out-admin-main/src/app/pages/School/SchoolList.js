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
  AiFillCaretUp,
  AiFillCaretDown,
} from "react-icons/ai";
import * as authUtil from "../../../utils/auth.util";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import BootstrapTable from "react-bootstrap-table-next";
import searchBtn from "../../media/icons/search.png";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    boxShadow: "none",
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  card: {
    height: "100%",
    marginBottom: "50px",
    marginRight: "40px",
    marginLeft: "40px",
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "10px",
  },
  btn: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));
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

let totalpages = [];

export default function SellerDashboard(props) {
  const classes = useStyles()
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
  const history = useHistory();
  const [accountData, setaccountData] = useState({});

  const columns = [
    {
      dataField: "name",
      text: "name",
      sort: true,
      sortCaret: (order, column) => {
        if (!order) return (<span><AiFillCaretUp />< AiFillCaretDown /></span>);
        else if (order === 'desc') return (<span><AiFillCaretUp /><font color="#00bde2">< AiFillCaretDown /></font></span>);
        else if (order === 'asc') return (<span><font color="#00bde2"><AiFillCaretUp /></font>< AiFillCaretDown /></span>);
        return null;
      }
    },
    {
      dataField: "address",
      text: "address",
      sort: true,
      sortCaret: (order, column) => {
        if (!order) return (<span><AiFillCaretUp />< AiFillCaretDown /></span>);
        else if (order === 'desc') return (<span><AiFillCaretUp /><font color="#00bde2">< AiFillCaretDown /></font></span>);
        else if (order === 'asc') return (<span><font color="#00bde2"><AiFillCaretUp /></font>< AiFillCaretDown /></span>);
        return null;
      }
    },
    {
      dataField: "phoneNumber",
      text: "phone number",
      sort: true,
      sortCaret: (order, column) => {
        if (!order) return (<span><AiFillCaretUp />< AiFillCaretDown /></span>);
        else if (order === 'desc') return (<span><AiFillCaretUp /><font color="#00bde2">< AiFillCaretDown /></font></span>);
        else if (order === 'asc') return (<span><font color="#00bde2"><AiFillCaretUp /></font>< AiFillCaretDown /></span>);
        return null;
      }
    },

    {
      dataField: "action",
      text: "action",

      formatter: (cell, row) => {
        return (
          <div className="d-flex">

            <button
              className="btn btn-light-primary mr-2"
              onClick={(e) => EditItem(row._id)}
            >
              <AiOutlineEdit fontSize={20} />
            </button>
            <button
              className="btn btn-light-danger mr-2"
              onClick={(e) => handleDelete(row._id)}
            >
              <AiOutlineDelete fontSize={20} />
            </button>

          </div>
        );
      },
    },
  ];
  // const [columns, setcolumn] = useState([
  //   {
  //     Header: "Name",
  //     accessor: "name",
  //   },

  //   {
  //     Header: "Address",
  //     accessor: "address",
  //   },
  //   {
  //     Header: "Phone Number",
  //     accessor: "phoneNumber",
  //   },

  //   {
  //     Header: "Action",
  //     minWidth: 150,
  //     filterable: false,

  //     Cell: (row) => {
  //       return (
  //         <div className="d-flex justify-content-center">
  //           <center>
  //             <button
  //               className="btn btn-light-primary mr-2"
  //               onClick={(e) => EditItem(row.original._id)}
  //             >
  //               <AiOutlineEdit fontSize={20} />
  //             </button>
  //             <button
  //               className="btn btn-light-danger mr-2"
  //               onClick={(e) => handleDelete(row.original._id)}
  //             >
  //               <AiOutlineDelete fontSize={20} />
  //             </button>
  //           </center>
  //         </div>
  //       );
  //     },
  //   },
  // ]);

  const nextpage = () => {
    console.log(page, pages);
    if (page < pages) {
      getDate(page + 1, pagesize);
    }
  };
  const prvpage = () => {
    console.log(page, pages);
    if (page != 1) {
      getDate(page - 1, pagesize);
    }
  };

  const pagenumberchange = (i) => {
    getDate(i, pagesize);
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
      .catch((err) => { });
  };
  const handleonChange1 = (e) => {
    let { name, value } = e.target;

    setaccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleonChange = (e) => {
    Setstatusp(e.target.value);

    getDate(1, pagesize, e.target.value);
  };

  const EditItem = (row) => {
    history.push("/schoolEdit?id=" + row);
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
    console.log("/school/delete/" + row);
    ApiDelete("/school/delete/" + row)
      .then((res) => {
        if (res.status === 200) {
          handleClose1();
          toast.success(res.message);
          toast.success("School Deleted Successfully");
          history.push("/schoolList");

          setTimeout(function () {
            window.location.reload();
          }, 2000);
        } else {
          toast.error(res.message);
          console.log("This .then Block");
        }
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/schoolList");
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
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/schoolList");
        } else {
          toast.error(err.message);
        }
      });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    getDate(page, e.target.value);
  };

  const handleonChangeSearch = (e) => {
    getDate(page, 10, e.target.value);
  }

  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];

  const getDate = (s, p, q) => {
    var body = {
      limit: p,
      page: s,
      search: q,
    };
    const Id2 = JSON.parse(localStorage.getItem("token"));
    ApiPost("/school/get_school", body)
      .then((res) => {
        totalpages = [];
        for (let i = 1; i <= res.data.data.state.page_limit; i++) {
          totalpages.push(i);
        }
        setCategory(res.data.data.school_data);
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
  // const fetchData = (state) => {
  //   setloading(true);
  //   if (state.page == 0) {
  //     getDate(state.pageshow, state.pageSize, statusp);
  //   } else {
  //     getDate(state.page + 1, state.pageSize, statusp);
  //   }
  // };
  useEffect(() => {
    getDate(1, 10, statusp);
  }, []);
  return (
    <>
      <div
        class="content  d-flex flex-column flex-column-fluid paddingTop65 h-100"
        id="kt_content"
      >
        <ToastContainer position="top-right" />

        <div className={`card h-80  d-flex  ${classes.card}`}>
          <>
            <div className="px-4">
              <div className="d-flex align-items-center justify-content-between p-5 border-bottom">
                <div className="textBlackfz22">School List</div>
                <div>
                  <button
                    className="btn btn-light-primary px-5 py-4 mr-2"
                    onClick={() => history.push("/schoolEdit")}
                  >
                    Add School
                  </button>
                </div>
              </div>
              <div className="d-flex m-3 justify-content-end">
                <div className="col-md-4 d-flex align-items-center border rounded px-2">
                  <div className="">
                    <img src={searchBtn} alt="" />
                  </div>
                  <input
                    type="text "
                    onChange={handleonChangeSearch}
                    // value={search}
                    // name="search"
                    className="form-control border-0"
                    placeholder="Enter Book title"
                  />
                </div>
              </div>
              <div className=" d-flex align-items-center flex-column">
                <BootstrapTable
                  keyField="id"
                  data={category}
                  columns={columns}
                  // pagination={paginationFactory(options)}
                  defaultSorted={defaultSorted}
                />
              </div>
              <div className="d-flex justify-content-between px-3 pb-3">
                <div className="" style={{ width: "8%" }}>
                  <select
                    className="form-select selectField"
                    aria-label="Default select example"
                    name="main_categoryId"
                    // value={data.main_categoryId}
                    onChange={handleChange}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                  </select>
                </div>

                <div className="">
                  {totalpages.length > 5 ? (
                    <button
                      className="mr-2 btn btn-light-primary"
                      onClick={() => prvpage()}
                    >
                      Previous
                    </button>
                  ) : (
                    ""
                  )}
                  {totalpages.length <= 5 &&
                    totalpages.map((item, i) => (
                      <button
                        className={
                          page == item
                            ? "mr-2 btn btn-primary"
                            : "mr-2 btn btn-light-primary"
                        }
                        onClick={() => pagenumberchange(item)}
                      >
                        {i + 1}
                      </button>
                    ))}
                  {totalpages.length > 5 &&
                    totalpages.map((item, i) =>
                      page == item ? (
                        <button
                          className={
                            page == item
                              ? "mr-2 btn btn-primary"
                              : "mr-2 btn btn-light-primary"
                          }
                          onClick={() => pagenumberchange(item)}
                        >
                          {i + 1}
                        </button>
                      ) : page + 1 == item ? (
                        <button
                          className={
                            page == item
                              ? "mr-2 btn btn-primary"
                              : "mr-2 btn btn-light-primary"
                          }
                          onClick={() => pagenumberchange(item)}
                        >
                          {i + 1}
                        </button>
                      ) : page + 2 == item ? (
                        <button
                          className={
                            page == item
                              ? "mr-2 btn btn-primary"
                              : "mr-2 btn btn-light-primary"
                          }
                          onClick={() => pagenumberchange(item)}
                        >
                          {i + 1}
                        </button>
                      ) : page + 3 == item ? (
                        <button
                          className={
                            page == item
                              ? "mr-2 btn btn-primary"
                              : "mr-2 btn btn-light-primary"
                          }
                          onClick={() => pagenumberchange(item)}
                        >
                          {i + 1}
                        </button>
                      ) : page + 4 == item ? (
                        <button
                          className={
                            page == item
                              ? "mr-2 btn btn-primary"
                              : "mr-2 btn btn-light-primary"
                          }
                          onClick={() => pagenumberchange(item)}
                        >
                          {i + 1}
                        </button>
                      ) : (
                        ""
                      )
                    )}
                  {pages > 5 ? (
                    <>
                      <button className="mr-2 btn btn-light-primary">...</button>
                      <button className="mr-2 btn btn-light-primary">
                        {pages}
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                  {totalpages.length > 5 ? (
                    <button
                      className="mr-2 btn btn-light-primary"
                      onClick={() => nextpage()}
                    >
                      Next
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </>

        </div>
      </div>
    </>
  );
}
