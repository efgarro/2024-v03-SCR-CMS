import * as React from "react";

import { IConfirmResetPasswordFormInputs } from "../../types/scrTypes";
import { useForm, FormProvider } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import InputEmail from "./InputEmail";
import InputPassword from "./InputPassword";
import { confirmForgotPassword } from "../../services/authServices";

import { Typography, Button } from "@mui/material";
import AccountBox from "@mui/icons-material/AccountBox";
import styles from "../../css/auth.module.css";
import InputConfirmationCode from "./InputConfirmationCode";

const ConfirmResetPasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const methods = useForm<IConfirmResetPasswordFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      confirmationCode: "",
    },
  });

  const handleForgotPassword = async (d: IConfirmResetPasswordFormInputs) => {
    try {
      await confirmForgotPassword(d.email, d.password, d.confirmationCode);
      alert("Account confirmed successfully!\nSign in on next page.");
      navigate("/auth");
    } catch (error) {
      alert(`Failed to confirm account: ${error}`);
    }
  };

  return (
    <React.Fragment>
      <div className={`layout_flexCol ${styles.authForm_header}`}>
        <AccountBox sx={{ color: "#F000D0" }} />
        {/* <Typography variant="h6" align="center">
          Confirm Reset Password
        </Typography> */}
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleForgotPassword)}>
          <div className={`layout_flexCol ${styles.authForm_input}`}>
            <InputEmail />
            <InputPassword />
            <InputConfirmationCode />
            <Button type="submit" variant="contained">
              Confirm Reset Password
            </Button>
          </div>
        </form>
      </FormProvider>
    </React.Fragment>
  );
};

export default ConfirmResetPasswordForm;
