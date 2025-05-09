import React from "react";

const ProfileForm = ({ register, errors, isEditing }) => {
  return (
    <div className="space-y-4 items-center">
      {/* First Name */}
      <div className="form-control w-full">
        <label className="label text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          className={`input w-full px-4 py-2 text-sm rounded-lg border  transition
            ${isEditing ? "bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" : "bg-gray-100 cursor-not-allowed"}
            ${errors.first_name ? "border-red-500" : "border-gray-300"}
          `}
          disabled={!isEditing}
          {...register("first_name", { required: "First name is required" })}
        />
        {errors.first_name && (
          <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>
        )}
      </div>

      {/* Last Name */}
      <div className="form-control w-full">
        <label className="label text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          className={`input w-full px-4 py-2 text-sm rounded-lg border transition
            ${isEditing ? "bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" : "bg-gray-100 cursor-not-allowed"}
            ${errors.last_name ? "border-red-500" : "border-gray-300"}
          `}
          disabled={!isEditing}
          {...register("last_name")}
        />
      </div>

      {/* Email Address */}
      <div className="form-control w-full">
        <label className="label text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          className="input w-full px-4 py-2 text-sm rounded-lg border bg-gray-100 cursor-not-allowed border-gray-300"
          disabled
          {...register("email")}
        />
      </div>

      {/* Address */}
      <div className="form-control w-full">
        <label className="label text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          className={`input w-full px-4 py-2 text-sm rounded-lg border transition
            ${isEditing ? "bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" : "bg-gray-100 cursor-not-allowed"}
            ${errors.address ? "border-red-500" : "border-gray-300"}
          `}
          disabled={!isEditing}
          {...register("address")}
        />
      </div>

      {/* Phone Number */}
      <div className="form-control w-full">
        <label className="label text-sm font-medium text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          className={`input w-full px-4 py-2 text-sm rounded-lg border transition
            ${isEditing ? "bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" : "bg-gray-100 cursor-not-allowed"}
            ${errors.phone_number ? "border-red-500" : "border-gray-300"}
          `}
          disabled={!isEditing}
          {...register("phone")}
        />
      </div>
    </div>
  );
};

export default ProfileForm;
