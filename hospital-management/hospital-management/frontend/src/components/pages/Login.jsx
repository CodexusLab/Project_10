import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
    {isLogin ? (
      <LoginPage togglePage={() => setIsLogin(false)} />
    ) : (
      <RegisterPage togglePage={() => setIsLogin(true)} onRegisterSuccess={() => setIsLogin(true)} />
    )}
  </div>
  );
};

export default Login;
