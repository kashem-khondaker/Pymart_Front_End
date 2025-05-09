import React from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useForm } from "react-hook-form";
import { FiMail, FiSend } from "react-icons/fi";

const ResendActivationEmail = () => {
  const { resendEmailActivation, errorMsg, isLoading } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await resendEmailActivation(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center p-4">
      <div className="animate-fade-in w-full max-w-md">
        <div className="card bg-base-100 shadow-2xl overflow-hidden">
          <div className="card-body p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="text-primary text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Resend Activation Email
              </h2>
              <p className="text-gray-600 mt-2">
                Enter your email address to receive a new activation link
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="label" htmlFor="email">
                  <span className="label-text">Email Address</span>
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className={`input input-bordered w-full pl-10 ${
                      errors.email ? "input-error" : ""
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                </div>
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.email.message}
                    </span>
                  </label>
                )}
              </div>

              <button
                type="submit"
                className={`btn btn-primary w-full mt-6 ${
                  isLoading ? "loading" : ""
                }`}
                disabled={isLoading}
              >
                {!isLoading && <FiSend className="mr-2" />}
                {isLoading ? "Sending..." : "Send Activation Link"}
              </button>

              {errorMsg && (
                <div className="alert alert-error shadow-lg mt-4 animate-shake">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{errorMsg}</span>
                  </div>
                </div>
              )}

              <div className="divider">OR</div>

              <div className="text-center">
                <a href="/login" className="link link-primary text-sm">
                  Return to login page
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResendActivationEmail;
