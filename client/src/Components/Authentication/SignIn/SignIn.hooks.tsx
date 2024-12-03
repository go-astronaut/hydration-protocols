import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Hooks/Auth";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isValidEmail } from "../Authentication.utils";
import { setEmail, setPassword } from "../../../Reducers/User/User";
import RoutesValues from "../../../Routes/Routes.values";
import { RootState } from "../../../Reducers/Store";

type Margin = "normal" | "none" | "dense" | undefined;

const useSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login, currentUser, userIsLoading } = useAuth();
  const { email, password } = useSelector((state: RootState) => state.user);
  const [isValidationActive, setIsValidationActive] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  // get translations
  const { t } = useTranslation();
  const translations = {
    email: t("signinPage.email"),
    password: t("signinPage.password"),
    rememberMe: t("signinPage.rememberMe"),
    signin: t("signinPage.signin"),
    question: t("signinPage.question"),
    invalidInput: t("signinPage.invalidInput"),
    validEmailRequest: t("signinPage.invalidInput"),
    validPasswordRequest: t("signinPage.invalidInput"),
  };

  // check if email and password are valid
  const isPasswordNotValid = isValidationActive && password.length < 7;
  const isEmailNotValid = isValidationActive && !isValidEmail(email.trim());

  // TODO: use local state for email
  const handleEmail = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    dispatch(setEmail(value));
  };

  // TODO: use local state for password
  const handlePassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    dispatch(setPassword(value));
  };

  // toggle remember me checkbox
  const toggleRememberMe = () => {
    setRememberMe((prev) => !prev);
  };

  /**
   * submit email and password to login
   * @param event Form event
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent default form behavior
    event.preventDefault();

    // activate validation
    setIsValidationActive(true);

    // check if email and password are valid
    if (password.length < 7 || !isValidEmail(email.trim())) return;

    // login user
    login(email.trim(), password, rememberMe)
      .then((res) => {
        if (res) {
          setErrorMessage(false);
          dispatch(setEmail(""));
          dispatch(setPassword(""));
          navigate(RoutesValues.tracker);
        } else {
          setErrorMessage(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(true);
      });
  };

  // props for email input
  const emailInputProps = {
    error: isEmailNotValid,
    helperText: isEmailNotValid ? translations.validEmailRequest : "",
    margin: "normal" as Margin,
    required: true,
    fullWidth: true,
    label: translations.email,
    autoComplete: "email",
    autoFocus: true,
    value: email,
    onChange: handleEmail,
  };

  // props for password input
  const passwordInputProps = {
    error: isPasswordNotValid,
    helperText: isPasswordNotValid ? translations.validPasswordRequest : "",
    margin: "normal" as Margin,
    required: true,
    fullWidth: true,
    label: translations.password,
    type: "password",
    autoComplete: "current-password",
    value: password,
    onChange: handlePassword,
  };

  const rememberMeInputProps = {
    value: "remember",
    onClick: toggleRememberMe,
    checked: rememberMe,
  };

  return {
    handleSubmit,
    emailInputProps,
    passwordInputProps,
    rememberMeInputProps,
    errorMessage,
    currentUser,
    userIsLoading,
    translations,
  };
};

export { useSignIn };
