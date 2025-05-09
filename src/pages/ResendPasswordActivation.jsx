import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuthContext from "../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router";

const ResetPasswordConfirm = () => {
  const { resetPasswordConfirm } = useAuthContext();
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.new_password !== data.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await resetPasswordConfirm({
        uid,
        token,
        new_password: data.new_password,
      });

      if (res?.success !== false) {
        setMessage("Password reset successfully");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(res?.message || "Password reset failed");
      }
    } catch (err) {
      console.error(err);
      setError("Unexpected error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card bg-base-100 shadow-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">New Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              {...register("new_password", {
                required: "New password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
            />
            {errors.new_password && (
              <p className="text-red-500 text-sm">{errors.new_password.message}</p>
            )}
          </div>

          <div>
            <label className="label">Confirm Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              {...register("confirm_password", {
                required: "Confirm password is required",
              })}
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Reset Password
          </button>

          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-600">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
