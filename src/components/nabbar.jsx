import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
 

function Nabbar() {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div>
      <div className="navbar bg-base-200">
        <div className="navbar-start">
         <img src="/img.png" alt="img"  className="rounded-lg"/>
          <a className="btn btn-ghost text-xl">BestProduct</a>
        </div>

        <div className="navbar-end">
          {user ? (
            <>
              <button
                className="btn btn-error text-white"
                onClick={() => logOut()}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nabbar;
