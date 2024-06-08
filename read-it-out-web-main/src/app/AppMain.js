import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  withRouter,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// import Login from "./Auth/Login";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Book from "./Pages/Book/Book";

import Contact from "./Pages/Contact/Contact";
import Login from "./Pages/Auth/Login";
import Footer from "./Components/Footer/Footer";
// import View_Book from "./Pages/Book/View_Book";
import Profile from "./Pages/Profile/Profile";
import Term_Condition from "./Components/Footer/Term_Condition";
import Private_policy from "./Components/Footer/Private_policy";
import About from "./Pages/About/About";
import EPub from "./Pages/EPub/epub";
import Computer_training from "./Pages/Computer Training/Computer_training";
import MCQ_Test from "./Pages/Computer Training/MCQ_Test";
import SignUp from "./Pages/Auth/SignUp";
import PDFReader from "./Pages/PDF Reader/PDFReader";
import PDFReaderPreview from "./Pages/PDF Reader/PDFReaderPreview";
import Forgot from "./Pages/Auth/Forgot";
import PDFReaderCourse from "./Pages/PDF Reader/PDFReaderCourse";
import PDFReaderVideo from "./Pages/PDF Reader/PDFReaderVideo";
import CheckOut from "./Pages/CheckOut/CheckOut";
import EPubAndroid from "./Pages/EPub/EpubAndroid";
import MCQ_Test_Question from "./Pages/Profile/Self Assesment/MCQ_Test_Question";
import Theory_test_question from "./Pages/Profile/Self Assesment/Theory_test_question";
import Invoice from "./Pages/Profile/Self Assesment/Invoice";
import ComponentToPrint from "./Pages/Profile/Self Assesment/ComponentToPrint";
import Landing_Page from "./Pages/Home/Landing_Page";
import Photo_Gallary from "./Pages/Photo gallary/Photo_Gallary";

const View_Book = lazy(() => import("./Pages/Book/View_Book"));
const Main = withRouter(({ location }) => {
  const [Gmodal, setGmodal] = useState(false);
  const [Fmodal, setFmodal] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("userinfo")) {
      const user = JSON.parse(localStorage.getItem("userinfo"));

      if (
        (user?.isEmailVerified === true && user?.isPhoneVerified === false) ||
        (user?.isEmailVerified === false && user?.isPhoneVerified === false)
      ) {
        //
        // setGmodal(true);
        history.push("/signIn");
      }
    }
  }, []);

  // document.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // });
  // document.onkeydown = function (e) {
  //   if (e.keyCode == 123) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
  //     return false;
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("contextmenu", (e) => {
  //     e.preventDefault();
  //   });

  //   return () => {
  //     window.removeEventListener("contextmenu", (e) => {
  //       e.preventDefault();
  //     });
  //   };
  // }, []);

  const loading = () => "Loading...";
  return (
    <div className="mainDiv">
      <div className="">
        {location.pathname !== "/pdf" &&
          location.pathname !== "/mcqTest" &&
          location.pathname !== "/mcq_test_question" &&
          location.pathname !== "/pdfPreview" &&
          location.pathname !== "/epub" && <Navbar />}
        <Switch>
          <Suspense fallback={loading()}>
            {/* <Route exact path="/" component={Home}></Route>
            <Route exact path="/home" component={Home}></Route> */}
            <Route exact path="/" component={Landing_Page}></Route>
            {/* <Route exact path="/home" component={Landing_Page}></Route> */}
            <Route exact path="/signIn">
              <Login flag={Gmodal} Fmodal={Fmodal} />
            </Route>
            <Route exact path="/signUp" component={SignUp}></Route>
            <Route exact path="/book" component={Book}></Route>
            <Route exact path="/training" component={Computer_training}></Route>
            <Route exact path="/mcqTest" component={MCQ_Test}></Route>
            <Route exact path="/about" component={About}></Route>
            <Route exact path="/contact" component={Contact}></Route>
            <Route exact path="/viewBook" component={View_Book}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route exact path="/checkout" component={CheckOut}></Route>
            <Route exact path="/term" component={Term_Condition}></Route>
            <Route exact path="/policy" component={Private_policy}></Route>
            <Route exact path="/epub" component={EPub}></Route>
            <Route exact path="/epub/android" component={EPubAndroid}></Route>
            <Route exact path="/pdf/:id" component={PDFReader}></Route>
            <Route exact path="/coursePDF" component={PDFReaderCourse}></Route>
            <Route exact path="/videoPDF" component={PDFReaderVideo}></Route>
            <Route exact path="/invoice" component={ComponentToPrint}></Route>
            <Route
              exact
              path="/theory_test_question"
              component={Theory_test_question}
            ></Route>
            <Route
              exact
              path="/mcq_test_question"
              component={MCQ_Test_Question}
            ></Route>
            <Route
              exact
              path="/pdfPreview"
              component={PDFReaderPreview}
            ></Route>
            <Route exact path="/forgotPassword" component={Forgot}></Route>
            <Route exact path="/photoGallary" component={Photo_Gallary}></Route>
          </Suspense>
        </Switch>
      </div>
      {location.pathname !== "/pdf" &&
        location.pathname !== "/mcqTest" &&
        location.pathname !== "/mcq_test_question" &&
        location.pathname !== "/coursePDF" &&
        location.pathname !== "/pdfPreview" &&
        location.pathname !== "/epub" && <Footer />}
    </div>
  );
});
const AppMain = () => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <div className="">
      <Router>
        <Main />
      </Router>
    </div>
  );
};

export default AppMain;
