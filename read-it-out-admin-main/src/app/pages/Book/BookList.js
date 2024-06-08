import React, { useEffect, useState } from "react";

import { lighten, makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { HiOutlineChevronRight } from "react-icons/hi";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import edit from "../../media/icons/edit.png";
import deleteIcon from "../../media/icons/delete.png";
import searchBtn from "../../media/icons/search.png";
import toggle from "../../media/icons/toggle.png";
import details from "../../media/icons/details.png";
import { ApiDelete, ApiGet, ApiPost } from "../../../helpers/API/ApiData";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { Modal } from "react-bootstrap";
import ReactExport from "react-export-excel";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
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
let totalpages = [];
let search = "";
export default function Book() {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState("");
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [Ids, setIds] = useState("");
  const [category, setCategory] = useState([]);
  const [exportCategory, setExportCategory] = useState([]);
  const [page, SetPage] = useState(1);
  const [pages, SetPages] = useState(0);
  const [pagesize, SetPageSize] = useState(10);
  const [count, setCount] = useState(100);
  const [boolenUnblock, SetboolenUnblock] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  // const sizePerPageOptionRenderer = ({ text, page, onSizePerPageChange }) => (
  //   <li key={text} role="presentation" className="dropdown-item">
  //     <a
  //       href="#"
  //       tabIndex="-1"
  //       role="menuitem"
  //       data-page={page}
  //       onMouseDown={(e) => {
  //         e.preventDefault();
  //         onSizePerPageChange(page);
  //       }}
  //       style={{ color: "red" }}
  //     >
  //       {text}
  //     </a>
  //   </li>
  // );

  // const options = {
  //   sizePerPageOptionRenderer,
  // };
  const columns = [
    {
      dataField: "title",
      text: "title",
      sort: true,
      sortCaret: (order, column) => {
        if (!order)
          return (
            <span>
              <AiFillCaretUp />
              <AiFillCaretDown />
            </span>
          );
        else if (order === "desc")
          return (
            <span>
              <AiFillCaretUp />
              <font color="#00bde2">
                <AiFillCaretDown />
              </font>
            </span>
          );
        else if (order === "asc")
          return (
            <span>
              <font color="#00bde2">
                <AiFillCaretUp />
              </font>
              <AiFillCaretDown />
            </span>
          );
        return null;
      },
    },
    {
      dataField: "author",
      text: "author",
      sort: true,
      sortCaret: (order, column) => {
        if (!order)
          return (
            <span>
              <AiFillCaretUp />
              <AiFillCaretDown />
            </span>
          );
        else if (order === "desc")
          return (
            <span>
              <AiFillCaretUp />
              <font color="#00bde2">
                <AiFillCaretDown />
              </font>
            </span>
          );
        else if (order === "asc")
          return (
            <span>
              <font color="#00bde2">
                <AiFillCaretUp />
              </font>
              <AiFillCaretDown />
            </span>
          );
        return null;
      },
    },

    {
      dataField: "cost",
      text: "cost",
      sort: true,
      sortCaret: (order, column) => {
        if (!order)
          return (
            <span>
              <AiFillCaretUp />
              <AiFillCaretDown />
            </span>
          );
        else if (order === "desc")
          return (
            <span>
              <AiFillCaretUp />
              <font color="#00bde2">
                <AiFillCaretDown />
              </font>
            </span>
          );
        else if (order === "asc")
          return (
            <span>
              <font color="#00bde2">
                <AiFillCaretUp />
              </font>
              <AiFillCaretDown />
            </span>
          );
        return null;
      },
    },
    // {
    //   dataField: "count",
    //   text: "purchase count",
    //   sort: true,
    // },
    {
      dataField: "action",
      text: "action",
      sort: true,
      formatter: (cell, row) => {
        return (
          <div className="d-flex ">
            <button
              className="btn btn-light-primary mr-2"
              onClick={() => click(row)}
            >
              <AiOutlineEdit fontSize={20} />
            </button>
            <button
              className="btn btn-light-danger mr-2"
              onClick={() => deleted(row._id)}
            >
              <AiOutlineDelete fontSize={20} />
            </button>
          </div>
          // <div className="d-flex">
          //   <img src={edit} className="mr-2" onClick={() => click(row)} />

          //   <img src={deleteIcon} onClick={() => deleted(row._id)} />
          // </div>
        );
      },
    },
  ];
  const handleChange = (e) => {
    console.log(e.target.value);
    // getDate(page, e.target.value);
  };

  const handleonChangeSearch = (e) => {
    search = e.target.value;
    console.log(e.target.value);
    getDate(page, pagesize);
    setCount(count + 1);
  };
  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];

  const click = (v) => {
    console.log(v);
    history.push("/bookEdit?id=" + v._id);
    // setEdited(i);
  };
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
  const deleted = (v) => {
    console.log(v);
    setModal(!modal);
    setIds(v);
  };

  const exportSheet = async () => {
    setIsLoading(true);

    console.log(pages * pagesize);
    let body = {
      page: 1,
      limit: pages * pagesize,
    };

    await ApiPost("/book/get_book_admin", body)
      .then((res) => {
        console.log(res);

        setCategory(res.data?.data?.book_data);

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

  const getDate = async (s, p) => {
    var body = {
      limit: p,
      page: s,
      search: search,
    };
    await ApiPost("/book/get_book_admin", body)
      .then(async (res) => {
        console.log(res.data);
        totalpages = [];
        for (let i = 1; i <= res.data.data.state.page_limit; i++) {
          totalpages.push(i);
        }
        setCategory(res.data.data.book_data);
        SetPage(res.data.data.state.page);
        SetPages(res.data.data.state.page_limit);
        SetPageSize(res.data.data.state.limit);
        await ApiPost("/book/get_book_admin", {
          limit: res.data.data.state.page_limit * res.data.data.state.limit,
          page: 1,
          search: "",
        })
          .then((response) => {
            console.log(
              "response?.data?.data",
              response?.data?.data?.book_data
            );
            setExportCategory(response?.data?.data?.book_data);
          })
          .catch((error) => {
            console.log("error", error);
          });
      })
      .catch((err) => {
        if (err.status == 410) {
          // history.push("/postlist")
        } else {
          toast.error(err.message);
        }
      });
  };
  const deletedID = (v) => {
    console.log(v);
    ApiDelete("/book/delete/" + v)
      .then((res) => {
        console.log(res);
        // toast.primary(res.data.message);
        setTimeout(function() {
          getDate(1, 10);
        }, 2000);
      })
      .catch((err) => {
        if (err.status == 410) {
          // history.push("/bookCategory");
        } else {
          toast.error(err.message);
        }
      });
    setModal(!modal);
  };
  const handlePage = (e) => {
    console.log(e);
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

  return (
    <>
      <div
        class="content  d-flex flex-column flex-column-fluid paddingTop65 h-100"
        id="kt_content"
      >
        <ToastContainer position="top-right" />

        <div className={`card h-80  d-flex  ${classes.card}`}>
          <>
            <div className="d-flex align-items-center justify-content-between p-5 border-bottom">
              <div className="textBlackfz22">Book List</div>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-light-primary d-flex align-items-center mr-2"
                  onClick={() => history.push("/bookEdit")}
                >
                  Add Book
                </button>
                {/* <button
                  className="btn btn-light-primary d-flex align-items-center"
                  disabled={isLoading}
                  onClick={exportSheet}
                >
                  Export ExcelSheet
                </button> */}
                <ExcelFile
                  element={
                    <Button color="primary" className="square" outline>
                      Export ExcelSheet
                    </Button>
                  }
                  filename="BooksList Data"
                >
                  <ExcelSheet data={exportCategory} name="Employees">
                    <ExcelColumn label="Tittle" value={(col) => col.title} />
                    <ExcelColumn label="Author" value={(col) => col.author} />
                    <ExcelColumn label="Cost" value={(col) => col.cost} />
                  </ExcelSheet>
                </ExcelFile>
              </div>
            </div>
            <div className="px-4">
              <div className="d-flex m-3 justify-content-end">
                <div className="col-md-4 d-flex align-items-center border rounded px-2">
                  <div className="">
                    <img src={searchBtn} alt="" />
                  </div>
                  <input
                    type="text "
                    onChange={handleonChangeSearch}
                    value={search}
                    name="search"
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
                {/* <Dropdown isOpen={toggle} toggle={() => setToggle(!toggle)} onChange={handleChange}>
                  <DropdownToggle caret>
                    Dropdown
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem >10</DropdownItem>
                    <DropdownItem >20</DropdownItem>
                    <DropdownItem>30</DropdownItem>
                    <DropdownItem>50</DropdownItem>
                  </DropdownMenu>
                </Dropdown> */}
                <div className="" style={{ width: "8%" }}>
                  <select
                    className="form-select selectField"
                    aria-label="Default select example"
                    name="main_categoryId"
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
                      <button className="mr-2 btn btn-light-primary">
                        ...
                      </button>
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
          <Modal
            show={modal}
            centered
            onHide={() => setModal(!modal)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Book Delete
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <span>Are you sure to permanently delete this Book ?</span>
            </Modal.Body>
            <Modal.Footer>
              <div>
                <button
                  type="button"
                  onClick={() => setModal(!modal)}
                  className="btn btn-light btn-elevate"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => deletedID(Ids)}
                  className="btn btn-primary btn-elevate"
                >
                  Delete
                </button>
              </div>
            </Modal.Footer>
          </Modal>
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
                      Export ExcelSheet
                    </Button>
                  }
                  filename="Books Details"
                >
                  <ExcelSheet data={category} name="Employees">
                    <ExcelColumn label="Tittle" value={(col) => col.title} />
                    <ExcelColumn label="Author" value={(col) => col.author} />
                    <ExcelColumn label="Cost" value={(col) => col.cost} />
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
        </div>
      </div>
    </>
  );
}
