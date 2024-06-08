import React, { useState } from "react";
import img1 from "../../media/img/1.png";
import img2 from "../../media/img/2.png";
import img3 from "../../media/img/3.png";
import img4 from "../../media/img/4.png";
import { Link, useHistory } from "react-router-dom";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import * as userUtil from "../../utils/user.util";
import { toast, ToastContainer } from "react-toastify";
import {
  ApiDelete,
  ApiGetNoAuth,
  ApiGet,
  ApiPostNoAuth,
  Bucket,
  ApiPost,
} from "../../helpers/API/ApiData";
import likeRed from "../../media/likeRed.png";
import { replace } from "lodash";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import No_Book from "../No Book Available/No_Book";
const Book_Details_2 = (props) => {
  let { data, isLoading } = props;
  const token = userUtil.getUserInfo();
  console.log(data);
  const history = useHistory();

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
  
  const routes = (v) => {
    if (token === undefined) {
      history.push("/signIn");
    } else {
      history.push("/viewBook?id=" + v);
    }
  };

  return (
    <div>
      <div className="row py-3">
        {data?.length > 0 ? (
          data.map((book) => {
            return (
              <div key={book._id} className="col-md-6 col-xxl-3 col-lg-3 py-3 d-flex">
                <div className="images">
                  <p className="imgThumb1">
                    <img
                      src={
                        book?.image
                          ? Bucket + book.image
                          : "https://sciendo.com/product-not-found.png"
                      }
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src =
                          "https://sciendo.com/product-not-found.png";
                      }}
                      className="img-responsive rounded  width120"
                      height="200px"
                    />
                    <span className="navHover">
                      <button
                        className="px-3 py-2 border-none rounded linear_gradient w-100 text-white"
                        onClick={() => routes(book._id)}
                      >
                        View Book
                      </button>
                    </span>
                  </p>
                </div>
                <div className="p-2 d-flex flex-column justify-content-between w-50">
                  <div className="">
                    <h3
                      className="font_size_16 font_bold color_gray mb-1 responsivEllipsis"
                      role="button"
                      onClick={() => routes(book._id)}
                    >
                      {book.title}
                    </h3>
                    {/* <div className="textNormal14 mb-1  responsivEllipsis2">
                      {book.author}
                    </div> */}
                    <div className="d-flex justify-content-between">
                      <div className="d-flex ">
                        {/* {book.isFree === true && (
                          <p className="font_size_14 font_medium color_light_gray text-decoration-line-through mr-1">
                            $ 125
                          </p>
                        )} */}

                        <p className="font_size_14 font_medium color_blue">
                          {book.isFree === true ? "FREE" : "$" + book.cost}
                        </p>
                      </div>
                    </div>
                    {/* <div className="Greentextfz16 py-1">{book.cost}</div> */}
                  </div>
                  <div className="pb-2">
                    <div className="">
                      {token ? (
                        <>
                          {book.isFavorite === true ? (
                            <a
                              className="likes"
                              onClick={() => favourite(book)}
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
                              onClick={() => favourite(book)}
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
                            onClick={() => favourite(book)}
                          >
                            <FavoriteBorder style={{ color: "#FF9B8A" }} />
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <No_Book />
        )}
      </div>
    </div>
  );
};

export default Book_Details_2;
