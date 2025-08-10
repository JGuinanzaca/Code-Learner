import { useState, useEffect } from "react";
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

  const [displayUserBio, setDisplayUserBio] = useState("");
  // const [lessonsCompleted, setLessonsCompleted] = useState("");
  // const [forumPosts, setForumPosts] = useState("");

  useEffect(() => {
    setDisplayUsername(userDetails.name);
    setDisplayUserEmail(userDetails.email);
    setFileUrl(userDetails.image);
    setDisplayUsername(userDetails.name);
    setDisplayUserEmail(userDetails.email);
    setFileUrl(userDetails.image);
  }, []);

  // returns auth id to default value, removing "authentication" from user
  const handleLogout = () => {
    dispatch(saveId(-1));
    navigate("/");
  };

  const handleReset = () => {
    alert(`Reset email sent to ${userDetails.email}`);
    // Idea is that email link will navigate you to ResetPage (somehow)
  }

  const handleChange = async (e) => {
  // returns auth id to default value, removing "authentication" from user
  const handleLogout = () => {
    dispatch(saveId(-1));
    navigate("/");
  };

  const handleReset = () => {
    alert(`Reset email sent to ${userDetails.email}`);
    // Idea is that email link will navigate you to ResetPage (somehow)
  }

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
    <div className='custom-container'>
      <section className='custom-hero'>
        <h1 className="custom-title">{displayUserName}'s Profile</h1>
      </section>
      <div className="profile-page">

        <div className="profile-main">
          <div className="profile-image">
            <img src={profileImage()} alt="Profile Picture" for="file"></img>
            <input
              type="file"
              id="file"
              accept="image/jpeg,image/png"
              onChange={handleChange}
              style={{ display: 'none' }}
            ></input>
            <label for='file' className="change-image">
              Upload Image:
            </label>
          </div>
          <div className="user-id">
            <div className='profile-buttons'>
              <button className="hero-btn" onClick={handleReset}>
                <h2>Reset Password</h2>
              </button>
              <button className="hero-btn" onClick={handleLogout}>
                <h2>Logout</h2>
              </button>
            </div>

            <div className='personal-info'>
              <p className="user-fields">Name: {displayUserName}</p>
              <p className="user-fields">Email: {displayUserEmail}</p>
            </div>
          </div>
        </div>

        <div className='personal-info'>
          <p className='user-fields'>
            Bio: {displayUserBio || "This user has not set a bio yet."}
          </p>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;