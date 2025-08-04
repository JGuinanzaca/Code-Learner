import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectId, saveId } from "../redux/authSlice";
import { selectUserDetails } from "../redux/userSlice";
import defaultProfile from "../Profile.png";
import { generateURL, uploadURL } from "../Api";
import { saveUserDetails } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState(undefined);
  const [displayUserName, setDisplayUsername] = useState("");
  const [displayUserEmail, setDisplayUserEmail] = useState("");
  const userDetails = useSelector((state) => selectUserDetails(state));
  const userId = useSelector((state) => selectId(state));

  useEffect(() => {
    setDisplayUsername(userDetails.name);
    setDisplayUserEmail(userDetails.email);
    setFileUrl(userDetails.image);
  }, []);

  // returns auth id to default value, removing "authentication" from user
  const handleLogout = () => {
    dispatch(saveId(-1));
    navigate("/");
  };

  const handleChange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePic", e.target.files[0]);

    await generateURL(formData).then((res) => {
      console.log(`Link generated: ${res}`); // Debug: link generated that will take you to user's photo
      const url = {
        url: res,
      };
      uploadURL(userId, url);
      setFileUrl(res);
      dispatch(saveUserDetails({ image: res }));
    });
  };

  function profileImage() {
    if (fileUrl) {
      return fileUrl;
    } else {
      return defaultProfile;
    }
  }

  return (
    <div className="profile-page">
      <h1 className="profile-title">{displayUserName}'s profile page</h1>
      <div className="personal-info">
        <p className="user-fields">Email: {displayUserEmail}</p>
        <p className="user-fields">Name: {displayUserName}</p>
      </div>
      <div className="profile-image">
        <img
          src={profileImage()}
          alt="Upload Profile"
          width="200"
          height="200"
        ></img>
      </div>
      <div className="change-image">
        <form>
          <label>
            upload file:
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleChange}
            ></input>
          </label>
        </form>
      </div>
      <button className= "Logout" size={30} style={{ padding: 3 }} onClick={handleLogout}>
      Logout
      </button>
    </div>
  );
}

export default ProfilePage;
