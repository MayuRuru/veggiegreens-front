import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";

// use these to verify in which location we are on or not and what to display in each case:
const DASH_REGEX = /^\/dash(\/)?$/;
const ORDERS_REGEX = /^\/dash\/orders(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

  // define class BEM convention | make sure that we are not on those paths
  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !ORDERS_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const content = (
    <header className="dash-header">
      <div className={`dash-header__container ${dashClass}`}>
        <Link to="/dash">
          <h1 className="dash-header__title">VeggieGreens</h1>
        </Link>
        <nav className="dash-header__nav">
          {/* add more nav buttons later depending on path name*/}
          {logoutButton}
        </nav>
      </div>
    </header>
  );

  return content;
};
export default DashHeader;
