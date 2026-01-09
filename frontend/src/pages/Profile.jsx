import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import "../styles/profile.css";

const Profile = () => {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  return (
    <div className="profile-container">
      <div className="profile-card">
        
        <div className="profile-header">
          <i className="fas fa-user-circle"></i>
          <h2>My Profile</h2>
        </div>

        <div className="profile-row">
          <span>Name:</span> {user.name}
        </div>

        <div className="profile-row">
          <span>Email:</span> {user.sub}
        </div>

        <div className="profile-row">
          <span>Role:</span> {user.role}
        </div>

        <Link className="edit-profile-link" to="/profile/edit">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default Profile;
