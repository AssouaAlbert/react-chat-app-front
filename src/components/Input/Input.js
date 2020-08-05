import React from "react";

import "./Input.css";

const Input = ({ message, sendMessage, setMessage }) => {
  return (
    <form className="form">
      <input
        className="input"
        text="text"
        placeholder="Type Message"
        value={message}
        onChange={(event) => {
          return setMessage(event.target.value);
        }}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
    </form>
  );
};

export default Input;