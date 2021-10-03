import HttpRequest from './HttpRequest';

export const sendNotification = async ( postData ) => {
    try {
        
        const result = await (new HttpRequest()).postData(`custom/pushnotification/send`, postData);

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

export const getUsers = async(params = {}) =>{
    try {
        const _params = serialize(params);
        let _q =  _params ? `?${_params}` : '';

        const result = await (new HttpRequest()).getData(`custom-pushnotification/get-users${_q}`);

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
            message: 'Something went wrong'
        }
    }
}

const serialize = function(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
          //console.log(p);
          if( p === 'user_ids')
            str.push(encodeURIComponent(p) + "=" + obj[p]);
          else
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
  
