import React, { useState } from "react";
import useForm from "react-hook-form";
import ErrorMessage from "./errorMessage";
import classes from "./Register.module.css";

import { useMutation } from "@apollo/react-hooks";
import { REGISTER_USER } from "../../grqphql/mutations";

import TextField from "@material-ui/core/TextField";

const Register = ({ handleSwitchToLogin }) => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearError,
    formState: { isSubmitting }
  } = useForm();

  const [registerUser, { data }] = useMutation(REGISTER_USER);

  const onSubmit = data => {
    console.log("register data", data);
    if (data.confirmPassword != data.password) {
      setError("confirmPassword", "validate");
    } else {
      delete data.confirmPassword;
      registerUser({
        variables: {
          userInput: { ...data, username: data.lastName }
        }
      })
        .then(response => {
          console.log("response from gql", response.data);
          handleSwitchToLogin(response.data.registerUser.email);
        })
        .catch(err => {
          console.log("gql error: ", err);
          setError("email", "emailTaken");
          // TODO check error message to ensure error is from existing user
        });
    }
  };

  const [pwd, setPwd] = useState("");

  const setFirstPassword = value => {
    setPwd(value);
    console.log("first pasword", pwd);
  };

  const checkSamePassword = value => {
    console.log("second", pwd);
    if (value !== pwd) {
      setError("confirmPassword", "validate");
    } else {
      clearError("confirmPassword");
    }
  };

  return (
    <div className={classes.body}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.h1}>Sign Up</h1>
        <div style={{ padding: "0 1rem 0 1rem" }}>
          <TextField
            label="First Name"
            name="firstName"
            inputRef={register({ required: true, maxLength: 25 })}
            placeholder="First Name"
            fullWidth
            margin="normal"
          />

          <ErrorMessage error={errors.firstName} />

          <TextField
            label="Last Name"
            name="lastName"
            inputRef={register({ required: true, maxLength: 25 })}
            placeholder="Last Name"
            fullWidth
            margin="normal"
          />

          <ErrorMessage error={errors.lastName} />

          <TextField
            label="Email"
            name="email"
            inputRef={register({ required: true, pattern: /^\S+@\S+$/i })}
            placeholder="Email"
            fullWidth
            margin="normal"
          />

          <ErrorMessage error={errors.email} />

          <TextField
            type="password"
            label="Password"
            name="password"
            inputRef={register({ required: true, maxLength: 25 })}
            onBlur={e => setFirstPassword(e.target.value)}
            placeholder="Password"
            fullWidth
            margin="normal"
          />

          <ErrorMessage error={errors.password} />

          <TextField
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            inputRef={register({ required: true, maxLength: 25 })}
            onChange={e => checkSamePassword(e.target.value)}
            placeholder="Confirm Password"
            fullWidth
            margin="normal"
          />

          <ErrorMessage error={errors.confirmPassword} />

          <input
            className={classes.input}
            disabled={isSubmitting}
            type="submit"
          />
        </div>
      </form>

      <div className={classes.notMember}>
        <p>Already a Member?</p>
        <span
          style={{
            fontWeight: "600",
            color: "#57adda",
            justifyContent: "center",
            paddingTop: "7px",
            paddingLeft: "7px",
            cursor: "pointer"
          }}
          className={classes.signup}
          onClick={() => handleSwitchToLogin()}
        >
          Login
        </span>
      </div>
    </div>
  );
};

export default Register;
