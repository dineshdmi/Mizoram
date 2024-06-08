import React from "react";
import { Bucket } from "../../../helpers/API/ApiData";
import microsoftPDF from "../../../pdf/microsoftPDF.pdf";

const OptionType0 = ({ submit, download, result }) => {
  const microsofPdf = (pdf) => {
    var url = pdf;
    var a = document.createElement("a");
    a.href = url;
    a.download = `Microsoft Certificate.pdf`;
    document.body.appendChild(a);
    a.click();
  };
  console.log("result", result);
  return (
    <>
      {result?.isApprove === false && result?.score !== undefined ? (
        <div className="">
          <div className="px-2 py-2 border-bottom font_size_20 font_bold color_blue">
            Result
          </div>
          <div className="px-3 py-5 text-center font_size_22 font_medium color_light_gray">
            You have Successful Complete you test, Certificate will be Provide
            Soon
          </div>
          <div className="pb-4 text-center">
            <button
              className="py-1 text-white  width50 rounded border-none linear_gradient mx-3"
              onClick={() => submit(0)}
            >
              Start Your Training
            </button>
          </div>
        </div>
      ) : result?.score || result?.score === 0 ? (
        <div className="">
          <div className="px-2 py-2 border-bottom font_size_20 font_bold color_blue">
            Result
          </div>
          <div className="px-3 py-5 text-center font_size_22 font_medium color_light_gray">
            Congratulations, You have Successful Complete you test with{" "}
            <span className="font_size_24 font_bold color_blue">
              {result.score}
            </span>{" "}
            scores
            <div className="row justify-content-center py-4">
              <div className="col-md-9">
                <button
                  className="btn text-white linear_gradient text-decoration-none text-center border_none rounded py-1"
                  onClick={() => download(result)}
                >
                  Download Certificate
                </button>
                {/* </div> */}
                {/* <div className="col-md-4"> */}
                <button
                  className="btn text-white linear_gradient text-decoration-none text-center border_none rounded mx-2 py-1"
                  onClick={() => microsofPdf(microsoftPDF)}
                >
                  Guide to download Microsoft Certificate
                </button>
                {/* </div> */}
                {/* <div className="col-md-4"> */}
                <button
                  className="btn py-1 text-white   rounded border_none linear_gradient"
                  onClick={() => submit(0)}
                >
                  Start Your Training
                </button>
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
              Start Your Training
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
    </>
  );
};

export default OptionType0;
