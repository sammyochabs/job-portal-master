import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { adjustSideBar } from "../store/actions/auth";
import Footer from "./Footer";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

const DefaultStructure = (props) => {
  const { children, pageTitle } = props;
  const sideBarStatus = useSelector((state) => state.auth.sideBarStatus);
  const dispatch = useDispatch();

  const _updateSideBarStatus = (status) => {
    dispatch(adjustSideBar(status));
  };

  return (
    <div className={sideBarStatus ? "admin_holder adminOpen" : "admin_holder"}>
      <SideBar barStatus={sideBarStatus} onSideBarOpen={_updateSideBarStatus} />
      <div className="admin_main">
        <TopBar title={pageTitle} />
        <div className="main_panel main_panel1 maindivision">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultStructure;
