import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom';

import './SignUp.css'
import { ReactComponent as SvgLongRightArrow } from '../assets/long-right-arrow.svg';
import { ReactComponent as SvgEyeOpen } from '../assets/eye-open.svg';
import { ReactComponent as SvgEyeClosed } from '../assets/eye-closed.svg';
import { ReactComponent as SvgCross } from '../assets/cross.svg';
import { ReactComponent as SvgTick } from '../assets/tick.svg';

export default function SignUp() {

  const [email, setEmail] = useState('')
  const [emailIsValid, setEmailIsValid] = useState(false)
  const [emailIsTouched, setEmailIsTouched] = useState(false)
  const [emailIsFocused, setEmailIsFocused] = useState(false)

  const [password, setPassword] = useState('')
  const [passwordIsValid, setPasswordIsValid] = useState(false)
  const [passwordIsTouched, setPasswordIsTouched] = useState(false)
  const [passwordIsFocused, setPasswordIsFocused] = useState(false)

  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false)
  const [confirmPasswordIsTouched, setConfirmPasswordIsTouched] = useState(false)
  const [confirmPasswordIsFocused, setConfirmPasswordIsFocused] = useState(false)

  const [showPasswordText, setShowPasswordText] = useState(false)

  const onFormSubmit = (e: FormEvent): void => {
    e.preventDefault()
  }

  const onShowPasswordHandler = () => { 
    setShowPasswordText((prevState) => !prevState)
  }

  /*
  //
  // Email Input Handler  
  //
  */
  const onEmailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(event.target.value).toLowerCase())) {
      setEmailIsValid(true)
    } else {
      setEmailIsValid(false)
    }
  }
  
  const onEmailBlurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailIsTouched(true) // This is a 1-time event
    setEmailIsFocused(false)
  }
  
  const onEmailFocusedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailIsFocused(true) // We don't set emailIsTouched to false!
  }
  
  let css_formEmailInputFieldError = ""
  let formEmailInputIcon = null;
  if (!emailIsValid && emailIsTouched) {
    css_formEmailInputFieldError = "form-input__field--error"
    formEmailInputIcon = <SvgCross className="form-input__icon form-input__icon--error"></SvgCross>
  } else if (emailIsValid && emailIsTouched) {
    css_formEmailInputFieldError = "form-input__field--success"
    formEmailInputIcon = <SvgTick className="form-input__icon form-input__icon--success"></SvgTick>
  }

  let formEmailInputError = ""
  if (emailIsTouched && !emailIsValid && !emailIsFocused) {
    formEmailInputError = "Please enter a valid e-mail address"
  } else if (emailIsFocused) {
    formEmailInputError = "" // Reset
  }

  /*
  //
  // Password Input Handler  
  //
  */

  const onPasswordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
    if (re.test(event.target.value)) {
      setPasswordIsValid(true)
    } else {
      setPasswordIsValid(false)
    }
  }
  
  const onPasswordBlurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordIsTouched(true) // This is a 1-time event
    setPasswordIsFocused(false)
  }
  
  const onPasswordFocusedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordIsFocused(true) 
  }

  let css_formPasswordInputFieldError = ""
  let formPasswordInputIcon = null;
  if (!passwordIsValid && passwordIsTouched) {
    css_formPasswordInputFieldError = "form-input__field--error"
    formPasswordInputIcon = <SvgCross className="form-input__icon form-input__icon--error"></SvgCross>
  } else if (passwordIsValid && passwordIsTouched) {
    css_formPasswordInputFieldError = "form-input__field--success"
    formPasswordInputIcon = <SvgTick className="form-input__icon form-input__icon--success"></SvgTick>
  }

  let formPasswordInputError = ""
  if (passwordIsTouched && !passwordIsValid && !passwordIsFocused && password === '') {
    formPasswordInputError = "Please enter a password"
  } else if (passwordIsTouched && !passwordIsValid && !passwordIsFocused) {
    formPasswordInputError = "Please enter a valid password with a number, special character, uppercase and lowercase letter that is at least 8 letters"
  } else if (passwordIsFocused) {
    formPasswordInputError = "" // Reset
  }

  /*
  //
  // Confirm Password Input Handler  
  //
  */

  const onConfirmPasswordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value)
    console.log(event.target.value, email)
    if (event.target.value === password) {
      setConfirmPasswordIsValid(true)
    } else {
      setConfirmPasswordIsValid(false)
    }
  }
  
  const onConfirmPasswordBlurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPasswordIsTouched(true) // This is a 1-time event
    setConfirmPasswordIsFocused(false)
  }
  
  const onConfirmPasswordFocusedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPasswordIsFocused(true) 
  }

  let css_formConfirmPasswordInputFieldError = ""
  let formConfirmPasswordInputIcon = null;
  if (!confirmPasswordIsValid && confirmPasswordIsTouched) {
    css_formConfirmPasswordInputFieldError = "form-input__field--error"
    formConfirmPasswordInputIcon = <SvgCross className="form-input__icon form-input__icon--error"></SvgCross>
  } else if (confirmPasswordIsValid && confirmPasswordIsTouched) {
    css_formConfirmPasswordInputFieldError = "form-input__field--success"
    formConfirmPasswordInputIcon = <SvgTick className="form-input__icon form-input__icon--success"></SvgTick>
  }

  let formConfirmPasswordInputError = ""
  if (confirmPasswordIsTouched && !confirmPasswordIsValid && !confirmPasswordIsFocused) {
    formConfirmPasswordInputError = "Passwords must match"
  } else if (confirmPasswordIsFocused) {
    formConfirmPasswordInputError = "" // Reset
  }


  return(
    <div className="form-container">
      <div className="form-wrapper">

        <h2>Sign Up</h2>

        <form 
          className="form"  
          action="POST" 
          onSubmit={onFormSubmit}>
          
          <div className="form-item">
            <div className="form-input">
              <input 
                className={`form-input__field ${css_formEmailInputFieldError}`}
                type="email" 
                onChange={onEmailChangeHandler} 
                onBlur={onEmailBlurHandler}
                onFocus={onEmailFocusedHandler}
                autoComplete="new-email"
                autoFocus
                maxLength={50}
                value={email}/>
              <label className="form-input__label">
                Email
                <span className="form-input__label-asterik"></span>
              </label>
              {formEmailInputIcon}
            </div>
            <div className="form-input__error" style={{"height": "20px"}}>
              {formEmailInputError}
            </div>
          </div>

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

          <div className="form-item">
            <div className="form-input">
              <input 
                className={`form-input__field ${css_formPasswordInputFieldError}`}
                type={!showPasswordText ? "password" : "text"}
                onChange={onPasswordChangeHandler} 
                onBlur={onPasswordBlurHandler}
                onFocus={onPasswordFocusedHandler}
                autoComplete="new-password"
                maxLength={50}
                value={password}/>
              <label className="form-input__label">
                Password
                <span className="form-input__label-asterik"></span>
              </label>
              {formPasswordInputIcon}
            </div>
            <div className="form-input__error" style={{"height": "40px"}}>
              {formPasswordInputError}
            </div>
          </div>

          <div className="form-item">
            <div className="form-input">
              <input 
                className={`form-input__field ${css_formConfirmPasswordInputFieldError}`}
                type={!showPasswordText ? "password" : "text"}
                onChange={onConfirmPasswordChangeHandler} 
                onBlur={onConfirmPasswordBlurHandler}
                onFocus={onConfirmPasswordFocusedHandler}
                autoComplete="new-password"
                maxLength={50}
                value={confirmPassword}/>
              <label className="form-input__label">
                Password
                <span className="form-input__label-asterik"></span>
              </label>
              {formConfirmPasswordInputIcon}
            </div>
            <div className="form-input__error" style={{"height": "20px"}}>
              {formConfirmPasswordInputError}
            </div>
          </div>
          
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
