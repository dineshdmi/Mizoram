/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
export function AsideMenuList({ layoutProps }) {
  const [type, setType] = useState();
  const location = useLocation();
  const types = JSON.parse(localStorage.getItem("setStores"));
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };
  useEffect(() => {
    const Id = JSON.parse(localStorage.getItem("userinfo")).userType;
    // export const usertype = Id

    setType(Id);
  }, []);
  // console.log("type", 2)
  return (
    <>
      {/* begin::Menu Nav */}
      {type === 1 || type === 3 ? (
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/dashboard">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                />
              </span>
              <span className="menu-text">Dashboard</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive("/bookList", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/bookList">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Book.svg")} />
              </span>
              <span className="menu-text">Books</span>
            </NavLink>
          </li>
          {/* <li
            className={`menu-item ${getMenuItemActive("/studentList", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/studentList">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} />
              </span>
              <span className="menu-text">Users</span>
            </NavLink>
          </li> */}
          <li
            className={`menu-item ${getMenuItemActive("/teacherList", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/teacherList">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/General/Star.svg")} />
              </span>
              <span className="menu-text">Users</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive("/subscriber", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/subscriber">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Shopping/Dollar.svg")}
                />
              </span>
              <span className="menu-text">Subscriber</span>
            </NavLink>
          </li>
          {/* <li
            className={`menu-item ${getMenuItemActive("/schoolList", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/schoolList">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Bookmark.svg")}
                />
              </span>
              <span className="menu-text">Schools</span>
            </NavLink>
          </li> */}
          {/* <li
            className={`menu-item ${getMenuItemActive("/topicList", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/topicList">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/General/Shield-check.svg"
                  )}
                />
              </span>
              <span className="menu-text">Topics</span>
            </NavLink>
          </li> */}
          {/* <li
            className={`menu-item menu-item-submenu `}
            aria-haspopup="true"
            data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/error">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Code/Error-circle.svg")}
                />
              </span>
              <span className="menu-text">Training Program</span>
              <i className="menu-arrow" />
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow" />
              <ul className="menu-subnav">
            
                <li
                  className={`menu-item ${getMenuItemActive("/courseList")}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/courseList">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text"> Manage Course </span>
                  </NavLink>
                </li>
                <li
                  className={`menu-item ${getMenuItemActive("/contentList")}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/contentList">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Manage Content</span>
                  </NavLink>
                </li>

                <li
                  className={`menu-item ${getMenuItemActive("/facultyList")}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/facultyList">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Faculty</span>
                  </NavLink>
                </li>
                <li
                  className={`menu-item ${getMenuItemActive("/traningLog")}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/traningLog">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Training Log</span>
                  </NavLink>
                </li>
                <li
                  className={`menu-item ${getMenuItemActive("/slotList")}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/slotList">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Assign Faculty</span>
                  </NavLink>
                </li>
                <li
                  className={`menu-item ${getMenuItemActive("/attendiesList")}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/attendiesList">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Attendees</span>
                  </NavLink>
                </li>

                <li
                  className={`menu-item ${getMenuItemActive("/timeSlotList")}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/timeSlotList">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Time Slot</span>
                  </NavLink>
                </li>
                <li
                  className={`menu-item ${getMenuItemActive("/questionBank")}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/questionBank">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Question Bank</span>
                  </NavLink>
                </li>
                <li
                  className={`menu-item ${getMenuItemActive(
                    "/trainingTypeList"
                  )}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/trainingTypeList">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Training Type</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </li> */}
          <li
            className={`menu-item ${getMenuItemActive("/genreList", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/genreList">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Folder.svg")}
                />
              </span>
              <span className="menu-text">Manage Genre</span>
            </NavLink>
          </li>{" "}
          <li
            className={`menu-item ${getMenuItemActive(
              "/mainCategorylist",
              false
            )}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/mainCategorylist">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/General/Save.svg")} />
              </span>
              <span className="menu-text">Main Category</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive("/categoryList", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/categoryList">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Duplicate.svg")}
                />
              </span>
              <span className="menu-text">Category</span>
            </NavLink>
          </li>
          {/* <li
            className={`menu-item ${getMenuItemActive(
              "/subCategoryList",
              false
            )}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/subCategoryList">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                />
              </span>
              <span className="menu-text">Sub Category</span>
            </NavLink>
          </li> */}
          <li
            className={`menu-item ${getMenuItemActive("/gallery", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/gallery">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                />
              </span>
              <span className="menu-text">Gallery</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive("/auditorList", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/auditorList">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Settings-1.svg")}
                />
              </span>
              <span className="menu-text">Manage Publisher</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive("/subAdminList", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/subAdminList">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/General/Shield-check.svg"
                  )}
                />
              </span>
              <span className="menu-text">Manage Sub-Admin</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive(
              "/contactUsList",
              false
            )}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/contactUsList">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Mail-notification.svg"
                  )}
                />
              </span>
              <span className="menu-text">Contact Us</span>
            </NavLink>
          </li>
        </ul>
      ) : type === 4 ? (
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          {/*begin::1 Level*/}

          <li
            className={`menu-item ${getMenuItemActive(
              "/publisher/bookList",
              false
            )}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/publisher/bookList">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Book.svg")} />
              </span>
              <span className="menu-text">Books</span>
            </NavLink>
          </li>
        </ul>
      ) : (
        ""
      )}
    </>
  );
}
