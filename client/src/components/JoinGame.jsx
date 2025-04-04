import { useState } from "react";
import { Channel, useChatContext } from "stream-chat-react";
import Game from "./Game";
import CustomInput from "./CustomInput";

function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState("");
  const [channel, setChannel] = useState(null);
  const {  } = useChatContext();

  const createChannel = async () => {
    const res = await .queryUsers({ name: { $eq: rivalUsername } });

    if (res.users.length === 0) {
      alert("User Not Found");
      return;
    }
    // create a new channel with the two users
    const newChannel = await .channel("messaging", {
      members: [.userID, res.users[0].id],
    });

    await newChannel.watch(); // to participate this channel after created
    setChannel(newChannel);
  };

  return (
    <>
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Game channel={channel} setChannel={setChannel} />
        </Channel>
      ) : (
        <div className="joinGame">
          <h4>Create Game</h4>
          <input
            type="text"
            placeholder="Username Of Ravil... "
            onChange={(e) => {
              setRivalUsername(e.target.value);
            }}
          />
          <button onClick={createChannel}>Join Game</button>
        </div>
      )}
    </>
  );
}

export default JoinGame;
