import { ApiPost, Bucket } from "app/helpers/API/ApiData";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { IoCartOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import imgs4 from "../../media/img/books.png";
import * as userUtil from "../../utils/user.util";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Book_Card = ({ book, callhomepage }) => {
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
          callhomepage();
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
  return (
    <div>
      <Card className="border_gray shadow-none hoverCard cursor-pointer">
        <div className="BgGrey position-relative" style={{ height: "270px" }}>
          {/* <div className="position-relative"> */}
          <div className="position-absolute imgAbsolute">
            <img
              src={Bucket + book?.image}
              alt=""
              className=" box_shadow4"
              width={"195px"}
              height={"275px"}
            />
          </div>
          {/* </div> */}
        </div>
        <Card.Body className="pt-60">
          <div className="d-flex justify-content-between py-1">
            <h6 className="responsivEllipsisOne text-start">{book?.title}</h6>
            <p>{parseFloat(book?.feedback_rating).toFixed(1)}</p>
          </div>
          <div className="color_light_gray font_size_18 text-start font_bold py-1">
            {book?.author}
          </div>
          <div className="d-flex justify-content-between">
            {book?.cost === 0 ? (
              <div className="color_blue font_size_20 text-start font_bold py-1">
                Free
              </div>
            ) : (
              <div className="color_blue font_size_20 text-start font_bold py-1">
                {book?.cost}
                <span className="color_light_gray line_through"> $35.00</span>
              </div>
            )}
            <div className="text-start py-1">
              {/* <button className="border-0 rounded-circle p-2 bg_blue">
              <IoCartOutline fontSize={25} color={"white"} />
            </button> */}
              <button
                className="border_gray rounded-circle p-2 bg-transparent"
                onClick={() => favourite(book)}
              >
                {token && book.isFavorite === true ? (
                  <IoHeart fontSize={25} color="red" />
                ) : (
                  <IoHeartOutline fontSize={25} />
                )}
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Book_Card;
