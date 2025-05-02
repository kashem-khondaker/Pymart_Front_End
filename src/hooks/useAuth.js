import { useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  // login user
  const loginUser = async (email, password) => {
    const response = await apiClient.post("/auth/jwt/create/", {
      email,
      password,
    });
    console.log(response.data);
    setAuthTokens(response.data);
    // setUser(jwt_decode(response.data.access));
    localStorage.setItem("authTokens", JSON.stringify(response.data));
  };

  return {
    user,
    authTokens,
    loginUser,
  };
};

export default useAuth;
