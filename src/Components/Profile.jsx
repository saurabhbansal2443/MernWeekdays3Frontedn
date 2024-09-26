import React from 'react'
import {  useRef  } from 'react';
import { useSelector } from 'react-redux';
import { baseUrl , updateUrl  } from '../utility/Constant';
import  axios  from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../Store/UserSlice';

const Profile = () => {

  let dispatch = useDispatch(); 

  let userData = useSelector((store)=> store.user)
   let {userName , email , _id } = userData.user;

   let updateUserName = useRef("");
   
  let handleUpdate= async ()=>{
    let updatedName = updateUserName.current.value ; 
    try{
    let apiRes = await axios.patch(baseUrl+updateUrl , {userName : updatedName} , {withCredentials: true });

     let data = apiRes.data;

     console.log( data )

     if(data?.result == true ){
        dispatch(addUser(data.data ));
     }

    }catch(err){
      console.log( err);
    }

  }
  return (
    <div className="avatar placeholder flex items-center justify-center pt-8 flex-col">
      <div className="bg-neutral text-neutral-content w-1/6 rounded-full">
      <span className="text-3xl">Photo</span>
      </div>
    <br />
    <label className="input input-bordered flex items-center justify-center pt-10 flex-col input-lg w-full max-w-sm">
          <p> UserID  : {_id}</p> <br/>
    </label>
    <br/>
    <label className="input input-bordered flex items-center justify-center pt-10 flex-col input-lg w-full max-w-sm">
          <p> Email : {email}</p> <br />
        </label>
        <br/>
    <label className="input input-bordered flex items-center justify-center pt-1 flex-col input-lg w-full max-w-sm">
          <p> userName  : {userName} </p>
    </label>
    <br />
    <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}> update UserName </button>
<dialog id="my_modal_2" className="modal">
  <div className="modal-box">
  <div className="join">
  <input className="input input-bordered join-item" placeholder="userName"  ref={updateUserName} />
  <button className="btn join-item rounded-r-full" onClick={handleUpdate}>update</button>
</div>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    </div>
      )
}

export default Profile
