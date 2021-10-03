import HttpRequest from './HttpRequest';
import { Helper } from '../../helpers/helper';

export const getUserActiveChats = async (params = {}) => {
    try {
        let query = '';
        if (Object.keys(params).length > 0) 
            query = Helper.queryString(params);

        const _q = query ? `?${query}` : '';
        //const _q = '?skip=2';
        
        const result = await (new HttpRequest()).getData(`get/rooms/list${_q}`, true);

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


export const getUserChatingRoom = async (id) => {
    try {

        const result = await (new HttpRequest()).getData(`rooms/${id}`);

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

export const startChatRoom = async (id) => {
    try {

        const result = await (new HttpRequest()).postData(`room/save`, { user_id: id });

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

export const closeChatRoom = async (id) => {
    try {

        const result = await (new HttpRequest()).postData(`room/update`, { _id: id, is_active: false });

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

