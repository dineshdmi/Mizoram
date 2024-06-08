import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import search from "../../media/icons/search.png";
import {
  ApiDelete,
  ApiGetNoAuth,
  ApiGet,
  ApiPostNoAuth,
  ApiPost,
  Bucket,
} from "../../helpers/API/ApiData";

import carousel from "../../media/a1.png";
import carousel1 from "../../media/a2.png";
import carousel2 from "../../media/a3.png";

import Book_Detail_2 from "../Book/Book_Details_2";
import Pagination from "@material-ui/lab/Pagination";
import cartBlue from "../../media/cartBlue.png";
import likeRed from "../../media/likeRed.png";
import { Carousel } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";
let newPage = 1;
const Home = () => {
  const history = useHistory();
  const [freebook, setfreebook] = useState([]);
  const [prepaidbook, setprepaidbook] = useState([]);
  const [popularbook, setpopularbook] = useState([]);
  const [mainCategorylist, setmainCategorylist] = useState([]);
  const [Categorylist, setCategorylist] = useState([]);
  const [subCategorylist, setsubCategorylist] = useState([]);
  const [homeData, sethomeData] = useState({});
  const [mainviewflag, setmainviewflag] = useState("main");
  const [totalpage, settotalpage] = useState(0);
  const [currentpage, setcurrentpage] = useState(1);
  const [pagesize, setpagesize] = useState(12);
  const [book, setbook] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const handleonChange = (e) => {
    console.log(e.target);
    let { name, value } = e.target;
    if (name == "main_categoryId") {
      sethomeData({
        ...homeData,
        [name]: value,
      });
      callFilter(value);
    } else if (name == "isFree") {
      console.log(e.target.checked);
      sethomeData({
        ...homeData,
        [name]: e.target.checked,
      });
      // callFilter1(value);
    } else {
      sethomeData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  console.log(homeData);
  const callFilter1 = (main) => {
    const body = {
      main_categoryId: homeData.main_categoryId,
      categoryId: main,
    };
    ApiPostNoAuth("teacher/filter", body)
      .then((res) => {
        console.log(res);
        setsubCategorylist(res.data.data);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 410) {
          history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
  };
  const callFilter = (main) => {
    const body = {
      main_categoryId: main,
    };
    ApiPostNoAuth("teacher/filter", body)
      .then((res) => {
        console.log(res);
        setCategorylist(res.data.data);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 410) {
          history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
  };
  const handleChange = (e, i) => {
    console.log(i);
    callParticularData(mainviewflag, pagesize, i);
  };
  const setonlyData = (i) => {
    console.log(i);
    const body = {
      // page: "1",
      // search: homeData.search ? homeData.search : "",
      // main_categoryId: homeData.main_categoryId ? homeData.main_categoryId : "",
      // // subCategoryId: homeData.subCategoryId ? homeData.subCategoryId : "",
      // categoryId: homeData.categoryId ? homeData.categoryId : "",
      // isFree:homeData.isFree ? homeData.isFree : "",
      state: i,
    };
    history.push({
      pathname: "/book",
      state: body,
    });
    // setmainviewflag(i);
    // callParticularData(i, pagesize, currentpage);
  };
  const callParticularData = (i, pagsize, currentpag) => {
    let txt = "";
    if (i == "free") {
      txt = "get_free_book";
    } else if (i == "paid") {
      txt = "get_paid_book";
    } else {
      txt = "get_popular_book";
    }
    let body = {
      limit: pagsize,
      page: currentpag,
      search: homeData.search ? homeData.search : "",
      main_categoryId: homeData.main_categoryId ? homeData.main_categoryId : "",
      categoryId: homeData.categoryId ? homeData.categoryId : "",
      subCategoryId: homeData.subCategoryId ? homeData.subCategoryId : "",
      genreId: "",
    };
    // if (token) {
    //   ApiPost("/book/" + "free", body)
    //     .then((res) => {
    //       console.log(res);
    //       setbook(res.data.data.book_data);
    //       settotalpage(res.data.data.state.page_limit);
    //       setcurrentpage(res.data.data.state.page);
    //       setpagesize(res.data.data.state.limit);
    //       setIsLoading(true);
    //       // setfreebook(res.data.data[0].Free_books);
    //       // setprepaidbook(res.data.data[0].Paid_books);
    //       // setpopularbook(res.data.data[0].Popular_books);
    //       // setCategory(res.data.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       if (err.status == 410) {
    //         history.push("/postlist");
    //       } else {
    //         // toast.error(err.message);
    //       }
    //     });
    // } else {
    ApiPostNoAuth("teacher/book/" + "free", body)
      .then((res) => {
        console.log(res);
        setbook(res.data.data.book_data);
        settotalpage(res.data.data.state.page_limit);
        setcurrentpage(res.data.data.state.page);
        setpagesize(res.data.data.state.limit);
        setIsLoading(true);
        // setfreebook(res.data.data[0].Free_books);
        // setprepaidbook(res.data.data[0].Paid_books);
        // setpopularbook(res.data.data[0].Popular_books);
        // setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 410) {
          history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
    // }
  };
  const searchcallhomepage = () => {
    // if (mainviewflag == "main") {
    const body = {
      // page: "1",
      search: homeData.search ? homeData.search : "",
      main_categoryId: homeData.main_categoryId ? homeData.main_categoryId : "",
      // subCategoryId: homeData.subCategoryId ? homeData.subCategoryId : "",
      categoryId: homeData.categoryId ? homeData.categoryId : "",
      isFree: homeData.isFree ? homeData.isFree : "",
    };
    console.log(body);

    history.push({
      pathname: "/book",
      state: body,
    });
    // callhomepage();
    // } else {
    //   callParticularData(mainviewflag, pagesize, currentpage);
    // }
  };
  const callhomepage = () => {
    const body = {
      limit: 10,
      page: "1",
      search: homeData.search ? homeData.search : null,
      main_categoryId: homeData.main_categoryId
        ? homeData.main_categoryId
        : null,
      subCategoryId: homeData.subCategoryId ? homeData.subCategoryId : null,
      categoryId: homeData.categoryId ? homeData.categoryId : null,
      isFree: homeData.isFree ? homeData.isFree : null,
    };
    console.log(body);
    // if (token) {
    //   ApiPost("/home", body)
    //     .then((res) => {
    //       console.log(res);
    //       setfreebook(res.data.data[0].Free_books);
    //       setprepaidbook(res.data.data[0].Paid_books);
    //       setpopularbook(res.data.data[0].Popular_books);
    //       setIsLoading(true);
    //       // setCategory(res.data.data);
    //     })
    //     .catch((err) => {
    //       console.log("err.status", err.status);
    //       if (err.status == 401) {
    //         // localStorage.clear();
    //       } else {
    //         // toast.error(err.message);
    //       }
    //     });
    // } else {
    ApiPostNoAuth("teacher/home", body)
      .then((res) => {
        console.log(res);
        setfreebook(res.data.data[0].Free_books);
        setprepaidbook(res.data.data[0].Paid_books);
        setpopularbook(res.data.data[0].Popular_books);
        setIsLoading(true);
        // setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 410) {
          history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
    // }
  };
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userinfo"));
    console.log("userInfo", userInfo);
    console.log("jjjjj");

    callhomepage();

    ApiGetNoAuth("teacher/main_category")
      .then((res) => {
        console.log(res);
        setmainCategorylist(res.data.data);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 410) {
          history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
  }, []);

  const loadMore = (e) => {
    const { target } = e;
    console.log("eeeee11111", target);

    if (target.scrollTop + target.offsetHeight >= target.scrollHeight) {
      // API call (to load more data..........)
      console.log("eeeee");
      // page = page + 1;
      // getData(subject);
      // fetchData(subject);
    }
  };

  const infiniteScroll = () => {
    // console.log("window.innerHeight ", window.innerHeight);
    // console.log("document.documentElement.scrollTop", document.documentElement.scrollTop);
    // console.log("document.documentElement.offsetHeight", document.documentElement.offsetHeight);
    // console.log("document.documentElement.scrollHeight", document.documentElement.scrollHeight);
    if (
      document.documentElement.scrollTop +
        document.documentElement.offsetHeight >=
      document.documentElement.scrollHeight
    ) {
      console.log("hhhhhhhhh");
      // newPage = newPage + 1;
    }
  };
  // console.log("==================", newPage);
  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, []);

  // document.onkeydown = function (event) {
  //   console.log("event", event);
  //   if (event.keyCode == 116) {
  //     event.preventDefault();
  //   }
  // };

  // document.onkeydown = function (event) {
  //   console.log("event", event);
  //   switch (event.keyCode) {
  //     case 116: //F5 button
  //       event.returnValue = false;
  //       event.keyCode = 0;
  //       return false;
  //     case 82: //R button
  //       if (event.ctrlKey) {
  //         event.returnValue = false;
  //         event.keyCode = 0;
  //         return false;
  //       }
  //   }
  // };

  // const handleUserKeyPress = (e) => {
  //   console.log("keydown", e);
  //   // if (
  //   //   e.key == "F5" ||
  //   //   e.key == "F11" ||
  //   //   (e.ctrlKey == true && (e.key == "r" || e.key == "R")) ||
  //   //   e.keyCode == 116 ||
  //   //   e.keyCode == 82
  //   // ) {
  //   //   e.preventDefault();
  //   // }
  // };

  // const handleUserKeyPress = useCallback((e) => {
  //   console.log("keydown", e);
  //   // const { key, keyCode } = event;
  //   // if(keyCode === 32 || (keyCode >= 65 && keyCode <= 90)){
  //   //     setUserText(prevUserText => `${prevUserText}${key}`);
  //   // }
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("keydown", handleUserKeyPress);

  //   return () => {
  //     window.removeEventListener("keydown", handleUserKeyPress);
  //   };
  // }, [handleUserKeyPress]);

  return (
    <>
      <div className="bgColor">
        <Carousel
          fade
          nextIcon={false}
          prevIcon={false}
          indicators={true}
          className="carousel_"
        >
          <Carousel.Item>
            <img className="d-block w-100" src={carousel} alt="First slide" />
            {/* <Carousel.Caption>
              <div className="col-md-6">
                <h3 className="text-dark py-3">The Book For Everyone</h3>
                <p className="text-dark py-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Consequat mauris nunc congue nisi vitae suscipit. Urna
                  condimentum mattis pellentesque id nibh. Pulvinar sapien et
                  ligula ullamcorper malesuada proin.{" "}
                </p>
                <button className="px-5 py-2 rounded border-none bg-dark text-white">
                  ReadMore
                </button>
              </div>
              <div className="col-md-6"></div>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={carousel1} alt="Second slide" />

            <Carousel.Caption>
              {/* <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={carousel2} alt="Third slide" />

            <Carousel.Caption>
              {/* <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className="container">
          <div className="py-5">
            <div className="d-flex align-items-center flexColumn ">
              {/* <div className="px-1 d-flex w_100_7 mx_10 j_center">
                <label className="switch">
                  <input
                    type="checkbox"
                    id="togBtn"
                    onChange={(e) => handleonChange(e)}
                    name="isFree"
                    value={homeData.isFree}
                  />
                  <div className="slider round">
                    <span className="on" value="true">
                      Paid
                    </span>
                    <span className="off" value="false">
                      Free
                    </span>
                  </div>
                </label>
              </div> */}
              <div className=" col px-1 w_100_7 mx_10">
                <select
                  name="main_categoryId"
                  onChange={(e) => handleonChange(e)}
                  value={homeData.main_categoryId}
                  className="form-select bgInput box_shadow"
                  aria-label="Default select example"
                >
                  <option value="" selected>
                    Select Main Category
                  </option>
                  {mainCategorylist.map((record, i) => {
                    return <option value={record._id}>{record.name}</option>;
                  })}
                </select>
              </div>
              <div className=" col px-1 w_100_7 mx_10">
                <select
                  name="categoryId"
                  onChange={(e) => handleonChange(e)}
                  value={homeData.categoryId}
                  className="form-select bgInput box_shadow"
                  aria-label="Default select example"
                >
                  <option value="" selected>
                    Select Category
                  </option>
                  {Categorylist.map((record, i) => {
                    return <option value={record._id}>{record.name}</option>;
                  })}
                </select>
              </div>

              <div className=" col px-1 w_100_7 mx_10">
                <div className="bgInput rounded box_shadow padding5">
                  <img src={search} alt="" className="mr-1" />
                  <input
                    name="search"
                    onChange={(e) => handleonChange(e)}
                    value={homeData.search}
                    type="text"
                    className="border-none bg-transparent"
                    placeholder="search"
                  />
                </div>
              </div>
              <div className=" colmd-2 px-1 mx_10">
                <button
                  className="border-none rounded px-5 paddingY box_shadow  w-100 linear_gradient"
                  onClick={() => searchcallhomepage()}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="box_shadow rounded marginBottom50">
            {mainviewflag == "main" ? (
              <>
                {" "}
                <div className="">
                  <div className="px-3 py-3 border-bottom d-flex align-items-center justify-content-between">
                    <div className="textBlackfz26midium">Free Resources</div>
                    <div className="col-md-3 text-end">
                      <button
                        className="px-3 py-2 viewAllBtn rounded border-none"
                        onClick={() => setonlyData("free")}
                      >
                        View All
                      </button>
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <Book_Detail_2 data={freebook} />
                  </div>
                </div>
                <div className="">
                  <div className="px-3 py-3 border-bottom d-flex align-items-center justify-content-between">
                    <div className="textBlackfz26midium">Paid Resources</div>
                    <div className="col-md-3 text-end">
                      <button
                        className="px-3 py-2 viewAllBtn rounded border-none"
                        onClick={() => setonlyData("paid")}
                      >
                        View All
                      </button>
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <Book_Detail_2 data={prepaidbook} />
                  </div>
                </div>
                <div className="">
                  <div className="px-3 py-3 border-bottom d-flex align-items-center justify-content-between">
                    <div className="textBlackfz26midium">Popular Resources</div>
                    <div className="col-md-3 text-end">
                      <button
                        className="px-3 py-2 viewAllBtn rounded border-none"
                        onClick={() => setonlyData("popular")}
                      >
                        View All
                      </button>
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    {isLoading === true ? (
                      <Book_Detail_2 data={popularbook} isLoading={isLoading} />
                    ) : (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: "300px" }}
                      >
                        <CircularProgress style={{ color: "#64dbf2" }} />
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : mainviewflag == "free" ? (
              <div className="">
                <div className="px-3 py-3 border-bottom d-flex align-items-center justify-content-between">
                  <div className="textBlackfz26midium">Free</div>
                  {/* <div className="col-md-3 text-end">
                  <button className="px-3 py-2 viewAllBtn rounded border-none">
                    View All
                  </button>
                </div> */}
                </div>
                <div className="px-3 py-2">
                  {isLoading === true ? (
                    <Book_Detail_2 data={book} isLoading={isLoading} />
                  ) : (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "300px" }}
                    >
                      <CircularProgress style={{ color: "#64dbf2" }} />
                    </div>
                  )}
                </div>
              </div>
            ) : mainviewflag == "paid" ? (
              <div className="">
                <div className="px-3 py-3 border-bottom d-flex align-items-center justify-content-between">
                  <div className="textBlackfz26midium">Paid Resources</div>
                  {/* <div className="col-md-3 text-end">
                  <button className="px-3 py-2 viewAllBtn rounded border-none">
                    View All
                  </button>
                </div> */}
                </div>
                <div className="px-3 py-2">
                  {isLoading === true ? (
                    <Book_Detail_2 data={book} isLoading={isLoading} />
                  ) : (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "300px" }}
                    >
                      <CircularProgress style={{ color: "#64dbf2" }} />
                    </div>
                  )}
                </div>
              </div>
            ) : mainviewflag == "popular" ? (
              <div className="">
                <div className="px-3 py-3 border-bottom d-flex align-items-center justify-content-between">
                  <div className="textBlackfz26midium">Popular Resources</div>
                  {/* <div className="col-md-3 text-end">
                  <button className="px-3 py-2 viewAllBtn rounded border-none">
                    View All
                  </button>
                </div> */}
                </div>
                <div className="px-3 py-2">
                  {isLoading === true ? (
                    <Book_Detail_2 data={book} isLoading={isLoading} />
                  ) : (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "300px" }}
                    >
                      <CircularProgress style={{ color: "#64dbf2" }} />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
            {mainviewflag == "main" ? (
              ""
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
