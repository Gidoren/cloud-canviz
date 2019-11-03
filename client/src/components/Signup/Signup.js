import React, { useState } from "react";
import ReactDOM from "react-dom";
import useForm from "react-hook-form";
import ErrorMessage from "./errorMessage";
import classes from "./Signup.module.css";

import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
//  TODO receive props from Register.
// If props received form register autopopulate users email.

// const SIGNUP_USER = gql`
//   mutation registerUser($userInput: UserInput) {
//     registerUser(userInput: $userInput) {
//       _id
//       firstName
//       lastName
//       email
//     }
//   }
// `;

const Signup = props => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearError,
    formState: { isSubmitting }
  } = useForm();

  //   const [registerUser, { data }] = useMutation(REGISTER_USER);

  const onSubmit = data => {
    console.log(data);
  };

  //const [pwd, setPwd] = useState("");

  return (
    <div className={classes.body}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.h1}>Sign In</h1>
        <div style={{ padding: "0 1rem 0 1rem" }}>
          <label className={classes.label}>Email</label>
          <input
            className={classes.input}
            name="email"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          />
          <ErrorMessage error={errors.email} />

          <label className={classes.label}>Password</label>
          <input
            className={classes.input}
            name="password"
            ref={register({ required: true })}
          />
          <ErrorMessage error={errors.password} />

          <input
            className={classes.input}
            disabled={isSubmitting}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;
