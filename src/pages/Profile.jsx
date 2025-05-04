import React, { useEffect, useState } from "react";
import ProfileForm from "../componenets/DashboardCom/Profile/ProfileForm";
import { useForm } from "react-hook-form";
import ProfileButton from "../componenets/DashboardCom/Profile/ProfileButton";
import PasswordChange from "../componenets/DashboardCom/Profile/PasswordChange";
import useAuthContext from "../hooks/useAuthContext";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    watch,
    setValue, // ✅ include setValue to use it in useEffect
    formState: { errors },
  } = useForm();

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      console.log(user);
      Object.keys(user).forEach((key) => {
        setValue(key, user[key] || "");
      });
    }
    if (user.phone && !user.phone_number) {
      setValue("phone_number", user.phone);
    }
  }, [user, setValue]);

  return (
    <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl m-4">Profile</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <ProfileForm
            register={register}
            errors={errors}
            isEditing={isEditing}
          />
          <PasswordChange
            register={register}
            errors={errors}
            watch={watch}
            isEditing={isEditing}
          />
          <ProfileButton isEditing={isEditing} setIsEditing={setIsEditing} />
        </form>
      </div>
    </div>
  );
};

export default Profile;
