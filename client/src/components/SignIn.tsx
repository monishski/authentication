import React, { useState, SyntheticEvent } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as SvgLongRightArrow } from "../assets/long-right-arrow.svg";
import { ReactComponent as SvgEyeOpen } from "../assets/eye-open.svg";
import { ReactComponent as SvgEyeClosed } from "../assets/eye-closed.svg";
import { Spinner } from "../ui/Spinner";

import { useInput } from "../hooks/useInput";
import { Input } from "./Input";
import { validateEmail } from "../utilities/auth";
import { client } from "../api";

interface ISignInState {
  email: string;
  password: string;
}

export default function SignIn() {
  const {
    input: email,
    inputIsValid: emailIsValid,
    inputIsTouched: emailIsTouched,
    inputIsFocused: emailIsFocused,
    onInputChangeHandler: onEmailChangeHandler,
    onInputBlurHandler: onEmailBlurHandler,
    onInputFocusedHandler: onEmailFocusedHandler,
  } = useInput();

  const {
    input: password,
    inputIsValid: passwordIsValid,
    inputIsTouched: passwordIsTouched,
    inputIsFocused: passwordIsFocused,
    onInputChangeHandler: onPasswordChangeHandler,
    onInputBlurHandler: onPasswordBlurHandler,
    onInputFocusedHandler: onPasswordFocusedHandler,
  } = useInput();

  const [showPasswordText, setShowPasswordText] = useState(false);
  const [showSignInError, setShowSignInError] = useState(false);
  const [showSignInLoading, setShowSignInLoading] = useState(false);

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    // Show additonal error above button asking to ensure the fields are filled
    if (!emailIsValid || !passwordIsValid) {
      return;
    }

    //Try signing, see if backend throughs any validation errors
    setShowSignInLoading(true);
    try {
      const res = await client.post<ISignInState>("/auth/signin", {
        email,
        password,
      });
      setShowSignInLoading(false);
      setShowSignInError(false);

      //Store Access Token into Redux store
      // console.log(res);
    } catch (err) {
      //If it throws error, show an additional error above the button with "Incorrect email/password - please check and retry"
      setShowSignInError(true);
      setShowSignInLoading(false);
    }
  };

  const onShowPasswordHandler = (e: SyntheticEvent) => {
    console.log(e);
    e.preventDefault();
    setShowPasswordText((prevState) => !prevState);
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>Sign In</h2>

        <form className="form" action="POST" onSubmit={onFormSubmit}>
          <Input
            value={email}
            label="Email"
            type="email"
            autoComplete="new-email"
            autoFocus={true}
            inputIsValid={emailIsValid}
            inputIsFocused={emailIsFocused}
            inputIsTouched={emailIsTouched}
            onInputChange={(e) =>
              onEmailChangeHandler(e, validateEmail(e.target.value))
            }
            onInputBlur={onEmailBlurHandler}
            onInputFocused={onEmailFocusedHandler}
            errorEmptyMessage="Please enter an e-mail address"
            errorSafetyMessage="Please enter a valid e-mail address"
            errorBoxHeight="20px"
          />

          <div className="form-show-password-wrapper">
            {!showPasswordText ? (
              <SvgEyeOpen className="form-show-password-icon"></SvgEyeOpen>
            ) : (
              <SvgEyeClosed className="form-show-password-icon"></SvgEyeClosed>
            )}
            <button
              className="form-show-password-btn"
              onClick={(e) => onShowPasswordHandler(e)}
            >
              <span className="form-show-password-btn__content">
                {!showPasswordText ? "SHOW" : "HIDE"}
              </span>
            </button>
          </div>

          <Input
            value={password}
            label="Password"
            type={!showPasswordText ? "password" : "text"}
            autoComplete="new-password"
            autoFocus={false}
            inputIsValid={passwordIsValid}
            inputIsFocused={passwordIsFocused}
            inputIsTouched={passwordIsTouched}
            onInputChange={(e) =>
              onPasswordChangeHandler(e, e.target.value.length > 0)
            } //We dont need to verify if they have proper password like SignUp
            onInputBlur={onPasswordBlurHandler}
            onInputFocused={onPasswordFocusedHandler}
            errorEmptyMessage="Please enter a password"
            errorSafetyMessage="Please enter a valid password" //This state is never reached...
            errorBoxHeight="40px"
          />

          {showSignInError && (
            <div className="form-input__error" style={{ paddingLeft: "0" }}>
              Incorrect email/password – please check and retry
            </div>
          )}

          <button className="form-btn form-btn-primary">
            <span className="form-btn__content">Sign In</span>
            <div className="form-btn__arrow">
              {showSignInLoading ? (
                <Spinner />
              ) : (
                <SvgLongRightArrow className="form-btn__icon"></SvgLongRightArrow>
              )}
            </div>
          </button>

          <p style={{ marginBottom: "0px" }}>
            Don't have an account?
            <Link className="link" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
