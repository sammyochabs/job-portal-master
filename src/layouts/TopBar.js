import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotificationsAlert from "./components/NotificationsAlert";
import { adjustSideBar } from "../store/actions/auth";

const TopBar = ({ title }) => {
  const sideBarStatus = useSelector((state) => state.auth.sideBarStatus);

  const dispatch = useDispatch();

  const _updateSideBarStatus = (status) => {
    dispatch(adjustSideBar(status));
  };

  return (
    <div className="top_panel">
      <div className="top_panel_top clear">
        <Link to="/" className={sideBarStatus ? "logo logoOpen" : "logo"}>
          {" "}
        </Link>

        <a
          href="#"
          className={sideBarStatus ? "menu closebtn" : "menu openbtn"}
          onClick={() => _updateSideBarStatus(!sideBarStatus)}
        >
          {" "}
        </a>

        <h2 className="title">{title || "E-Edge"}</h2>
        <div className="topright">
          <div className="account">
            <NotificationsAlert />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
