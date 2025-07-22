import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../redux/userSlice";

function ProfilePage() {
  /*
  const [avatarUrl, setAvatarUrl] = useState("");
  const [file, setFile] = useState(null);
  */
  const [displayUserName, setDisplayUsername] = useState("");
  const [displayUserEmail, setDisplayUserEmail] = useState("");
  const userDetails = useSelector((state) => selectUserDetails(state));

  useEffect(() => {
    setDisplayUsername(userDetails.name);
    setDisplayUserEmail(userDetails.email);
  }, []);

  /*
  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    const response = await fetch(`/api/profile/${userId}/avatar`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setAvatarUrl(data.avatarUrl);
  }
    */

  return (
    <div className="profile-page">
      <header>{displayUserName}</header>
      <section>{displayUserEmail}</section>
    </div>
  );
}

export default ProfilePage;
