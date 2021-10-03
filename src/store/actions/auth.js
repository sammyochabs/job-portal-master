import HttpRequest from './HttpRequest';

export const LOGIN_USER = 'login_user';
export const LOGOUT_USER = 'logout_user';

export const ADJUST_LOADER = 'adjust_loader';

export const UPDATE_NOTIFICATION_SOCKET = 'update_notification_socket';

export const ACTIVE_LINK_UPDATE = 'active_link_update';

export const SIDE_BAR_UPDATE = 'side_bar_update';

const _http = new HttpRequest();

export const userLogin = (data) => {
    return async dispatch => {
        try {
            const response = await _http.postData('auth/login', data, true);

            if (!response.error) {
                return dispatch({
                    type: LOGIN_USER,
                    data: response.data && response.data.user ? response.data.user : {},
                    token: response.data && response.data.token ? response.data.token : null,
                    error: false,
                    message: response.data && response.data.message ? response.data.message : 'Action successfull.'
                });
            }

            return dispatch({
                type: LOGIN_USER,
                data: {},
                token: null,
                error: true,
                message: 'Authentication failed.'
            });

        } catch (error) {
            return dispatch({
                type: LOGIN_USER,
                data: {},
                token: null,
                error: true,
                message: 'Authentication failed.'
            });
        }
    }
}

export const logoutUser = () => {

    return dispatch => {
        return dispatch({ type: LOGOUT_USER });
    }
}

export const toggleLoader = (status) => {
    return dispatch => {
        return dispatch({ type: ADJUST_LOADER, status });
    }
}

export const triggerNotificationSocket = (status) => {
    return dispatch => {
        return dispatch({ type: UPDATE_NOTIFICATION_SOCKET, status });
    }
}

export const adjustSideBar = (status) => {
    return dispatch => {
        return dispatch({ type: SIDE_BAR_UPDATE, status });
    }
}

export const resetPassword = async(email) =>{
    try {

        const result = await _http.postData(`auth/generatePassword`, email, true);

        if (!result.error) {
            return result
        }

        if (result.redirect)
            return result;

        throw new Error(result.message);

    } catch (error) {
        return {
            error: true,
            data: null,
            message: error
        }
    }
}

