import { useState, useEffect, useRef } from "react";
import moment from "moment";
import ShowMoreText from "react-show-more-text";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import {
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import * as userUtil from "../../utils/user.util";
import { toast } from "react-toastify";
import queryString from "query-string";
import {
  ApiPost,
  ApiPostNoAuth,
  Bucket,
} from "../../helpers/API/ApiData";
const View_Book = (props) => {
  const history = useHistory();
  const [bookdetails, setbookdetails] = useState({});
  const [recommendBook, setrecommendBook] = useState([]);
  const [review, setreview] = useState([]);
  const [similarBook, setsimilarBook] = useState([]);
  const [rating, setRating] = useState();
  const [IDS, setIDS] = useState();
  const token = userUtil.getUserInfo();
  const [isLoading, setIsLoading] = useState(false);
  // const buyBook = () => {
  //   if (token === undefined) {
  //     history.push({
  //       pathname: "/signIn",
  //       state: "in",
  //     });
  //   } else {
  //     history.push("/checkout");
  //   }
  // };
  const viewerRef = useRef(null);
  // const token = JSON.parse(localStorage.getItem("token"));

  const executeOnClick = (isExpanded) => {
    console.log(isExpanded);
  };
  const pdf = (i, j) => {
    if (token === undefined) {
      history.push({
        pathname: "/signIn",
        state: "in",
      });
    } else {
      console.log(i);
      let body = { id: i, title: j };
      history.push({ pathname: "/epub", state: body });
    }
  };
  const setviewsimilar = () => {
    console.log(bookdetails);
    let body = {
      genreId: bookdetails.main_categoryId,
    };
    history.push({
      pathname: "/book",
      state: body,
    });
  };

  const fetchData = (i) => {
    console.log("idddssss", i);
    let body = {
      recommendBook_limit: 4,
      similarBook_limit: 2,
    };
    // if (token) {
    //   ApiPost("/book/detail/" + i, body)
    //     .then((res) => {
    //       console.log(res);
    //       setbookdetails(res.data.data[0].book[0]);
    //       setrecommendBook(res.data.data[0].recommendBook);
    //       setreview(res.data.data[0].review);
    //       setsimilarBook(res.data.data[0].similarBook);
    //       setIsLoading(true);
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

    ApiPost("/book/detail/" + i, body)
      .then((res) => {
        console.log(res.data.data[0].book[0]);
        setbookdetails(res.data.data[0].book[0]);
        setrecommendBook(res.data.data[0].recommendBook);
        setreview(res.data.data[0].review);
        setsimilarBook(res.data.data[0].similarBook);
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

  const favourite = (v) => {
    console.log(v);
    if (token === undefined) {
      // props.addTopopHandle(true);
      history.push({
        pathname: "/signIn",
        state: "in",
      });
    } else {
      const body = {
        bookId: v._id,
      };
      ApiPost("/favorite/add", body)
        .then(async (res) => {
          console.log(res);
        })
        .catch((err) => {
          if (err.status == 410) {
            // refreshtoken();
          } else {
            toast.error(err.message);
          }
        });
    }
  };

  const pdfReader = (v, ids) => {
    console.log(v);
    console.log(ids);
    history.push({
      pathname: "/pdfPreview",
      state: {
        v,
        ids,
      },
    });
    // window.location.reload();
  };

  const buyBook = (v) => {
    console.log(v);
    if (token === undefined) {
      // props.addTopopHandle(true);
      history.push({
        pathname: "/signIn",
        state: "in",
      });
    } else {
      const body = {
        bookId: v._id,
      };
      ApiPost("/library/add", body)
        .then(async (res) => {
          history.push("/profile");
        })
        .catch((err) => {
          if (err.status == 410) {
            // refreshtoken();
          } else {
            toast.error(err.message);
          }
        });
    }
  };
  useEffect(() => {
    const idValue = queryString.parse(window.location.search);
    console.log(idValue);
    if (idValue) {
      console.log(idValue);
      fetchData(idValue.id);
      setIDS(idValue);
    }

    // let body = {

    // }
    // ApiPostNoAuth("student/get_country_state_city", body)
    //   .then((res) => {
    //     console.log(res);
    //     setcountrylist(res.data.data);

    //     // setCategory(res.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     if (err.status == 410) {
    //       history.push("/postlist");
    //     } else {
    //       // toast.error(err.message);
    //     }
    //   });
  }, []);
  const handleRating = (newRating, name) => {
    console.log(newRating);
    console.log(name);
    setRating(newRating);
    // setRating((preCheck) => ({
    //   ...preCheck,
    //   [name]: checked,
    // }));
  };
  // console.log(check?.checked);

  const ratting = () => {
    const body = {
      bookId: bookdetails._id,
      feedback_rating: rating,
    };
    console.log(body);
    ApiPost("/feedback/add", body)
      .then(async (res) => {
        console.log(res);
        fetchData(bookdetails._id);
        setRating();
      })
      .catch((err) => {
        if (err.status == 410) {
          // refreshtoken();
        } else {
          toast.error(err.message);
        }
      });
  };
  return (
    <div className="container-fluid row reverseRes">
      <div className="flex35 paddindAround">
        <div className="p-4 rounded box_shadow">
          <h3 className="textBlack paddingBottom borderBottom">
            Similar Books
          </h3>
          <div className="paddingTop20">
            {similarBook.length > 0 &&
              similarBook.map((book, i) => {
                console.log(book);
                return (
                  <div className="d-flex  py-2 flexColumn">
                    <div className="px-2">
                      <img
                        src={book.image ? Bucket + book.image : ""}
                        alt=""
                        width="80px"
                        className="rounded"
                      />
                    </div>
                    <div className="d-flex flex-column px-2">
                      <div className="">
                        <div className="font_size_16 font_bold color_gray">
                          {book.title}
                        </div>
                        <div className="font_size_14 font_bold color_light_gray">
                          Author:{" "}
                          <span className="font_size_14 font_bold color_blue">
                            {book.author}
                          </span>
                        </div>
                      </div>
                      <div
                        className="font_size_16 font_bold color_blue py-2 pointer"
                        onClick={() => fetchData(book._id)}
                      >
                        Read More <HiOutlineChevronRight color="#00BDE2" />
                      </div>
                    </div>
                  </div>
                );
              })}

            <div className="d-flex justify-content-between py-2">
              <button
                className="px-3 py-2 viewAllBtn rounded border-none"
                onClick={() => setviewsimilar()}
              >
                {" "}
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex65 paddindAround">
        <div className="rounded box_shadow p-4 mb-4">
          {!isLoading === true ? (
            <>
              <div className="d-flex flexColumn">
                <div className="flex20">
                  <div className="flex_JCenter">
                    <img
                      width="210px"
                      src={bookdetails.image ? Bucket + bookdetails.image : ""}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "https://sciendo.com/product-not-found.png";
                      }}
                      alt=""
                      className="rounded"
                    />
                  </div>
                </div>
                <div className="flex80 paddingX20Y10">
                  <div className="pb-2 border-bottom">
                    <div className="d-flex pb-2 justify-content-between align-items-center">
                      <h3 className="font_size_22 font_bold color_gray">
                        {bookdetails.title}
                      </h3>
                      {/* <p className="textfz20Red">In Stock</p> */}
                    </div>
                    <div className="d-flex pb-2 justify-content-between">
                      <h6 className="text-uppercase textfz24Blue fs-4">
                        {bookdetails.isFree ? "Free" : ""}
                      </h6>
                    </div>
                    <div className="d-flex pb-2 justify-content-between">
                      <div className=" font_bold textfz24Blue">
                        {bookdetails.isFree
                          ? ""
                          : bookdetails.cost + " " + "GHS"}
                      </div>
                    </div>
                  </div>
                  <div
                    // className="py-2 grayTextRegular"
                    className="py-2"
                  >
                    <ShowMoreText
                      /* Default options */
                      lines={4}
                      more="Show more"
                      less="Show less"
                      // className="content-css"
                      anchorClass="my-anchor-css-class"
                      onClick={executeOnClick}
                      expanded={false}
                    // width={280}
                    >
                      {bookdetails.description}
                    </ShowMoreText>
                  </div>

                  <div className="py-2 d-flex align-items-center flexColumn ">
                    {bookdetails.isFree === true ? (
                      bookdetails.isAdded === true ? (
                        <>
                          <button
                            className="paddingX5Y20 rounded activBtn linear_gradient marginRigh10"
                            onClick={() => buyBook(bookdetails)}
                            // disabled
                            style={{ cursor: "auto" }}
                          >
                            Already in your library
                          </button>
                          {bookdetails.preview ? (
                            <button
                              className="paddingX5Y20 rounded activBtn linear_gradient marginRigh10 mx_10"
                              onClick={() => pdfReader(bookdetails.pdf, IDS)}
                            >
                              Preview PDF
                            </button>
                          ) : (
                            ""
                          )}
                          {bookdetails.preview_video ? (
                            <a
                              href={Bucket + bookdetails.preview_video}
                              target="_blank"
                              className="paddingX5Y20 rounded activBtn linear_gradient marginRigh10 mx_10 text-decoration-none"
                            // onClick={() => pdfReader(bookdetails.pdf, IDS)}
                            >
                              Preview Video
                            </a>
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        <>
                          <button
                            className="paddingX5Y20 rounded activBtn linear_gradient marginRigh10"
                            onClick={() => buyBook(bookdetails)}
                          >
                            Add to My Library
                          </button>
                          {bookdetails.preview ? (
                            <button
                              className="paddingX5Y20 rounded activBtn linear_gradient marginRigh10 mx_10"
                              onClick={() => pdfReader(bookdetails.pdf, IDS)}
                            >
                              Preview PDF
                            </button>
                          ) : (
                            ""
                          )}
                          {bookdetails.preview_video ? (
                            <a
                              href={Bucket + bookdetails.preview_video}
                              target="_blank"
                              className="paddingX5Y20 rounded activBtn linear_gradient marginRigh10 mx_10 text-decoration-none"
                            // onClick={() => pdfReader(bookdetails.pdf, IDS)}
                            >
                              Preview Video
                            </a>
                          ) : (
                            ""
                          )}
                        </>
                      )
                    ) : (
                      <button
                        className="paddingX5Y20 rounded activBtn linear_gradient marginRigh10"
                        onClick={() => history.push("/checkout")}
                      >
                        Buy Book
                      </button>
                    )}

                    {token ? (
                      <>
                        {bookdetails.isFavorite === true ? (
                          <a
                            className="btn-product-icon-fav "
                            onClick={() => favourite(bookdetails)}
                          >
                            <Checkbox
                              icon={<Favorite style={{ color: "#FF9B8A" }} />}
                              checkedIcon={
                                <FavoriteBorder style={{ color: "#FF9B8A" }} />
                              }
                            />
                          </a>
                        ) : (
                          <a
                            className="btn-product-icon-fav "
                            onClick={() => favourite(bookdetails)}
                          >
                            <Checkbox
                              icon={
                                <FavoriteBorder style={{ color: "#FF9B8A" }} />
                              }
                              checkedIcon={
                                <Favorite style={{ color: "#FF9B8A" }} />
                              }
                            />
                          </a>
                        )}
                      </>
                    ) : (
                      <>
                        <a
                          className="btn-product-icon-fav "
                          onClick={() => favourite(bookdetails)}
                        >
                          <FavoriteBorder style={{ color: "#FF9B8A" }} />
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "300px" }}
            >
              <CircularProgress style={{ color: "#64dbf2" }} />
            </div>
          )}
          <div className="py-2">
            <div className="pb-2 border-bottom font_size_20 font_bold text-uppercase">
              Review
            </div>
            {review.map((item, i) => {
              console.log(item);
              return (
                <>
                  <div className="d-flex mb-3 pt-3 flex-column ">
                    <div className="font_size_18 font_bold color_gray font_capital">
                      {item.user[0]?.name}
                    </div>
                    <div className="font_size_14 font_regular color_light_gray">
                      Posted on{" "}
                      {moment(item.createdAt).format("DD / MM / YYYY")}
                    </div>
                  </div>
                  <div className="border-bottom pb-3">
                    <div className="d-flex">
                      <p className="mr-3 font_size_18 font_bold color_gray">
                        Rating
                      </p>
                      <p className="mx-3">
                        {item.feedback_rating === 1 ? (
                          <>
                            <AiFillStar color="#FFBA68" className="mx-1" />
                            <AiOutlineStar color="#FFBA68" className="mx-1" />
                            <AiOutlineStar color="#FFBA68" className="mx-1" />
                            <AiOutlineStar color="#FFBA68" className="mx-1" />
                            <AiOutlineStar color="#FFBA68" className="mx-1" />
                          </>
                        ) : item.feedback_rating === 2 ? (
                          <>
                            <AiFillStar color="#FFBA68" className="mx-1" />
                            <AiFillStar color="#FFBA68" className="mx-1" />
                            <AiOutlineStar color="#FFBA68" className="mx-1" />
                            <AiOutlineStar color="#FFBA68" className="mx-1" />
                            <AiOutlineStar color="#FFBA68" className="mx-1" />
                          </>
                        ) : item.feedback_rating === 3 ? (
                          <>
                            <AiFillStar color="#FFBA68" className="mx-1" />
                            <AiFillStar color="#FFBA68" className="mx-1" />
                            <AiFillStar color="#FFBA68" className="mx-1" />
                            <AiOutlineStar color="#FFBA68" className="mx-1" />
                            <AiOutlineStar color="#FFBA68" className="mx-1" />
                          </>
                        ) : item.feedback_rating === 4 ? (
                          <>
                            <AiFillStar color="#FFBA68" className="mx-1" />
                            <AiFillStar color="#FFBA68" className="mx-1" />
                            <AiFillStar color="#FFBA68" className="mx-1" />
                            <AiFillStar color="#FFBA68" className="mx-1" />
                            <AiOutlineStar color="#FFBA68" className="mx-1" />
                          </>
                        ) : item.feedback_rating === 5 ? (
                          <>
                            <AiFillStar color="#FFBA68" className="mx-1" />
                            <AiFillStar color="#FFBA68" className="mx-1" />
                            <AiFillStar color="#FFBA68" className="mx-1" />
                            <AiFillStar color="#FFBA68" className="mx-1" />
                            <AiFillStar color="#FFBA68" className="mx-1" />
                          </>
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
                    <p>{item?.comment || ""}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        {/* <div className="rounded box_shadow">
        <div className="p-4 border-bottom d-flex justify-content-between" >
          <h3 className='textBlackfz26midium'>Recommended Books</h3>
          <div className="col-md-3 text-end">
                  <button className="px-3 py-2 viewAllBtn rounded border-none">
                    View All
                  </button>
                </div>
        </div>
        <div className="p-4 row">
        <Book_Details_2 data={recommendBook} />
        </div>
        </div> */}
        {/* <div style={{ position: "relative", height: "100%" }}>
      <ReactEpubViewer 
        url={Bucket + epubs}
        ref={viewerRef}
      />
    </div> */}
      </div>
    </div>
  );
};

export default View_Book;
