import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../redux/userSlice";
import profile from "../Profile.png";

function ProfilePage() {
  const [file, setFile] = useState(undefined);
  const [fileUrl, setFileUrl] = useState(undefined);
  const [displayUserName, setDisplayUsername] = useState("");
  const [displayUserEmail, setDisplayUserEmail] = useState("");
  const userDetails = useSelector((state) => selectUserDetails(state));

  useEffect(() => {
    setDisplayUsername(userDetails.name);
    setDisplayUserEmail(userDetails.email);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const data = e.target.files[0];
    setFile(data);

    if (data) {
      const url = URL.createObjectURL(data);
      setFileUrl(url);
    }
  };
  console.log({ file }); // Debug: checking if object file exist

  function image() {
    if (file) {
      return fileUrl;
    } else {
      return profile;
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
        <img src={image()} alt="Upload Profile" width="200" height="200"></img>
      </div>
      <div className="change-image">
        <form>
          <label>
            upload file:
            <input
              type="file"
              id="file"
              accept="image/jpeg,image/png"
              onChange={handleChange}
            ></input>
          </label>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
