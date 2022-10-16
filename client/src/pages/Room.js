import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FlexDiv } from "../styling";
import io from "socket.io-client";

const socket = io("ws://localhost:3001");

const Room = () => {
  const { roomId } = useParams();

  useEffect(() => {
    socket.emit("join", roomId);
  });

  return <FlexDiv flexHeight>Room code: {roomId}</FlexDiv>;
};

export default Room;
