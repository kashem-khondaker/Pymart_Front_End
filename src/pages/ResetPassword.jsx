import React, { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const { resetPassword } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data) => {
    setMessage("");
    setErrorMsg("");

    try {
      const res = await resetPassword(data); // or data.email
      if (res?.success !== false) {
        setMessage("Password reset email sent successfully!");
        reset(); // clear form
      } else {
        setErrorMsg(res?.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Unexpected error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 p-6">
        <h2 className="text-2xl font-bold mb-4">Forgot your password?</h2>
        <p className="mb-4 text-sm text-gray-600">
          Enter your email and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="input input-bordered w-full"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Send Reset Email
          </button>

          {message && <p className="text-green-600 text-sm">{message}</p>}
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
