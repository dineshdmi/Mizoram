import React from "react";
import img1 from "../../media/img/1.png";
import img2 from "../../media/img/2.png";
import img3 from "../../media/img/3.png";
import img4 from "../../media/img/4.png";
import cartBlue from "../../media/cartBlue.png";
import dummyBook from "../../media/dummyBook.png";
import {
  ApiDelete,
  ApiGetNoAuth,
  ApiGet,
  ApiPostNoAuth,
  Bucket,
} from "../../helpers/API/ApiData";
import likeRed from "../../media/likeRed.png";
const Book_Detail = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div className="row py-3">
        {data.map((book, i) => {
          return (
            <div className="col-md-3 py-3 d-flex">
              <div className="">
                <img
                  src={book.image ? Bucket + book.image : dummyBook}
                  className="img-responsive rounded  width120"
                  alt=""
                  width="200px"
                  height="200px"
                />
              </div>

              <div className="p-2 d-flex flex-column justify-content-between">
                <div className="">
                  <h3 className="BlackText pb-2">{book.title}</h3>
                  <div className="textNormal14 pb-1">{book.author}</div>
                  <div className="tButton3">GHS {book.cost}</div>
                  <div className="Greentextfz16 py-1">{book.price}</div>
                </div>
                <div className="">
                  <img src={cartBlue} alt="" className="pr-2" />
                  <img src={likeRed} alt="" className="mx-2" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Book_Detail;
