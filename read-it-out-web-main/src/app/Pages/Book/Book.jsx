import React, { useState, useEffect } from "react";

import Slider from "../../Components/Slider/Slide";
import filterBtn from "../../media/icons/filterBtn.png";
import bars from "../../media/icons/bars.png";
import listBtn from "../../media/icons/detailsBtn.png";
import barsGray from "../../media/icons/barsGray.png";
import listBtnGray from "../../media/icons/listBtnGray.png";
import search1 from "../../media/icons/search.png";
import {
  ApiDelete,
  ApiGetNoAuth,
  ApiGet,
  ApiPost,
  ApiPostNoAuth,
  Bucket,
} from "../../helpers/API/ApiData";
import img1 from "../../media/img/1.png";
import img2 from "../../media/img/2.png";
import img3 from "../../media/img/3.png";
import img4 from "../../media/img/4.png";
import cart from "../../media/img/cart.png";
import like from "../../media/img/like.png";
import Pagination from "@material-ui/lab/Pagination";
import Footer from "../../Components/Footer/Footer";
import { Button } from "react-bootstrap";

// import Book_Detail from "../Home/Book_Detail";
import Book_List from "../Home/Book_List";
import Book_Details_2 from "./Book_Details_2";
import No_Book from "../No Book Available/No_Book";
import { useHistory } from "react-router-dom";

let alphabet = "";
let main_categoryId = "";
let genreId = "";
let isFree = "";
let categoryId = "";
let search = "";
let popular = "";
const Book = (props) => {
  const history = useHistory();
  const [flag, setFlag] = useState(false);
  const [view, setView] = useState("icon");
  const [book, setbook] = useState([]);
  const [totalpage, settotalpage] = useState(0);
  const [currentpage, setcurrentpage] = useState(1);
  const [pagesize, setpagesize] = useState(12);
  const [mainCategorylist, setmainCategorylist] = useState([]);
  const [Categorylist, setCategorylist] = useState([]);
  const [subCategorylist, setsubCategorylist] = useState([]);
  const [genrelist, setgenrelist] = useState([]);
  const [homeData, sethomeData] = useState({});
  const [count, setcount] = useState(100);
  const [totalBooks, setTotalBooks] = useState(0);
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  const token = JSON.parse(localStorage.getItem("token"));
  const handleClick = (v) => {
    setFlag(true);
  };
  const handleChange = (e, i) => {
    callhomepage(pagesize, i);
  };
  const handleonChange = (e) => {
    let { name, value } = e.target;
    popular = "";
    if (name === "alphabet") {
      alphabet = value;
      setcount(count + 1);
    } else if (name === "main_categoryId") {
      categoryId = "";
      main_categoryId = value;

      // sethomeData({
      //   ...homeData,
      //   [name]: value,
      // });
      callFilter(value);
    } else if (name == "isFree") {
      isFree = e.target.checked;
      // sethomeData({
      //   ...homeData,
      //   [name]: e.target.checked,
      // });
      setcount(count + 1);
      // callFilter1(value);
    } else if (name == "categoryId") {
      categoryId = value;
      // sethomeData({
      //   ...homeData,
      //   [name]: e.target.checked,
      // });
      setcount(count + 1);
      // callFilter1(value);
    } else if (name == "search") {
      search = value;
      // sethomeData({
      //   ...homeData,
      //   [name]: e.target.checked,
      // });
      // callFilter1(value);
      setcount(count + 1);
    } else {
      sethomeData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const setmaincategory = (i) => {
    // sethomeData({
    //   ...homeData,
    //   ["main_categoryId"]: i,
    // });
    alphabet = "";
    categoryId = "";
    main_categoryId = i;
    callFilter(i);
    setcount(count + 1);
    callhomepage(pagesize, currentpage);
  };
  const setgenreid = (i) => {
    // sethomeData({
    //   ...homeData,
    //   ["genreId"]: i,
    // });
    genreId = i;
    setcount(count + 1);
    callhomepage(pagesize, currentpage);
  };
  // const callFilter1 = (main) => {
  //   const body = {
  //     main_categoryId: main_categoryId,
  //     categoryId: main,
  //   };
  //   ApiPostNoAuth("teacher/filter", body)
  //     .then((res) => {
  //
  //       setsubCategorylist(res.data.data);

  //       // setCategory(res.data.data);
  //     })
  //     .catch((err) => {
  //
  //       if (err.status == 410) {
  //         history.push("/postlist");
  //       } else {
  //         // toast.error(err.message);
  //       }
  //     });
  // };
  const callFilter = (main) => {
    const body = {
      main_categoryId: main,
    };
    ApiPostNoAuth("teacher/filter", body)
      .then((res) => {
        setCategorylist(res.data.data);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
  };
  const setrefreshfilter = () => {
    main_categoryId = "";
    genreId = "";
    isFree = "";
    categoryId = "";
    search = "";
    popular = "";
    alphabet = "";
    setcount(count + 1);
    callhomepage(pagesize, currentpage);
  };
  const callhomepage = (pagsize, currentpag) => {
    let extrastatae = "";
    if (popular) {
      extrastatae = popular;
    } else {
      if (isFree == true) {
        extrastatae = "paid";
      } else if (isFree == false) {
        extrastatae = "free";
      }
    }
    const body = {
      limit: pagsize,
      page: currentpag,
      alphabet,
      search: search ? search : "",
      main_categoryId: main_categoryId ? main_categoryId : "",
      categoryId: categoryId ? categoryId : "",
      genreId: genreId ? genreId : "",
      status: extrastatae,
    };

    let getBookDetails = token
      ? ApiPost("/book/get_book", body)
      : ApiPostNoAuth("teacher/book/get_books", body);
    getBookDetails
      .then((res) => {
        setbook(res.data.data?.book_data);
        settotalpage(res.data.data?.state?.page_limit);
        setcurrentpage(res.data.data?.state?.page);
        setpagesize(res.data.data?.state?.limit);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        if (err) {
          history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
  };
  const callmain = async () => {
    await ApiGetNoAuth("teacher/main_category")
      .then((res) => {
        setmainCategorylist(res.data.data);
        let totalBook = 0;
        let a = res?.data?.data.map((v, i) => {
          console.log("asdadasd", v);
          totalBook += Number(v?.book[0]?.count || 0);
        });
        setTotalBooks(totalBook);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        if (err) {
          history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
  };
  useEffect(() => {
    alphabet = "";
    main_categoryId = "";
    genreId = "";
    isFree = "";
    categoryId = "";
    search = "";
    popular = "";

    if (props.location.state) {
      console.log("props.location.state", props.location.state);
      if (props.location.state.state) {
        if (props.location.state.state == "free") {
          isFree = false;
        } else if (props.location.state.state == "paid") {
          isFree = true;
        }

        callmain();
        popular = props.location.state.state;

        callhomepage(pagesize, currentpage);
      } else if (props.location.state.genreId) {
        callmain();
        main_categoryId = props.location.state.genreId;
        callhomepage(pagesize, currentpage);
      } else if (props.location.state.main_categoryId) {
        callmain();
        main_categoryId = props.location.state.main_categoryId;
        callhomepage(pagesize, currentpage);
      } else {
        callmain();
        callFilter(props.location.state.main_categoryId);

        main_categoryId = props.location.state.main_categoryId;
        isFree = props.location.state.isFree;
        categoryId = props.location.state.categoryId;
        search = props.location.state.search;
        callhomepage(pagesize, currentpage);
      }

      // sethomeData(props.location.state)
    } else {
      callmain();

      callhomepage(pagesize, currentpage);
    }

    ApiGetNoAuth("teacher/genre")
      .then((res) => {
        setgenrelist(res.data.data);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        if (err) {
          history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
  }, []);
  return (
    <div>
      <div className="container-fluid px-4 d-flex flexColumn">
        <>
          <div className="flex20 py-5">
            <div className="box_shadow rouded p-3">
              <div className=" paddingBottom d-flex justify-content-between align-items-center borderBottom">
                <div>
                  <span>total:</span>
                  <h3 className="textBlack d-inline">{totalBooks}</h3>
                </div>
                <button
                  className="rounded border-none viewAllBtn py-2 px-3"
                  onClick={() => setrefreshfilter()}
                >
                  Reset
                </button>
              </div>
              <div className="paddingTopBottom">
                {mainCategorylist.map((record) => {
                  return (
                    <div
                      key={record._id}
                      className="d-flex justify-content-between paddingTopBottom10 borderDash"
                      onClick={() => setmaincategory(record._id)}
                    >
                      <div
                        className={
                          record._id == main_categoryId
                            ? "font_size_16 font_bold color_blue pointer"
                            : "font_size_16 font_bold color_light_gray pointer"
                        }
                        style={{}}
                      >
                        {record.name}
                      </div>
                      <div
                        className={
                          record._id == main_categoryId
                            ? "font_size_16 font_bold color_blue pointer"
                            : "font_size_16 font_bold color_light_gray pointer"
                        }
                      >
                        {record.book[0]?.count}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* <h3 className="textBlack paddingBottom borderBottom pt-4">
                Genre
              </h3>
              <div className="d-flex flex-wrap py-3">
                {genrelist.map((record, i) => {
                  return (
                    <div
                      className={
                        record._id == genreId
                          ? "tagsActive linear_gradient  pointer"
                          : "tags pointer"
                      }
                      onClick={() => setgenreid(record._id)}
                    >
                      {record.name}
                    </div>
                  );
                })}
              </div> */}
            </div>
          </div>
          <div className="flex80 paddindAround">
            <div className="d-flex align-items-center paddingBottom45 flexColumn">
              {/* <div className="px-1 d-flex w_100_7 mx_10 j_center">
                <label className="switch">
                  <input
                    type="checkbox"
                    id="togBtn"
                    onChange={(e) => handleonChange(e)}
                    name="isFree"
                    checked={isFree}
                  />
                  <div className="slider round">
                    <span className="on">Paid</span>
                    <span className="off">Free</span>
                  </div>
                </label>
              </div> */}
              <div className="col px-1 w_100_7 mx_10">
                <select
                  name="alphabet"
                  onChange={(e) => {
                    alphabet = e.target.value;
                    setcount(count + 1);
                    callhomepage(pagesize, currentpage);
                  }}
                  value={alphabet}
                  className="form-select bgInput box_shadow"
                  aria-label="Default select example"
                >
                  <option value="">Alphabets</option>
                  {letters.map((alp, index) => (
                    <option key={index} value={alp}>{alp.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div className=" col px-1 w_100_7 mx_10 ">
                <select
                  name="main_categoryId"
                  onChange={(e) => handleonChange(e)}
                  value={main_categoryId}
                  className="form-select bgInput box_shadow"
                  aria-label="Default select example"
                >
                  <option value=""> Select Main Category </option>
                  {mainCategorylist.map((record) => {
                    return (
                      <option key={record._id} value={record._id}>
                        {record.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className=" col px-1 w_100_7 mx_10 ">
                <select
                  name="categoryId"
                  onChange={(e) => handleonChange(e)}
                  value={categoryId}
                  className="form-select bgInput box_shadow"
                  aria-label="Default select example"
                >
                  <option value="">Select Category</option>
                  {Categorylist.map((record) => {
                    return <option key={record._id} value={record._id}>{record.name}</option>;
                  })}
                </select>
              </div>

              <div className=" col-md-3 px-1 w_100_7 mx_10 ">
                <div className="bgInput rounded box_shadow padding5">
                  <img src={search1} alt="" className="mr-1" />
                  <input
                    name="search"
                    onChange={(e) => handleonChange(e)}
                    value={search}
                    type="text"
                    className="border-none bg-transparent"
                    placeholder="search"
                  />
                </div>
              </div>
              <div className=" col-md-2 px-1 mx_10 ">
                <button
                  className="border-none rounded  paddingY box_shadow  w-100 linear_gradient"
                  onClick={() => callhomepage(pagesize, currentpage)}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="box_shadow p-3 rounded">
              <div className="py-2 border-bottom d-flex justify-content-between align-items-center">
                <div className="">
                  <img
                    src={view === "icon" ? bars : barsGray}
                    alt=""
                    className="marginRight"
                    onClick={() => setView("icon")}
                  />
                  <img
                    src={view === "list" ? listBtnGray : listBtn}
                    alt=""
                    className="d_none_R"
                    onClick={() => setView("list")}
                  />
                </div>
                <div className="textNormal14">Showing All Books</div>
              </div>
              <div className="row">
                {view === "icon" ? (
                  <>
                    <Book_Details_2 data={book} />
                  </>
                ) : (
                  <Book_List data={book} />
                )}
              </div>
              <div className="paddingTopBottom">
                <div className="col-md-8">
                  <Pagination
                    count={totalpage}
                    page={currentpage}
                    onChange={handleChange}
                    variant="outlined"
                    shape="rounded"
                    className="pagination_"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Book;
