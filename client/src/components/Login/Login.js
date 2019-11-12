import React from "react";
import useForm from "react-hook-form";
import ErrorMessage from "./errorMessage";
import classes from "./Login.module.css";
import { LOGIN_USER } from "../../grqphql/mutations";
import Logo from "../UI/Logo/Logo";

import { useMutation } from "@apollo/react-hooks";

import { AUTH_TOKEN } from "../../utils/constants";

// sets the AUTH_TOKEN in local storage to auth token returned by login mutation
const setAuthToken = token => {
  localStorage.setItem(AUTH_TOKEN, token);
};

const Login = ({
  usersEmail,
  handleHideModal,
  handleSwitchToRegister,
  client,
  handleIsLoggedin
}) => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting }
  } = useForm();

  const [loginUser, { data }] = useMutation(LOGIN_USER);

  const onSubmit = data => {
    loginUser({ variables: { email: data.email, password: data.password } })
      .then(response => {
        // close modal
        handleHideModal();
        console.log("response from gql", response);
        const token = response.data.loginUser.token;
        // set local storage with auth token returned for users
        setAuthToken(token);
        // TODO logout button that removes auth token
        client.writeData({ data: { isLoggedIn: true } });
        handleIsLoggedin(true);
      })
      .catch(err => {
        console.log("gql error: ", err);
      });
  };

  //const [pwd, setPwd] = useState("");

  return (
    <div className={classes.body}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.logoContainer}>
          <Logo className={classes.logo} width="9em" />
          <hr className={classes.line} />
        </div>
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
      <div className={classes.notMember}>
        <p>Not yet a member?</p>
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
          onClick={handleSwitchToRegister}
        >
          Sign Up
        </span>
      </div>
    </div>
  );
};

export default Login;
