import { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

const Login = ({ setIsAuth }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();

  const logIn = async () => {
    try {
      const res = await Axios.post("http://localhost:3001/login", {
        userName,
        password,
      });
      console.log(res.data);
      const { token, firstName, lastName, userName: name, userId } = res.data;
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("userName", name);
      cookies.set("userId", userId);
      cookies.set("token", token);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <label>LogIn</label>
      <input
        type="text"
        placeholder="userName"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={logIn}>Login</button>
    </div>
  );
};

export default Login;
