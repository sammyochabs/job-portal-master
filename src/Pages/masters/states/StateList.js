import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteNames } from '../../../constants/RouteNames';
import BaseList from '../../../reuseable/BaseList';
import Item from './components/Item';
import { getStates } from '../../../store/actions/master';
import { toggleLoader } from '../../../store/actions/auth';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import BasePagination from '../../../reuseable/BasePagination';

function StateList() {
    const HeadingTitle = [
        'Name',
        'aciton'
    ];

    const [getstates, setStates] = useState([]);
    const dispatch = useDispatch();
    const [pageInfo, setPageInfo] = useState({});

    const _loadMoreItems = (filter = {}) => {
        dispatch(toggleLoader(true));
        getStates(filter).then(response => {
            dispatch(toggleLoader(false));
            if (!response.error){
                setStates(response.data);
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
            addButton={RouteNames.stateAdd}
            listHeading={HeadingTitle}
            pageTitle='States'
            pagination={<BasePagination
                pages={pageInfo}
                onPaginate={_loadMoreItems}
            />}
        >
            { getstates.length > 0 ? getstates.map(stateval => <Item key={stateval._id} data={stateval} />)
                : <tr>
                    <td colSpan={6} className="text-center">
                        <span className="name">No Data found</span>
                    </td>
                </tr>
            }
        </BaseList>
    )
}

export default StateList
