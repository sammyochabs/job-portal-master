import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import socketIOClient from "socket.io-client";
import { BASE_SOCKET_ENDPOINT } from '../../../constants/api-config';
import { toggleLoader } from '../../../store/actions/auth';
import { closeChatRoom } from '../../../store/actions/chat';

function ChatMessage({ chat, roomId, activeChat, appUser, currentUserName, currentUserPic }) {

    const messagesEndRef = useRef(null);
    const user = useSelector(state => state.auth.user);
    const [hideCloseBtn, setHideCloseBtn] = useState(false);
    const dispatch = useDispatch();
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState('');
    const [msgStart, setMsgStart] = useState(false);
    const socket = socketIOClient(BASE_SOCKET_ENDPOINT /*, { transports: ["websocket"] }*/);

    const [redirect, setRedirect] = useState(false);
    const userReauthenticate = ({ message }) => {
        toast.error(message, {
            onOpen: () => setRedirect(true)
        });
    }

    useEffect(() => {

        setChats(chat && chat.length > 0 ? [...chat] : []);

        socket.on('sentmessage', res => {
            const { data } = res;
            setMsgStart(false);
            if (data && Object.keys(data).length > 0)
                setChats(chatOld => [...chatOld, data]);
                scrollToBottom();
        });
        if( chat && chat.length > 0){
            setTimeout(() => { 
                const lastID = document.getElementById(`chat_${chat.length - 1}`);
                lastID.scrollIntoView({ behavior: "smooth" });
            }, 300)
            
        }
        
        return () => socket.disconnect();

    }, [chat]);

    const _chatMessageHandler = ({ target: { value } }) => {
        setMessage(value);
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }

    const _sendChatMessage = (ev) => {
        ev.preventDefault();
        setMsgStart(true);
        socket.emit("startChat", {
            roomId,
            recipient: appUser,
            sender: user._id,
            message: message
        });
        
        setMessage('');
    }

    const _closeChatHandler = () => {
        setHideCloseBtn(true);
        dispatch(toggleLoader(true));
        closeChatRoom(roomId).then(resp => {
            dispatch(toggleLoader(false));
            if (!resp.error)
                toast.success('Chat closed successfully.')
            if (resp.redirect)
                userReauthenticate(resp);
        });
    }

    //console.log(chat);

    if (redirect)
        return <Redirect to="/login" />

    return (
        <div className="cht-box-hlder">
            <div className="cht-box-header">
                <span className="cht-box-profile-pic-hlder">
                    {
                        currentUserPic ?
                            <img src={currentUserPic} alt={currentUserName} />
                            : <img
                                src={require('../../../assets/images/cht-profile-pic.jpg').default}
                                alt="cht-profile"
                            />
                    }

                </span>
                <h4>{currentUserName}</h4>
                {
                    activeChat && !hideCloseBtn &&
                    <div className="btn__close_chat_wrapper">
                        <button
                            type="button"
                            className="close__msg__button"
                            onClick={_closeChatHandler}
                        >Close chat</button>
                    </div>
                }
            </div>

            <div className="main-cht-box-hlder">
                <ul className="main-cht-list-ul">
                    {
                        chats && chats.length > 0 && chats.map((chat, index) =>

                            <li id={`chat_${index}`} key={index} className={chat.sender === user._id ? "my-cht" : "opnent-cht"}>
                                <p>{chat.message}</p>
                            </li>
                            
                        )
                        
                    }
                    <li className={ msgStart ? "loadEMsg load_msg" : "load_msg"}></li>
                    <li><div ref={messagesEndRef}></div></li>
                </ul>
                
                {activeChat && !hideCloseBtn &&
                    <div className="cht-type-fild">
                        <input
                            type="text"
                            placeholder="Type your question here"
                            value={message}
                            onChange={_chatMessageHandler}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter'){
                                    _sendChatMessage(e);
                                }
                            }}
                        />
                        <input
                            type="submit"
                            disabled={!!!message}
                            className="snd-msg" value=""
                            onClick={_sendChatMessage}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default ChatMessage;
