import React, { useState } from 'react'

// export function useInput(callback: (...args: string[]) => boolean) { //I tried first passing a validity function but this failed with confirmPassword
export function useInput() {

  const [input, setInput] = useState('')
  const [inputIsValid, setInputIsValid] = useState(false)
  const [inputIsTouched, setInputIsTouched] = useState(false)
  const [inputIsFocused, setInputIsFocused] = useState(false)

  const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, isValid: boolean) => {
    setInput(event.target.value)
    // if (callback(event.target.value)) { 
    //this doesnt work where validity is dependent between 2 states (e.g. password + confirm password)
      if (isValid) {
      setInputIsValid(true)
    } else {
      setInputIsValid(false)
    }
  }
  
  const onInputBlurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputIsTouched(true) // This is a 1-time event
    setInputIsFocused(false)
  }
  
  const onInputFocusedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputIsFocused(true) // We don't set emailIsTouched to false!
  }

  return {
    input,
    inputIsValid,
    inputIsTouched,
    inputIsFocused,
    onInputChangeHandler,
    onInputBlurHandler,
    onInputFocusedHandler
  }
}
