import React from "react";

import { ReactComponent as SvgCross } from "../assets/cross.svg";
import { ReactComponent as SvgTick } from "../assets/tick.svg";

interface IInputProps extends React.HTMLAttributes<HTMLElement> {
  label: string;
  value: string;
  type: string;
  autoComplete: string;
  autoFocus: boolean;
  inputIsValid: boolean;
  inputIsTouched: boolean;
  inputIsFocused: boolean;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onInputBlur: React.ChangeEventHandler<HTMLInputElement>;
  onInputFocused: React.ChangeEventHandler<HTMLInputElement>;
  errorEmptyMessage: string;
  errorSafetyMessage: string;
  errorBoxHeight: string;
}

export const Input = ({
  value,
  label,
  type,
  autoComplete,
  autoFocus,
  inputIsValid,
  inputIsTouched,
  inputIsFocused,
  onInputChange,
  onInputBlur,
  onInputFocused,
  errorEmptyMessage,
  errorSafetyMessage,
  errorBoxHeight,
}: IInputProps) => {
  // Handles the Bottom Border and Icon
  let css_formInputFieldError = "";
  let formInputIcon = null;
  if (!inputIsValid && inputIsTouched) {
    css_formInputFieldError = "form-input__field--error";
    formInputIcon = (
      <SvgCross className="form-input__icon form-input__icon--error"></SvgCross>
    );
  } else if (inputIsValid && inputIsTouched) {
    css_formInputFieldError = "form-input__field--success";
    formInputIcon = (
      <SvgTick className="form-input__icon form-input__icon--success"></SvgTick>
    );
  }

  // Handles the Message (does not behave the same as above!)
  let formInputError = "";
  if (inputIsTouched && !inputIsValid && !inputIsFocused && value === "") {
    formInputError = errorEmptyMessage;
  } else if (inputIsTouched && !inputIsValid && !inputIsFocused) {
    formInputError = errorSafetyMessage;
  } else if (inputIsFocused) {
    formInputError = ""; // Reset
  }

  return (
    <div className="form-item">
      <div className="form-input">
        <input
          className={`form-input__field ${css_formInputFieldError}`}
          type={type}
          onChange={onInputChange}
          onBlur={onInputBlur}
          onFocus={onInputFocused}
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          maxLength={50}
          value={value}
        />
        <label className="form-input__label">
          {label}
          <span className="form-input__label-asterik"></span>
        </label>
        {formInputIcon}
      </div>
      <div className="form-input__error" style={{ height: errorBoxHeight }}>
        {formInputError}
      </div>
    </div>
  );
};
