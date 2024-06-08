import React from "react";

const Live_Video = ({ setModal, modal, token }) => {
  return (
    <div>
      <div className="my-5 d-flex justify-content-center pb-3">
        <div className="col-md-6">
          <h3 className="font_size_28 font_medium text-center color_gray py-3">
            Roop Schedule Timeslot
          </h3>
          <div className="d-flex justify-content-between pb-4">
            <input
              type="date"
              className="border-none box_shadow rounded px-2 py-2 mx-1"
            />
            <select
              name="main_categoryId"
              // onChange={(e) => handleonChange(e)}
              // value={homeData.main_categoryId}
              className="border-none box_shadow rounded px-2 py-2 mx-1"
              aria-label="Default select example"
            >
              <option value="" selected>
                Select Timeslot
              </option>

              <option>09:00 AM to 12:00 PM</option>
              <option>12:00 PM to 03:00 PM</option>
              <option>03:00 AM to 06:00 PM</option>
            </select>
            {/* <input
              type="date"
              className="border-none box_shadow rounded px-2 py-2 mx-1"
            /> */}
          </div>
          <div className="text-center">
            <button
              className="Btn rounded border-none linear_gradient py-2"
              onClick={() => setModal(!modal)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live_Video;
