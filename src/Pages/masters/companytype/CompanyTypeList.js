import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteNames } from '../../../constants/RouteNames';
import BaseList from '../../../reuseable/BaseList';
import Item from './components/Item';
import { getCities, getSkills, getCompanyTypes } from '../../../store/actions/master';
import { toggleLoader } from '../../../store/actions/auth';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import BasePagination from '../../../reuseable/BasePagination';

function CompanyTypeList() {
    const HeadingTitle = [
        'Name',
        'aciton'
    ];

    const [companyTypesData, setSCompanyTypeData] = useState([]);
    const dispatch = useDispatch();
    const [pageInfo, setPageInfo] = useState({});

    const _loadMoreItems = (filter = {}) => {
        console.log("hello")
        dispatch(toggleLoader(true));
        getCompanyTypes(filter).then(response => {
            dispatch(toggleLoader(false));
            if (!response.error){
                setSCompanyTypeData(response.data);
                if( response.data.extra )
                    setPageInfo(response.data.extra);
            }
            if (response.redirect)
                userReauthenticate(response);
        });
    }

    const [redirect, setRedirect] = useState(false);
    const userReauthenticate = ({ message }) => {
        toast.error(message, {
            onOpen: () => setRedirect(true)
        });
    }

    useEffect(() => {
        _loadMoreItems();
    }, []);

    //console.log(branches);

    if (redirect)
        return <Redirect to="/login" />

    return (
        <BaseList
            addButton={RouteNames.companyTypeAdd}
            listHeading={HeadingTitle}
            pageTitle='Company types'
            pagination={<BasePagination
                pages={pageInfo}
                onPaginate={_loadMoreItems}
            />}
        >
            { companyTypesData.length > 0 ? companyTypesData.map(companyTypeVal => <Item key={companyTypeVal._id} data={companyTypeVal} />)
                : <tr>
                    <td colSpan={6} className="text-center">
                        <span className="name">No Data found</span>
                    </td>
                </tr>
            }
        </BaseList>
    )
}

export default CompanyTypeList
