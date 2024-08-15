import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./../provider/AuthProvider";

function Login() {
  const { signIn, googleLogIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const google = () => {
    googleLogIn();
    navigate("/");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    signIn(email, password);
    navigate(location?.state ? location.state : "/");
  };
  return (
    <div className="flex items-center justify-center md:h-screen">
      <div className="p-5 rounded-xl shadow-2xl bg-base-100 w-full mx-2 md:w-1/2">
        <h1 className="font-bold text-2xl text-center text-blue-500">
          Login Here
        </h1>
        <form className="" onSubmit={handleLogin}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-blue-500 text-white hover:text-black">
              Login
            </button>
          </div>
        </form>
        <p>
          Do not have an account?
          <Link to={"/register"} className="btn btn-link font-bold ">
            Register
          </Link>
        </p>
        <hr className="mb-3" />
        <div>
          <h1 className="text-xl text-center font-bold text-blue-500">
            Login with . . .
          </h1>

          <div className="flex justify-around mt-3">
            <button
              onClick={google}
              className="btn btn-sm bg-blue-500  text-white hover:text-black"
            >
              <span>
                <FaGoogle />
              </span>
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
