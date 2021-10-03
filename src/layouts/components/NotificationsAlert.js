import React, { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import { BASE_SOCKET_ENDPOINT } from '../../constants/api-config';
import { triggerNotificationSocket } from '../../store/actions/auth';

function NotificationsAlert() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const updateSocket = useSelector(state => state.auth.updateSocket);
    const [count, setCount] = useState(0);
    const [msgs, setMsgs] = useState([]);
    const socket = socketIOClient(BASE_SOCKET_ENDPOINT/*, {transports: ['websocket'], secure: true}*/);

    const _natificationHandler = (ev) => {
        ev.preventDefault();
        setOpen(oldData => !oldData);
    }

    useEffect(() => {

        if (user && user._id) {
            //console.log(user._id);
            setIsLoading(true);
            socket.emit('newnotification', { user_id: user._id });

            socket.on("sentnotification", res => {
                //console.log('RES',res );
                if (updateSocket)
                    dispatch(triggerNotificationSocket(!updateSocket));
                if (res) {
                    const { data } = res;

                    setIsLoading(false);
                    setCount(res.count ? res.count : 0);
                    setMsgs(data && data.length > 0 ? data : []);

                }
            });
        }

        return () => socket.disconnect();
    }, [updateSocket]);

    return (
        <>
            <a className="icon notifictn-a " href="#" onClick={_natificationHandler}>
                <i className="fa fa-bell" aria-hidden="true"></i>
                {count > 0 && <span className={isLoading ? "count _countLoading" : "count"}>{count}</span>}
            </a>
            {
                msgs && msgs.length > 0 &&
                <div className={open ? "header-nofictn-hlder open" : "header-nofictn-hlder"}>
                    <ul className="header-nofictn-ul">
                        {
                            msgs.map(msg =>
                                <li key={msg._id}>{msg.notification_text}</li>
                            )
                        }
                    </ul>
                </div>
            }
        </>

    )
}

export default NotificationsAlert;
