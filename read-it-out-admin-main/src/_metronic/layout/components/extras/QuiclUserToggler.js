import React, { useState, useEffect, useMemo } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import objectPath from "object-path";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { UserProfileDropdown } from "./dropdowns/UserProfileDropdown";

export function QuickUserToggler() {
  const { user } = useSelector((state) => state.auth);
  const uiService = useHtmlClassService();
  const userData = JSON.parse(localStorage.getItem("userinfo"));
  const layoutProps = useMemo(() => {
    return {
      offcanvas:
        objectPath.get(uiService.config, "extras.user.layout") === "offcanvas",
    };
  }, [uiService]);
  const [name, setName] = useState([]);
  // console.clear()
  useEffect(() => {
    const Id2 = JSON.parse(localStorage.getItem("token"));
    const name = JSON.parse(localStorage.getItem("userinfo")).name;
    // console.log(name);
    // console.log(Id2);
    setName(name);
  }, []);

  return (
    <>
      {layoutProps.offcanvas && (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="quick-user-tooltip">View user</Tooltip>}
        >
          <div className="topbar-item">
            <div
              className="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
              id="kt_quick_user_toggle"
            >
              <>
                <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">
                  HI,
                </span>
                <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">
                  {userData.userType === 4
                    ? "ReadIt Out Publisher"
                    : "ReadIt Out Admin"}
                </span>
                <span className="symbol symbol-35 symbol-light-success">
                  <span className="symbol-label font-size-h5 font-weight-bold">
                    {"A"}
                  </span>
                </span>
              </>
            </div>
          </div>
        </OverlayTrigger>
      )}

      {!layoutProps.offcanvas && <UserProfileDropdown />}
    </>
  );
}
