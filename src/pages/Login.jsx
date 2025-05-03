import AuthContext from "../context/AuthContext";
import  useAuthContext  from "../hooks/useAuthContext.js";

const Login = () => {
  const { loginUser } = useAuthContext()
  return (
    <div>
      <h1>This is Login Page</h1>
      <button
        className="btn btn-primary"
        onClick={() => loginUser("admin@gmail.com", "1234")}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
