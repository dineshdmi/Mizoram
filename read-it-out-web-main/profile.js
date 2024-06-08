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
const Profile = (props) => {
  const [profiles, setProfile] = useState("lib");
  const history = useHistory();
  console.log(history);
  let { path, url } = useRouteMatch();
  const logoutcall = () => {
    localStorage.clear();
    history.push("/");
    window.location.reload();
  };
  useEffect(() => {
    console.log(props);
    setProfile(props.location.state);
    if (!props.location.state) {
      setProfile(profiles);
    }
    // setProfile("lib");
    // console.log(props.location.state);
  }, []);
  return (
    <div className="container-fluid py-3 row">
      <div className="col-md-3 px-3">
        <div className="rounded box_shadow">
          <div className="p-3 border-bottom"> My Account</div>
          <div className="p-3 border-bottom">
            <Link
              to={url}
              className="px-3 py-2 d-flex pointer text-decoration-none"
              // onClick={() => setProfile("lib")}
            >
              {history.location.pathname === "/profile" ? (
                <img className="" src={libA} alt="" />
              ) : (
                <img className="" src={lib} alt="" />
              )}
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
            <Link
              to={`${url}/history`}
              className="px-3 py-2 d-flex pointer text-decoration-none"
              // onClick={() => setProfile("history")}
            >
              {history.location.pathname === "/profile/history" ? (
                <img className="" src={orderA} alt="" />
              ) : (
                <img className="" src={order} alt="" />
              )}
              <div
                className={`ml-2 font_size_16 font_regular ${
                  history.location.pathname === "/profile/history"
                    ? "color_blue"
                    : "color_light_gray"
                }`}
              >
                Order history
              </div>
            </Link>
            <Link
              to={`${url}/wishlist`}
              className="px-3 py-2 d-flex pointer text-decoration-none"
              // onClick={() => setProfile("wishlist")}
            >
              {history.location.pathname === "/profile/wishlist" ? (
                <img className="" src={wishlistA} alt="" />
              ) : (
                <img className="" src={wishlist} alt="" />
              )}
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
            <Link
              to={`${url}/selfAssesment`}
              className="px-3 py-2 d-flex pointer text-decoration-none"
              // onClick={() => setProfile("selfAssesment")}
            >
              {history.location.pathname === "/profile/selfAssesment" ||
              history.location.pathname ===
                "/profile/selfAssesment/theoryTest" ? (
                <img className="" src={assesmentA} alt="" />
              ) : (
                <img className="" src={assesment} alt="" />
              )}
              <div
                className={`ml-2 font_size_16 font_regular ${
                  history.location.pathname === "/profile/selfAssesment" ||
                  history.location.pathname ===
                    "/profile/selfAssesment/theoryTest"
                    ? "color_blue"
                    : "color_light_gray"
                }`}
              >
                Self Assesment
              </div>
            </Link>
            <Link
              className="px-3 py-2 d-flex pointer text-decoration-none"
              to={`${url}/account`}
              // onClick={() => setProfile("account")}
            >
              {history.location.pathname === "/profile/account" ? (
                <img className="" src={profileA} alt="" />
              ) : (
                <img className="" src={profile} alt="" />
              )}
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
              className="px-3 py-2 d-flex pointer text-decoration-none"
              to={`${url}/password`}
              // onClick={() => setProfile("password")}
            >
              {history.location.pathname === "/profile/password" ? (
                <img className="" src={passwordA} alt="" />
              ) : (
                <img className="" src={password} alt="" />
              )}
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
              className="px-3 py-2 d-flex pointer text-decoration-none"
              onClick={() => logoutcall()}
            >
              {profiles === "logout" ? (
                <img className="" src={logOutA} alt="" />
              ) : (
                <img className="" src={logOut} alt="" />
              )}
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
