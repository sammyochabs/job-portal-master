import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteNames } from '../../../constants/RouteNames';
import BaseList from '../../../reuseable/BaseList';
import Item from './components/Item';
import { getCities, getSkills } from '../../../store/actions/master';
import { toggleLoader } from '../../../store/actions/auth';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import BasePagination from '../../../reuseable/BasePagination';

function SkillList() {
    const HeadingTitle = [
        'Name',
        'aciton'
    ];

    const [getSkillsData, setSkillsData] = useState([]);
    const dispatch = useDispatch();
    const [pageInfo, setPageInfo] = useState({});

    const _loadMoreItems = (filter = {}) => {
        dispatch(toggleLoader(true));
        getSkills(filter).then(response => {
            dispatch(toggleLoader(false));
            if (!response.error){
                setSkillsData(response.data);
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
            addButton={RouteNames.skillAdd}
            listHeading={HeadingTitle}
            pageTitle='Cities'
            pagination={<BasePagination
                pages={pageInfo}
                onPaginate={_loadMoreItems}
            />}
        >
            { getSkillsData.length > 0 ? getSkillsData.map(skillVal => <Item key={skillVal._id} data={skillVal} />)
                : <tr>
                    <td colSpan={6} className="text-center">
                        <span className="name">No Data found</span>
                    </td>
                </tr>
            }
        </BaseList>
    )
}

export default SkillList
