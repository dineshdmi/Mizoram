import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import img1 from "../../media/img/1.png";
import {
  ApiDelete,
  ApiGetNoAuth,
  ApiGet,
  ApiPost,
  ApiPostNoAuth,
  Bucket,
} from "../../helpers/API/ApiData";
import LinearProgress from "@material-ui/core/LinearProgress";
import No_Book from "../No Book Available/No_Book";
const My_Wishlist = () => {
  const history = useHistory();
  const [progress, setProgress] = useState(10);
  const [Mylibarery, setMylibarery] = useState([]);
  const [readHistory, setreadHistory] = useState([]);
  useEffect(() => {
    const body = {
      myLibrary_limit: 100,
      readHistory_limit: 100,
    };
    ApiPost("/myLibrary", body)
      .then((res) => {
        console.log(res.data.data[0].myLibrary);
        setMylibarery(res.data.data[0].myLibrary);
        console.log("ROOP");
        console.log(res.data.data[0].myLibrary);
        setreadHistory(res.data.data[0].readHistory);
        // setcurrentpage(res.data.data.state.page);
        // setpagesize(res.data.data.state.limit);
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
  }, []);
  return (
    <div className="rounded box_shadow">
      <div className="px-3 py-3 border-bottom d-flex align-items-center justify-content-between">
        <div className="textBlackfz26midium">My Wishlist</div>
      </div>
      <div className="p-3">
        {Mylibarery.length > 0 ? (
          Mylibarery.map((item, i) => {
            console.log("item", item);
            return (
              <div className=" border-bottom">
                <div className="mx-3 py-3 d-flex ">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-3">
                        <img
                          src={Bucket + item.book.image}
                          alt=""
                          className="img-fluid rounded "
                          // width="100%"
                          // height="100px"
                        />
                      </div>
                      <div className="col-md-7 d-flex flex-column py-2 justify-content-between">
                        <div className="">
                          <h3 className="font_size_14 font_bold color_black">
                            {item.book.title}
                          </h3>
                          <p className="font_size_12 font_regular color_yellow">
                            {item.book.author}
                          </p>
                        </div>
                        <p className="font_size_14 font_bold color_blue">
                          {item.book.cost ? "GHS " + item.book.cost : "FREE"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="col-md-6 d-flex align-items-end justify-content-center">
                      {/* <div className="font_size_12 font_bold color_black">
                      {item.book[0].edition}
                    </div> */}
                    </div>
                    <div className="col-md-6 d-flex align-items-end justify-content-center">
                      {/* <button className="px-3 py-2 viewAllBtn rounded border-none">
                      View More
                    </button> */}

                      <button
                        className="px-3 py-2 viewAllBtn rounded border-none"
                        onClick={() =>
                          history.push("/viewBook?id=" + item.book._id)
                        }
                      >
                        View Book
                      </button>
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
export default My_Wishlist;
