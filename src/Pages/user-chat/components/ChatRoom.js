import React from 'react';
import ChatMessage from './ChatMessage';
import ChatSearchItem from './ChatSearchItem';

const ChatRoom = {
    Message: (props) => <ChatMessage {...props}/>,
    SearchItem: (props) => <ChatSearchItem {...props}/>
}

export default ChatRoom;
