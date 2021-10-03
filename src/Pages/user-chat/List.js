import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BaseList from '../../reuseable/BaseList';
import { RouteNames } from '../../constants/RouteNames';
import Item from './components/Item';
import { getStatus } from '../../store/actions/master';
import { toggleLoader } from '../../store/actions/auth';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import BasePagination from '../../reuseable/BasePagination';
import { getUserActiveChats } from '../../store/actions/chat';

function UserChatList(props) {

    const HeadingTitle = [
        'User Name',
        'Chat Type',
        'Is Active',
        'aciton'
    ];
    const [status, setStatus] = useState([]);
    const [userChats, setUserChats] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const dispatch = useDispatch();

    const [redirect, setRedirect] = useState(false);
    const userReauthenticate = ({ message }) => {
        toast.error(message, {
            onOpen: () => setRedirect(true)
        });
    }

    useEffect(() => {
        dispatch(toggleLoader(true));
        getStatus().then(resp => {
            dispatch(toggleLoader(false));
            if (!resp.error) {
                setStatus(resp.data);
                _loadMoreItems();
            }
            if (resp.redirect)
                userReauthenticate(resp);
        });
    }, []);

    const _loadMoreItems = (filter = {}) => {
        dispatch(toggleLoader(true));
        //console.log(filter);
        getUserActiveChats(filter).then(response => {
            dispatch(toggleLoader(false));
            //console.log('RR ====== ', response );
            if (!response.error) {
                setUserChats(response.data.data);
                if( response.data.extra )
                    setPageInfo(response.data.extra);
            }
            if (response.redirect)
                userReauthenticate(response);
        });
    }

    if (redirect)
        return <Redirect to="/login" />

    return (
        <BaseList
            //addButton={RouteNames.userChat}
            listHeading={HeadingTitle}
            pageTitle='User Chat List'
            pagination={<BasePagination
                pages={pageInfo}
                onPaginate={_loadMoreItems}
            />}
        >
            { userChats.length > 0 ? userChats.map(consign => <Item status={status} key={consign._id} data={consign} />)
                : <tr>
                    <td colSpan={10} className="text-center">
                        <span className="name">No Data found</span>
                    </td>
                </tr>
            }
        </BaseList>
    )
}

export default UserChatList;
