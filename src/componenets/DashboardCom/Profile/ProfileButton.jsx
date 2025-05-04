import React from "react";

const ProfileButton = ({ isEditing, setIsEditing }) => {
  return (
    <div className="flex justify-center pt-4">
      {isEditing ? (
        <div className="flex justify-center items-center gap-4 ">
          <button className="btn btn-primary mr-2">Save changes</button>
          <button
            className="btn btn-primary mr-2"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="btn btn-primary mr-2"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileButton;
