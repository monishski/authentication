import React, { useState, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { client } from "../api";

import { ReactComponent as SvgLongRightArrow } from "../assets/long-right-arrow.svg";
import { ReactComponent as SvgEyeOpen } from "../assets/eye-open.svg";
import { ReactComponent as SvgEyeClosed } from "../assets/eye-closed.svg";
import { Spinner } from "../ui/Spinner";

import { useInput } from "../hooks/useInput";
import { Input } from "./Input";
import {
  validateEmail as validateSignUpEmail,
  validatePassword,
  validateConfirmPassword,
} from "../utilities/auth";

interface ISignUpState {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
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

  const {
    input: confirmPassword,
    inputIsValid: confirmPasswordIsValid,
    inputIsTouched: confirmPasswordIsTouched,
    inputIsFocused: confirmPasswordIsFocused,
    onInputChangeHandler: onConfirmPasswordChangeHandler,
    onInputBlurHandler: onConfirmPasswordBlurHandler,
    onInputFocusedHandler: onConfirmPasswordFocusedHandler,
  } = useInput();

  const [showPasswordText, setShowPasswordText] = useState(false);
  const [showSignUpError, setShowSignUpError] = useState(false);
  const [showSignUpLoading, setShowSignUpLoading] = useState(false);

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    // Show additonal error above button asking to ensure the fields are filled
    if (!emailIsValid || !passwordIsValid || !confirmPassword) {
      return;
    }

    // Send request to sign user up
    setShowSignUpLoading(true);
    try {
      const res = await client.post<ISignUpState>("/auth/signup", {
        email,
        password,
        confirmPassword,
      });
      setShowSignUpLoading(false);
      setShowSignUpError(false);

      //Store Access Token into Redux store
      // console.log(res);
    } catch (err) {
      //If it throws error, show an additional error above the button with "Incorrect email/password - please check and retry"
      setShowSignUpError(true);
      setShowSignUpLoading(false);
    }
  };

  const onShowPasswordHandler = () => {
    setShowPasswordText((prevState) => !prevState);
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>Sign Up</h2>

        <form className="form" action="POST" onSubmit={onFormSubmit}>
          <Input
            value={email}
            label="Email"
            type="email"
            autoComplete="off"
            autoFocus={true}
            inputIsValid={emailIsValid}
            inputIsFocused={emailIsFocused}
            inputIsTouched={emailIsTouched}
            onInputChange={(e) =>
              onEmailChangeHandler(e, validateSignUpEmail(e.target.value))
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
              onClick={onShowPasswordHandler}
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
            autoComplete="off"
            autoFocus={false}
            inputIsValid={passwordIsValid}
            inputIsFocused={passwordIsFocused}
            inputIsTouched={passwordIsTouched}
            onInputChange={(e) =>
              onPasswordChangeHandler(e, validatePassword(e.target.value))
            }
            onInputBlur={onPasswordBlurHandler}
            onInputFocused={onPasswordFocusedHandler}
            errorEmptyMessage="Please enter a password"
            errorSafetyMessage="Please enter a valid password that uses 8+ characters, 1 number, 1 special character and at least 1 big and small case letter"
            errorBoxHeight="40px"
          />
          <Input
            value={confirmPassword}
            label="Password"
            type={!showPasswordText ? "password" : "text"}
            autoComplete="off"
            autoFocus={false}
            inputIsValid={confirmPasswordIsValid}
            inputIsFocused={confirmPasswordIsFocused}
            inputIsTouched={confirmPasswordIsTouched}
            onInputChange={(e) =>
              onConfirmPasswordChangeHandler(
                e,
                validateConfirmPassword(e.target.value, password)
              )
            }
            onInputBlur={onConfirmPasswordBlurHandler}
            onInputFocused={onConfirmPasswordFocusedHandler}
            errorEmptyMessage="Please confirm your password"
            errorSafetyMessage="Passwords must match"
            errorBoxHeight="40px"
          />

          {showSignUpError && (
            <div className="form-input__error" style={{ paddingLeft: "0" }}>
              Looks like you already have an account, sign in!
            </div>
          )}

          <button className="form-btn form-btn-primary">
            <span className="form-btn__content">Register</span>
            <div className="form-btn__arrow">
              {showSignUpLoading ? (
                <Spinner />
              ) : (
                <SvgLongRightArrow className="form-btn__icon"></SvgLongRightArrow>
              )}
            </div>
          </button>

          <p style={{ marginBottom: "0px" }}>
            Already have an account?
            <Link className="link" to="/signin">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
