import AuthContext from "../context/AuthContext";
import useAuthContext from "../hooks/useAuthContext.js";
import { useForm } from "react-hook-form";

const Login = () => {
  const {user , loginUser } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    await loginUser(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>
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
                {" "}
                {errors.email.message}{" "}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center text-sm">
            <div>
              <input type="checkbox" id="remember" className="mr-1" />
              <label htmlFor="remember" className="text-gray-600">
                Remember me
              </label>
            </div>
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-indigo-600 hover:underline font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
