import React, { useEffect, useState } from "react";
import ProfileForm from "../componenets/DashboardCom/Profile/ProfileForm";
import { useForm } from "react-hook-form";
import ProfileButton from "../componenets/DashboardCom/Profile/ProfileButton";
import PasswordChange from "../componenets/DashboardCom/Profile/PasswordChange";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlart from "../componenets/Products/ErrorAlart";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue, // ✅ include setValue to use it in useEffect
    formState: { errors },
  } = useForm();

  const { user, updateUserProfile, changePassword, errorMsg } =
    useAuthContext();

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

  const onSubmit = async (data) => {
    try {
      const profilePayload = {
        email: data.email,  
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        phone: data.phone,
      };

      console.log("console.lgo profile payload : ", profilePayload);
      await updateUserProfile(profilePayload);
      alert("Profile updated successfully");

      // password change
      if (data.current_password && data.new_password) {
        const passwordPayload = {
          new_password: data.new_password,
          current_password: data.current_password,
        };
        console.log(passwordPayload);
        console.log(data);
        await changePassword(passwordPayload);
        alert("Password updated successfully");
      }

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white border-1 border-gray-200 shadow-sm rounded-2xl p-8 space-y-6">
      <div className="card-body">
        {errorMsg && <ErrorAlart error={errorMsg} />}
        <h2 className="text-3xl font-semibold text-center mb-6">My Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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
