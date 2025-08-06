import React, { useState, useEffect } from "react";
import { selectUserDetails } from "../redux/userSlice";
import { selectId, saveId } from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../Api";

export default function Reset() {
  const userId = useSelector((state) => selectId(state));
  const { user_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function authenticateUser() {
    if(userId != user_id) {
      navigate("*");
    }
  }

  const handleResetPassword = async () => {
    if(document.getElementById('Reset-Password').value == "") {
      alert('Empty field detected! Please fill in field');
      return;
    }
    await resetPassword(user_id, {
      newPassword: document.getElementById('Reset-Password').value,
    }) .then((response)=> {
      if(response.message == "Password successfully updated!") {
        alert("Password successfully changed!");
        dispatch(saveId(-1));
        navigate("/");
      }
    })
  }

  useEffect(() => {
    authenticateUser();
  }, []);

    return (
    <div className = 'Reset-Page'>
      <h2>Reset Your Password</h2>
      <label>New Password:</label>
      <input
        className =  'Reset-Input'
        id = 'Reset-Password'
        type="password"
        placeholder="••••••••"
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
}