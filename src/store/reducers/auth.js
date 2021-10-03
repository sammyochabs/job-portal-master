import { ACTIVE_LINK_UPDATE, ADJUST_LOADER, LOGIN_USER, LOGOUT_USER, SIDE_BAR_UPDATE, UPDATE_NOTIFICATION_SOCKET } from "../actions/auth";

const userData = JSON.parse(localStorage.getItem('userData'));

const initState = {
    token: userData && userData.token ? userData.token : null,
    user: userData && userData.user ? userData.user : {},
    isAuthenticated: userData && userData.token ? !!userData.token : false,
    showLoader: false,
    updateSocket: false,
    activeLink: 'dashboard',
    sideBarStatus: true,
}

export default (state = initState, action) => {
    switch (action.type) {

        case LOGIN_USER:
            //====== Store to Local ========
            localStorage.setItem('userData',
                JSON.stringify({ user: action.data, token: action.token })
            );

            return {
                token: action.token,
                user: action.data,
                isAuthenticated: !!action.token
            };

        case LOGOUT_USER:
            //============ Clear Local Storage ==========
            localStorage.clear();
            return {
                token: null,
                user: {},
                isAuthenticated: false
            };

        case ADJUST_LOADER:
            return {
                ...state,
                showLoader: action.status
            }

        case UPDATE_NOTIFICATION_SOCKET:
            return {
                ...state,
                updateSocket: action.status
            }

        case ACTIVE_LINK_UPDATE:
            return {
                ...state,
                activeLink: action.link
            }

        case SIDE_BAR_UPDATE:
            return {
                ...state,
                sideBarStatus: action.status
            }
    }

    return state;
}