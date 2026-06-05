import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// redux
import { logoutUser } from "../store/slices/userSlice";

//  IMPORTANT (reset RTK cache)
import { noteApi } from "../store/apis/noteApi";

const Header = () => {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  LOGOUT FINAL (ME RESET CACHE)
  const handleLogout = () => {
    dispatch(logoutUser());

    //  KJO RREGULLON PROBLEMIN E NOTES
    dispatch(noteApi.util.resetApiState());

    navigate("/login");
  };

  return (
    <header className="header">

      <div className="header-container">

        {/*  LEFT (LOGO) */}
        <h2 className="logo">
          <Link to="/">Note Manager</Link>
        </h2>

        {/*  RIGHT */}
        <div className="header-right">

          {user ? (
            <>
              {/*  USER */}
              <span className="welcome">
                Welcome {user.name}
              </span>

              {/*  ALL NOTES */}
              <button
                className="nav-btn"
                onClick={() => navigate("/allnotes")}
              >
                All Notes
              </button>

              {/*  LOGOUT */}
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/*  LOGIN */}
              <Link to="/login" className="nav-btn">
                Login
              </Link>

              {/*  REGISTER */}
              <Link to="/register" className="nav-btn">
                Register
              </Link>
            </>
          )}

        </div>

      </div>

    </header>
  );
};

export default Header;