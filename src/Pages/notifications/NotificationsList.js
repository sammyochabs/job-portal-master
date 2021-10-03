import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { RouteNames } from '../../../constants/RouteNames';
import BaseList from '../../reuseable/BaseList';
import Item from './components/Item';
import { getAllNotifications, markAsReadById } from '../../store/actions/notifications';
import { toggleLoader, triggerNotificationSocket } from '../../store/actions/auth';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

function NotificationsList() {
    const HeadingTitle = [
        '',
        'Date',
        'Notification Msg',
        'Action'
    ];

    const [ notifications, setNotifications ] = useState( [] );
    const [selectedList, setSelectedList] = useState( [] );
    const [allSelected, setAllSelected] = useState( false );
    const [allChecked, setAllChecked] = useState(false);
    const [ isRead, setIsRead ] = useState( [] );

    const dispatch = useDispatch();
    const updateSocket = useSelector(state => state.auth.updateSocket);
    const user = useSelector( state => state.auth.user );
    const [redirect, setRedirect] = useState( false );
    
    const userReauthenticate = ({ message }) =>{
        toast.error(message, {
            onOpen: () => setRedirect( true ) 
        });
    }

    useEffect(() => {
        dispatch( toggleLoader( true ) );
        getAllNotifications( user._id ).then( response => {
            dispatch( toggleLoader( false ) );
            //console.log( response );
            if( !response.error )
                setNotifications( response.data && response.data.data ? response.data.data : [] );
            if( response.redirect )
                userReauthenticate( response );
        });

    }, []);

    const _updateSelection = async( selectedValue, isAddedToList ) =>{
        let _currentSelection = selectedList.length;
        
        if( isAddedToList && !selectedList.includes( selectedValue ) ){
            _currentSelection += 1;
            await setSelectedList(prevList => [...prevList, selectedValue ]);
        }
        if( !isAddedToList ){
            _currentSelection -= 1;
            const index = selectedList.indexOf( selectedValue );            
            selectedList.splice(index, 1);
            await setSelectedList( [ ...selectedList ] );
            setAllChecked(false);
        }
        
        if( _currentSelection === notifications.length ){
            setAllSelected( true );
            setAllChecked(true);
        }
        if( _currentSelection === 0 ){
            setAllSelected( false );
            setAllChecked(false);
        }
            
    }

    const _selectAllHandler = async({target: { checked }}) =>{
        
        await setAllSelected( checked );
        let selectionList = [];

        setAllChecked(checked);
        
        if( notifications.length > 0 && checked ){
            notifications.forEach( data => selectionList.push( data._id) );
            await setSelectedList( [ ...selectionList ] );
        }else{
            await setSelectedList( [] );
        }
    }

    const _multiselectActionHandler = () =>{
        if( selectedList.length > 0 ){
            dispatch( toggleLoader( true ) );
            markAsReadById( [ ...selectedList ] ).then(result =>{
            
                if( !result.error ){
                    dispatch( toggleLoader( false ) );
                    setIsRead( [ ...selectedList] );
                    dispatch( triggerNotificationSocket( !updateSocket ) );
                    setSelectedList( [] );
                    toast.success( result.data.data, { onOpen: () => setAllSelected(false)} );
                }
                if( result.redirect )
                    userReauthenticate( result );
            })
        }
    }

    const MultiSelection = () =>{
        return (
            <>
                <input 
                    type="checkbox"
                    checked={allChecked}
                    value="all_select"
                    onChange={_selectAllHandler}
                />

                All
            </>
        )
    }

    if( redirect )
        return <Redirect to="/login"/>
    
    return (
        <BaseList 
            listHeading={HeadingTitle}
            pageTitle='Notifications'
            multiselect={<MultiSelection/>}
            multiselectTitle="Mark all as read"
            multiSelectAction={_multiselectActionHandler}
        >
            { notifications.length > 0 ? notifications.map(item => 
                <Item 
                    key={item._id} 
                    data={item} 
                    onSelection={_updateSelection} 
                    allSelected={allSelected}
                    isReadCompleted={isRead} 
                />)
                : <tr>
                        <td colSpan={4} className="text-center">
                            <span className="name">No Data found</span>
                        </td> 
                    </tr>
            }
        </BaseList>
    )
}

export default NotificationsList;
