import React, { useEffect, useState } from "react";

import { lighten, makeStyles } from "@material-ui/core/styles";

import { HiOutlineChevronRight } from "react-icons/hi";
import edit from "../../media/icons/edit.png";
import deleteIcon from "../../media/icons/delete.png";
import search from "../../media/icons/search.png";
import toggle from "../../media/icons/toggle.png";
import details from "../../media/icons/details.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiDelete, ApiGet, ApiPost } from "../../helpers/API/ApiData";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import bookImg from "../../media/icons/bookImg.png";
import { useHistory } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import moment from "moment";

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
}));
let totalpages = [];
export default function Book() {
  const classes = useStyles();
  const history = useHistory();

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [Id, setId] = useState();
  const [category, setCategory] = useState([]);
  const [page, SetPage] = useState(1);
  const [pages, SetPages] = useState(0);
  const [pagesize, SetPageSize] = useState(10);
  const [statusp, Setstatusp] = useState("");
  const [userData, setUserData] = useState("");
  const [button, setbutton] = useState(false);
  const [loadings, setLoading] = useState(false);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const columns = [
    {
      dataField: "name",
      text: "full name",
      sort: true,
    },
    {
      dataField: "email",
      text: "email id",
      sort: true,
    },
    {
      dataField: "phoneNumber",
      text: "phone number",
      sort: true,
    },
    {
      dataField: "registeredDate",
      text: "Register date",
      sort: true,
      formatter: (cell, row) => {
        return (
          <div className="d-flex">
            {row.registeredDate === null
              ? "No Register Date"
              : moment(row.registeredDate).format("DD-MM-YYYY")}
          </div>
        );
      },
    },
    {
      dataField: "action",
      text: "action",
      sort: true,
      formatter: (cell, row) => {
        return (
          <div className="d-flex justify-content-center">
            <center>
              <button
                className="btn btn-primary mr-2"
                onClick={() => details(row)}
              >
                Details
              </button>
            </center>
            <center>
              <button
                className="btn btn-danger"
                onClick={() => deleted(row._id)}
              >
                Delete
              </button>
            </center>
          </div>
        );
      },
    },
  ];

  const details = (v) => {
    setModal(!modal);
    console.log("details", v);
    setUserData(v);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    getDate(page, e.target.value);
  };
  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];

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
  const deleted = (v) => {
    console.log(v);
    setModal1(!modal1);
    setId(v);
  };

  const deleteTheory = (v) => {
    ApiDelete("/student/delete/" + v)
      .then((res) => {
        setModal1(!modal1);
        toast.success(res.data.message);
        setTimeout(function () {
          getDate(1, 10);
        }, 2000);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/bookCategory");
        } else {
          toast.error(err.message);
        }
      });
  };
  const pagenumberchange = (i) => {
    getDate(i, pagesize);
  };
  const getDate = async (s, p, search) => {
    var body = {
      limit: p,
      page: s,
      search,
    };
    await ApiPost("/student/get_student", body)
      .then((res) => {
        console.log(res.data.data.student_data);
        totalpages = [];
        for (let i = 1; i <= res.data.data.state.page_limit; i++) {
          totalpages.push(i);
        }
        setCategory(res.data.data.student_data);
        SetPage(res.data.data.state.page);
        SetPages(res.data.data.state.page_limit);
        SetPageSize(res.data.data.state.limit);
        disableLoading();
        setbutton(false);
      })
      .catch((err) => {
        if (err.status == 410) {
          // history.push("/postlist")
        } else {
          toast.error(err.message);
        }
      });
  };

  useEffect(() => {
    getDate(1, 10);
    totalpages = [];
    // ApiGet("/main_category")
    //   .then((res) => {
    //     console.log(res.data.data);
    //     setData(res.data.data);
    //   })
    //   .catch((err) => {
    //     if (err.status == 502) {
    //       //   toast.error(err.message);
    //     } else {
    //       //   toast.error(err.message);
    //     }
    //   });
  }, []);

  const handleonChange = (e) => {
    console.log("Setstatusp", e.target.value);
    Setstatusp(e.target.value);

    // getDate(1, pagesize, e.target.value);
  };

  return (
    <>
      <div
        class="content  d-flex flex-column flex-column-fluid paddingTop65 h-100"
        id="kt_content"
      >
        <ToastContainer position="top-right" />
        <div
          class="subheader py-2 py-lg-4 flex01 subheader-solid w-100"
          id="kt_subheader"
        >
          <div class=" container-fluid  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
            <div class="d-flex align-items-center flex-column mr-2">
              <div className="d-flex">
                <label className="  text-success mr-2">Admin</label>
                <div className="mr-2">
                  <HiOutlineChevronRight />
                </div>
                <p>User</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`card h-80  d-flex  ${classes.card}`}>
          <>
            <div className="d-flex align-items-center justify-content-between p-5 border-bottom">
              <div className="textBlackfz22">User List</div>
              <div className="d-flex justify-content-end align-items-end">
                <div className="w-100">
                  <label>Search</label>
                  <input
                    type="text"
                    onChange={handleonChange}
                    placeholder="Enter Name"
                    className="form-control"
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
              </div>
            </div>
            <div className=" d-flex align-items-center flex-column">
              <BootstrapTable keyField="id" data={category} columns={columns} />
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
                  <option value="10" selected>
                    10
                  </option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div className="">
                {totalpages.length > 5 ? (
                  <button
                    className="mr-2 btn btn-light-success"
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
                          ? "mr-2 btn btn-success"
                          : "mr-2 btn btn-light-success"
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
                            ? "mr-2 btn btn-success"
                            : "mr-2 btn btn-light-success"
                        }
                        onClick={() => pagenumberchange(item)}
                      >
                        {i + 1}
                      </button>
                    ) : page + 1 == item ? (
                      <button
                        className={
                          page == item
                            ? "mr-2 btn btn-success"
                            : "mr-2 btn btn-light-success"
                        }
                        onClick={() => pagenumberchange(item)}
                      >
                        {i + 1}
                      </button>
                    ) : page + 2 == item ? (
                      <button
                        className={
                          page == item
                            ? "mr-2 btn btn-success"
                            : "mr-2 btn btn-light-success"
                        }
                        onClick={() => pagenumberchange(item)}
                      >
                        {i + 1}
                      </button>
                    ) : page + 3 == item ? (
                      <button
                        className={
                          page == item
                            ? "mr-2 btn btn-success"
                            : "mr-2 btn btn-light-success"
                        }
                        onClick={() => pagenumberchange(item)}
                      >
                        {i + 1}
                      </button>
                    ) : page + 4 == item ? (
                      <button
                        className={
                          page == item
                            ? "mr-2 btn btn-success"
                            : "mr-2 btn btn-light-success"
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
                    <button className="mr-2 btn btn-light-success">...</button>
                    <button
                      className="mr-2 btn btn-light-success"
                    // onClick={() => pagenumberchange(pages)}
                    >
                      {pages}
                    </button>
                  </>
                ) : (
                  ""
                )}
                {totalpages.length > 5 ? (
                  <button
                    className="mr-2 btn btn-light-success"
                    onClick={() => nextpage()}
                  >
                    Next
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        </div>
      </div>
      <Modal
        show={modal}
        // centered
        // onHide={() => setModal(!modal)}
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
              onClick={() => setModal(!modal)}
            >
              X
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex mb-1">
            <div className="mb-2 col-md-4">
              <label className="textBlackfz16">Name</label>
              <input
                type="text"
                className="form-control bgInput"
                placeholder="Enter Genre Name"
                name="title"
                value={userData?.name}
              // onChange={handleChange}
              />
            </div>
            <div className="mb-2 col-md-4">
              <label className="textBlackfz16">Email</label>
              <input
                type="email"
                className="form-control bgInput"
                // placeholder="Enter Genre Name"
                // name="author"
                value={userData?.email}
              // onChange={handleChange}
              />
            </div>
            <div className="mb-2 col-md-4">
              <label className="textBlackfz16">Phone Number</label>
              <input
                type="text"
                className="form-control bgInput"
                // placeholder="Enter Genre Name"
                // name="author"
                value={userData?.phoneNumber}
              // onChange={handleChange}
              />
            </div>
          </div>
          <div className="d-flex mb-1">
            <div className="mb-2 col-md-4">
              <label className="textBlackfz16">Country</label>
              <input
                type="text"
                className="form-control bgInput"
                placeholder="Enter Genre Name"
                name="title"
                value={userData?.country}
              // onChange={handleChange}
              />
            </div>
            <div className="mb-2 col-md-4">
              <label className="textBlackfz16">Region</label>
              <input
                type="email"
                className="form-control bgInput"
                // placeholder="Enter Genre Name"
                // name="author"
                value={userData?.region ? userData?.region : "No select region"}
              // onChange={handleChange}
              />
            </div>
            <div className="mb-2 col-md-4">
              <label className="textBlackfz16">City</label>
              <input
                type="text"
                className="form-control bgInput"
                // placeholder="Enter Genre Name"
                // name="author"
                value={userData?.city ? userData?.city : "No select city"}
              // onChange={handleChange}
              />
            </div>
          </div>
          <div className="d-flex mb-1">
            <div className="mb-2 col-md-6">
              <label className="textBlackfz16">School Name</label>
              <input
                type="text"
                className="form-control bgInput"
                placeholder="Enter Genre Name"
                name="title"
                value={
                  userData?.schoolName
                    ? userData?.schoolName
                    : "No select school"
                }
              // onChange={handleChange}
              />
            </div>
            <div className="mb-2 col-md-6">
              <label className="textBlackfz16">Register Date</label>
              <input
                type="email"
                className="form-control bgInput"
                // placeholder="Enter Genre Name"
                // name="author"
                value={
                  userData?.registeredDate
                    ? userData?.registeredDate
                    : "No select register date"
                }
              // onChange={handleChange}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div></div>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modal1}
        // centered
        onHide={() => setModal1(!modal1)}
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
              onClick={() => setModal1(!modal1)}
            >
              X
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex mb-1">Are you sure delete this user...?</div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <div className="btn btn-danger" onClick={() => deleteTheory(Id)}>
              Delete
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
