import React/* , { useState } */ from 'react';
import { type MessageReceived } from 'types/inputs/Message';

export const Messages = ({ messages }: { messages: MessageReceived[] }): React.JSX.Element => {
  return (
    <div>
      {messages.map((message, index) => (
        <div className='message-text' key={index}>
          <div className='user-name'> {message.user.username} : </div>
          {message.message.text}
        </div>
      ))}
    </div>
  );
};
