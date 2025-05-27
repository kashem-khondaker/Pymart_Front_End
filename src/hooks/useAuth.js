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

  // error handler
  const errorHandler = (error, defaultMsg = "Something went wrong") => {
    const msg = error.response?.data?.detail || defaultMsg;
    console.error("Error:", msg);
    setErrorMsg(msg);
  };

  // fetch user details
  const fetchUserProfile = async () => {
    try {
      const response = await apiClient.get("auth/users/me", {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      return errorHandler(error, "User profile fetch error");
    }
  };

  // update user profile
  const updateUserProfile = async (userData) => {
    setErrorMsg(""); // clear previous errors
    try {
      const response = await apiClient.put("/auth/users/me/", userData, {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      });
      // setUser(response.data);
      console.log("User profile updated:", response.data);
    } catch (error) {
      return errorHandler(error, "User profile update failed !");
    }
  };

  // password change
  const changePassword = async (userData) => {
    setErrorMsg(""); // clear previous errors
    try {
      const response = await apiClient.post(
        "/auth/users/set_password/",
        userData,
        {
          headers: {
            Authorization: `JWT ${authTokens?.access}`,
          },
        }
      );
      console.log("Password changed:", response.data);
    } catch (error) {
      const msg =
        error.response?.data?.current_password[0] || "Password change failed !";
      console.error("Error:", msg);
      setErrorMsg(msg);
      return errorHandler(error);
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
      return {success:true}
    } catch (error) {
      console.log(error);
      errorHandler(error);
      return {success:false};
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

  // register user
  const registerUser = async (userData) => {
    console.log(userData);
    setErrorMsg(""); // clear previous errors
    try {
      const response = await apiClient.post("auth/users/", userData);
      console.log("Registration successful:", response.data);
      return {
        success: true,
        message:
          "Registration successful . You have been sent an activation email .",
      };
    } catch (error) {
      const msg =
        Object.values(error?.response?.data).flat().join("\n") ||
        "Registration failed";
      console.error("Registration error:", msg);
      setErrorMsg(msg);
      return { success: false, message: msg };
    }
  };

  // resend email activation
  const resendEmailActivation = async ({ email }) => {
    setErrorMsg(""); // clear previous errors
    try {
      const response = await apiClient.post("auth/users/resend_activation/", {
        email,
      });
      console.log("Email activation resent:", response.data);
      return {
        success: true,
        message:
          "Email activation resent . You have been sent an activation email .",
      };
    } catch (error) {
      const msg =
        Object.values(error?.response?.data).flat().join("\n") ||
        "Email activation resend failed";
      console.error("Email activation resend error:", msg);
      setErrorMsg(msg);
      return { success: false, message: msg };
    }
  };

  // forgot password
  const forgotPassword = async ({ email }) => {
    setErrorMsg(""); // clear previous errors
    try {
      const response = await apiClient.post("/auth/users/reset_password/", {
        email,
      });
      console.log("Forgot password email sent:", response.data);
      return {
        success: true,
        message:
          "Email activation resent . You have been sent an email to change your password .",
      };
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  };

  // reset password

  const resetPassword = async ({ email }) => {
    setErrorMsg("");
    try {
      const response = await apiClient.post("/auth/users/reset_password/", {
        email,
      });
      console.log("Reset email sent:", response.data);
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  };

  // password reset confirm
  const resetPasswordConfirm = async ({ uid, token, new_password }) => {
    setErrorMsg("");
    try {
      const response = await apiClient.post(
        "/auth/users/reset_password_confirm/",
        { uid, token, new_password }
      );
      console.log("password reset successfully", response.data);
      return response.data; // রিটার্ন রেসপন্স ডাটা
    } catch (error) {
      console.log(error);
      errorHandler(error);
      return { success: false, message: "Failed to reset password" }; // যদি ত্রুটি ঘটে
    }
  };
  

  // logout user
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("cartId");
  };

  return {
    user,
    errorMsg,
    loginUser,
    registerUser,
    logoutUser,
    updateUserProfile,
    changePassword,
    resendEmailActivation,
    forgotPassword,
    resetPassword,
    resetPasswordConfirm,
  };
};

export default useAuth;
