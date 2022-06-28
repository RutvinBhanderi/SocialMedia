import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Google from "react-google-login";
import { Avatar, Button } from "@material-ui/core";
import { signin, signup } from "../../actions/auth";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./AuthStyle.css";
function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [authFormData, setAuthFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    passowrd: "",
    confirmpassword: "",
  });
  // console.log(authFormData);
  const switchMode = () => {
    setIsSignUp((old) => !old);
  };
  const handleSuccess = (res) => {
    const result = res.profileObj;
    // console.log(result);
    const token = res.tokenId;
    try {
      dispatch({ type: "AUTH", payload: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleFailure = (e) => {
    console.log("login failed");
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAuthFormData({ ...authFormData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(authFormData, history));
    } else {
      dispatch(signin(authFormData, history));
    }
  };
  return (
    <div className='Auth'>
      <div className='Auth__main'>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <div className='Auth__heading'>{isSignUp ? "Signup" : "Signin"}</div>
        <form className='Auth__form' onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <div className='Auth__signup'>
                <input
                  name='firstName'
                  onChange={handleChange}
                  placeholder='FirstName'
                />
                <input
                  name='lastName'
                  onChange={handleChange}
                  placeholder='LastName'
                />
              </div>
            </>
          )}
          <input
            type='email'
            name='email'
            onChange={handleChange}
            placeholder='Email'
          />
          <input
            type='password'
            name='password'
            onChange={handleChange}
            placeholder='Password'
          />
          {isSignUp && (
            <input
              type='password'
              name='confirmPassword'
              onChange={handleChange}
              placeholder='ConfirmPassword'
            />
          )}
          <Button color='secondary' variant='contained' fullWidth type='submit'>
            {isSignUp ? "SignUp" : "Signin"}
          </Button>
          <Google
            clientId='338944257887-674704rdp25gvpctkmc4bqiv428b4a8g.apps.googleusercontent.com'
            render={(renderprops) => (
              <Button
                fullWidth
                color='primary'
                onClick={renderprops.onClick}
                disabled={renderprops.disabled}
                variant='contained'
              >
                GoogleSignIn
              </Button>
            )}
            onSuccess={handleSuccess}
            onFailure={handleFailure}
          ></Google>
          <Button fullWidth onClick={switchMode}>
            {isSignUp
              ? "Already Have An Account ? Signin"
              : "Don't have an account ? Signup"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
