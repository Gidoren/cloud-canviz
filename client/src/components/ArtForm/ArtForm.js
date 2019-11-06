import React, { useState } from "react";
import ReactDOM from "react-dom";
import useForm from "react-hook-form";
import ErrorMessage from "./errorMessage";
import classes from "./ArtForm.module.css";
import UploadImage from "../UploadImage/UploadImage";

import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
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

const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      _id
      email
      firstName
      lastName
    }
  }
`;

const Query = props => {
  //const [currUser, { loading, user }] = useLazyQuery(CURRENT_USER);

  const { loading, error, data } = useQuery(CURRENT_USER);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  if (data) {
    console.log("Response data: ", data);
  }
  //const reData = <p>data</p>
  return <p>Done</p>;
};

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

const ArtForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearError,
    formState: { isSubmitting }
  } = useForm();

  //const [currUser, { loading, user }] = useLazyQuery(CURRENT_USER);

  // const [loadGreeting, { called, loading, data }] = useLazyQuery(
  //   GET_GREETING,
  //   { variables: { language: "english" } }
  // );

  const onSubmit = data => {
    console.log(data);
    //currUser();

    //console.log("current user res: ", user);

    // .then(response => {
    //   console.log("current user response", response);
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  };

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
          <div className={classes.inputContainer}>
            <label className={classes.label}>Title:</label>

            <input
              className={classes.input}
              name="title"
              ref={register({ required: false, maxLength: 25 })}
            />

            <ErrorMessage error={errors.firstName} />

            <label className={classes.label}>Artist:</label>
            <input
              className={classes.input}
              name="artist"
              ref={register({ required: false, maxLength: 25 })}
            />
            <ErrorMessage error={errors.lastName} />
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.label}>Date:</label>
            <input
              className={classes.input}
              name="artist"
              ref={register({ required: false, maxLength: 25 })}
            />
            <ErrorMessage error={errors.lastName} />

            <label className={classes.label}>Price:</label>
            <input
              className={classes.input}
              name="artist"
              ref={register({ required: false, maxLength: 25 })}
            />
            <ErrorMessage error={errors.lastName} />
          </div>
          <Query />
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
