import HttpRequest from './HttpRequest';

export const getAllNotifications = async ( uId ) =>{
    try{
        
        const result = await ( new HttpRequest() ).postData('user/push/notifications', { user_id: uId, is_admin: true });
        
        if( !result.error ){
            return result
        }

        if( result.redirect )
            return result;

        throw new Error( result.message );

    }catch( error ){
        return {
            error: true,
            data: null,
            message: error
        }
    }
}

export const markAsReadById = async ( ids ) =>{
    try{
        
        const result = await ( new HttpRequest() ).postData(`user/push/notification/read`, {ids: [ ...ids ] });
        
        if( !result.error ){
            return result
        }

        if( result.redirect )
            return result;

        throw new Error( result.message );

    }catch( error ){
        return {
            error: true,
            data: null,
            message: error
        }
    }
}