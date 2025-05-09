import { useForm } from "react-hook-form";
import ErrorAlart from "../componenets/Products/ErrorAlart.jsx";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext.js";
import { useState } from "react";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { forgotPassword, errorMsg: serverMsg } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMsg("");
    try {
      const res = await forgotPassword(data);
      if (res?.success) {
        setSuccessMsg(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {serverMsg && <ErrorAlart error={serverMsg} />}
        {successMsg && (
          <div className="bg-green-100 text-green-800 p-3 rounded-xl mb-4 text-sm">
            {successMsg}
          </div>
        )}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-500 mb-4">
          Enter your email to receive a reset link
        </p>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition duration-200"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-600 hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
