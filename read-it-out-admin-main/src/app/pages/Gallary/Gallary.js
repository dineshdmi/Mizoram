import React, { useEffect, useState } from "react";

import { lighten, makeStyles } from "@material-ui/core/styles";
import { AiFillCaretDown, AiFillCaretUp, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import { ApiDelete, ApiGet, ApiPost, Bucket } from "../../../helpers/API/ApiData";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { Modal } from "react-bootstrap";
import ReactExport from "react-export-excel";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
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
  const [page, SetPage] = useState(1);
  const [pages, SetPages] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [count, setCount] = useState(100);
  const [boolenUnblock, SetboolenUnblock] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      dataField: "image",
      text: "Image",
      style: {
        maxWidth: "800px"
      },
      formatter: (cell, row) => {
        console.log('row', row)
        return (

          <div className="d-flex">
            <img src={Bucket + row?.image} className="mr-2 rounded" width={"150px"} />
          </div>
        );
      },
    },


    {
      dataField: "action",
      text: "action",
      sort: true,
      style: {
        minWidth: "100px"
      },
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

        );
      },
    },
  ];



  const click = (v) => {
    console.log(v);
    history.push("/galleryEdit?id=" + v._id);
    // setEdited(i);
  };

  const deleted = (v) => {
    console.log(v);
    setModal(!modal);
    setIds(v);
  };



  const getDate = async (limit, page) => {
    var body = {
      limit,
      page,
    };
    await ApiPost("/gallery/get_gallery", body)
      .then((res) => {
        console.log('res.data.data', res.data.data)
        setCategory(res.data.data.gallery_data);
        SetPage(res.data.data.state.page);
        SetPages(res.data.data.state.page_limit);
        SetLimit(res.data.data.state.limit);
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
    ApiDelete("/gallery/delete/" + v)
      .then((res) => {
        console.log(res);

        getDate(limit, page);
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
    getDate(limit, page);

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
              <div className="text-right my-2">
                <button className="btn btn-light-primary"
                  onClick={() => history.push("/galleryEdit")}
                >Add Photo</button>
              </div>
              <div className=" d-flex align-items-center flex-column">
                <BootstrapTable
                  keyField="id"
                  data={category}
                  columns={columns}
                />
              </div>
              <div className="d-flex justify-content-end px-3 pb-3">
                <Pagination
                  page={page}
                  count={pages}
                  onChange={handlePage}
                />
              </div>
            </div>
          </>

        </div>
      </div>
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
          <span>Are you sure to permanently delete this Photo ?</span>
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
    </>
  );
}
