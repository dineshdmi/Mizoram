// import React, { useEffect, useRef, useState } from "react";
// // import ePub from 'epubjs';
// import {
//   EpubView, // Underlaying epub-canvas (wrapper for epub.js iframe)
//   EpubViewStyle, // Styles for EpubView, you can pass it to the instance as a style prop for customize it
//   ReactReader, // A simple epub-reader with left/right button and chapter navigation
//   ReactReaderStyle, // Styles for the epub-reader it you need to customize it
// } from "react-reader";
// import ownStyles from "./style";
// import ReactAudioPlayer from "react-audio-player";
// import { Bucket } from "../../helpers/API/ApiData";
// import { Drawer, Slider } from "@material-ui/core";
// import { useHistory } from "react-router-dom";
// import { FaPlay } from "react-icons/fa";
// import queryString from "query-string";
// // import TextToSpeech from 'text-to-speech-js'
// import Speech from "react-speech";

// let location = "chapter07.xhtml";
// const EPub = (props) => {
//   const [count, setCount] = useState(100);
//   const [open, setOpen] = React.useState(false);
//   const [open2, setOpen2] = React.useState(false);
//   const [modal, setModal] = React.useState(false);
//   const [modal2, setModal2] = React.useState(false);
//   const [selections, setSelections] = useState([]);

//   const history = useHistory();
//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };
//   const handleDrawer = () => {
//     setModal(!modal);
//   };
//   const handleDrawer2 = () => {
//     setModal2(!modal2);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };
//   const handleDrawerOpen2 = () => {
//     setOpen2(true);
//   };

//   const handleDrawerClose2 = () => {
//     setOpen2(false);
//   };

//   const onLocationChanged = (e) => {
//     console.log(e);
//     location = e;
//     // localStorage.setItem("epub-location",e)
//     setCount(count + 1);
//   };
//   const [size, setSize] = useState(100);
//   const [margins, setMargin] = useState(100);
//   const [line, setLine] = useState(30);
//   const [Font, setFont] = useState("Roboto");
//   const [flow, setFlow] = useState("paginated");
//   const [spread, setSpread] = useState("auto");
//   const [ePub, setePub] = useState("");

//   const renditionRef = useRef(null);
//   // const changeSize = (newSize) => {
//   //   setSize(newSize);
//   // };
//   const handleSliderChange = (event, newValue) => {
//     console.log(event);
//     console.log(newValue);
//     setSize(newValue);
//   };
//   const handleMarginChange = (event, newValue) => {
//     setMargin(newValue);
//   };
//   const handleLineChange = (event, newValue) => {
//     setLine(newValue);
//   };
//   const handleFont = (event, newValue) => {
//     console.log(newValue);
//     console.log(event.target.value);
//     const { name, value } = event.target;
//     setFont(value);
//   };
//   function valuetext(value) {
//     return `${value}°C`;
//   }
//   useEffect(() => {
//     if (renditionRef.current) {
//       console.log(renditionRef);
//       renditionRef.current.themes.fontSize(`${size}%`);
//     }
//   }, [size]);
//   useEffect(() => {
//     if (renditionRef.current) {
//       renditionRef.current.themes.register("custom", {
//         body: {
//           margin: "10px auto !important",
//           width: `${margins}% !important`,
//         },
//         p: {
//           "line-height": `${line}px !important`,
//         },
//       });
//       renditionRef.current.themes.select("custom");
//     }
//   }, [margins, line]);

//   useEffect(() => {
//     if (renditionRef.current) {
//       console.log(renditionRef.current);
//       function setRenderSelection(cfiRange, contents) {
//         setSelections(
//           selections.concat({
//             text: renditionRef.current.getRange(cfiRange).toString(),
//             cfiRange,
//           })
//         );
//         renditionRef.current.annotations.add(
//           "highlight",
//           cfiRange,
//           {},
//           null,
//           "hl",
//           {
//             fill: "yellow",
//             "fill-opacity": "0.5",
//             "mix-blend-mode": "multiply",
//           }
//         );
//         contents.window.getSelection().removeAllRanges();
//       }
//       renditionRef.current.on("selected", setRenderSelection);
//       return () => {
//         renditionRef.current.off("selected", setRenderSelection);
//       };
//     }
//   }, [setSelections, selections]);

//   useEffect(() => {
//     if (!renditionRef.current) return;

//     const newStyle = {
//       body: {
//         "padding-top": "20px !important",
//         "padding-bottom": "20px !important",
//       },
//       p: {
//         "font-family": `${Font} !important`,
//       },
//     };
//     renditionRef.current.flow(flow);
//     renditionRef.current.spread(spread);
//     if (Font !== "sans-serif") {
//       Object.assign(newStyle.p, {
//         "font-family": `${Font} !important`,
//       });
//     } else if (Font !== "cursive") {
//       Object.assign(newStyle.p, {
//         "font-family": `${Font} !important`,
//       });
//     } else if (Font !== "monospace") {
//       Object.assign(newStyle.p, {
//         "font-family": `${Font} !important`,
//       });
//     } else if (Font !== "fantasy") {
//       Object.assign(newStyle.p, {
//         "font-family": `${Font} !important`,
//       });
//     }

//     if (flow === "scrolled-doc") {
//       // Scroll type
//       Object.assign(newStyle.body, {
//         margin: "auto !important",
//       });
//     } else if (spread === "auto") {
//       // View 2 pages
//       Object.assign(newStyle.body, {});
//     } else {
//       // View 1 page
//       Object.assign(newStyle.body, {});
//     }

//     // renditionRef.current.themes.register("main", viewerDefaultStyles);
//     renditionRef.current.themes.register("default", newStyle);

//     // renditionRef.current.themes.select("main");
//   }, [
//     renditionRef.current,
//     Font,
//     spread,
//     flow,
//     // bookStyle.fontSize,
//     // bookStyle.lineHeight,
//     // bookOption,
//     // onResize
//   ]);

//   useEffect(() => {
//     const value = queryString.parse(window.location.search);
//     console.log(value);
//     setePub(value);
//   }, []);
//   return (
//     <>
//       <div
//         style={{
//           position: "relative",
//           height: "100vh",
//         }}
//         className="myReader"
//       >
//         {/* <ReactAudioPlayer
//           src="my_audio_file.ogg"
//           // autoPlay
//           controls
//         /> */}

//         <div className="possionAbsulate justify-content-around">
//           <button
//             className="btn"
//             onClick={selections.length == 0 && handleDrawerOpen}
//           >
//             Setting
//           </button>

//           <button className="btn mx-2" onClick={handleDrawerOpen2}>
//             HighLight
//           </button>
//           {/* <button
//             className="btn"
//             onClick={() =>
//               history.push({
//                 pathname: "/profile",
//                 // state: props.location.state.id,
//               })
//             }
//           >
//             back
//           </button> */}
//         </div>

//         <div className="displayBlock">
//           <button className="btn" onClick={handleDrawer}>
//             Setting
//           </button>

//           <button className="btn mx-2" onClick={handleDrawer2}>
//             HighLight
//           </button>
//           {/* <button
//             className="btn"
//             onClick={() =>
//               history.push({
//                 pathname: "/profile",
//                 // state: props.location.state.id,
//               })
//             }
//           >
//             back
//           </button> */}
//         </div>

//         <Drawer anchor="right" open={open}>
//           <div className="px-2 py-4 border-bottom d-flex justify-content-between align-items-center ">
//             <h4 className="font_size_18 font_Bold color_blue">Setting</h4>
//             <h4
//               className="font_size_18 font_Bold color_blue pointer"
//               onClick={handleDrawerClose}
//             >
//               X
//             </h4>
//           </div>
//           <div className="p-3">
//             <label htmlFor="" className="label">
//               Font size
//             </label>
//             <div className="mx-4 my-2">
//               <Slider
//                 className=""
//                 max={150}
//                 value={size}
//                 onChange={handleSliderChange}
//                 valueLabelDisplay="auto"
//                 aria-labelledby="range-slider"
//                 getAriaValueText={valuetext}
//               />
//             </div>
//           </div>

//           {/* <div className="p-3">
//             <label htmlFor="" className="label">
//               Margin
//             </label>
//             <div className="mx-4 my-2">
//               <Slider
//                 className=""
//                 max={150}
//                 value={margins}
//                 onChange={handleMarginChange}
//                 valueLabelDisplay="auto"
//                 aria-labelledby="range-slider"
//                 // getAriaValueText={valuetext}
//               />
//             </div>
//           </div> */}
//           <div className="p-3">
//             <label htmlFor="" className="label">
//               Line Height
//             </label>
//             <div className="mx-4 my-2">
//               <Slider
//                 className=""
//                 max={100}
//                 min={30}
//                 value={line}
//                 onChange={handleLineChange}
//                 valueLabelDisplay="auto"
//                 aria-labelledby="range-slider"
//                 // getAriaValueText={valuetext}
//               />
//             </div>
//           </div>
//           <div className="p-3">
//             <label htmlFor="" className="label">
//               Font
//             </label>
//             <div className="mx-4 my-2">
//               <select
//                 className="form-control"
//                 name="fonts"
//                 value={Font.fonts}
//                 onChange={handleFont}
//               >
//                 <option value="">Select Font</option>
//                 <option value="sans-serif">Sans-Serif</option>
//                 <option value="cursive">Cursive</option>
//                 <option value="monospace">Monospace</option>
//                 <option value="fantasy">Fantasy</option>
//               </select>
//             </div>
//           </div>
//         </Drawer>
//         <Drawer anchor="bottom" open={modal}>
//           <div className="px-2 py-4 border-bottom d-flex justify-content-between align-items-center ">
//             <h4 className="font_size_18 font_Bold color_blue">Setting</h4>
//             <h4
//               className="font_size_18 font_Bold color_blue pointer"
//               onClick={() => setModal(!modal)}
//             >
//               X
//             </h4>
//           </div>
//           <div className="p-3">
//             <label htmlFor="" className="label">
//               Font
//             </label>
//             <div className="mx-4 my-2">
//               <select
//                 className="form-control"
//                 name="fonts"
//                 value={Font.fonts}
//                 onChange={handleFont}
//               >
//                 <option value="">Select Font</option>
//                 <option value="sans-serif">Sans-Serif</option>
//                 <option value="cursive">Cursive</option>
//                 <option value="monospace">Monospace</option>
//                 <option value="fantasy">Fantasy</option>
//               </select>
//             </div>
//           </div>
//           <div className="p-3">
//             <label htmlFor="" className="label">
//               Font size
//             </label>
//             <div className="mx-4 my-2">
//               <Slider
//                 className=""
//                 max={150}
//                 value={size}
//                 onChange={handleSliderChange}
//                 valueLabelDisplay="auto"
//                 aria-labelledby="range-slider"
//                 getAriaValueText={valuetext}
//               />
//             </div>
//           </div>

//           {/* <div className="p-3">
//             <label htmlFor="" className="label">
//               Margin
//             </label>
//             <div className="mx-4 my-2">
//               <Slider
//                 className=""
//                 max={150}
//                 value={margins}
//                 onChange={handleMarginChange}
//                 valueLabelDisplay="auto"
//                 aria-labelledby="range-slider"
//                 // getAriaValueText={valuetext}
//               />
//             </div>
//           </div> */}
//           <div className="p-3">
//             <label htmlFor="" className="label">
//               Line Height
//             </label>
//             <div className="mx-4 my-2">
//               <Slider
//                 className=""
//                 max={100}
//                 min={30}
//                 value={line}
//                 onChange={handleLineChange}
//                 valueLabelDisplay="auto"
//                 aria-labelledby="range-slider"
//                 // getAriaValueText={valuetext}
//               />
//             </div>
//           </div>
//         </Drawer>
//         <Drawer anchor="bottom" open={modal2}>
//           <div className="px-2 py-4 border-bottom d-flex justify-content-between align-items-center ">
//             <h4 className="font_size_18 font_Bold color_blue">Highlight</h4>
//             <h4
//               className="font_size_18 font_Bold color_blue pointer"
//               onClick={() => setModal2(!modal2)}
//             >
//               X
//             </h4>
//           </div>
//           <ul className="responsiveUl">
//             {selections.map(({ text, cfiRange }, i) => (
//               <li className="font_size_12 color_light_gray font_bold" key={i}>
//                 {text ? (
//                   text
//                 ) : (
//                   <h4 className="font_size_18 font_Bold color_blue">
//                     Empty Highlight
//                   </h4>
//                 )}{" "}
//                 {/* <button
//                   className=" rounded border-none epubviewAllBtn m-1"
//                   onClick={() => {
//                     console.log("cfiRange", text);
//                     audio(text);
//                   }}
//                 >
//                   Show
//                 </button> */}
//                 <Speech
//                   text={text}
//                   displayText={<FaPlay color="red" />}
//                   textAsButton={true}
//                   // stop={true}
//                   resume={true}
//                   pause={true}
//                   // styles={style}
//                   className="speechButton"
//                 />
//                 <button
//                   className=" rounded border-none epubviewAllBtn m-1"
//                   onClick={() => {
//                     renditionRef.current.annotations.remove(
//                       cfiRange,
//                       "highlight"
//                     );
//                     setSelections(selections.filter((item, j) => j !== i));
//                   }}
//                 >
//                   x
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </Drawer>
//         <Drawer anchor="right" open={open2}>
//           <div className="px-2 py-4 border-bottom d-flex justify-content-between align-items-center ">
//             <h4 className="font_size_18 font_Bold color_blue">Highlight</h4>
//             <h4
//               className="font_size_18 font_Bold color_blue pointer"
//               onClick={handleDrawerClose2}
//             >
//               X
//             </h4>
//           </div>
//           <ul>
//             {selections.map(({ text, cfiRange }, i) => (
//               <li className="font_size_12 color_light_gray font_bold" key={i}>
//                 {text ? (
//                   text
//                 ) : (
//                   <h4 className="font_size_18 font_Bold color_blue">
//                     Empty Highlight
//                   </h4>
//                 )}{" "}
//                 {/* <button
//                   className=" rounded border-none epubviewAllBtn m-1"
//                   onClick={() => {
//                     console.log("cfiRange", text);
//                     audio(text);
//                   }}
//                 >
//                   Show
//                 </button> */}
//                 <Speech
//                   text={text}
//                   displayText={<FaPlay color="red" />}
//                   textAsButton={true}
//                   // stop={true}
//                   resume={true}
//                   pause={true}
//                   // styles={style}
//                   className="speechButton"
//                 />
//                 <button
//                   className=" rounded border-none epubviewAllBtn m-1"
//                   onClick={() => {
//                     renditionRef.current.annotations.remove(
//                       cfiRange,
//                       "highlight"
//                     );
//                     setSelections(selections.filter((item, j) => j !== i));
//                   }}
//                 >
//                   x
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </Drawer>
//         <ReactReader
//           styles={ownStyles}
//           id="reader_"
//           url={Bucket + ePub.id}
//           title={`${ePub.title}`}
//           location={location}
//           locationChanged={onLocationChanged}
//           getRendition={(rendition) => {
//             renditionRef.current = rendition;
//             renditionRef.current.themes.fontSize(`${size}%`);
//             // renditionRef.current.themes.register("custom", {
//             //   body: {
//             //     width: `${margins}% !important`,
//             //   },
//             // });
//             // renditionRef.current.themes.select("custom");
//             renditionRef.current.themes.default({
//               "::selection": {
//                 background: "orange",
//               },
//             });
//             setSelections([]);
//           }}
//         />
//         {/* <div id="area"></div> */}
//       </div>
//       {/* <div
//         style={{
//           position: "absolute",
//           bottom: "1rem",
//           right: "1rem",
//           left: "1rem",
//           textAlign: "center",
//           zIndex: 1,
//         }}
//       >
//         <button onClick={() => changeSize(Math.max(80, margins - 10))}>
//           -
//         </button>
//         <span>Current margins: {margins}%</span>
//         <button onClick={() => changeSize(Math.min(130, margins + 10))}>
//           +
//         </button>
//       </div> */}
//     </>
//   );
// };

// export default EPub;

import React from "react";

import { useEffect } from "react";
import ReactDOM from "react-dom";
import Reader from "containers/Reader";
import queryString from "query-string";

const EPubAndroid = () => {
  const idValue = queryString.parse(window.location.search);
  console.log("data, ", idValue);
  const EPUB_URL = `https://readitout-storage.s3.eu-central-1.amazonaws.com/${idValue.first}`;
  console.log("EPUB_URL", EPUB_URL);
  return <Reader url={EPUB_URL} isSpeech="Android" />;
};

export default EPubAndroid;

// 60d45480d1f4892d14d7b775/pdf/1634964960315.epub
