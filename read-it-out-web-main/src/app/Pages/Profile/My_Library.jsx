import React, { useState, useEffect } from "react";
import img1 from "../../media/img/1.png";
import {
  ApiDelete,
  ApiPost,
  ApiPostNoAuth,
  Bucket,
} from "../../helpers/API/ApiData";
import { toast, ToastContainer } from "react-toastify";
import No_Book from "../No Book Available/No_Book";
import { Link, useHistory } from "react-router-dom";
import * as userUtil from "../../utils/user.util";
import StarRatings from "react-star-ratings";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { Checkbox, CircularProgress } from "@material-ui/core";
import ShowMoreText from "react-show-more-text";
import moment from "moment";
import { Modal } from "react-bootstrap";
import { Pagination } from "@material-ui/lab";
// import { Document, Page, pdfjs } from "react-pdf";
// import ControlPanel from "../PDF Reader/ControlPanel";
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Button } from "react-bootstrap";

const My_Library = ({ props }) => {
  const history = useHistory();
  const [Mylibarery, setMylibarery] = useState([]);
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [readHistory, setreadHistory] = useState([]);
  const token = userUtil.getUserInfo();
  const [bookdetails, setbookdetails] = useState({});
  const [recommendBook, setrecommendBook] = useState([]);
  const [review, setreview] = useState([]);
  const [similarBook, setsimilarBook] = useState([]);
  const [rating, setRating] = useState();
  const [toggle, setToggle] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const [totalpage, settotalpage] = useState(0);
  const [currentpage, setcurrentpage] = useState(1);
  const [pagesize, setpagesize] = useState(12);
  const [numPages, setNumPages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [IDs, setIDs] = useState();
  const [titleName, setTitleName] = useState("");
  const [loading, setLoading] = useState(false);
  const [system, setsystem] = useState("");
  const [searchPdf, setSearchPdf] = useState("");
  const [matchIndex, setMatchIndex] = useState([]);
  const [comment, setComment] = useState("");
  console.log("matchIndex", matchIndex);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  useEffect(() => {
    let Name = "";
    if (navigator.userAgent.indexOf("Win") != -1) Name = "Windows OS";
    if (navigator.userAgent.indexOf("Mac") != -1) Name = "Macintosh";
    if (navigator.userAgent.indexOf("Linux") != -1) Name = "Linux OS";
    if (navigator.userAgent.indexOf("Android") != -1) Name = "Android OS";
    if (navigator.userAgent.indexOf("like Mac") != -1) Name = "iOS";
    console.log("name", Name);

    if (Name == "Windows OS") {
    }
    if (Name == "Android OS") {
      setsystem("android");
    }
    if (Name == "iOS" || Name == "Macintosh") {
    }

    console.log("log from app file for test---------------");
    window.scrollTo(0, 0);
  }, []);

  const onDocumentLoadSuccess = async ({ numPages }) => {
    // console.log(pdf)
    setNumPages(numPages);
    setIsLoading(false);
    // const textContent = await pdf.getPage(1).getTextContent();
    // const text = textContent.items.map((item) => item.str).join(' ');
    // const index = new FlexSearch();
    // index.add(1, text);
    // console.log(textContent,test,index)
    // setSearchIndex(index);
  };
  const customTextRenderer = ({ str, itemIndex }) => {
    console.log(str, itemIndex);
    console.log(searchPdf);
    if (
      str.toLowerCase() == searchPdf.toLowerCase() &&
      searchPdf !== "" &&
      searchPdf !== null
    ) {
      return <mark>{searchPdf}</mark>;
    }
  };
  const pdf1 = (i, j) => {
    console.log(i);
    console.log(j);
    if (token === undefined) {
      history.push({
        pathname: "/signIn",
        state: "in",
      });
    } else {
      console.log(i);
      let body = { id: i, title: j };

      // if (system == "android") {
      //   history.push(`/epub/android?first=${i}`);
      // } else {
      history.push(`/epub?first=${i}`);
      // }

      // window.location.pathname(
      //   `https://development.admin.unicornui.com/epub?first=${i}`
      // );
      // https://development.admin.unicornui.com/epub?first=618e69f83314ee4398fd3bd8/pdf/1637561377278.epub
    }
  };
  const handleDelete = async () => {
    setShow(true);
  };
  const handelconfirme = async () => {
    await ApiDelete("/library/delete/" + data?._id)
      .then((res) => {
        setToggle(false);
        libraryBook(8, 1);
        toast.success("Book Removed From Library");
        setShow(false);
      })
      .catch((err) => console.log("err?.message", err?.message));
  };
  const fetchData = (i) => {
    let body = {
      recommendBook_limit: 4,
      similarBook_limit: 2,
    };
    if (token) {
      ApiPost("/book/detail/" + i, body)
        .then((res) => {
          console.log(res.data.data[0].book[0]);
          setbookdetails(res.data.data[0].book[0]);
          setrecommendBook(res.data.data[0].recommendBook);
          setreview(res.data.data[0].review);
          setsimilarBook(res.data.data[0].similarBook);
          setLoading(true);
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
    } else {
      ApiPostNoAuth("teacher/book/detail/" + i, body)
        .then((res) => {
          console.log(res.data.data);
          setbookdetails(res.data.data[0].book[0]);
          setrecommendBook(res.data.data[0].recommendBook);
          setreview(res.data.data[0].review);
          setsimilarBook(res.data.data[0].similarBook);
          setLoading(true);
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
    }
  };

  const handleRating = (newRating, name) => {
    console.log(newRating);
    console.log(name);
    setRating(newRating);
    // setRating((preCheck) => ({
    //   ...preCheck,
    //   [name]: checked,
    // }));
  };

  const ratting = () => {
    const body = {
      bookId: bookdetails._id,
      feedback_rating: rating,
      comment,
    };
    console.log(body);
    ApiPost("/feedback/add", body)
      .then(async (res) => {
        console.log(res);
        fetchData(bookdetails._id);
        toast.success("Review successfully added");
        setRating();
        setComment("");
      })
      .catch((err) => {
        if (err?.status == 410) {
          // refreshtoken();
        } else {
          // toast.error(err?.message); 

          if (comment === "") {
            toast.error("Comment is required");
          } else {
            toast.error("Rating is required");
          }
        }
      });
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
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          if (err?.status == 410) {
            // refreshtoken();
          } else {
            toast.error(err?.message);
          }
        });
    }
  };

  const libraryBook = async (limit, page) => {
    const body = {
      limit,
      page,
    };

    await ApiPost("/library/books", body)
      .then((res) => {
        console.log(res.data.data.read_books);
        setMylibarery(res.data.data.read_books);
        setreadHistory(res.data.data.readHistory);
        settotalpage(res.data.data.state.page_limit);
        setcurrentpage(res.data.data.state.page);
        setpagesize(res.data.data.state.limit);
        setLoading(true);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err); 
        if (err.status == 410) {
          // history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
  };

  useEffect(() => {
    libraryBook(8, 1);
  }, []);

  const readBook = (e) => {
    fetchData(e.book._id);
    console.log(e);
    setLoading(false);
    // setbookdetails(e.book[0]);
    setData(e);
    setToggle(true);
  };
  const executeOnClick = (isExpanded) => {
    console.log(isExpanded);
  };

  const pdfReader = (v, title) => {
    console.log(v);
    setModal(!modal);
    setIDs(v);
    setTitleName(title);
    // window.location.reload();
  };

  const handleChange = (e, i) => {
    console.log(i);
    libraryBook(pagesize, i);
  };

  return (
    <div className="rounded box_shadow">
      <ToastContainer position="top-right" />
      <div>
        {toggle ? (
          loading === true ? (
            <div className="rounded box_shadow p-4 mb-4">
              <div
                className="d-flex justify-content-end font_bold color_gray pointer font_size_20 margin"
                onClick={() => setToggle(!toggle)}
              >
                X
              </div>
              <div className="d-flex flexColumn">
                <div className="flex20">
                  <div className="paddingX20Y10_R">
                    <img
                      width="210px"
                      src={bookdetails.image ? Bucket + bookdetails.image : ""}
                      alt=""
                      className="rounded"
                    />
                  </div>
                  {/* <div className="d-flex py-2">
              <div className="col-md-3 text-center">
                <img src={img1} alt="" className="rounded" width="50px" />
              </div>
              <div className="col-md-3 text-center">
                <img src={img1} alt="" className="rounded" width="50px" />
              </div>
              <div className="col-md-3 text-center">
                <img src={img1} alt="" className="rounded" width="50px" />
              </div>
              <div className="col-md-3 text-center">
                <img src={img1} alt="" className="rounded" width="50px" />
              </div>
            </div> */}
                </div>
                <div className="flex80 d-flex flex-column justify-content-between paddingX20Y10">
                  <div className="">
                    <div className="pb-2 border-bottom">
                      <div className="d-flex pb-2 justify-content-between align-items-center">
                        <h3 className="font_size_22 font_bold color_gray">
                          {bookdetails.title}
                        </h3>
                        {/* <p className="textfz20Red">In Stock</p> */}
                      </div>
                      {/* <div className="d-flex pb-2 justify-content-between">
                  <h5 className="text-uppercase textfz24Blue">
                    {bookdetails.isFree ? "Free" : "Paid"}
                  </h5>
                </div> */}
                      {/* <div className="d-flex pb-2 justify-content-between">
                  <div className="font_size_16 font_bold color_light_gray">
                    {bookdetails.isFree ? "" : "GHS" + bookdetails.cost}
                  </div>
                </div> */}
                    </div>
                    <div className="d-flex py-1">
                      <div className="col-md-3">
                        <h5 className="font_size_18 color_blue">Category</h5>
                      </div>
                      <div className="col-md-9">
                        <h5 className="font_size_14 color_light_gray ">
                          {bookdetails.main_category &&
                            bookdetails?.main_category[0] &&
                            bookdetails?.main_category[0].name}
                        </h5>
                      </div>
                    </div>
                    <div className="d-flex py-1">
                      <div className="col-md-3">
                        <h5 className="font_size_18 color_blue">Genre</h5>
                      </div>
                      <div className="col-md-9">
                        <h5 className="font_size_14 color_light_gray">
                          {bookdetails.genre &&
                            bookdetails?.genre[0] &&
                            bookdetails?.genre[0].name}
                        </h5>
                      </div>
                    </div>
                    <div className="py-2 d-flex ">
                      {/* <ShowMoreText
                 
                  lines={1}
                  more="Show more"
                  less="Show less"
                  className="content-css"
                  anchorClass="my-anchor-css-class"
                  onClick={executeOnClick}
                  expanded={false}
                 
                >
                  {bookdetails.description}
                </ShowMoreText> */}

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
                                  <FavoriteBorder
                                    style={{ color: "#FF9B8A" }}
                                  />
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
                                  <FavoriteBorder
                                    style={{ color: "#FF9B8A" }}
                                  />
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
                  <div className="py-2 d-flex align-items-center">
                    {bookdetails.pdf ? (
                      <a
                        // href={`${Bucket}${bookdetails?.pdf}`}
                        target="_blank"
                        className="py-2 viewAllBtn border-none rounded text-center text-decoration-none"
                        onClick={() => {
                          pdfReader(bookdetails?.pdf, bookdetails?.title);
                        }}
                      >
                        Read PDF
                      </a>
                    ) : (
                      ""
                    )}
                    {bookdetails.ePub ? (
                      <a
                        // href={`https://development.admin.unicornui.com/epub?first=${bookdetails.ePub}`}
                        className="py-2 viewAllBtn border-none rounded mx-2 text-center text-decoration-none pointer"
                        onClick={() =>
                          pdf1(bookdetails.ePub, bookdetails.title)
                        }
                      >
                        View ePub
                      </a>
                    ) : (
                      ""
                    )}
                    {bookdetails.audio ? (
                      <a
                        // target="_blank"
                        // download={false}
                        // href={Bucket + bookdetails.audio}
                        className="py-2 viewAllBtn border-none rounded mx-2 text-center text-decoration-none pointer"
                        onClick={() => setAudioOpen(!audioOpen)}
                      >
                        Listen MP3
                      </a>
                    ) : (
                      ""
                    )}
                    {bookdetails.video &&
                      !bookdetails.video.includes("undefined") ? (
                      <a
                        // target="_blank"
                        // href={Bucket + bookdetails.video}
                        className="py-2 viewAllBtn border-none rounded mx-2 text-center text-decoration-none pointer"
                        onClick={() => setVideoOpen(!videoOpen)}
                      >
                        View Video
                      </a>
                    ) : (
                      ""
                    )}
                    <button
                      className="btn-outline-danger btn"
                      onClick={handleDelete}
                    >
                      Remove from Library
                    </button>
                  </div>
                  {/* <div className="py-2 font_size_18 font_midium">Share</div>
            <div className="">
              <img src={fbR} alt="" className="marginRigh10 imgWidht" />
              <img src={twitterR} alt="" className="marginRigh10 imgWidht" />
              <img src={linkdinR} alt="" className="marginRigh10 imgWidht" />
              <img src={youtubeR} alt="" className="marginRigh10 imgWidht" />
            </div> */}
                </div>
              </div>
              <div className="py-2 paddingX20Y10_R">
                <div className="pb-2 border-bottom font_size_20 font_bold text-uppercase">
                  Review
                </div>
                {review?.map((item, i) => {
                  console.log("item", item);
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
                                <AiOutlineStar
                                  color="#FFBA68"
                                  className="mx-1"
                                />
                                <AiOutlineStar
                                  color="#FFBA68"
                                  className="mx-1"
                                />
                                <AiOutlineStar
                                  color="#FFBA68"
                                  className="mx-1"
                                />
                                <AiOutlineStar
                                  color="#FFBA68"
                                  className="mx-1"
                                />
                              </>
                            ) : item.feedback_rating === 2 ? (
                              <>
                                <AiFillStar color="#FFBA68" className="mx-1" />
                                <AiFillStar color="#FFBA68" className="mx-1" />
                                <AiOutlineStar
                                  color="#FFBA68"
                                  className="mx-1"
                                />
                                <AiOutlineStar
                                  color="#FFBA68"
                                  className="mx-1"
                                />
                                <AiOutlineStar
                                  color="#FFBA68"
                                  className="mx-1"
                                />
                              </>
                            ) : item.feedback_rating === 3 ? (
                              <>
                                <AiFillStar color="#FFBA68" className="mx-1" />
                                <AiFillStar color="#FFBA68" className="mx-1" />
                                <AiFillStar color="#FFBA68" className="mx-1" />
                                <AiOutlineStar
                                  color="#FFBA68"
                                  className="mx-1"
                                />
                                <AiOutlineStar
                                  color="#FFBA68"
                                  className="mx-1"
                                />
                              </>
                            ) : item.feedback_rating === 4 ? (
                              <>
                                <AiFillStar color="#FFBA68" className="mx-1" />
                                <AiFillStar color="#FFBA68" className="mx-1" />
                                <AiFillStar color="#FFBA68" className="mx-1" />
                                <AiFillStar color="#FFBA68" className="mx-1" />
                                <AiOutlineStar
                                  color="#FFBA68"
                                  className="mx-1"
                                />
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

                <div className="pt-3">
                  <h3 className="font_size_26 font_bold">You're Reviewing: </h3>
                  <div className="d-flex py-2">
                    <p className="mr-3 font_size_18 font_bold color_gray">
                      Rating
                    </p>
                    <p className="mx-3">
                      <StarRatings
                        rating={rating}
                        starHoverColor="#FFBA68"
                        starSpacing="4px"
                        starRatedColor="#FFBA68"
                        changeRating={handleRating}
                        numberOfStars={5}
                        name="rating"
                      />
                    </p>
                  </div>
                  <div className="py-1">
                    <textarea
                      className="form-control comment"
                      name=""
                      rows="3"
                      placeholder="Add comment here"
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3 pt-4">
                    <button
                      className="px-2 py-2 rounded linear_gradient border-none text-white"
                      onClick={ratting}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "500px" }}
            >
              <CircularProgress style={{ color: "#64dbf2" }} />
            </div>
          )
        ) : loading === true ? (
          <>
            <div className="px-3 py-3 border-bottom d-flex align-items-center justify-content-between">
              <div className="textBlackfz26midium">My library</div>
            </div>
            <div className="px-2 py-3 row">
              {Mylibarery?.length > 0 ? (
                Mylibarery.map((book, i) => {
                  return (
                    <>
                      <div className="col-md-3 px-2 my-2">
                        <div
                          className="row p-2 rounded bg_light_blue pointer"
                          onClick={() => readBook(book)}
                        >
                          <div className="col-md-5 p-0">
                            <img
                              src={
                                book.book.image ? Bucket + book.book.image : ""
                              }
                              alt=""
                              className="img-responsive rounded "
                              width="100%"
                              height="100%"
                            />
                          </div>
                          <div className="col-md-7 p-0">
                            <div className="p-2">
                              <h5 className="font_size_14 font_bold color_blue responsivEllipsis">
                                {book.book.title}
                              </h5>
                              <div className="mt-2">
                                {/* <button
                          className="font_size_12 font_bold text-white border-none linear_gradient rounded my-1 py-1 "
                          onClick={() => history.push("/checkout")}
                        >
                          Buy Book
                        </button> */}
                                {/* <button
                          className="font_size_12 font_bold text-white border-none linear_gradient rounded  my-1 py-1"
                          onClick={() =>
                            pdf(book.book[0].ePub, book.book[0].title)
                          }
                        >
                          Read Book
                        </button> */}
                              </div>
                              {/* <p className='font_size_12 font_regular color_light_gray'>Bill Emia</p>
                  <p className='font_size_10 font_regular color_light_black'>Novel</p>
                  <p>@@@@</p> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <No_Book />
              )}
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
          </>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "300px" }}
          >
            <CircularProgress style={{ color: "#64dbf2" }} />
          </div>
        )}
        <Modal
          show={videoOpen}
          centered
          //  onHide={() => setOpen(!open)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Body>
            <div className="d-flex justify-content-between font_size_20 font_bold color_light_gray">
              {bookdetails?.title}
              <span
                className="text-center font_size_20 font_bold color_light_gray pointer"
                onClick={() => setVideoOpen(!videoOpen)}
              >
                X
              </span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <video
              width="467px"
              style={{ borderRadius: "7px" }}
              controls
              controlsList="nodownload"
            >
              <source src={Bucket + bookdetails.video} type="video/mp4" />
            </video>
            {/* <iframe
            src={Bucket + bookdetails.video}
            allowFullScreen
            frameborder="0"
          ></iframe> */}
          </Modal.Footer>
        </Modal>

        <Modal
          show={audioOpen}
          centered
          //  onHide={() => setOpen(!open)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Body>
            <div className="d-flex justify-content-between font_size_20 font_bold color_light_gray">
              {bookdetails?.title}
              <span
                className="text-center font_size_20 font_bold color_light_gray pointer"
                onClick={() => setAudioOpen(!audioOpen)}
              >
                X
              </span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <audio
              style={{ width: "467px" }}
              controls
              controlsList="nodownload"
            >
              <source src={Bucket + bookdetails.audio} type="audio/mp3" />
            </audio>
            {/* <iframe
            src={Bucket + bookdetails.video}
            allowFullScreen
            frameborder="0"
          ></iframe> */}
          </Modal.Footer>
        </Modal>

        <Modal
          show={modal}
          centered
          // onHide={() => setModal(!modal)}
          backdrop="static"
          size="xl"
        // aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton onClick={() => setModal(!modal)}>
            <Modal.Title
              id="contained-modal-title-vcenter "
              className="color_blue font_size_20"
            >
              {titleName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <section
              id="pdf-section"
              className="d-flex flex-column align-items-center w-100 bg_gray paddingBottom45 position-relative"
            >
              {/* <ControlPanel
                scale={scale}
                setScale={setScale}
                numPages={numPages}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                file={Bucket + IDs}
                setSearchPdf={setSearchPdf}
              />
              <Document
                file={Bucket + IDs}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  customTextRenderer={customTextRenderer}
                >
                </Page>
              </Document> */}
              <div className="w-100 position-relative">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                  <div style={{ height: "720px" }}>
                    <Viewer
                      fileUrl={Bucket + IDs}
                      defaultScale={1}
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  </div>
                </Worker>
              </div>
            </section>
          </Modal.Body>
        </Modal>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          centered
          className="text-white"
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure, do you want to remove book from library ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShow(false)}>
              No
            </Button>
            <Button variant="secondary" onClick={handelconfirme}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default My_Library;
