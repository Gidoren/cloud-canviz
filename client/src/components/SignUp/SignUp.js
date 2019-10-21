import React from "react";
import ReactDOM from "react-dom";
import useForm from "react-hook-form";
import ErrorMessage from "./errorMessage";
import "./SignUp.css";

function SignUp() {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearError,
    formState: { isSubmitting }
  } = useForm();
  const onSubmit = data => {
    console.log(JSON.stringify(data));
  };

  let firstPwd = "";

  const setFirstPassword = value => {
    firstPwd = value;
    console.log(firstPwd);
  };

  const checkSamePassword = value => {
    if (value !== firstPwd) {
      setError("confirmPassword", "validate");
    } else {
      clearError("confirmPassword");
    }
  };
  // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  // const validateUserName = async value => {
  //   await sleep(1000);
  //   if (value !== "bill") {
  //     setError("username", "validate");
  //   } else {
  //     clearError("username");
  //   }
  // };

  return (
    <form className="signupContainer" onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign Up</h1>
      <label>First Name:</label>
      <input
        name="firstName"
        ref={register({ required: true, maxLength: 25 })}
      />
      <ErrorMessage error={errors.firstName} />

      <label>Last Name:</label>
      <input
        name="lastName"
        ref={register({ required: true, maxLength: 25 })}
      />
      <ErrorMessage error={errors.lastName} />

      {/* <label>Type of User</label>
      <select name="typeOfUser" ref={register({ required: true })}>
        <option value="">Select...</option>
        <option value="Artist">Artist</option>
        <option value="Collector">Collector</option>
      </select>
      <ErrorMessage error={errors.typeOfUser} /> */}

      <label>Email</label>
      <input
        name="email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      <ErrorMessage error={errors.email} />

      <label>Password</label>
      <input
        name="password"
        onBlur={e => setFirstPassword(e.target.value)}
        ref={register({ required: true })}
      />
      <ErrorMessage error={errors.password} />

      <label>Confirm Password</label>
      <input
        name="confirmPassword"
        onBlur={e => checkSamePassword(e.target.value)}
        ref={register({ required: true })}
      />
      <ErrorMessage error={errors.confirmPassword} />

      <label>Age</label>
      <input
        name="age"
        type="number"
        ref={register({ required: true, min: 18 })}
      />
      <ErrorMessage error={errors.age} />

      <input disabled={isSubmitting} type="submit" />
    </form>
  );
}

export default SignUp;