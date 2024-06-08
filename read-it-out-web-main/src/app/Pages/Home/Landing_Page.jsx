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

import imgs1 from "../../media/img/book1.jpg";
import imgs2 from "../../media/img/book2.jpg";
import imgs3 from "../../media/img/book3.jpg";
import imgs4 from "../../media/img/book4.jpg";
import carousel from "../../media/a1.png";
import carousel1 from "../../media/a2.png";
import carousel2 from "../../media/a3.png";

import Book_Detail_2 from "../Book/Book_Details_2";
import cartBlue from "../../media/cartBlue.png";
import likeRed from "../../media/likeRed.png";
import { Carousel } from "react-bootstrap";
import { CircularProgress, Grid, makeStyles, Paper } from "@material-ui/core";

// Core modules imports are same as usual
import { Navigation, Pagination } from "swiper";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

// Styles must use direct files imports
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
import "swiper/modules/pagination/pagination.scss";
import Book_Card from "./Book_Card";
import Headline_Card from "./Headline_Card";
import SabpaisaPaymentGateway from "../Auth/SabpaisaPaymentGateway";
import moment from "moment";
import * as userUtil from "../../utils/user.util";
import * as authUtil from "../../utils/auth.util";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: "center",
    boxShadow: "none",
    color: theme.palette.text.secondary,
  },
}));

const Landing_Page = () => {
  const history = useHistory();
  const classes = useStyles();
  const [freebook, setfreebook] = useState([]);
  const [prepaidbook, setprepaidbook] = useState([]);
  const [popularbook, setpopularbook] = useState([]);
  const [recentBook, setRecentBook] = useState([]);
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
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("");
  console.log("date", date);
  const token = JSON.parse(localStorage.getItem("token"));
  const token1 = JSON.parse(localStorage.getItem("subscription"));
  console.log("token", token1?.name);
  const userUtilJSON = localStorage.getItem("userinfo");
  const userUtil = JSON.parse(userUtilJSON);
  const userUtilJSON1 = sessionStorage.getItem("userUtil");
  const userUtil1 = JSON.parse(userUtilJSON1);
  console.log("date", moment(date).utc().format("DD-MM-YYYY"));
  console.log("date", moment().utc().format("DD-MM-YYYY"));
  let today = moment(new Date()).utc().format("DD-MM-YYYY");
  // let today = new Date().setHours(0, 0, 0, 0);
  let expiry = moment(date).utc().format("DD-MM-YYYY");
  // let expiry = new Date(date).setHours(0, 0, 0, 0);
  console.log("expiry", expiry);
  console.log("today", today);
  const queryParameters = new URLSearchParams(window.location.search);
  const payername = queryParameters.get("payerName");
  const payeremail = queryParameters.get("payerEmail");
  const payermobile = queryParameters.get("payerMobile");
  const clientTxnId = queryParameters.get("clientTxnId");
  const amount = queryParameters.get("paidAmount");
  const paymentMode = queryParameters.get("paymentMode");
  const bankName = queryParameters.get("bankName");
  const status = queryParameters.get("status");
  const sabpaisaTxnId = queryParameters.get("sabpaisaTxnId");
  const bankTxnId = queryParameters.get("bankTxnId");
  const transDate = queryParameters.get("transDate");
  const dateObject = moment().format("YYYY-MM-DD");

  useEffect(() => {
    if (payername?.length > 0) {
      handelepayment();
    }
  }, [payername, date]);
  const handelepayment = async (i) => {
    const body = {
      name: payername,
      email: payeremail,
      mobile: payermobile,
      clientTxnId: clientTxnId,
      amount: amount,
      paymentMode: paymentMode,
      bankName: bankName,
      status: status,
      sabpaisaTxnId: sabpaisaTxnId,
      bankTxnId: bankTxnId,
      transDate: dateObject,
      userId: userUtil?.id || userUtil1?.id,
    };

    await ApiPost("/payment", body)
      .then((res) => {
        const userUtil1 = localStorage.getItem("userUtil");
        const authUtil1 = localStorage.getItem("authUtil");
        // userUtil.setUserInfo(JSON.parse(userUtil1));
        // authUtil.setToken(JSON.parse(authUtil1));
        history.push("/");
        console.log("res", res?.request?.response);
      })
      .catch((err) => {
        if (err.status == 410) {
          // refreshtoken();
        } else {
          toast.error(err.message);
        }
      });
  };
  useEffect(() => {
    console.log("today", today);
    console.log("expiry", expiry);

    ApiGet(`/${userUtil?.id || userUtil1?.id}`)
      .then((res) => {
        // setData(res.data.data);
        console.log("res", res);
        setDate(res?.data?.data?.subscriptionExpDate);

        if (today === expiry) {
          console.log("true");
          if (!payername?.length > 0) {
            setIsOpen(true);
          }
        }
      })

      .catch((err) => {
        console.log("err", err);
      });
  }, [date]);

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
        if (err?.status === 410) {
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
        if (err.status === 410) {
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
      state: i,
    };
    history.push({
      pathname: "/book",
      state: body,
    });
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
        if (err.status === 410) {
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
    //       setRecentBook(res.data.data[0].Recent_books);
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
        setRecentBook(res.data.data[0].Recent_books);
        setIsLoading(true);
        // setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err) {
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
        if (err) {
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
  const fetchCategory = (val) => {
    console.log("val", val);

    history.push({
      pathname: "/book",
      state: { main_categoryId: val._id },
    });
  };
  const selectBook = (val) => {
    console.log("val", val);
    if (token === undefined) {
      history.push("/signIn");
    } else {
      history.push("/viewBook?id=" + val?._id);
    }
  };
  const infiniteScroll = () => {
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
  return (
    <div>
      <div className="">
        <Carousel
          fade
          nextIcon={false}
          prevIcon={false}
          indicators={true}
          className="carousel_"
        >
          <Carousel.Item>
            <img className="d-block w-100" src={carousel} alt="First slide" />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={carousel1} alt="Second slide" />

            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={carousel2} alt="Third slide" />

            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className="container">
          <div className="p-3 BgGrey my-7 rounded">
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
              <div className="col px-1 w_100_7 mx-10">
                <select
                  name="main_categoryId"
                  onChange={(e) => handleonChange(e)}
                  value={homeData.main_categoryId}
                  className="form-select bgInput box_shadow"
                  aria-label="Default select example"
                >
                  <option value="" disabled selected>
                    Select Main Category
                  </option>
                  {mainCategorylist.map((record, i) => {
                    return (
                      <option key={record._id} value={record._id}>
                        {record.name}
                      </option>
                    );
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
        </div>
        <div className="BgGrey">
          <div className="text-center py-5">
            <h1 className="mb-2">Our Category List</h1>
            {/* <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have <br></br> suffered lebmid alteration in some
              ledmid form
            </p> */}
          </div>
          <div className="container pb-4">
            <Swiper
              slidesPerView={6}
              spaceBetween={20}
              slidesPerGroup={1}
              loop={true}
              loopFillGroupWithBlank={true}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper ms-3 "
              breakpoints={{
                "@0.00": {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },

                "@0.50": {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                "@1.00": {
                  slidesPerView: 5,
                  spaceBetween: 15,
                },
                "@1.50": {
                  slidesPerView: 6,
                  spaceBetween: 15,
                },
              }}
            >
            
              {mainCategorylist.map((record, i) => {
                return (
                  <SwiperSlide className="ms-5">
                    <div
                      className="d-flex flex-column justify-content-around h-100 cursor-pointer"
                      onClick={() => fetchCategory(record)}
                    >
                      {console.log(Bucket + record?.image)}
                      <img
                        src={Bucket + record?.image}
                        width="150px"
                        height="150px"
                        className="rounded-circle hoverCard"
                        alt=""
                      />
                      <div className="">
                        <h5>{record?.name}</h5>
                        {/* <p>{record?.book[0]?.count}</p> */}
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        <div className="">
          <div className="text-center pb-5 pt-4">
            <h1 className="mb-2">Recent Books</h1>
            {/* <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have <br></br> suffered lebmid alteration in some
              ledmid form
            </p> */}
          </div>
          <div className="container ">
            <Grid className="mb-3" container spacing={3}>
              {freebook.map((val, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={3}
                  onClick={() => selectBook(val)}
                >
                  <Paper className={classes.paper}>
                    <Book_Card book={val} callhomepage={callhomepage} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <div className="text-center mb-4">
              <button
                className="linear_gradient rounded border-0 px-4 py-2 text-white"
                onClick={() => setonlyData("")}
              >
                {" "}
                View All Book
              </button>
            </div>
          </div>
        </div>
        <div className="bg-lightBlue opacity15">
          <div className="container  py-4">
            <div className="text-center pb-5">
              <h1 className="mb-2">Our Photo Gallery</h1>
              {/* <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have <br></br> suffered lebmid alteration in
                some ledmid form
              </p> */}
            </div>
            <div class="container2">
              <div class="item sidebar">
                <img className="w-100 h-100 object-cover" src={imgs1} alt="" />
              </div>
              <div class="item content-1">
                <img className="w-100 h-100 object-cover" src={imgs2} alt="" />
              </div>
              <div class="item content-2">
                <img className="w-100 h-100 object-cover" src={imgs3} alt="" />
              </div>
              <div class="item content-3">
                <img className="w-100 h-100 object-cover" src={imgs4} alt="" />
              </div>
              {/* <div class="item sidebar">
              <img src={imgs1} alt="" />
            </div> */}
            </div>
            <div className="text-center mt-5">
              <button
                className="linear_gradient rounded border-0 px-4 py-2 text-white"
                onClick={() => history.push("/photoGallary")}
              >
                {" "}
                View Photo Gallery
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <div className="text-center py-4">
            <h1 className="mb-2">Popular Books</h1>
            {/* <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have <br></br> suffered lebmid alteration in some
              ledmid form
            </p> */}
          </div>
          <div className="container ">
            <Grid container spacing={3}>
              {popularbook.map((val, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={3}
                  onClick={() => selectBook(val)}
                >
                  <Paper className={classes.paper}>
                    <Book_Card book={val} callhomepage={callhomepage} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <div className="text-center my-4">
              <button
                className="linear_gradient rounded border-0 px-4 py-2 text-white"
                onClick={() => setonlyData("popular")}
              >
                {" "}
                View All Book
              </button>
            </div>
          </div>
        </div>
        {/* <div className="pb-5 BgGrey">
          <div className="text-center py-5">
            <h1 className="mb-2">Our News Headlines</h1>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have <br></br> suffered lebmid alteration in some
              ledmid form
            </p>
          </div>
          <div className="container ">
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              slidesPerGroup={1}
              loop={true}
              loopFillGroupWithBlank={true}
              navigation={true}
              modules={[Pagination, Navigation]}
              className=" "
              breakpoints={{
                "@0.00": {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },

                "@0.50": {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                "@1.00": {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                "@1.50": {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
              }}
            >
              {Array.from(Array(4)).map((_, index) => (
                <SwiperSlide>
                  <Headline_Card />
                </SwiperSlide>
              ))}
            </Swiper>
            <SabpaisaPaymentGateway
              payerName={userUtil?.name || userUtil1?.name}
              payerEmail={userUtil?.email || userUtil1?.email}
              payerMobile={userUtil?.mobile || userUtil1?.phoneNumber}
              isOpen={isOpen}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Landing_Page;
