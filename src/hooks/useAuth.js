import React, { use, useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  // login user
  const loginUser = async (userData) => {
    try {
      const response = await apiClient.post("auth/jwt/create/", userData);
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
    } catch (error) {
      console.error("login error", error.message);
    }
  };

  // useEffect 
  useEffect(() => {
    if (authTokens) {
      fetchUserProfile();
    }
  }, [authTokens]);

  // fatch uer details
  const fetchUserProfile = async () => {
    try {
      const response = await apiClient.get("auth/users/me" , {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      });
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error("login user profile error", error.message);
    }
  };



  return { user, loginUser };
};

export default useAuth;
