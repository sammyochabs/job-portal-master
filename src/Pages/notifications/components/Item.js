import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import FadeableToolTips from '../../../reuseable/FadeableToolTips';
import { markAsReadById } from '../../../store/actions/notifications';
import { toggleLoader, triggerNotificationSocket } from '../../../store/actions/auth';

const Item = ({ data, onSelection, allSelected, isReadCompleted }) => {

    const dispatch = useDispatch();
    const updateSocket = useSelector(state => state.auth.updateSocket);
    const [ isRead, setIsRead ] = useState( data.read_at === null ? false : true );
    const [redirect, setRedirect] = useState( false );
    const [selected, setSelected] = useState( false );
    
    const userReauthenticate = ({ message }) =>{
        toast.error(message, {
            onOpen: () => setRedirect( true ) 
        });
    }

    useEffect(() => {
        setSelected( allSelected );
        if( isReadCompleted && isReadCompleted.length > 0 && isReadCompleted.includes(data._id))
            setIsRead( true );
    }, [allSelected, isReadCompleted])

    const _markAsReadHandler = ( ev ) =>{
        ev.preventDefault();
        dispatch( toggleLoader( true ) );
        //console.log( data._id );
        markAsReadById( [data._id] ).then(result =>{
            
            if( !result.error ){
                dispatch( toggleLoader( false ) );
                setIsRead( true );
                dispatch( triggerNotificationSocket( !updateSocket ) );
                toast.success( result.data.data );
            }
            if( result.redirect )
                userReauthenticate( result );
        });
    }

    const _multiSelectHandler = ({target: { checked, value }}) =>{
        setSelected( checked );
        onSelection(value, checked);
    }
    
    if( !data )
        return (
            <tr>
                <td colSpan={3}>
                    <span className="name">No Data found</span>
                </td> 
            </tr>
        );

    if( redirect )
        return <Redirect to="/login"/>

    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    value={data._id}
                    checked={selected}
                    onChange={_multiSelectHandler}
                />
            </td>
            <td>
                <span className="name">
                    { moment(data.created_at).format('DD-MM-YYYY') }
                    {
                        data && data.read_at === null &&
                        <FadeableToolTips message="New" duration={2000}/>
                    }
                </span>
            </td>
            <td>
                <span className="msg">{ data.notification_text }</span>
            </td>
            <td>
                <div className="more"> 
                {
                    !isRead ?
                    <a href="#" onClick={_markAsReadHandler} >Mark As Read</a>
                    : <span> Read </span>
                }
                </div>
            </td> 
        </tr>
    )
}

export default Item;
