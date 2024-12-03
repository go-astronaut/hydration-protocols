import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Reducers/Store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Hooks/Auth";
import { useTranslation } from "react-i18next";
import {
  setEmail,
  setPassword,
  setUserName,
} from "../../../Reducers/User/User";
import { isValidEmail } from "../Authentication.utils";
import createUser from "../../../Reducers/User/User.utils";
import RoutesValues from "../../../Routes/Routes.values";

const useSignUp = () => {
  const { currentUser, userIsLoading } = useAuth();
  const { email, userName, password } = useSelector(
    (state: RootState) => state.user
  );
  const [isValidationActive, setIsValidationActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // get translations
  const { t } = useTranslation();
  const translations = {
    userName: t("singupPage.userName"),
    email: t("singupPage.email"),
    password: t("singupPage.password"),
    rememberMe: t("singupPage.rememberMe"),
    signup: t("singupPage.signup"),
    question: t("singupPage.question"),
    invalidInput: t("singupPage.invalidInput"),
    validEmailRequest: t("singupPage.invalidInput"),
    validPasswordRequest: t("singupPage.invalidInput"),
    validNameRequest: t("singupPage.validNameRequest"),
    conflict: t("singupPage.conflict"),
  };

  // Validation of the form inputs
  const isUserNameNotValid = isValidationActive && userName.length < 2;
  const isPasswordNotValid = isValidationActive && password.length < 7;
  const isEmailNotValid = isValidationActive && !isValidEmail(email);

  // Handle email input changes
  const handleEmail = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    dispatch(setEmail(value));
  };

  // Handle password input changes
  const handlePassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    dispatch(setPassword(value));
  };

  // Handle username input changes
  const handleUserName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    dispatch(setUserName(value));
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsValidationActive(true);

    // Check if the form is invalid and return
    if (userName.length < 2 || password.length < 7 || !isValidEmail(email))
      return;

    // TODO: register directly to Firebase Auth
    await dispatch(
      createUser({
        email: email,
        password: password,
        userName: userName,
      })
    );

    // Reset the form and navigate to the sign in page
    dispatch(setEmail(""));
    dispatch(setPassword(""));
    dispatch(setUserName(""));
    navigate(RoutesValues.signIn);

    // Reset the error message
    setErrorMessage(false);
  };

  const nameInputProps = {
    error: isUserNameNotValid,
    helperText: isUserNameNotValid ? translations.validNameRequest : "",
    required: true,
    fullWidth: true,
    label: translations.userName,
    autoFocus: true,
    value: userName,
    onChange: handleUserName,
  };

  const emailInputProps = {
    error: isEmailNotValid,
    helperText: isEmailNotValid ? translations.validEmailRequest : "",
    required: true,
    fullWidth: true,
    label: translations.email,
    autoComplete: "email",
    value: email,
    onChange: handleEmail,
  };

  const passwordInputProps = {
    error: isPasswordNotValid,
    helperText: isPasswordNotValid ? translations.validPasswordRequest : "",
    required: true,
    fullWidth: true,
    label: translations.password,
    type: "password",
    onChange: handlePassword,
  };

  return {
    handleSubmit,
    errorMessage,
    currentUser,
    userIsLoading,
    nameInputProps,
    emailInputProps,
    passwordInputProps,
    translations,
  };
};

export { useSignUp };
