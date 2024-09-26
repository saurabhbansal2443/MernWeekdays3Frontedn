import React from 'react'
import axios from 'axios';
import { baseUrl  , logoutUrl } from '../utility/Constant';
import { deleteUser } from '../Store/UserSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    let dispatch = useDispatch();
    let navigate = useNavigate();

    let handleLogout = async () => {
        try{
        let apiRes = await axios.post(baseUrl+logoutUrl , {} , {withCredentials: true });
        let data = apiRes?.data;
        if(data?.result == true ){
            dispatch(deleteUser());
            navigate("/login")
        }
        }catch(err){

        }

    }
  return (
    <div>
      <button className="btn btn-outline btn-error" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
