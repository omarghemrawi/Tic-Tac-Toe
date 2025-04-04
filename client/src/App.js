import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Cookies from "universal-cookie";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import { useState } from "react";
import JoinGame from "./components/JoinGame";

function App() {
  const API_KEY = process.env.API_KEY;
  const cookies = new Cookies();
  const token = cookies.get("token");
  const  = StreamChat.getInstance(API_KEY);
  const [isAuth, setIsAuth] = useState(false);

  const logout = async () => {
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("userName");
    cookies.remove("userId");
    cookies.remove("token");
    cookies.remove("hashPassword");
    cookies.remove("channelName"); // ********************************
    await .disconnectUser();

    setIsAuth(false);
  };

  if (token) {
    
      .connectUser(
        {
          // we can use just id at least
          id: cookies.get("userId"),
          name: cookies.get("userName"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashPassword: cookies.get("hashPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }

  return (
    <div className="App">
      {isAuth ? (
        <Chat ={}>
          <JoinGame />
          <button className="btn-out" onClick={logout}>
            Log Out
          </button>
        </Chat>
      ) : (
        <>
          <SignUp setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default App;
