import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

function Register() {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const photo = "photo";
    const email = form.get("email");
    const password = form.get("password");
    // user create
    createUser(email, password);
    updateUserProfile(name, photo);
    navigate("/");
  };
  return (
    <>
      <div className=" flex justify-center items-center md:h-screen bg-base-200">
        <div className="p-5 rounded-xl shadow-2xl bg-base-100 w-full mx-2 md:w-1/2 ">
          <h1 className="font-bold text-2xl  text-center text-blue-500">
            Register Here
          </h1>
          <form className=" " onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-blue-500 text-white hover:text-black">
                Register
              </button>
            </div>
          </form>
          <p>
            Already have an account?
            <Link to={"/login"} className="btn btn-link font-bold ">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
