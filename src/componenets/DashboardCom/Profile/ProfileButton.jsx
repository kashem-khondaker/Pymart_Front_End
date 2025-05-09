import React from "react";

const ProfileButton = ({ isEditing, setIsEditing }) => {
  return (
    <div className="flex justify-center pt-4">
      {isEditing ? (
        <div className="flex justify-center items-center gap-4 ">
          <button
            type="submit"
            className="btn btn-primary px-6 py-2 rounded-lg tracking-wide"
          >
            Save changes
          </button>
          <button
            className="btn bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-lg"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="submit"
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
