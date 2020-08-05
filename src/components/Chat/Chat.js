import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  /* -------------------------------------------------------------------------- */
  /*                               State variables                              */
  /* -------------------------------------------------------------------------- */

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://albert-chat-application.herokuapp.com/";

  /* -------------------------------------------------------------------------- */
  /*                      Connect and disconnect from room                      */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    setName(name);
    setRoom(room);

    socket = io(ENDPOINT); //! Connect to that socket
    socket.emit("join", { name, room }, ({ error }) => {
      console.log(error);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  /* -------------------------------------------------------------------------- */
  /* Recieve messages from server                                                                        */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  /* -------------------------------------------------------------------------- */
  /*                                Send Messages                               */
  /* -------------------------------------------------------------------------- */

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
};
export default Chat;
