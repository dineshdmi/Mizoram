import React, { useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { NavMenu, NavBtn } from "./NavbarStyle";
import { GiHamburgerMenu } from "react-icons/gi";
import { Avatar, IconButton } from "@material-ui/core";
import logo2 from "../../media/icons/readitoutLogo.png";
import img1 from "../../media/img/window.png";
import { ApiGet, BaseURL, Bucket } from "../../helpers/API/ApiData";
import { Collapse } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, loginUser } from "app/store/action/action";
import axios from "axios";
// import AjadiImg from "../../../../public/assets/media/Azadi.jpg" 

const Navbar = (props) => {
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleButton = () => setIsOpen(!isOpen);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUtilJSON = localStorage.getItem("userinfo");
  const userUtil = JSON.parse(userUtilJSON);
  const userUtilJSON1 = sessionStorage.getItem("userUtil");
  const userUtil1 = JSON.parse(userUtilJSON1);
  // Now, userUtil contains the data that was stored
  console.log(userUtil?.name);

  const [names, setName] = useState("");
  const [data, setData] = useState({});
  const [images, setImage] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  let a = localStorage.getItem("token");
  let Id = a,
    users;
  // if (a) {
  //   Id = JSON.parse(a);
  // }
  let b = localStorage.getItem("userinfo");
  if (b) {
    users = JSON.parse(b);
  }
  //
  useEffect(() => {
    axios
      .get(BaseURL + "teacher/count")
      .then((res) => setData({ ...data, visitors: res?.data?.data }));
    ApiGet("/checkUser").then((res) => {
      if (res?.data?.status === 205) {
        history.push("/signIn");
        localStorage.clear();
      }
    });
  }, []);

  const logoutcall = () => {
    console.log("remiove");

    localStorage.clear();
    sessionStorage.clear();
    history.push("/");
    window.location.reload();
  };
  const downloadFile = () => {
    window.location.href =
      "https://katechnologiesgh.s3.eu-central-1.amazonaws.com/ebook.exe";
  };
  useEffect(() => {
    if (history.location.pathname === "/mcqTest") {
      setToggle(true);
      // setCount(count + 1);
    }
  }, [toggle]);

  return (
    <>
      <div className=" bg-white top-0 w-100 " id="myHeader">
        <div className="navbarTop row">
          <div className="py-3 row h-fit text-center col-sm-4">
            <div className="col-md-6 text-center">
              <img src="/assets/media/nirbhar.png" alt="nirbhar" width={105} />
            </div>
            {/* <div className="col-md-6 text-md-start text-sm-center">
              <img src="/assets/media/ajadi.png" alt="ajadi" width={140} />
            </div> */}
          </div>
          <div className="py-3 row text-center col-sm-4">
            {/* <div className="col-md-8 text-center">
              <img src="/assets/media/MinHUA.png" alt="MinHUA" width={240} />
            </div> */}
            <div className="col-md-12">
              <a href="https://aizawlsmartcity.mizoram.gov.in/" target="_blank">
                <img
                  src="/assets/media/aizawl-smart-city.png"
                  alt="aizawl-smart-city"
                  width={108}
                />
              </a>
            </div>
          </div>
          <div className="text-center col-sm-4">
            <div className="row align-items-center h-100">
              <div className="col-md-6"></div>
              {/* <div className="col-md-6 text-center">
                <img src="/assets/media/swachh.png" alt="swachh" width={140} />
              </div> */}
              <div className="col-md-6 text-md-start text-sm-center">
                <img src="/assets/media/Azadii.png" alt="ajadi" width={160} />
              </div>
            </div>
          </div>
        </div>
        <div className="navBar container-main border-top border-dark">
          <div className="d-flex align-items-center  col-md-7">
            <div className="d-flex">
              <IconButton className="responsiveToggle" onClick={toggleButton}>
                <GiHamburgerMenu />
              </IconButton>
              <NavLink className="navLink logo1 " to="/">
                <img
                  src={logo2}
                  alt="logo"
                  width="60px"
                  height="60px"
                  className=""
                />
              </NavLink>
              <NavMenu>
                <NavLink
                  activeClassName={`${history.location.pathname === '/' ? 'navActive' : ""}`}
                  className="navLink navHover "
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  activeClassName="navActive"
                  className="navLink navHover"
                  to="/book"
                >
                  Books
                </NavLink>

                {/* {users?.userType == 2 && ( */}
                {/* <NavLink
                  activeClassName="navActive"
                  className="navLink navHover"
                  to="/training"
                >
                  Courses
                </NavLink> */}
                {/* )} */}
                {Id && (
                  <NavLink
                    activeClassName="navActive"
                    className="navLink navHover"
                    to="/profile"
                  >
                    My library
                  </NavLink>
                )}
                <NavLink
                  activeClassName="navActive"
                  className="navLink navHover"
                  to="/photoGallary"
                  id="photoGalleryNav"
                >
                  Photo Gallery
                </NavLink>
                <NavLink
                  activeClassName="navActive"
                  className="navLink navHover"
                  to="/about"
                >
                  About Us
                </NavLink>
                <NavLink
                  activeClassName="navActive"
                  className="navLink navHover"
                  to="/contact"
                >
                  Contact Us
                </NavLink>
              </NavMenu>
            </div>
          </div>

          <NavBtn className="col-md-5 px-3 justify-content-end flexColumn ">
            {/* <div className="resPB_2 px-2">
              <button
                className="py-2 text-white desk  width150 rounded border-none linear_gradient_desk mx-1"
                style={{}}
                onClick={downloadFile}
              >
                <img src={img1} alt="logo" className="rounded" />
                &nbsp; Desktop App
              </button>
            </div> */}
            <div>Visitors: {data?.visitors || 0}</div>

            <div
              className={`d-flex justify-content-end position-relative  ${
                Id && "hoverEffect"
              }`}
            >
              {Id ? (
                <>
                  <Link to="/profile" className="text_decoration_None ms-3">
                    <div className="d-flex align-items-center ">
                      <Avatar
                        className=""
                        src={
                          userInfo?.image || userUtil.image
                            ? Bucket + (userInfo?.image || userUtil.image)
                            : data?.accountType === 0
                            ? images
                              ? Bucket + images
                              : "https://img.icons8.com/clouds/100/000000/user.png"
                            : Bucket + data?.image
                        }
                      />
                      <h4 className="px-2 font_size_18 font_bold color_blue">
                        {/* {userInfo?.name ? userInfo?.name : data?.name} */}
                        {userInfo?.name || userUtil1?.name || userUtil?.name}
                        {/* {userUtil?.name} */}
                      </h4>
                    </div>
                  </Link>
                </>
              ) : (
                ""
              )}

              {!Id ? (
                <>
                  <NavLink
                    className="greenButton"
                    activeClassName="whiteButton linear_gradient"
                    to="/signIn"
                    // onClick={() => history.push("/signIn")}
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    className="greenButton"
                    activeClassName="whiteButton linear_gradient"
                    to="/signUp"
                    // onClick={() => history.push("/signUp")}
                  >
                    Sign Up
                  </NavLink>
                </>
              ) : (
                ""
              )}
              <div
                className="bg-transparent position-absolute displayNone2  paddingTop35"
                style={{ width: "max-content" }}
              >
                <div className="bg-white rounded box_shadow children">
                  <div className="">
                    <NavLink
                      className="px-3 py-2 d-flex pointer text-decoration-none"
                      to="/profile"
                    >
                      {/* {profiles === "lib" ? (
                          <img className="" src={libA} alt="" />
                        ) : (
                          <img className="" src={lib} alt="" />
                        )} */}
                      <p
                        className={`ml-2 font_size_16 font_regular color_light_gray delay`}
                      >
                        My library
                      </p>
                    </NavLink>
                  </div>
                  {/* <div className="">
                    <NavLink
                      className="px-3 py-2 d-flex pointer text-decoration-none"
                      to="/profile/history"
                    >
                     
                      <p
                        className={`ml-2 font_size_16 font_regular color_light_gray delay`}
                      >
                        Order history
                      </p>
                    </NavLink>
                  </div> */}
                  <div className="">
                    <NavLink
                      className="px-3 py-2 d-flex pointer text-decoration-none"
                      to="/profile/wishlist"
                      // onClick={() => click("wishlist")}
                    >
                      {/* {profiles === "wishlist" ? (
                          <img className="" src={wishlistA} alt="" />
                        ) : (
                          <img className="" src={wishlist} alt="" />
                        )} */}
                      <p
                        className={`ml-2 font_size_16 font_regular color_light_gray delay`}
                      >
                        My wishlist
                      </p>
                    </NavLink>
                  </div>
                  {/* {users?.userType == 2 && ( */}
                  {/* <div className="">
                    <NavLink
                      className="px-3 py-2 d-flex pointer text-decoration-none"
                      to="/profile/selfAssesment"
                    >
                      <p
                        className={`ml-2 font_size_16 font_regular color_light_gray delay`}
                      >
                        Self Assessment
                      </p>
                    </NavLink>
                  </div> */}
                  {/* )} */}
                  <div className="">
                    <NavLink
                      className="px-3 py-2 d-flex pointer text-decoration-none"
                      to="/profile/account"
                      // onClick={() => click("account")}
                    >
                      {/* {profiles === "account" ? (
                          <img className="" src={profileA} alt="" />
                        ) : (
                          <img className="" src={profile} alt="" />
                        )} */}
                      <p
                        className={`ml-2 font_size_16 font_regular color_light_gray delay`}
                      >
                        My account
                      </p>
                    </NavLink>
                  </div>
                  <div className="">
                    <NavLink
                      className="px-3 py-2 d-flex pointer text-decoration-none"
                      to="/profile/password"
                      // onClick={() => click("password")}
                    >
                      {/* {profiles === "password" ? (
                          <img className="" src={passwordA} alt="" />
                        ) : (
                          <img className="" src={password} alt="" />
                        )} */}
                      <p
                        className={`ml-2 font_size_16 font_regular color_light_gray delay`}
                      >
                        Change password
                      </p>
                    </NavLink>
                  </div>
                  <div className="">
                    <div
                      className="px-3 py-2 d-flex pointer text-decoration-none"
                      onClick={() => logoutcall()}
                    >
                      {/* {profiles === "logout" ? (
                            <img className="" src={logOutA} alt="" />
                          ) : (
                            <img className="" src={logOut} alt="" />
                          )} */}
                      <div
                        className={`ml-2 font_size_16 font_regular color_light_gray delay`}
                      >
                        Log out
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NavBtn>
        </div>
        <div className="">
          <Collapse isOpen={isOpen}>
            <NavLink
              activeClassName="navActive"
              className="navLink navHover"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              activeClassName="navActive"
              className="navLink navHover"
              to="/book"
            >
              Books
            </NavLink>
            {Id ? (
              <NavLink
                activeClassName="navActive"
                className="navLink navHover"
                to="/profile"
              >
                My Library
              </NavLink>
            ) : (
              ""
            )}
            <NavLink
              activeClassName="navActive"
              className="navLink navHover"
              to="/photoGallary"
            >
              Photo Gallery
            </NavLink>
            <NavLink
              activeClassName="navActive"
              className="navLink navHover"
              to="/about"
            >
              About Us
            </NavLink>
            <NavLink
              activeClassName="navActive"
              className="navLink navHover"
              to="/contact"
            >
              Contact Us
            </NavLink>
            {/* {users?.userType == 2 && ( */}
            {/* <NavLink
              activeClassName="navActive"
              className="navLink navHover"
              to="/training"
            >
              Courses
            </NavLink> */}
            {/* )} */}

            {/* <NavLink
                activeClassName="navActive"
                className="navLink navHover"
                to="/contact"
              >
                Contact
              </NavLink> */}
          </Collapse>
        </div>
      </div>
    </>
  );
};
export default Navbar;
