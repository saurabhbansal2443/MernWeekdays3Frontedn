import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Store/UserSlice";
import { baseUrl, getUrl } from "../utility/Constant";

const AuthWrapper = ({ children }) => {
  let [isUser, setIsUser] = useState(false);
  let [isLoading, setIsLoading] = useState(true);

  let dispatch = useDispatch();

  let getUser = async () => {
    try {
      let apiRes = await axios.get(baseUrl + getUrl, { withCredentials: true });

      let data = apiRes?.data;

      if (data?.result == true) {
        setIsUser(true);
        dispatch(addUser(data.data));
      } else {
        setIsUser(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading == true) {
    return <div> ....loading </div>;
  }

  if (isUser == false) {
    return <Navigate to="/login"></Navigate>;
  }

  return children;
};

export default AuthWrapper;

// <AuthWrapper> <Home> </Home></AuthWrapper>
