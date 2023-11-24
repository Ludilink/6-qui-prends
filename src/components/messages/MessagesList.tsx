import React, { useEffect, useState } from 'react';
import { type Message, type MessageReceived } from 'types/inputs/Message';
import { MessageInput } from 'components/messages/MessageInput';
import { Messages } from 'components/messages/Messages';
import { type UserRoom } from 'types/user/UserRoom';
import useSocket from 'hooks/useSocket';

const MessagesList = (): React.JSX.Element => {
  const socket = useSocket();
  const [messages, setMessages] = useState<MessageReceived[]>([]);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const sendMessage = (value: Message): void => {
    console.log('alo ?');
    socket?.emit('chat', value as any, (response: any): any => {
      console.log('response : ', response);
    });
  };

  const messageListener = (message: Message, user: UserRoom): void => {
    console.log('message reçu ! ', message, user);
    const msg: MessageReceived = { message, user };
    console.log(`append message ${msg.message.text} to messages: `, messages);
    console.log('new value must be : ', [...messages, msg]);
    setMessages([...messages, msg]);
    console.log('messages after append: ', messages);
  };

  useEffect(() => {
    // TODO : si les messages sont vides, fetch les messages de la room (TO IMPLEMENT API)

    socket?.on('chat', messageListener);
    return () => {
      socket?.off('chat');
    };
  }, [messageListener]);

  const chatOpen = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      <button className={`toggle-chat-btn ${isChatOpen ? 'open' : ''}`} onClick={chatOpen}>Tchat</button>
      {isChatOpen && (
        <div className='chat-box'>
          <MessageInput send={sendMessage} />
          <Messages messages={messages} />
        </div>
      )}
    </div>
  );
};

export default MessagesList;
