import { useState } from "react";
import Board from "./Board";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./chat.css";

function Game({ channel, setChannel }) {
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );

  channel.on("user.watching.start", (e) => {
    setPlayersJoined(e.watcher_count === 2);
  });

  if (!playersJoined) {
    return <div>Waiting for other player to join</div>;
  }

  const leaveHandle = async () => {
    await channel.stopWatching();
    setChannel(null);
  };
  return (
    <div className="gameContainer">
      <Board result={result} setResult={setResult} />
      <Window>
        <MessageList
          disableDateSeparator
          closeReactionSelectorOnClick
          messageActions={["react"]}
        />
        <MessageInput />
      </Window>
      <button onClick={leaveHandle}>Leave Game</button>
      {result.state === "won" && <div>{result.winner} Won the Game</div>}
      {result.state === "tie" && <div>Game Tied</div>}
    </div>
  );
}

export default Game;
