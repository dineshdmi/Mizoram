import React, { useEffect, useState } from "react";
import { ApiGet, Bucket } from "../../helpers/API/ApiData";
import img1 from "../../media/img/1.png";
import No_Book from "../No Book Available/No_Book";
const Order_History = () => {
  // const [data, setData] = useState([]);
  const data = [
    {
      book: [
        {
          image: img1,
          title: `Every Book is a new Wonderful Travel`,
          _id: 1,

        }
      ],
      orderType: 0
    },
    {
      book: [
        {
          image: img1,
          title: `Every Book is a new Wonderful Travel`,
          _id: 2,

        }
      ],
      orderType: 1
    },
    {
      book: [
        {
          image: img1,
          title: `Every Book is a new Wonderful Travel`,
          _id: 3,

        }
      ],
      orderType: 2
    },
    {
      book: [
        {
          image: img1,
          title: `Every Book is a new Wonderful Travel`,
          _id: 4,

        }
      ],
      orderType: 0
    },

  ];

  // const getBook = () => {
  //   ApiGet("/order")
  //     .then((res) => {
  //       console.log(res.data.data);
  //       setData(res.data.data);
  //       // setMylibarery(res.data.data[0].myLibrary);
  //       // setreadHistory(res.data.data[0].readHistory);
  //       // setcurrentpage(res.data.data.state.page);
  //       // setpagesize(res.data.data.state.limit);

  //       // setCategory(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       if (err.status == 410) {
  //         // history.push("/postlist");
  //       } else {
  //         // toast.error(err.message);
  //       }
  //     });
  // };
  useEffect(() => {
    // getBook();
  }, []);
  console.log("data.lastIndexOf", data.length);
  return (
    <div className="rounded box_shadow">
      <div className="px-3 py-3 border-bottom d-flex align-items-center justify-content-between">
        <div className="textBlackfz26midium">Order History</div>
      </div>
      <div className="p-3">
        {data.length > 0 ? (
          data.map((item, i) => (
            <div className={`${data.length === i + 1 ? 'border_none' : 'border-bottom'}`}>
              <div className="mx-3 py-3 d-flex ">
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src={
                          item.book[0].image ? Bucket + item.book[0].image : ""
                        }
                        alt=""
                        className="img-fluid rounded "
                      // width="100%"
                      // height="100px"
                      />
                    </div>
                    <div className="col-md-8 d-flex flex-column justify-content-center">
                      <h3 className="font_size_14 font_bold color_black">
                        {item.book[0].title}
                      </h3>
                      <p className="font_size_12 font_regular color_light_gray">
                        Order ID: {item.book[0]._id}
                      </p>
                      {/* <p className="font_size_12 font_regular color_light_gray">
                      Order Placed: {item.date}
                    </p> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-8 d-flex">
                  <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <div className="font_size_12 font_bold color_black">
                      {item.orderType === 0
                        ? "Read Online"
                        : item.orderType === 1
                          ? "Download PDF"
                          : item.orderType === 2
                            ? "Physical Book"
                            : ""}
                    </div>
                  </div>
                  {/* <div className="col-md-4 d-flex align-items-center">
                  <div className="font_size_12 font_bold color_black">
                    {item.des}
                  </div>
                </div> */}
                  <div className="col-md-4 d-flex align-items-center justify-content-center">
                    {item.orderType === 0 ? (
                      <button
                        className={`border-none rounded py-2 bg_light_yellow color_yellow`}
                      >
                        Read Online
                      </button>
                    ) : item.orderType === 1 ? (
                      <button
                        className={`border-none rounded py-2 bg_light_blue color_blue`}
                      >
                        Download PDF
                      </button>
                    ) : item.orderType === 2 ? (
                      <button
                        className={`border-none rounded py-2 bg_light_orange color_orange`}
                      >
                        Physical Book
                      </button>
                    ) : (
                      ""
                    )}
                    {/* // <button className={`border-none rounded py-2 ${item.color}`}>
                  //   {item.name}
                  // </button> */}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <No_Book />
        )}
      </div>
    </div>
  );
};

export default Order_History;
