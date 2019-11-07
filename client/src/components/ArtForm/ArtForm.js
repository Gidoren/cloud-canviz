import React, { useState } from "react";
import ReactDOM from "react-dom";
import useForm from "react-hook-form";
import ErrorMessage from "./errorMessage";
import classes from "./ArtForm.module.css";
import UploadImage from "../UploadImage/UploadImage";

import { uploadImage } from "../UploadImage/S3/s3Upload";

import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { CostExplorer } from "aws-sdk";

const CREATE_ART = gql`
  mutation createArt($artInput: ArtInput) {
    createArt(artInput: $artInput) {
      _id
      artist
      title
      year
      price
      img {
        url
      }
    }
  }
`;

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

  const [url, setUrl] = useState("");

  // const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);

  const [addArt, { data }] = useMutation(CREATE_ART);

  // state to hold for uploadImage component
  const [selectedFiles, setSelectedFiles] = useState([]);

  // function to pass as props to upload image which adds file to selectedFiles
  const handleSetFiles = event => {
    setSelectedFiles([...selectedFiles, event[0]]);
  };

  const handleSetUrl = s3Url => {
    setUrl(s3Url);
    console.log("url: ", url);
  };

  const handleCancel = () => {
    props.handleClose();
  };

  // const Loader = () => {
  //   if (loading) {
  //     return <p>...Uploading Image</p>;
  //   } else if (success) {
  //     return <p>UPLOAD SUCCESSFUL!</p>;
  //   } else {
  //     return null;
  //   }
  // };

  // function to upload files to S3
  const fileUploadHandler = async () => {
    const fileName = selectedFiles[0].name;
    const file = selectedFiles[0];
    return await uploadImage(fileName, file)
      .then(url => {
        console.log("response from s3 url in ArtForm: ", url);
        return url;
      })
      .catch(err => console.log(err));
  };

  const onSubmit = async formData => {
    //setLoading(true);
    await fileUploadHandler()
      .then(res => {
        addArt({
          variables: {
            artInput: {
              artist: formData.artist,
              title: formData.title,
              year: formData.year,
              price: formData.price,
              img: {
                url: res
              }
            }
          }
        }).then(res => {
          console.log("respoonse from gql addArt", res);
          props.handleRefetch();
          //setSuccess(true);
          // setLoading(false);
          props.handleHideModal();
          //setSuccess(false);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className={classes.body}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.h1}>Upload Art</h1>
        <div className={classes.topContainer}>
          <div className={classes.upload}>
            <UploadImage
              handleSettingUrl={handleSetUrl}
              handleSetSelectedFiles={handleSetFiles}
              selectedFiles={selectedFiles}
            />
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
            <label className={classes.label}>Year:</label>
            <input
              className={classes.input}
              name="year"
              ref={register({ required: false, maxLength: 25 })}
            />
            <ErrorMessage error={errors.lastName} />

            <label className={classes.label}>Price:</label>
            <input
              className={classes.input}
              name="price"
              ref={register({ required: false, maxLength: 25 })}
            />
            <ErrorMessage error={errors.lastName} />
          </div>
          {/* <Loader /> */}
          <input
            className={classes.input}
            disabled={isSubmitting}
            type="submit"
          />
          <div className={classes.cancelButton} onClick={props.handleHideModal}>
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
};

export default ArtForm;
