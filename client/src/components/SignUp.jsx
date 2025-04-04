import { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

const SignUp = ({ setIsAuth }) => {
  const [user, setUser] = useState({});
  const cookies = new Cookies();

  const signUp = () => {
    Axios.post("http://localhost:3001/signup", user).then((res) => {
      const { token, firstName, lastName, userId, userName, hashPassword } =
        res.data;
      console.log(res.data);
      cookies.set("token", token);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("userId", userId);
      cookies.set("userName", userName);
      cookies.set("hashPassword", hashPassword);
      setIsAuth(true);
    });
  };
  return (
    <div className="signUp">
      <label> Sign Up</label>
      <input
        type="text"
        placeholder="Fisrt Name"
        onChange={(e) => {
          setUser({ ...user, firstName: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={(e) => {
          setUser({ ...user, lastName: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="userName"
        onChange={(e) => {
          setUser({ ...user, userName: e.target.value });
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />
      <button onClick={signUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
