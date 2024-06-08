import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import lib from "../../media/lib.png";
import libA from "../../media/libA.png";
import assesment from "../../media/assesment.png";
import assesmentA from "../../media/assesmentA.png";
import logOut from "../../media/logOut.png";
import logOutA from "../../media/logOutA.png";
import password from "../../media/password.png";
import passwordA from "../../media/passwordA.png";
import order from "../../media/order.png";
import orderA from "../../media/orderA.png";
import profile from "../../media/profile.png";
import profileA from "../../media/profileA.png";
import wishlist from "../../media/wishlist.png";
import wishlistA from "../../media/wishlistA.png";
import My_Library from "./My_Library";
import Order_History from "./Order_History";
import My_Wishlist from "./My_Wishlist";
import My_Account from "./My_Account";
import Change_Password from "./Change_Password";
import Self_Assesment from "./Self Assesment/Self_Assesment";
import {
  RiFileList3Line,
  RiFileList3Fill,
  RiContactsBook2Line,
  RiContactsBook2Fill,
  RiHeartLine,
  RiHeartFill,
  RiFileList2Line,
  RiFileList2Fill,
  RiUser3Line,
  RiUser3Fill,
  RiLogoutBoxRLine,
  RiLoginBoxLine,
  RiLockPasswordFill,
  RiLockPasswordLine,
} from "react-icons/ri";

const Profile = (props) => {
  const [profiles, setProfile] = useState("lib");
  const users = JSON.parse(localStorage.getItem("userinfo"));
  const history = useHistory();

  let { path, url } = useRouteMatch();
  const logoutcall = () => {
    localStorage.clear();

    history.push("/");
    window.location.reload();
  };
  useEffect(() => {
    setProfile(props.location.state);
    if (!props.location.state) {
      setProfile(profiles);
    }
    // setProfile("lib");
    //
  }, []);
  return (
    <div className="container-fluid py-3 row">
      <div className="col-md-3 px-3">
        <div className="rounded box_shadow">
          <div className="p-3 border-bottom"> My Account</div>
          <div className="p-3">
            <Link
              to={url}
              className="px-3 py-2 d-flex align-items-center pointer text-decoration-none"
              // onClick={() => setProfile("lib")}
            >
              <div className="">
                {history.location.pathname === "/profile" ? (
                  <RiFileList2Fill fontSize={22} color="#00bde2" />
                ) : (
                  // <img className="" src={libA} alt="" />
                  <RiFileList2Line fontSize={22} color="#7e8299" />
                  // <img className="" src={lib} alt="" />
                )}
              </div>
              <div
                className={`ml-2 font_size_16 font_regular ${
                  history.location.pathname === "/profile"
                    ? "color_blue"
                    : "color_light_gray"
                }`}
              >
                My library
              </div>
            </Link>
            {/* <Link
              to={`${url}/history`}
              className="px-3 py-2 d-flex align-items-center pointer text-decoration-none"
            >
              <div className="">
                {history.location.pathname === "/profile/history" ? (
                  <RiContactsBook2Fill fontSize={22} color="#00bde2" />
                ) : (
                  <RiContactsBook2Line fontSize={22} color="#7e8299" />
                )}
              </div>
              <div
                className={`ml-2 font_size_16 font_regular ${
                  history.location.pathname === "/profile/history"
                    ? "color_blue"
                    : "color_light_gray"
                }`}
              >
                Order history
              </div>
            </Link> */}
            <Link
              to={`${url}/wishlist`}
              className="px-3 py-2 d-flex align-items-center pointer text-decoration-none"
              // onClick={() => setProfile("wishlist")}
            >
              <div className="">
                {history.location.pathname === "/profile/wishlist" ? (
                  <RiHeartFill fontSize={22} color="#00bde2" />
                ) : (
                  // <img className="" src={libA} alt="" />
                  <RiHeartLine fontSize={22} color="#7e8299" />
                )}
              </div>
              <div
                className={`ml-2 font_size_16 font_regular ${
                  history.location.pathname === "/profile/wishlist"
                    ? "color_blue"
                    : "color_light_gray"
                }`}
              >
                My wishlist
              </div>
            </Link>
            {/* {users.userType == 2 && ( */}
            {/* <Link
              to={`${url}/selfAssesment`}
              className="px-3 py-2 d-flex align-items-center pointer text-decoration-none"
              // onClick={() => setProfile("selfAssesment")}
            >
              <div className="">
                {history.location.pathname === "/profile/selfAssesment" ||
                history.location.pathname ===
                  "/profile/selfAssesment/theoryTest" ? (
                  <RiFileList3Fill fontSize={22} color="#00bde2" />
                ) : (
                  // <img className="" src={libA} alt="" />
                  <RiFileList3Line fontSize={22} color="#7e8299" />
                )}
              </div>
              <div
                className={`ml-2 font_size_16 font_regular ${
                  history.location.pathname === "/profile/selfAssesment" ||
                  history.location.pathname ===
                    "/profile/selfAssesment/theoryTest"
                    ? "color_blue"
                    : "color_light_gray"
                }`}
              >
                Self Assessment
              </div>
            </Link> */}
            {/* )} */}
            <Link
              className="px-3 py-2 d-flex align-items-center pointer text-decoration-none"
              to={`${url}/account`}
              // onClick={() => setProfile("account")}
            >
              <div className="">
                {history.location.pathname === "/profile/account" ? (
                  <RiUser3Fill fontSize={22} color="#00bde2" />
                ) : (
                  // <img className="" src={libA} alt="" />
                  <RiUser3Line fontSize={22} color="#7e8299" />
                )}
              </div>
              <div
                className={`ml-2 font_size_16 font_regular ${
                  history.location.pathname === "/profile/account"
                    ? "color_blue"
                    : "color_light_gray"
                }`}
              >
                My account
              </div>
            </Link>
            <Link
              className="px-3 py-2 d-flex align-items-center pointer text-decoration-none"
              to={`${url}/password`}
              // onClick={() => setProfile("password")}
            >
              <div className="">
                {history.location.pathname === "/profile/password" ? (
                  <RiLockPasswordFill fontSize={22} color="#00bde2" />
                ) : (
                  // <img className="" src={libA} alt="" />
                  <RiLockPasswordLine fontSize={22} color="#7e8299" />
                )}
              </div>
              <div
                className={`ml-2 font_size_16 font_regular ${
                  history.location.pathname === "/profile/password"
                    ? "color_blue"
                    : "color_light_gray"
                }`}
              >
                Change password
              </div>
            </Link>
            <div
              className="px-3 py-2 d-flex align-items-center pointer text-decoration-none"
              onClick={() => logoutcall()}
            >
              <div className="">
                {profiles === "logout" ? (
                  <RiLoginBoxLine fontSize={22} color="#00bde2" />
                ) : (
                  // <img className="" src={libA} alt="" />
                  <RiLoginBoxLine fontSize={22} color="#7e8299" />
                )}
              </div>
              <div
                className={`ml-2 font_size_16 font_regular ${
                  profiles === "logout" ? "color_blue" : "color_light_gray"
                }`}
              >
                Log out
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-9 px-2">
        <Switch>
          <Route exact path={path} component={My_Library} />
          <Route exact path={`${path}/history`} component={Order_History} />
          <Route exact path={`${path}/wishlist`} component={My_Wishlist} />
          <Route path={`${path}/selfAssesment`} component={Self_Assesment} />
          <Route exact path={`${path}/account`} component={My_Account} />
          <Route exact path={`${path}/password`} component={Change_Password} />
        </Switch>
      </div>
    </div>
  );
};
export default Profile;
