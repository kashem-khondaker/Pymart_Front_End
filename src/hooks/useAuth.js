import React, { useEffect, useRef, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  // ✅ useRef to avoid duplicate fetch
  const hasFetched = useRef(false);

  // fetch user details
  const fetchUserProfile = async () => {
    try {
      const response = await apiClient.get("auth/users/me", {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      });
      setUser(response.data);
      console.log("User profile fetched:", response.data);
    } catch (error) {
      console.error("User profile fetch error:", error);
    }
  };

  // login user
  const loginUser = async (userData) => {
    setErrorMsg(""); // clear previous errors
    try {
      const response = await apiClient.post("auth/jwt/create/", userData);
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      console.log("Login successful:", response.data);
      hasFetched.current = false; // ✅ reset flag when new login happens
      await fetchUserProfile();
      hasFetched.current = true;
    } catch (error) {
      const msg = error.response?.data?.detail || "Login failed";
      console.error("Login error:", msg);
      setErrorMsg(msg);
    }
  };

  // auto-fetch user if token exists, only once
  useEffect(() => {
    if (authTokens && !hasFetched.current) {
      hasFetched.current = true; // ✅ set fetched flag
      fetchUserProfile();
    }
  }, [authTokens]);

  // optional: watch errorMsg updates
  useEffect(() => {
    if (errorMsg) {
      console.log("Updated errorMsg:", errorMsg);
    }
  }, [errorMsg]);

  return { user, errorMsg, loginUser };
};

export default useAuth;
