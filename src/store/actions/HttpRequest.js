import { BASE_API_URL } from '../../constants/api-config';
import { Helper } from '../../helpers/helper';


class HttpRequest {

    constructor() {
        this.headerWithToken = {
            'Content-Type': 'application/json',
            'x-access-token': Helper.getToken()
        };

        this.headerWithTokenForFile = {
            'x-access-token': Helper.getToken()
        }

        this.header = {
            'Content-Type': 'application/json',
        };
    }

    static headers() {
        return
    }

    async getData(url, withPagination = false) {
        try {
            const response = await fetch(`${BASE_API_URL}${url}`, {
                headers: this.headerWithToken,
                method: 'GET'
            });

            const result = await response.json();

            if (result.success) {
                return {
                    error: false,
                    data: withPagination ? result : result.data
                };
            }

            if (!result.auth && result.token_expired) {
                this.clearLocalStroage();
                return {
                    error: true,
                    message: result.message,
                    redirect: true
                }
            }

            throw new Error('Some thing went wrong..');

        } catch (error) {
            console.log(error.message);
            return {
                error: true,
                data: null,
                message: error
            }
        }
    }

    async postData(url, postData, login = false) {
        try {
            //console.log( postData );
            const response = await fetch(`${BASE_API_URL}${url}`, {
                headers: login ? this.header : this.headerWithToken,
                method: 'POST',
                body: JSON.stringify(postData)
            });

            const result = await response.json();

            if (result.success) {
                return {
                    error: false,
                    data: result
                }
            }

            if (!result.auth && result.token_expired) {
                this.clearLocalStroage();
                return {
                    error: true,
                    message: result.message,
                    redirect: true
                }
            }

            if( !result.success ){
                return {
                    error: true,
                    message: result.message
                }
            }


            return {
                error: true,
                data: null,
                message: 'Some thing went wrong.'
            }


        } catch (error) {
            //console.log(error.message);
            return {
                error: true,
                data: null,
                message: 'Some thing went wrong.'
            }
        }
    }

    async postDataWithFiles(url, postData, method) {
        try {
            const result = await (await fetch(`${BASE_API_URL}${url}`, {
                headers: this.headerWithTokenForFile,
                method: method || 'POST',
                body: postData
            })).json();

            if(result.success){
                return {
                    error: false,
                    data: result.data
                }
            }

            return {
                error: true,
                data: null
            }

        } catch (error) {
            console.log(error);
            return {
                error: true,
                data: null
            }
        }
    }

    async patchData(url, postData) {
        try {

            const response = await fetch(`${BASE_API_URL}${url}`, {
                headers: HttpRequest.headers,
                method: 'PATCH',
                body: JSON.stringify(postData)
            });

            const result = await response.json();



        } catch (error) {
            console.log(error);
        }
    }

    async deleteData(url) {
        try {
            const response = await fetch(`${BASE_API_URL}${url}`, {
                method: 'DELETE',
                headers: HttpRequest.headers
            });

            //console.log('Test DELETE', response );

            const result = await response.json();

            //console.log('Test DELETE', result );

        } catch (error) {
            console.log(error);
        }
    }

    clearLocalStroage(){
        localStorage.clear();
    }
}

export default HttpRequest;