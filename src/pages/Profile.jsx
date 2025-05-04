import React, { useState } from "react";
import ProfileForm from "../componenets/DashboardCom/Profile/ProfileForm";
import { useForm } from "react-hook-form";
import ProfileButton from "../componenets/DashboardCom/Profile/ProfileButton";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl m-4">Profile</h2>

        <form action="">
          <ProfileForm
            register={register}
            errors={errors}
            isEditing={isEditing}
          />
          <ProfileButton isEditing={isEditing} setIsEditing={setIsEditing} />
        </form>
      </div>
    </div>
  );
};

export default Profile;
