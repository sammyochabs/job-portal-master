import React from 'react';
import {useSelector} from 'react-redux';

function ChatSearchItem({ chatData, onClick }) {
    
    const user = useSelector(state => state.auth.user);
    //console.log('USER', user);

    const _getLatestChat = () =>{
        let clienChart = [];
        chatData.chats.forEach(chat => {
            if(chat.sender !== user._id) clienChart.push({ ...chat}) 
        });
        return clienChart.length > 0 ? clienChart[clienChart.length - 1].message : '';

    }

    return (
        <li className={chatData.is_active ? 'active__chat' : 'inactive__chat'} onClick={() => onClick(chatData)}>
            
            <span className="cht-id-profile-pic">
                {
                    chatData.user && chatData.user.profile_picture ?
                        <img src={chatData.user.profile_picture} alt={chatData.user.first_name} />
                        : <img src={require('../../../assets/images/cht-profile-pic.jpg').default} alt="cht-profile" />
                }

            </span>
            <div className="cht-id-name-nd-lst-txt">
                <h4>{chatData.user && chatData.user.first_name && chatData.user.last_name ? `${chatData.user.first_name} ${chatData.user.last_name}` : ''}</h4>
                <p>{chatData.chats && chatData.chats.length > 0 ? _getLatestChat() : 'Not started'}</p>
            </div>
        </li>
    )
}

export default ChatSearchItem;
