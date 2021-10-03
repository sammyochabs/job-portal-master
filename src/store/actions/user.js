import HttpRequest from './HttpRequest';

export const getUsers = async( roles ) =>{
    try{
        const result = await ( new HttpRequest() ).postData('users', roles);

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

export const getUserById = async( id ) =>{
    try{
        const result = await ( new HttpRequest() ).getData(`user/${id}`);

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

export const addNewUser = async( data ) =>{
    try{
        const result = await ( new HttpRequest() ).postData('user/save', data);
        
        if( !result.error ){
            return {
                error: false,
                data: result.data,
                message: 'User added successfully.'
            }
        }

        if( result.redirect )
            return result;

        // if( result.error ){
        //     console.log('Test', result.message);
        // }

        return result;

    }catch( error ){
        return {
            error: true,
            data: null,
            message: 'User can not be added.'
        }
    }
}

export const updateUser = async( data ) =>{
    try{
        const result = await ( new HttpRequest() ).postData('user/update', data);

        console.log("RR",result);

        if( !result.error ){
            return {
                error: false,
                data: result.data,
                message: 'User updated successfully.'
            }
        }

        if( result.redirect )
            return result;

        return result;

    }catch( error ){
        return {
            error: true,
            data: null,
            message: 'User can not be updated.'
        }
    }
}

export const getBranches = async () =>{
    try{
        const result = await ( new HttpRequest() ).getData(`master/branch/all`);

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