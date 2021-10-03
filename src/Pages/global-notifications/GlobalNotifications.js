import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { toggleLoader } from '../../store/actions/auth';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import DefaultStructure from '../../layouts/defaultStructure';
import { getUsers, sendNotification } from '../../store/actions/globalNotification';
import Filter from './components/Filter';
import UserList from './components/UserList';

function GlobalNotifications(props) {
    
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState( false );
    const [users, setUsers] = useState([]);
    const [clearData, setClearData] = useState( false );
    const [data, setData] = useState({
        user_ids: [],
        notification_text: ''
    });
    
    const userReauthenticate = ({ message }) =>{
        toast.error(message, {
            onOpen: () => setRedirect( true ) 
        });
    }

    const _notificationHandler = ({ target: { value }}) =>{
        setData(prevData => ({
            ...prevData,
            notification_text: value
        }));
    }

    const _filterAppUser = (filterData) =>{
        dispatch( toggleLoader( true ) );
        getUsers(filterData).then(res => {
            dispatch( toggleLoader( false ) );
            if(!res.error){
                setUsers( res.data );
            }
        })
    }

    const _onSelection = (data) =>{
        setData(prevData => ({
            ...prevData,
            user_ids: [ ...data ]
        }));
    }

    const _clearData = () => {
        setClearData( true );
        setData({
            user_ids: [],
            notification_text: ''
        });
        setUsers([]);
    }

    const _submitHandler = (ev) =>{
        if( data.user_ids.length > 0 ){
            if(data.notification_text !== ''){
                dispatch( toggleLoader( true ) );
                sendNotification(data).then(res => {
                    dispatch( toggleLoader( false ) );
                    if( !res.error ){
                        toast.success('Notification sent successfully.', {
                            onOpen : () => _clearData()
                        });

                    }
                })
            }
            else
                toast.error('Notification text is required.'); 
        }else{
            toast.error('At-lest one user need to be selected.');
        }
    }
    
    if( redirect )
        return <Redirect to="/login"/>
    

    return (
        <DefaultStructure pageTitle="Global Notification">
            <div className="activity_filter_wrp notification-frm-filter">
                <Filter onFilter={_filterAppUser} clearData={clearData}/>
                <div className="form-inline two-fold">
                    <div className="form-group">
                        <textarea 
                            placeholder="Notification Text Box"
                            value={data.notification_text}
                            onChange={_notificationHandler}
                        ></textarea>
                    </div>

                    <div className="form-group">
                    <input 
                            type="submit" 
                            value="Send" 
                            className="commn-btn"
                            onClick={_submitHandler}
                        />
                    </div>
                </div>
               
            </div>

            <UserList users={users} onSelect={_onSelection} clearData={clearData}/>   
            
        </DefaultStructure>
    )
}

export default GlobalNotifications;
