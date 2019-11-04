import React, { useState } from "react";
import ReactDOM from "react-dom";
import useForm from "react-hook-form";
import ErrorMessage from "./errorMessage";
import classes from "./Register.module.css";

import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

// const REGISTER_USER = gql`
//   mutation registerUser($userInput: UserInput) {
//     registerUser(userInput: $userInput) {
//       _id
//       firstName
//       lastName
//       email
//     }
//   }
// `;

const artInfo = props => {
  return (
    <div className={classes.artInfoContainer}>
      <h3>{props.title}</h3>
      <p>{props.artist}</p>
      <p>{props.year}</p>
      <p>{props.price}</p>
    </div>
  );
};

const ArtForm = props => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearError,
    formState: { isSubmitting }
  } = useForm();

  //const [registerUser, { data }] = useMutation(REGISTER_USER);

  const onSubmit = data => {
    console.log(data);
    // delete data.confirmPassword;
    // registerUser({ variables: { userInput: data } })
    //   .then(response => {
    //     //console.log("response from gql", response.data.registerUser.email);
    //     handleSwitchToLogin(response.data.registerUser.email);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  const [pwd, setPwd] = useState("");

  return (
    <div className={classes.body}>
      <div className={classes.topContainer}></div>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.h1}>Sign Up</h1>
        <div style={{ padding: "0 1rem 0 1rem" }}>
          <label className={classes.label}>First Name:</label>

          <input
            className={classes.input}
            id="traceInput"
            name="firstName"
            ref={register({ required: true, maxLength: 25 })}
          />

          <ErrorMessage error={errors.firstName} />

          <label className={classes.label}>Last Name:</label>
          <input
            className={classes.input}
            name="lastName"
            ref={register({ required: true, maxLength: 25 })}
          />
          <ErrorMessage error={errors.lastName} />

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
            onBlur={e => setFirstPassword(e.target.value)}
            ref={register({ required: true })}
          />
          <ErrorMessage error={errors.password} />

          <label className={classes.label}>Confirm Password</label>
          <input
            className={classes.input}
            name="confirmPassword"
            onBlur={e => checkSamePassword(e.target.value)}
            ref={register({ required: true })}
          />
          <ErrorMessage error={errors.confirmPassword} />

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

export default Register;
