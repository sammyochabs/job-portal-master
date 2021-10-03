import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { RouteNames } from '../../constants/RouteNames';
import DefaultStructure from '../../layouts/defaultStructure';
import Bredcrumb from '../../reuseable/Bredcrumb';
import ChatRoom from './components/ChatRoom';
import { toggleLoader } from '../../store/actions/auth';
import { getUserChatingRoom, startChatRoom } from '../../store/actions/chat';
import { toast } from 'react-toastify';

function UserChat() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [userChats, setUserChats] = useState([]);
    const [currentChat, setCurrentChat] = useState({});
    const [isActive, setIsActive] = useState(false);
    const [roomId, setRoomId] = useState(null);
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserPic, setCurrentUserPic] = useState(null);
    //const [search, setSearch] = useState('');

    const [redirect, setRedirect] = useState(false);

    const userReauthenticate = ({ message }) => {
        toast.error(message, {
            onOpen: () => setRedirect(true)
        });
    }

    useEffect(() => {
        dispatch(toggleLoader(true));
        getUserChatingRoom(id).then(res => {
            dispatch(toggleLoader(false));
            if (!res.error) {
                if (res.data && res.data.length > 0)
                    setUserChats(res.data);
                if (res.data && res.data.length > 0 && res.data[0] && res.data[0].chats) {
                    
                    const { is_active, chats, user } = res.data[0];
                    setCurrentChat(is_active ? chats : []);
                    setCurrentUserName(user && user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : '');
                    setCurrentUserPic(user && user.profile_picture ? user.profile_picture : null);

                }
                startChatRoom(id).then(resp => {

                    if (!resp.error) {

                        const { data } = resp.data;
                        setRoomId(data && data._id ? data._id : null);
                        setIsActive(data && data.is_active ? data.is_active : false);

                    }

                })
            }
            if (res.redirect)
                userReauthenticate(res);

        });

    }, []);

    //console.log(userChats);

    const _currentItemHandler = (userData) => {
        //console.log('CU', userData);
        setRoomId(userData._id);
        setCurrentChat(userData.chats && userData.chats.length > 0 ? userData.chats : []);
        setIsActive(userData.is_active);
        setCurrentUserName(userData.user && userData.user.first_name && userData.user.last_name ? `${userData.user.first_name} ${userData.user.last_name}` : '');
        setCurrentUserPic(userData.user && userData.user.profile_picture ? userData.user.profile_picture : null);
    }

    if (redirect)
        return <Redirect to="/login" />

    return (
        <DefaultStructure pageTitle='User Chat Section'>
            <Bredcrumb
                leading={{ title: 'User Chat List', url: RouteNames.userChatList }}
                trailing={{ title: 'Chat', url: '#' }}
            />

            <div className="user-chat-hlder">
                <div className="cht-list-hlder">
                    <div className="cht-list-header">
                        {/* <input
                            type="search"
                            placeholder="Search chat"
                            value={search}
                            onChange={_chatListSearchHandler}
                        /> */}
                    </div>
                    <ul className="cht-list-ul">
                        {
                            userChats && userChats.length > 0 && userChats.map((uChat, index) =>
                                <ChatRoom.SearchItem
                                    onClick={_currentItemHandler}
                                    key={index}
                                    chatData={uChat}
                                />
                            )
                        }
                    </ul>

                </div>
                <ChatRoom.Message
                    chat={currentChat}
                    roomId={roomId}
                    activeChat={isActive}
                    currentUserName={currentUserName}
                    currentUserPic={currentUserPic}
                    appUser={id}
                />
            </div>

        </DefaultStructure>
    )
}

export default UserChat;
