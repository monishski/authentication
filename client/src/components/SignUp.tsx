import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom';

import './SignUp.css'
import { ReactComponent as SvgLongRightArrow } from '../assets/long-right-arrow.svg';
import { ReactComponent as SvgEyeOpen } from '../assets/eye-open.svg';
import { ReactComponent as SvgEyeClosed } from '../assets/eye-closed.svg';

import { useInput } from '../hooks/useInput'
import { Input } from './Input'
import { 
  validateSignUpEmail, 
  validateSignUpPassword, 
  validateSignUpConfirmPassword 
} from '../utilities/auth';

export default function SignUp() {

  const { 
    input: email,
    inputIsValid: emailIsValid,
    inputIsTouched: emailIsTouched,
    inputIsFocused: emailIsFocused,
    onInputChangeHandler: onEmailChangeHandler,
    onInputBlurHandler: onEmailBlurHandler,
    onInputFocusedHandler: onEmailFocusedHandler 
  } = useInput()

  const { 
    input: password,
    inputIsValid: passwordIsValid,
    inputIsTouched: passwordIsTouched,
    inputIsFocused: passwordIsFocused,
    onInputChangeHandler: onPasswordChangeHandler,
    onInputBlurHandler: onPasswordBlurHandler,
    onInputFocusedHandler: onPasswordFocusedHandler 
  } = useInput()

  const { 
    input: confirmPassword,
    inputIsValid: confirmPasswordIsValid,
    inputIsTouched: confirmPasswordIsTouched,
    inputIsFocused: confirmPasswordIsFocused,
    onInputChangeHandler: onConfirmPasswordChangeHandler,
    onInputBlurHandler: onConfirmPasswordBlurHandler,
    onInputFocusedHandler: onConfirmPasswordFocusedHandler 
  } = useInput()

  const [showPasswordText, setShowPasswordText] = useState(false)

  const onFormSubmit = (e: FormEvent): void => {
    e.preventDefault()
  }

  const onShowPasswordHandler = () => { 
    setShowPasswordText((prevState) => !prevState)
  }
  
  return(
    <div className="form-container">
      <div className="form-wrapper">

        <h2>Sign Up</h2>

        <form 
          className="form"  
          action="POST" 
          onSubmit={onFormSubmit}>

          <Input
            value={email}
            label="Email"
            type="email"
            autoComplete="new-email"
            autoFocus={true}
            inputIsValid={emailIsValid}
            inputIsFocused={emailIsFocused}
            inputIsTouched={emailIsTouched}
            onInputChange={(e) => onEmailChangeHandler(e, validateSignUpEmail(e.target.value))}
            onInputBlur={onEmailBlurHandler}
            onInputFocused={onEmailFocusedHandler}
            errorEmptyMessage="Please enter an e-mail address"
            errorSafetyMessage="Please enter a valid e-mail address"
            errorBoxHeight="20px"/>

          <div className="form-show-password-wrapper">
            {!showPasswordText 
              ? <SvgEyeOpen className="form-show-password-icon"></SvgEyeOpen>
              : <SvgEyeClosed className="form-show-password-icon"></SvgEyeClosed>}
            <button 
              className="form-show-password-btn" 
              onClick={onShowPasswordHandler}>
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
            onInputChange={(e) => onPasswordChangeHandler(e, validateSignUpPassword(e.target.value))}
            onInputBlur={onPasswordBlurHandler}
            onInputFocused={onPasswordFocusedHandler}
            errorEmptyMessage="Please enter a password"
            errorSafetyMessage="Please enter a valid password"
            errorBoxHeight="40px"/>
          <Input
            value={confirmPassword}
            label="Password"
            type={!showPasswordText ? "password" : "text"}
            autoComplete="new-password"
            autoFocus={false}
            inputIsValid={confirmPasswordIsValid}
            inputIsFocused={confirmPasswordIsFocused}
            inputIsTouched={confirmPasswordIsTouched}
            onInputChange={(e) => onConfirmPasswordChangeHandler(e, validateSignUpConfirmPassword(e.target.value, password))}
            onInputBlur={onConfirmPasswordBlurHandler}
            onInputFocused={onConfirmPasswordFocusedHandler}
            errorEmptyMessage="Please confirm your password"
            errorSafetyMessage="Passwords must match"
            errorBoxHeight="40px"/>

          <button className="form-btn form-btn-primary">
            <span className="form-btn__content">Register</span>
            <SvgLongRightArrow className="form-btn__icon"></SvgLongRightArrow>
          </button>
          
          <p style={{"marginBottom": "0px"}}>Already have an account? 
            <Link className="link" to="/signin">Sign In</Link>
          </p>

        </form>

      </div>
    </div>
  )
}
