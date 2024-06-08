import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import { useHistory } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_helpers";
import {
  ApiPost,
  ApiGet,
  ApiPut,
  ApiGetInce,
  ApiPostInce,
} from "../../../../../helpers/API/ApiData";

export function QuickUser() {
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem("userinfo"));
  const logoutClick = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    const Id2 = JSON.parse(localStorage.getItem("userinfo"));
  }, []);
  return (
    <div
      id="kt_quick_user"
      className="offcanvas offcanvas-right offcanvas p-10"
    >
      <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
        <h3 className="font-weight-bold m-0">Admin Profile</h3>
        <a
          href="#"
          className="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_user_close"
        >
          <i className="ki ki-close icon-xs text-muted" />
        </a>
      </div>

      <div className="offcanvas-content pr-5 mr-n5">
        <div className="d-flex align-items-center mt-5">
          <div className="symbol symbol-100 mr-5">
            <div className="symbol-label">
              <img
                alt="profile"
                src={
                  userData.image
                    ? userData.image
                    : "data:image/png;base64,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"
                }
                height="100px"
                width="100px"
              ></img>
            </div>
            <i className="symbol-badge bg-success" />
          </div>
          <div className="d-flex flex-column">
            <div className="text-muted mt-1">{userData.name}</div>
            <div className="text-muted mt-1">{userData.email}</div>

            <br></br>
            <button
              className="btn btn-bold"
              style={{ backgroundColor: "#003366", color: "#ffffff" }}
              onClick={logoutClick}
            >
              Sign out
            </button>
          </div>
        </div>

        {/* <div className="separator separator-dashed mt-8 mb-5" />

        <div className="navi navi-spacer-x-0 p-0">
          <a href="/user/profile" className="navi-item">
            <div className="navi-link">
              <div className="symbol symbol-40 bg-light mr-3">
                <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-success">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/General/Notification2.svg"
                      )}
                    ></SVG>
                  </span>
                </div>
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">My Profile</div>
                <div className="text-muted">
                  Account settings and more{" "}
                  <span className="label label-light-danger label-inline font-weight-bold">
                    update
                  </span>
                </div>
              </div>
            </div>
          </a>

          <a href="/user/profile" className="navi-item">
            <div className="navi-link">
              <div className="symbol symbol-40 bg-light mr-3">
                <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-warning">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Shopping/Chart-bar1.svg"
                      )}
                    ></SVG>
                  </span>
                </div>
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">My Messages</div>
                <div className="text-muted">Inbox and tasks</div>
              </div>
            </div>
          </a>

          <a href="/user/profile" className="navi-item">
            <div className="navi-link">
              <div className="symbol symbol-40 bg-light mr-3">
                <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-danger">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Files/Selected-file.svg"
                      )}
                    ></SVG>
                  </span>
                </div>
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">My Activities</div>
                <div className="text-muted">Logs and notifications</div>
              </div>
            </div>
          </a>

          <a href="/user/profile" className="navi-item">
            <div className="navi-link">
              <div className="symbol symbol-40 bg-light mr-3">
                <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-primary">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Communication/Mail-opened.svg"
                      )}
                    ></SVG>
                  </span>
                </div>
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">My Tasks</div>
                <div className="text-muted">latest tasks and projects</div>
              </div>
            </div>
          </a>
        </div>

        <div className="separator separator-dashed my-7"></div> */}

        {/* <div>
          <h5 className="mb-5">Recent Notifications</h5>

          <div className="d-flex align-items-center bg-light-warning rounded p-5 gutter-b">
            <span className="svg-icon svg-icon-warning mr-5">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}
                className="svg-icon svg-icon-lg"
              ></SVG>
            </span>

            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
              >
                Another purpose persuade
              </a>
              <span className="text-muted font-size-sm">Due in 2 Days</span>
            </div>

            <span className="font-weight-bolder text-warning py-1 font-size-lg">
              +28%
            </span>
          </div>

          <div className="d-flex align-items-center bg-light-success rounded p-5 gutter-b">
            <span className="svg-icon svg-icon-success mr-5">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                className="svg-icon svg-icon-lg"
              ></SVG>
            </span>
            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
              >
                Would be to people
              </a>
              <span className="text-muted font-size-sm">Due in 2 Days</span>
            </div>

            <span className="font-weight-bolder text-success py-1 font-size-lg">
              +50%
            </span>
          </div>

          <div className="d-flex align-items-center bg-light-danger rounded p-5 gutter-b">
            <span className="svg-icon svg-icon-danger mr-5">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Group-chat.svg"
                )}
                className="svg-icon svg-icon-lg"
              ></SVG>
            </span>
            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1"
              >
                Purpose would be to persuade
              </a>
              <span className="text-muted font-size-sm">Due in 2 Days</span>
            </div>

            <span className="font-weight-bolder text-danger py-1 font-size-lg">
              -27%
            </span>
          </div>

          <div className="d-flex align-items-center bg-light-info rounded p-5">
            <span className="svg-icon svg-icon-info mr-5">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/General/Attachment2.svg")}
                className="svg-icon svg-icon-lg"
              ></SVG>
            </span>

            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1"
              >
                The best product
              </a>
              <span className="text-muted font-size-sm">Due in 2 Days</span>
            </div>

            <span className="font-weight-bolder text-info py-1 font-size-lg">
              +8%
            </span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
