import React from "react";

function Message() {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="user-profile" />
        </div>
      </div>
      <div className="chat-bubble text-white bg-blue-500">Hi! What's up!!</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">12:42</div>
    </div>
  );
}

export default Message;
