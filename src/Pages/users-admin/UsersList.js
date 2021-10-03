import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteNames } from '../../constants/RouteNames';
import BaseList from '../../reuseable/BaseList';
import Item from './components/Item';
import { getUsers } from '../../store/actions/user';
import { toggleLoader } from '../../store/actions/auth';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import BasePagination from '../../reuseable/BasePagination';

function UserList() {
    const HeadingTitle = [
        'First Name',
        'Last Name',
        'Email',
        'Phone',
        'Role',
        'aciton'
    ];
    
    const [ users, setUsers ] = useState( [] );
    const dispatch = useDispatch();
    const [pageInfo, setPageInfo] = useState({});
    const [redirect, setRedirect] = useState( false );
    const userReauthenticate = ({ message }) =>{
        toast.error(message, {
            onOpen: () => setRedirect( true ) 
        });
    }

    useEffect(() => {
        
        _loadMoreItems();

    }, []);

    const _loadMoreItems = (filter = {}) =>{
        dispatch( toggleLoader( true ) );
        getUsers({ ...filter, roles:["super_admin","admin"] }).then( response => {
            dispatch( toggleLoader( false ) );
            if( !response.error ){
                setUsers( response.data.data );
                if( response.data.extra )
                    setPageInfo(response.data.extra);
            }
            if( response.redirect )
                userReauthenticate( response );
        });
    }

    //console.log(users);

    if( redirect )
        return <Redirect to="/login"/>
    
    return (
        <BaseList 
            addButton={RouteNames.adminUserAdd}
            listHeading={HeadingTitle}
            pageTitle='Admin User List'
            pagination={<BasePagination
                pages={pageInfo}
                onPaginate={_loadMoreItems}
            />}
        >
            { users.length > 0 ? users.map(user => <Item key={user._id} data={user} />)
                : <tr>
                        <td colSpan={6} className="text-center">
                            <span className="name">No Data found</span>
                        </td> 
                    </tr>
            }
        </BaseList>
    )
}

export default UserList
