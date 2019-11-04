import React, { useState } from "react";
import ReactDOM from "react-dom";
import useForm from "react-hook-form";
import ErrorMessage from "./errorMessage";
import classes from "./ArtForm.module.css";
import UploadImage from "../UploadImage/UploadImage";

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

const ArtInfo = props => {
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

  //const [pwd, setPwd] = useState("");

  return (
    <div className={classes.body}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.h1}>Upload Art</h1>
        <div className={classes.topContainer}>
          <div className={classes.upload}>
            <UploadImage />
          </div>
          <div className={classes.artInfo}>
            <ArtInfo
              title="Art Title"
              artist="Artist"
              year="2018"
              price="$1000"
            ></ArtInfo>
          </div>
        </div>
        <div style={{ padding: "0 1rem 0 1rem" }}>
          <label className={classes.label}>Title:</label>

          <input
            className={classes.input}
            id="traceInput"
            name="title"
            ref={register({ required: true, maxLength: 25 })}
          />

          <ErrorMessage error={errors.firstName} />

          <label className={classes.label}>Artist:</label>
          <input
            className={classes.input}
            name="artist"
            ref={register({ required: true, maxLength: 25 })}
          />
          <ErrorMessage error={errors.lastName} />

          <label className={classes.label}>Date:</label>
          <input
            className={classes.input}
            name="artist"
            ref={register({ required: true, maxLength: 25 })}
          />
          <ErrorMessage error={errors.lastName} />

          <label className={classes.label}>Price:</label>
          <input
            className={classes.input}
            name="artist"
            ref={register({ required: true, maxLength: 25 })}
          />
          <ErrorMessage error={errors.lastName} />

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

export default ArtForm;
