import React, { useEffect, useState } from "react";
// import Loader from "./Loader";
import { Document, Page, pdfjs } from "react-pdf";
import ControlPanel from "./ControlPanel";
import { ApiPost, ApiPostNoAuth, Bucket } from "../../helpers/API/ApiData";
import { RiCloseCircleFill } from "react-icons/ri";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   PDFViewer,
//   ReactPDF,
//   Link,
// } from "@react-pdf/renderer";

// Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });
const PDFReader = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [bookdetails, setbookdetails] = useState([]);
  console.log("idsss", id);
  const token = localStorage.getItem("token");
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }
  const fetchData = (i) => {
    let body = {
      recommendBook_limit: 4,
      similarBook_limit: 2,
    };
    if (token) {
      ApiPost("/book/detail/" + id, body)
        .then((res) => {
          console.log(res.data.data[0].book[0]);
          setbookdetails(res.data.data[0].book[0]);
        })
        .catch((err) => {
          console.log(err);
          if (err.status == 410) {
            history.push("/postlist");
          } else {
            toast.error(err.message);
          }
        });
    } else {
      ApiPostNoAuth("teacher/book/detail/" + id, body)
        .then((res) => {
          console.log(res.data.data);
          setbookdetails(res.data.data[0].book[0]);
        })
        .catch((err) => {
          console.log(err);
          if (err.status == 410) {
            history.push("/postlist");
          } else {
            toast.error(err.message);
          }
        });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const close = () => {};
  return (
    <div>
      {/* <Loader isLoading={isLoading} /> */}
      <section
        id="pdf-section"
        className="d-flex flex-column align-items-center w-100 bg_gray paddingBottom45 position-relative"
      >
        <div className="position-absolute top-0 end-0 m-3" onCLick={close}>
          <RiCloseCircleFill
            color="#00bde2"
            fontSize={30}
            className="pointer"
            onClick={() => {
              history.push("/profile");
              // window.location.reload();
            }}
          />
        </div>
        <ControlPanel
          scale={scale}
          setScale={setScale}
          numPages={numPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          file={Bucket + bookdetails?.pdf}
        />
        <Document
          file={Bucket + bookdetails?.pdf}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </section>
      {/* <PDFViewer children={Bucket + props.location.state}></PDFViewer> */}
    </div>
  );
};

export default PDFReader;
