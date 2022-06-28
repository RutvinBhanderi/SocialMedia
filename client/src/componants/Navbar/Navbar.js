import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { Avatar } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import "./style.css";
import { useDispatch } from "react-redux";
function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };
  const toHome = () => {
    history.push("/");
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <div className='Navbar__main'>
      <div className='Navbar'>
        <div className='Navbar__logo' onClick={toHome}>
          MEMORIES
        </div>
        <div className='Navbar__info'>
          {user ? (
            <>
              <Avatar className='Navbar__avtar' src={user?.result?.imageUrl}>
                {user.result.name.charAt(0)}
              </Avatar>
              <div className='Navbar__Name'>
                <h1>{user.result.name}</h1>
              </div>
              <div className='Navbar__button'>
                <Button onClick={logout}>Logout</Button>
              </div>
            </>
          ) : (
            <div className='Navbar__button'>
              <Button component={Link} to='/auth'>
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
