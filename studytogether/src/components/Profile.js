import { useContext, useRef, useState } from "react";
import { UserContext } from "./UserContext";

function Profile() {

  const { user, setUser } = useContext(UserContext);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({
          ...user,
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(user));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        <h2>User Profile</h2>

        <div className="profile-pic" onClick={handleImageClick}>
          <img
            src={
              user.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="profile-img"
          />
          <p className="change-text">Click to change</p>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={user.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="email@123"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Interested Course</label>
          <input
            type="text"
            name="course"
            placeholder="interested course..."
            value={user.course}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>About You</label>
          <textarea
            name="bio"
            placeholder="who you are looking to connect with..."
            value={user.bio}
            onChange={handleChange}
          />
        </div>

        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>

        {saved && (
          <p className="success-msg">
            Profile saved successfully ✅
          </p>
        )}

      </div>
    </div>
  );
}

export default Profile;