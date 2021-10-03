export const Helper = {
  getLocalData() {
    const _userData = JSON.parse(localStorage.getItem("userData"));
    return _userData ? _userData : null;
  },

  getToken() {
    const _userData = JSON.parse(localStorage.getItem("userData"));
    return _userData && _userData.token ? _userData.token : null;
  },

  getUser() {
    const _userData = JSON.parse(localStorage.getItem("userData"));
    return _userData && _userData.user ? _userData.user : {};
  },
  queryString(params) {
    return Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
  },

  isSuperAdmin() {
    if (this.getUser() && Object.keys(this.getUser()).length > 0) {
      const _role = this.getUser().role;
      if (_role) return _role.is_super_admin;
      return false;
    }

    return false;
  },
};
