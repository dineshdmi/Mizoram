import React from "react";
import { Link, useHistory } from "react-router-dom";
import cartBlue from "../../media/cartBlue.png";
import likeRed from "../../media/likeRed.png";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import ShowMoreText from "react-show-more-text";
import * as userUtil from "../../utils/user.util";
import { toast, ToastContainer } from "react-toastify";
// import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import {
  ApiDelete,
  ApiGetNoAuth,
  ApiGet,
  ApiPostNoAuth,
  Bucket,
  ApiPost,
} from "../../helpers/API/ApiData";
import No_Book from "../No Book Available/No_Book";
const Book_List = ({ data }) => {
  const token = userUtil.getUserInfo();
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

  const executeOnClick = (isExpanded) => {
    console.log(isExpanded);
  };
  return (
    <div>
      {data.length > 0 ? (
        data.map((book) => {
          return (
            <div key={book._id} className="d-flex py-3">
              <div className="">
                <div className=" images">
                  <p className="imgThumb">
                    <img
                      src={Bucket + book.image}
                      alt=""
                      className="img-responsive rounded"
                      height="300px"
                      width="220px"
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
              </div>
              <div className="px-2">
                <div className="d-flex flex-column justify-content-between h-100 py-4">
                  <div className="">
                    <h2 className="font_size_22 font_bold color_gray">
                      {book.author}
                    </h2>

                    <p className="py-1 font_size_16 font_bold color_light_gray">
                      <ShowMoreText
                        /* Default options */
                        lines={2}
                        more="Show more"
                        less="Show less"
                        className="content-css"
                        anchorClass="my-anchor-css-class"
                        onClick={executeOnClick}
                        expanded={false}
                        // width={280}
                      >
                        {book.description}
                      </ShowMoreText>
                    </p>
                    <h2 className="font_size_20 font_bold color_blue">
                      {book.cost === 0 ? "FREE" : "GHS" + book.cost}
                    </h2>
                  </div>
                  <div className=" pb-2">
                    {token ? (
                      <>
                        {book.isFavorite === true ? (
                          <a className="likes " onClick={() => favourite(book)}>
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
                            onClick={() => favourite(book)}
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
  );
};

export default Book_List;
