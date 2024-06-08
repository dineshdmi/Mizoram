import React from "react";
import noBook from "../../media/noBook.png";

const No_Book = () => {
  return (
    <div className="row justify-content-center  py-3">
      <div className="col-md-6 d-flex justify-content-center align-items-center">
        <img src={noBook} alt="" className="img-responsive" width="200px" />
        <h3 className="font_size_26 font_bold color_light_gray px-3">
          No Books Available
        </h3>
      </div>
    </div>
  );
};

export default No_Book;
