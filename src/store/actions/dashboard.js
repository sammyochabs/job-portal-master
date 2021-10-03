import HttpRequest from './HttpRequest';

export const getReports = async (params = {} ) => {
    try {
        const _params = new URLSearchParams(params).toString();
        
        let _q = '';

        if(_params)
            _q = _params ? `?${_params}` : '';

        const result = await (new HttpRequest()).getData(`report/counts${_q}`);

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

export const getQueryChart = async (params = {} ) => {
    try {
        const _params = new URLSearchParams(params).toString();
        
        let _q = '';

        if(_params)
            _q = _params ? `?${_params}` : '';

        const result = await (new HttpRequest()).getData(`report/query/chart${_q}`);

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

export const getBusinessChart = async (params = {} ) => {
    try {
        const _params = new URLSearchParams(params).toString();
        
        let _q = '';

        if(_params)
            _q = _params ? `?${_params}` : '';

        const result = await (new HttpRequest()).getData(`report/business-volume/chart${_q}`);

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

export const getResponseTimeChart = async (params = {} ) => {
    try {
        const _params = new URLSearchParams(params).toString();
        
        let _q = '';

        if(_params)
            _q = _params ? `?${_params}` : '';

        const result = await (new HttpRequest()).getData(`report/query/response/chart${_q}`);

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
