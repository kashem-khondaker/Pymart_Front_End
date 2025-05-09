import React, { useState } from "react";

const PasswordChange = ({ register, errors, watch, isEditing }) => {
  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="btn btn-link justify-start text-primary font-semibold min-h-0"
        onClick={() => setIsPasswordSectionOpen(!isPasswordSectionOpen)}
      >
        Change Password
      </button>

      {isPasswordSectionOpen && (
        <div className="mt-3 space-y-4 pl-2 border-l-2 border-base-300">
          {/* Current Password */}
          <div className="form-control w-full">
            <label className="label text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className={`input w-full px-4 py-2 text-sm rounded-lg border transition
                ${
                  isEditing
                    ? "bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    : "bg-gray-100 cursor-not-allowed"
                }
                ${
                  errors.current_password ? "border-red-500" : "border-gray-300"
                }
              `}
              disabled={!isEditing}
              {...register("current_password", {
                required: "Current Password is Required",
              })}
            />
            {errors.current_password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.current_password.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="form-control w-full">
            <label className="label text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className={`input w-full px-4 py-2 text-sm rounded-lg border transition
                ${
                  isEditing
                    ? "bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    : "bg-gray-100 cursor-not-allowed"
                }
                ${errors.new_password ? "border-red-500" : "border-gray-300"}
              `}
              disabled={!isEditing}
              {...register("new_password", {
                required: "New Password is Required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.new_password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.new_password.message}
              </p>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="form-control w-full">
            <label className="label text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className={`input w-full px-4 py-2 text-sm rounded-lg border transition
                ${
                  isEditing
                    ? "bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    : "bg-gray-100 cursor-not-allowed"
                }
                ${
                  errors.confirm_new_password
                    ? "border-red-500"
                    : "border-gray-300"
                }
              `}
              disabled={!isEditing}
              {...register("confirm_new_password", {
                validate: (value) =>
                  value === watch("new_password") || "Passwords do not match",
              })}
            />
            {errors.confirm_new_password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirm_new_password.message}
              </p>
            )}
          </div>

          {isEditing && (
            <div className="flex items-center justify-between px-1 py-1">
              <label className="text-sm font-medium text-gray-700">
                Show Password
              </label>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordChange;
