import HttpRequest from "./HttpRequest";
//=========== Shipping Line ====================
export const getShippingLines = async () => {
    try {

        const result = await (new HttpRequest()).getData('master/linenames');

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

export const getShippingLineById = async (id) => {
    try {
        const result = await (new HttpRequest()).getData(`master/linename/${id}`);
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

export const addShippingLine = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('master/linename/save', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Shipping line added successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Shipping line can not be added.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Shipping line can not be added.'
        }
    }
}

export const updateShippingLine = async (data) => {
    try {
        const result = await (new HttpRequest()).postData('master/linename/update', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Shipping line updated successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Shipping line can not be updated.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Shipping line can not be updated.'
        }
    }
}

//================= Material Type ==============

export const getMaterialTypes = async () => {
    try {

        const result = await (new HttpRequest()).getData('master/materialtype/all');

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

export const getMaterialTypeById = async (id) => {
    try {
        const result = await (new HttpRequest()).getData(`master/materialtype/get/${id}`);
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

export const addMaterialType = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('master/materialtype/save', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Material type added successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Material type can not be added.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Material type can not be added.'
        }
    }
}

export const updateMaterialType = async (data) => {
    try {
        const result = await (new HttpRequest()).postData('master/materialtype/update', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Material type updated successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Material type can not be updated.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Material type can not be updated.'
        }
    }
}

//============= Weight Unit ==================

export const getWeightUnits = async () => {
    try {

        const result = await (new HttpRequest()).getData('master/weightunit/all');

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

export const getWeightUnitById = async (id) => {
    try {
        const result = await (new HttpRequest()).getData(`master/weightunit/get/${id}`);
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

export const addWeightUnit = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('master/weightunit/save', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Weight unit added successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Weight unit can not be added.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Weight unit can not be added.'
        }
    }
}

export const updateWeightUnit = async (data) => {
    try {
        const result = await (new HttpRequest()).postData('master/weightunit/update', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Weight unit updated successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Weight unit can not be updated.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Weight unit can not be updated.'
        }
    }
}

//============= Container Size ==================

export const getContainerSizes = async () => {
    try {

        const result = await (new HttpRequest()).getData('master/containersize/all');

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

export const getContainerSizeById = async (id) => {
    try {
        const result = await (new HttpRequest()).getData(`master/containersize/get/${id}`);
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

export const addContainerSize = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('master/containersize/save', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Container type added successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Container type can not be added.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Container type can not be added.'
        }
    }
}

export const updateContainerSize = async (data) => {
    try {
        const result = await (new HttpRequest()).postData('master/containersize/update', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Container type updated successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Container type can not be updated.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Container type can not be updated.'
        }
    }
}

//============= Dispatch Medium ==================

export const getDispatchMediums = async () => {
    try {

        const result = await (new HttpRequest()).getData('master/dispatchmedium/all');

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

export const getDispatchMediumById = async (id) => {
    try {
        const result = await (new HttpRequest()).getData(`master/dispatchmedium/get/${id}`);
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

export const addDispatchMedium = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('master/dispatchmedium/save', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Mode of Transport added successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Mode of Transport can not be added.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Mode of Transport can not be added.'
        }
    }
}

export const updateDispatchMedium = async (data) => {
    try {
        const result = await (new HttpRequest()).postData('master/dispatchmedium/update', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Mode of Transport updated successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Mode of Transport can not be updated.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Mode of Transport can not be updated.'
        }
    }
}

export const getBranchById = async (id) => {
    try {
        const result = await (new HttpRequest()).getData(`master/branch/get/${id}`);
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

export const addBranch = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('master/branch/save', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Branch added successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Branch can not be added.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Branch can not be added.'
        }
    }
}

export const updateBranch = async (data) => {
    try {
        const result = await (new HttpRequest()).postData('master/branch/update', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Branch updated successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Branch can not be updated.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Branch can not be updated.'
        }
    }
}

/*** city section */
export const getCities = async () => {
    try {
        const result = await (new HttpRequest()).getData(`common/cities`);
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

export const addCity = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('common/city', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'City added successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'City can not be added.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'City can not be added.'
        }
    }
}

export const getCityById = async (id) => {
    try {
        const result = await (new HttpRequest()).getData(`common/get-city/${id}`);
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

export const updateCity = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('common/city/update', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'City updated successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'City can not be updated.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'City can not be updated.'
        }
    }
}

/** End city Section */

/** Skill section */

export const getSkills = async () => {
    try {
        const result = await (new HttpRequest()).getData(`common/skills`);
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

export const addSkill = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('common/skill', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Skill added successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Skill can not be added.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Skill can not be added.'
        }
    }
}

export const getSkillById = async (id) => {
    try {
        const result = await (new HttpRequest()).getData(`common/get-skill/${id}`);
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

export const updateSkill = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('common/skill/update', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Skill updated successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Skill can not be updated.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Skill can not be updated.'
        }
    }
}


/** End skill section */

/** Start Education section */

export const getEducation = async () => {
    try {
        const result = await (new HttpRequest()).getData(`common/education-qualifications`);
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

export const addEducation = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('common/education-qualification', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Education added successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Education can not be added.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Education can not be added.'
        }
    }
}

export const getEducationById = async (id) => {
    try {
        const result = await (new HttpRequest()).getData(`common/get-education-qualification/${id}`);
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

export const updateEducation = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('common/education-qualification/update', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Skill updated successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Skill can not be updated.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Skill can not be updated.'
        }
    }
}


/** Education section */

/** Company section */

export const getCompanyTypes = async () => {
    try {
        const result = await (new HttpRequest()).getData(`common/company-types`);
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

export const addCompanyTypes = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('common/company-type', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Company Type added successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Company Type can not be added.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Company Type can not be added.'
        }
    }
}

export const getCompanyTypeById = async (id) => {
    try {
        const result = await (new HttpRequest()).getData(`common/get-company-type/${id}`);
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

export const updateCompanyType = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('common/company-type/update', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Company updated successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Company can not be updated.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Company can not be updated.'
        }
    }
}

/** End Company Type section */

export const getStates = async () => {
    try {
        const result = await (new HttpRequest()).getData(`common/states`);
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

export const getStatesById = async (id) => {
    try {
        const result = await (new HttpRequest()).getData(`common/get-state/${id}`);
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

export const addStates = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('common/state', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'State added successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'State can not be added.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'State can not be added.'
        }
    }
}

export const updateState = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('common/state/update', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'State updated successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'State can not be updated.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'State can not be updated.'
        }
    }
}



export const getCitiesByState = async (stateId) => {
    try {
        const result = await (new HttpRequest()).getData(`master/cities/${stateId}`);
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

//============= Master Status ==================

export const getStatus = async () => {
    try {

        const result = await (new HttpRequest()).getData('master/statuses');

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
/*
export const getBranchById = async ( id ) =>{
    try{
        const result = await ( new HttpRequest() ).getData(`master/branch/get/${id}`);
        if( !result.error ){
            return result
        }

        throw new Error( result.message );

    }catch( error ){
        return {
            error: true,
            data: null,
            message: error
        }
    }
}
*/
export const addStatus = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('master/statuses/save', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Status added successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Status can not be added.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Status can not be added.'
        }
    }
}
/*
export const updateBranch = async ( data ) =>{
    try{
        const result = await ( new HttpRequest() ).postData('master/branch/update', data);

        if( !result.error ){
            return {
                error: false,
                data: result.data,
                message: 'Branch updated successfully.'
            }
        }

        return {
            error: true,
            data: null,
            message: 'Branch can not be updated.'
        }

    }catch( error ){
        return {
            error: true,
            data: null,
            message: 'Branch can not be updated.'
        }
    }
}
*/

//====================== Faq section ===========

export const getFaqs = async () => {
    try {

        const result = await (new HttpRequest()).getData('master/faqs');

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

export const getFaqById = async (id) => {
    try {
        const result = await (new HttpRequest()).getData(`master/faq/${id}`);
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

export const addFaq = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('master/faq/save', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Faq added successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Faq can not be added.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Faq can not be added.'
        }
    }
}

export const updateFaq = async (data) => {
    try {
        const result = await (new HttpRequest()).postData('master/faq/update', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Faq updated successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Faq can not be updated.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Faq can not be updated.'
        }
    }
}

//====================== Product section ===========

export const getProducts = async () => {
    try {

        const result = await (new HttpRequest()).getData('master/products/all');

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

export const getProductById = async (id) => {
    try {
        const result = await (new HttpRequest()).getData(`master/product/get/${id}`);
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

export const addProduct = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('master/product/save', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Product added successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Product can not be added.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Product can not be added.'
        }
    }
}


export const updateProduct = async (data) => {
    try {
        const result = await (new HttpRequest()).postData('master/product/update', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Product updated successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Product can not be updated.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Product can not be updated.'
        }
    }
}

//================ Weight Range Section ====================
export const getWeightRanges = async () => {
    try {

        const result = await (new HttpRequest()).getData('master/weight-range/all');

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

export const getWeightRangeById = async (id) => {
    try {
        const result = await (new HttpRequest()).getData(`master/weight-range/get/${id}`);
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

export const addWeightRange = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('master/weight-range/save', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Weight range added successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Weight range can not be added.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Weight range can not be added.'
        }
    }
}

export const updateWeightRange = async (data) => {
    try {
        const result = await (new HttpRequest()).postData('master/weight-range/update', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Weight range updated successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Weight range can not be updated.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Weight range can not be updated.'
        }
    }
}
//==================== Tracking Section ==================
export const getTrackings = async () => {
    try {

        const result = await (new HttpRequest()).getData('master/tracking-status');

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

export const getTrackingById = async (id) => {
    try {
        const result = await (new HttpRequest()).getData(`master/tracking-status/${id}`);
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

export const addTracking = async (data) => {
    try {

        const result = await (new HttpRequest()).postData('master/tracking-status/save', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Tracking added successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Tracking can not be added.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Tracking can not be added.'
        }
    }
}

export const updateTracking = async (data) => {
    try {
        const result = await (new HttpRequest()).postData('master/tracking-status/update', data);

        if (!result.error) {
            return {
                error: false,
                data: result.data,
                message: 'Tracking updated successfully.'
            }
        }

        if (result.redirect)
            return result;

        return {
            error: true,
            data: null,
            message: 'Tracking can not be updated.'
        }

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Tracking can not be updated.'
        }
    }
}



