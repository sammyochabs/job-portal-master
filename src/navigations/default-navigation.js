import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RouteNames } from "../constants/RouteNames";
import ProtectedRoute from "../navigations/auth-navigation";
import FallBackLoader from "../Pages/FallBackLoader";

const Login = lazy(() => import("../Pages/auth/Login"));
const RegeneratePassword = lazy(() =>
  import("../Pages/auth/RegeneratePassword")
);
const Dashboard = lazy(() => import("../Pages/dashboard/Dashboard"));
const UserList = lazy(() => import("../Pages/users-admin/UsersList"));
const UserEdit = lazy(() => import("../Pages/users-admin/UserEdit"));
const JobMaster = lazy(() => import("../Pages/masters/job-master/JobMaster"));

const StateList = lazy(() => import("../Pages/masters/states/StateList"));
const StateEdit = lazy(() => import("../Pages/masters/states/StateEdit"));

const CityList = lazy(() => import("../Pages/masters/cities/CityList"));
const CityEdit = lazy(() => import("../Pages/masters/cities/CityEdit"));

const SkillList = lazy(() => import("../Pages/masters/skills/SkillList"));
const SkillEdit = lazy(() => import("../Pages/masters/skills/SkillEdit"));

const EducationList = lazy(() =>
  import("../Pages/masters/education/EducationList")
);
const EducationEdit = lazy(() =>
  import("../Pages/masters/education/EducationEdit")
);

const QualificationList = lazy(() =>
  import("../Pages/masters/qualification/QualificationList")
);
const QualificationEdit = lazy(() =>
  import("../Pages/masters/qualification/QualificationEdit")
);

const CompanyTypeList = lazy(() =>
  import("../Pages/masters/companytype/CompanyTypeList")
);
const CompanyTypeEdit = lazy(() =>
  import("../Pages/masters/companytype/CompanyTypeEdit")
);

const UserChatList = lazy(() => import("../Pages/user-chat/List"));
const UserChat = lazy(() => import("../Pages/user-chat/Chat"));
const GlobalNotifications = lazy(() =>
  import("../Pages/global-notifications/GlobalNotifications")
);
const NotFound = lazy(() => import("../Pages/404/NotFound"));

const DefaultNavigation = () => {
  return (
    <Suspense fallback={<FallBackLoader />}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/regenerate-password"
            component={RegeneratePassword}
          />
          <ProtectedRoute exact path="/" component={Dashboard} />
          {/** ========= State section =========== */}

          {/** ========= Job page =========== */}
          <ProtectedRoute
            exact
            path={RouteNames.JobMaster}
            component={JobMaster}
          />

          {/** ========= Admin User section =========== */}
          <ProtectedRoute
            exact
            path={RouteNames.adminUserList}
            component={UserList}
          />
          <ProtectedRoute
            exact
            path={RouteNames.adminUserAdd}
            component={UserEdit}
          />
          <ProtectedRoute
            exact
            path={`${RouteNames.adminUserEdit}/:id`}
            component={UserEdit}
          />

          {/* state module */}
          <ProtectedRoute
            exact
            path={RouteNames.stateList}
            component={StateList}
          />
          <ProtectedRoute
            exact
            path={RouteNames.stateAdd}
            component={StateEdit}
          />
          <ProtectedRoute
            exact
            path={`${RouteNames.stateEdit}/:id`}
            component={StateEdit}
          />
          {/* City module */}
          <ProtectedRoute
            exact
            path={RouteNames.cityList}
            component={CityList}
          />
          <ProtectedRoute
            exact
            path={RouteNames.cityAdd}
            component={CityEdit}
          />
          <ProtectedRoute
            exact
            path={`${RouteNames.cityEdit}/:id`}
            component={CityEdit}
          />
          {/* Skill module */}
          <ProtectedRoute
            exact
            path={RouteNames.skillList}
            component={SkillList}
          />
          <ProtectedRoute
            exact
            path={RouteNames.skillAdd}
            component={SkillEdit}
          />
          <ProtectedRoute
            exact
            path={`${RouteNames.skillEdit}/:id`}
            component={SkillEdit}
          />
          {/* Education module */}
          <ProtectedRoute
            exact
            path={RouteNames.education}
            component={EducationList}
          />
          <ProtectedRoute
            exact
            path={RouteNames.educationAdd}
            component={EducationEdit}
          />
          <ProtectedRoute
            exact
            path={`${RouteNames.educationEdit}/:id`}
            component={EducationEdit}
          />
          {/* Qualification module */}
          <ProtectedRoute
            exact
            path={RouteNames.qualification}
            component={QualificationList}
          />
          <ProtectedRoute
            exact
            path={RouteNames.qualificationAdd}
            component={QualificationEdit}
          />
          <ProtectedRoute
            exact
            path={`${RouteNames.qualificationEdit}/:id`}
            component={QualificationEdit}
          />
          {/* Company Type module */}
          <ProtectedRoute
            exact
            path={RouteNames.companyTypeList}
            component={CompanyTypeList}
          />
          <ProtectedRoute
            exact
            path={RouteNames.companyTypeAdd}
            component={CompanyTypeEdit}
          />
          <ProtectedRoute
            exact
            path={`${RouteNames.companyTypeEdit}/:id`}
            component={CompanyTypeEdit}
          />

          {/** ================= User Chat Modules =================*/}
          <ProtectedRoute
            exact
            path={RouteNames.userChatList}
            component={UserChatList}
          />
          <ProtectedRoute
            exact
            path={`${RouteNames.userChat}/:id`}
            component={UserChat}
          />

          {/* ============== Global Notification ============ */}
          <ProtectedRoute
            exact
            path={RouteNames.globalNotifications}
            component={GlobalNotifications}
          />

          {/**============= 404 Page Handler =================== */}
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default DefaultNavigation;
