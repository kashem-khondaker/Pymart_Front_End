import React, { useContext } from "react";
import AuthContext from "../context/AuthContex";

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
