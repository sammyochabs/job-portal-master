import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { RouteNames } from "../constants/RouteNames";
import { logoutUser } from "../store/actions/auth";
import SideBarItem from "./components/SideBarItem";
import { Helper as _H } from '../helpers/helper';
import UserProfile from "./components/UserProfile";

const SideBar = ({ barStatus, onSideBarOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const logoutHandler = () => {
    dispatch(logoutUser());
    toast.success('You are successfully logged out.')
  }

  const _addActiveClass = (link) => {
    return location.pathname === link ? 'active' : null;
  }

  const _isOpen = (paths) => {
    let openFlag = false;
    if (Array.isArray(paths) && paths.length > 0)
      paths.forEach(path => {
        if (_addActiveClass(path) === 'active')
          openFlag = true;
      });

    return openFlag;
  }

  //console.log(user);

  return (

    <div id="mySidenav" className={barStatus ? "sidenav open" : "sidenav"}>
      <UserProfile />
      <ul className="side-list">
        <SideBarItem
          classes="home"
          title="Dashboard"
          icon="fa-tachometer"
          menuTitle="Dashboard"
          navTo="/"
          isOpen={_isOpen(['/'])}
          onOpen={onSideBarOpen}
        />

        {_H.isSuperAdmin() && <SideBarItem
          classes="settings hashchild"
          title="User management"
          icon="fa-user"
          menuTitle="User management"
          isOpen={_isOpen([RouteNames.adminUserList])}
          onOpen={onSideBarOpen}
          hasSubMenu={<>
            <li><Link className={_addActiveClass(RouteNames.adminUserList)} to={RouteNames.adminUserList}>Admin Users</Link></li>
          </>}
        />}

        {_H.isSuperAdmin() && <SideBarItem
          classes="resource hashchild"
          title="All Master"
          icon="fa-pencil-square"
          menuTitle="Master management"
          onOpen={onSideBarOpen}
          isOpen={_isOpen([
            RouteNames.stateList,
            RouteNames.cityList,
            RouteNames.skillList,
            RouteNames.companyTypeList,
            RouteNames.education,
            RouteNames.qualification,
          ])}
          hasSubMenu={<>
            <li><Link className={_addActiveClass(RouteNames.stateList)} to={RouteNames.stateList}>State List</Link></li>
            <li><Link className={_addActiveClass(RouteNames.cityList)} to={RouteNames.cityList}>City List</Link></li>
            <li><Link className={_addActiveClass(RouteNames.skillList)} to={RouteNames.skillList}>Skill List</Link></li>
            <li><Link className={_addActiveClass(RouteNames.companyTypeList)} to={RouteNames.companyTypeList}>Company List</Link></li>
            <li><Link className={_addActiveClass(RouteNames.education)} to={RouteNames.education}>Education</Link></li>
            <li><Link className={_addActiveClass(RouteNames.education)} to={RouteNames.education}>Qualification</Link></li>

            {/* <li><Link className={_addActiveClass(RouteNames.notification)} to={RouteNames.notification}>Notification</Link></li>
            <li><Link className={_addActiveClass(RouteNames.alertMessage)} to={RouteNames.alertMessage}>Alert Message</Link></li> */}
          </>}
        />}

        <SideBarItem
          classes="order hashchild"
          title="List"
          icon="fa-list"
          menuTitle="List management"
          onOpen={onSideBarOpen}
          isOpen={_isOpen([
            RouteNames.userChatList,
            RouteNames.globalNotifications
          ])}
          hasSubMenu={<>
            <li><Link className={_addActiveClass(RouteNames.globalNotifications)} to={RouteNames.globalNotifications}>Global Notification</Link></li>
          </>}
        />

        <SideBarItem
          classes="order hashchild"
          title="List"
          icon="fa-list"
          menuTitle="Master"
          onOpen={onSideBarOpen}
          isOpen={_isOpen([
            RouteNames.cityList,
            RouteNames.stateList
          ])}
          hasSubMenu={<>
            <li><Link className={_addActiveClass(RouteNames.cityList)} to={RouteNames.cityList}>Cities</Link></li>
            <li><Link className={_addActiveClass(RouteNames.stateList)} to={RouteNames.stateList}>States</Link></li>
            <li><Link className={_addActiveClass(RouteNames.skillList)} to={RouteNames.skillList}>Skills</Link></li>
            <li><Link className={_addActiveClass(RouteNames.companyTypeList)} to={RouteNames.companyTypeList}>Company List</Link></li>
            <li><Link className={_addActiveClass(RouteNames.JobMaster)} to={RouteNames.JobMaster}>Job Master</Link></li>
          </>}
        />

        {/* <SideBarItem
          classes="order hashchild"
          title="List"
          icon="fa-list"
          menuTitle="State management"
          onOpen={onSideBarOpen}
          isOpen={_isOpen([
            RouteNames.stateList,
          ])}
          hasSubMenu={<>
            <li><Link className={_addActiveClass(RouteNames.stateList)} to={RouteNames.stateList}>State List</Link></li>
          </>}
        />

        <SideBarItem
          classes="order hashchild"
          title="List"
          icon="fa-list"
          menuTitle="City management"
          onOpen={onSideBarOpen}
          isOpen={_isOpen([
            RouteNames.cityList,
          ])}
          hasSubMenu={<>
            <li><Link className={_addActiveClass(RouteNames.cityList)} to={RouteNames.cityList}>City List</Link></li>
          </>}
        /> */}


        {/* <SideBarItem
          classes="home"
          title="job Search"
          icon="fa-briefcase"
          menuTitle="JoB search"
          navTo="/job-search"
          isOpen={_isOpen(['/job-search'])}
          onOpen={onSideBarOpen}
        /> */}

        <SideBarItem
          classes="logout"
          title="Logout"
          icon="fa-sign-out"
          menuTitle="Logout"
          onClose={logoutHandler}
        />
      </ul>
    </div>

  )

}

export default SideBar;