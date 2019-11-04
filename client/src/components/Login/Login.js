import React, { useState } from "react";
import ReactDOM from "react-dom";
import useForm from "react-hook-form";
import ErrorMessage from "./errorMessage";
import classes from "./Login.module.css";

import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { AUTH_TOKEN } from "../../utils/constants";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
        username
      }
    }
  }
`;
// sets the AUTH_TOKEN in local storage to auth token returned by login mutation
const setAuthToken = token => {
  localStorage.setItem(AUTH_TOKEN, token);
};

const Login = ({ usersEmail }) => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearError,
    formState: { isSubmitting }
  } = useForm();

  const [loginUser, { data }] = useMutation(LOGIN_USER);

  const onSubmit = data => {
    console.log(data);
    loginUser({ variables: { email: data.email, password: data.password } })
      .then(response => {
        console.log("response from gql", response);
        const token = response.data.loginUser.token;
        // set local storage with auth token returned for users
        setAuthToken(token);
        // TODO logout button that removes auth token

        // close modal
      })
      .catch(err => {
        console.log(err);
      });
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
            defaultValue={usersEmail}
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

export default Login;
