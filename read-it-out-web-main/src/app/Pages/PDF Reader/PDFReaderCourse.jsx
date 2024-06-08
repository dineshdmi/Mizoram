import React, { useEffect, useState } from "react";
// import Loader from "./Loader";
import { Document, Page, pdfjs } from "react-pdf";
import ControlPanel from "./ControlPanel";
import queryString from "query-string";
import { Bucket } from "../../helpers/API/ApiData";
import { RiCloseCircleFill } from "react-icons/ri";
import { useHistory } from "react-router-dom";
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
const PDFReaderCourse = (props) => {
  console.log(props);
  const history = useHistory();
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }
  useEffect(() => {
    // console.log(props.loactio);
  }, [props]);
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
              history.push("/training");
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
          file={Bucket + props.location.state.pdf}
        />
        <Document
          file={Bucket + props.location.state.pdf}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </section>
      {/* <PDFViewer children={Bucket + props.location.state}></PDFViewer> */}
    </div>
  );
};

export default PDFReaderCourse;
