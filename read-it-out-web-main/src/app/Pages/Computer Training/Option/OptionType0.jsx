import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Bucket } from "../../../helpers/API/ApiData";
import OptionModal from "./OptionModal";
// import microsoftPDF from "https://readitout-storage.s3.eu-central-1.amazonaws.com/microsoftPDF.pdf";

const OptionType0 = ({ submit, disable, download, result, datas, title, setToggler, list, active, options, loader, openReviewModal }) => {
  const [modal, setModal] = useState(false)

  return (
    <>
      {result?.isApprove === false ? (
        <div className="">
          <div className="px-2 py-2 border-bottom font_size_20 font_bold color_blue">
            Result
          </div>
          <div className="px-3 py-3 text-center font_size_18 font_medium color_light_gray">
            Congratulations,
            <br /> You have successfully completed your examination and program
            on “
            <span className="font_size_18 font_bold color_blue">
              {title}
            </span>”, <br />
            your certificate will be sent to you soon.
          </div>
          <div className="pb-4 text-center">
            <button
              className="py-1 text-white  width50 rounded border-none linear_gradient mx-3"
              onClick={() => submit(0)}
            >
              View Training Resources
            </button>
          </div>
        </div>
      ) : result?.score || result?.score === 0 ? (
        <div className="">
          <div className="px-2 py-2 border-bottom font_size_20 font_bold color_blue">
            Result
          </div>
          <div className="px-3 py-5 text-center font_size_22 font_medium color_light_gray">
            {/* Congratulations, You have Successful Complete you test with{" "}
            <span className="font_size_24 font_bold color_blue">
              {result.score}
            </span>{" "} */}
            Congratulations, you have successfully completed your training
            program and passed your examination.
            <div className="row justify-content-center py-4">
              <div className="col-md-9">
                <button
                  disabled={disable}
                  className="btn text-white linear_gradient text-decoration-none text-center border_none rounded py-1 mx-1"
                  onClick={() => download(result)}
                >
                  Download Certificate
                </button>
                {/* </div> */}
                {/* <div className="col-md-4"> */}
                {/* <button
                  className="btn text-white linear_gradient text-decoration-none text-center border_none rounded mx-2 py-1"
                  onClick={() =>
                    microsofPdf(
                      "https://readitout-storage.s3.eu-central-1.amazonaws.com/microsoftPDF.pdf"
                    )
                  }
                >
                  Guide to download Microsoft Certificate
                </button> */}
                {/* </div> */}
                {/* <div className="col-md-4"> */}
                <button
                  className="btn py-1 text-white   rounded border_none linear_gradient mx-1"
                  onClick={() => submit(0)}
                >
                  View Training Resources
                </button>
                {/* {
                  result.isReview &&
                  <button className=" btn py-1 linear_gradient_orange border-0 text-white" onClick={() => openReviewModal(result)}>
                    Submit Your Review
                  </button>
                } */}
              </div>
              <div className="text-center mt-2">
                {
                  !result.isReview &&
                  <button className=" btn py-1 linear_gradient_orange border-0 text-white" onClick={() => openReviewModal(result)}>
                    Submit Your Feedback
                  </button>
                }
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="py-2   ">
          <div className="d-flex px-3 pb-4 w-100 align-items-center justify-content-between border-bottom">
            <h3 className="font_size_20 font_medium color_blue ">
              <span className="font_size_20 font_medium color_gray font_capital">
                you have chosen option as{" "}
              </span>
              Recorded Video Training
            </h3>
            <button className="btn text-white font_bold width50 rounded border-none linear_gradient" onClick={() => setModal(!modal)}>Change Option</button>
          </div>
          <div className="p-3">
            <ul className="font_size_16 font_bold color_light_gray">
              <li>
                Visit the video page and start your self-study progress. While
                you watch you can practice on your PC. You can pause and repeat
                videos multiple times and make sure you have learned and
                practice well.
              </li>
              <li>
                After completeing your self-training go ahead and attempt the
                online exam (30 minutes) at a time that is convenient for you.
              </li>
              <li>
                After the exam is finished, the result will be displayed
                immediately and the certificate will be generated on the fly.
                You can download it at any time and make a color print.
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-center pb-4">
            <button
              className="py-1 text-white font_bold width50 rounded border-none linear_gradient mx-1"
              onClick={() => submit(0)}
            >
              View Training Resources
            </button>
            {/* {accountData[0].isDocument === true && (
                            <button
                              className="py-2 text-white font_bold width50 rounded border-none linear_gradient mx-1"
                              onClick={() =>
                                history.push("/mcqTest?id=" + accountData[0]._id)
                              }
                            >
                              Start Exam
                            </button>
                          )} */}
          </div>
        </div>
      )}
      <Modal
        show={modal}
        centered
        // onHide={() => setModal(!modal)}
        size="xl"
      // aria-labelledby="example-modal-sizes-title-lg"
      >
        <OptionModal
          list={list}
          modal={modal}
          setModal={setModal}
          active={active}
          options={options}
          loader={loader}
        />
      </Modal>
    </>
  );
};

export default OptionType0;
