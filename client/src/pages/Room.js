import { useParams } from "react-router-dom";
import { FlexDiv } from "../styling";

const Room = () => {
  const { roomCode } = useParams();

  return <FlexDiv flexHeight>Room code: {roomCode}</FlexDiv>;
};

export default Room;
