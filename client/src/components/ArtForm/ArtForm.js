import React, { useState } from "react";
import useForm from "react-hook-form";
import ErrorMessage from "./errorMessage";
import classes from "./ArtForm.module.css";
import UploadImage from "../UploadImage/UploadImage";

import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

import { uploadImage } from "../UploadImage/S3/s3Upload";

import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ArtForm = props => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting }
  } = useForm();

  const [state, setState] = useState({
    title: "Untitled",
    artist: "Artist",
    medium: "",
    height: 0,
    width: 0,
    price: 0.0,
    category: "",
    tags: [],
    styles: [],
    year: "2019"
  });

  const [url, setUrl] = useState("");

  // const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);

  const [addArt, { data }] = useMutation(CREATE_ART);

  // state to hold for uploadImage component
  const [selectedFiles, setSelectedFiles] = useState([]);

  //updates the state of non-array fields on input change
  const updateField = e => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  // updates the state of tags when new tag added
  const updateTagsArr = e => {
    e.preventDefault();
    setState({
      ...state,
      tags: state.tags.concat(e.target.value)
    });
  };

  // updates the state of styles when new style added
  const updateStylesArr = e => {
    e.preventDefault();
    console.log("styles: ", e.target.textContent);
    console.log("state array: ", e.target.State);
    setState({
      ...state,
      styles: state.styles.concat(e.target.textContent)
    });
  };

  // const handleStyleDelete = (e, val) => {
  //   e.preventDefault();
  //   console.log("style delete: ", e.target.value);
  // };

  // function to pass as props to upload image which adds file to selectedFiles
  const handleSetFiles = event => {
    setSelectedFiles([...selectedFiles, event[0]]);
  };

  const handleSetUrl = s3Url => {
    setUrl(s3Url);
    console.log("url: ", url);
  };

  const handleCancel = () => {
    props.handleHideModal();
    setSelectedFiles([]);
    setUrl("");
  };

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

  const printState = e => {
    // e.preventDefault();
    console.log(state);
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
        });
      })
      .then(() => {
        handleCancel();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(printState)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5" align="center">
            UPLOAD ART
          </Typography>
        </Grid>
        <Grid container item xs={12} justify="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <UploadImage
              handleSettingUrl={handleSetUrl}
              handleSetSelectedFiles={handleSetFiles}
              selectedFiles={selectedFiles}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ArtInfo
              title={state.title}
              artist={state.artist}
              year={state.year}
              price={`$ ${state.price}`}
            ></ArtInfo>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Artist"
            name="artist"
            inputRef={register({ required: false, maxLength: 30 })}
            fullWidth
            margin="normal"
            onChange={updateField}
          />
          <ErrorMessage error={errors.lastName} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Title"
            name="title"
            inputRef={register({ required: false, maxLength: 30 })}
            fullWidth
            margin="normal"
            onChange={updateField}
          />
          <ErrorMessage error={errors.lastName} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Medium"
            name="medium"
            inputRef={register({ required: false, maxLength: 25 })}
            fullWidth
            margin="normal"
            onChange={updateField}
          />
          <ErrorMessage error={errors.lastName} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={state.category}
              onChange={updateField}
            >
              <MenuItem value={"Painting"}>Painting</MenuItem>
              <MenuItem value={"Photography"}>Photography</MenuItem>
              <MenuItem value={"Drawing"}>Drawing</MenuItem>
              <MenuItem value={"Sculpture"}>Sculpture</MenuItem>
              <MenuItem value={"Mixed Media"}>Mixed Media</MenuItem>
              <MenuItem value={"Print"}>Print</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3}>
          <TextField
            id="height"
            label="Height"
            type="number"
            name="height"
            fullWidth
            onChange={updateField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            id="width"
            label="Width"
            type="number"
            name="width"
            fullWidth
            onChange={updateField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="year"
            label="Year Created"
            type="number"
            name="year"
            fullWidth
            onChange={updateField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="tags-filled"
            name="tags"
            onChange={updateTagsArr}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  color="secondary"
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={params => (
              <TextField
                {...params}
                label="Tags"
                placeholder="Tags"
                margin="normal"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            name="styles"
            onChange={updateStylesArr}
            //onInputChange={handleStyleDelete}
            //onDelete={handleStyleDelete}
            multiple
            id="checkboxes-tags-demo"
            options={stylesOptions}
            disableCloseOnSelect
            getOptionLabel={option => option.title}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                  value={option.title}
                  //onChange={handleStyleDelete}
                />
                {option.title}
              </React.Fragment>
            )}
            renderInput={params => (
              <TextField
                {...params}
                label="Styles"
                placeholder="Styles"
                fullWidth
                margin="normal"
              />
            )}
          />
        </Grid>
      </Grid>

      {/* <h1 className={classes.h1}>Upload Art</h1>
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
      <input className={classes.input} disabled={isSubmitting} type="submit" />
      <div className={classes.cancelButton} onClick={handleCancel}>
        Cancel
      </div>
    </form>
  );
};

export default ArtForm;

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

const stylesOptions = [
  { title: "Abstract" },
  { title: "Fine Art" },
  { title: "Modern" },
  { title: "Abstract Expressionism" },
  { title: "Expressionism" },
  { title: "Figurative" },
  { title: "Impressionism" },
  { title: "Realism" },
  { title: "Portraiture" },
  { title: "Surrealism" },
  { title: "Pop Art" },
  { title: "Minimalism" },
  { title: "Illustration" },
  { title: "Art Deco" },
  { title: "Street Art" },
  { title: "Photorealism" },
  { title: "Hyperrealism" },
  { title: "Cubism" },
  { title: "Dada" },
  { title: "Body Art" }
];

// import React, { useState } from "react";
// import useForm from "react-hook-form";
// import ErrorMessage from "./errorMessage";
// import classes from "./ArtForm.module.css";
// import UploadImage from "../UploadImage/UploadImage";

// import { uploadImage } from "../UploadImage/S3/s3Upload";

// import { useMutation } from "@apollo/react-hooks";
// import { gql } from "apollo-boost";

// const CREATE_ART = gql`
//   mutation createArt($artInput: ArtInput) {
//     createArt(artInput: $artInput) {
//       _id
//       artist
//       title
//       year
//       price
//       img {
//         url
//       }
//     }
//   }
// `;

// const ArtInfo = props => {
//   return (
//     <div className={classes.artInfoContainer}>
//       <h3>{props.title}</h3>
//       <p>{props.artist}</p>
//       <p>{props.year}</p>
//       <p>{props.price}</p>
//     </div>
//   );
// };

// const ArtForm = props => {
//   const {
//     register,
//     handleSubmit,
//     errors,
//     formState: { isSubmitting }
//   } = useForm();

//   const [url, setUrl] = useState("");

//   // const [loading, setLoading] = useState(false);
//   // const [success, setSuccess] = useState(false);

//   const [addArt, { data }] = useMutation(CREATE_ART);

//   // state to hold for uploadImage component
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   // function to pass as props to upload image which adds file to selectedFiles
//   const handleSetFiles = event => {
//     setSelectedFiles([...selectedFiles, event[0]]);
//   };

//   const handleSetUrl = s3Url => {
//     setUrl(s3Url);
//     console.log("url: ", url);
//   };

//   const handleCancel = () => {
//     props.handleHideModal();
//     setSelectedFiles([]);
//     setUrl("");
//   };

//   // const Loader = () => {
//   //   if (loading) {
//   //     return <p>...Uploading Image</p>;
//   //   } else if (success) {
//   //     return <p>UPLOAD SUCCESSFUL!</p>;
//   //   } else {
//   //     return null;
//   //   }
//   // };

//   // function to upload files to S3
//   const fileUploadHandler = async () => {
//     const fileName = selectedFiles[0].name;
//     const file = selectedFiles[0];
//     return await uploadImage(fileName, file)
//       .then(url => {
//         console.log("response from s3 url in ArtForm: ", url);
//         return url;
//       })
//       .catch(err => console.log(err));
//   };

//   const onSubmit = async formData => {
//     //setLoading(true);
//     await fileUploadHandler()
//       .then(res => {
//         addArt({
//           variables: {
//             artInput: {
//               artist: formData.artist,
//               title: formData.title,
//               year: formData.year,
//               price: formData.price,
//               img: {
//                 url: res
//               }
//             }
//           }
//         }).then(res => {
//           console.log("respoonse from gql addArt", res);
//           props.handleRefetch();
//         });
//       })
//       .then(() => {
//         handleCancel();
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   return (
//     <div className={classes.body}>
//       <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
//         <h1 className={classes.h1}>Upload Art</h1>
//         <div className={classes.topContainer}>
//           <div className={classes.upload}>
//             <UploadImage
//               handleSettingUrl={handleSetUrl}
//               handleSetSelectedFiles={handleSetFiles}
//               selectedFiles={selectedFiles}
//             />
//           </div>
//           <div className={classes.artInfo}>
//             <ArtInfo
//               title="Art Title"
//               artist="Artist"
//               year="2018"
//               price="$1000"
//             ></ArtInfo>
//           </div>
//         </div>
//         <div style={{ padding: "0 1rem 0 1rem" }}>
//           <div className={classes.inputContainer}>
//             <label className={classes.label}>Title:</label>

//             <input
//               className={classes.input}
//               name="title"
//               ref={register({ required: false, maxLength: 25 })}
//             />

//             <ErrorMessage error={errors.firstName} />

//             <label className={classes.label}>Artist:</label>
//             <input
//               className={classes.input}
//               name="artist"
//               ref={register({ required: false, maxLength: 25 })}
//             />
//             <ErrorMessage error={errors.lastName} />
//           </div>
//           <div className={classes.inputContainer}>
//             <label className={classes.label}>Year:</label>
//             <input
//               className={classes.input}
//               name="year"
//               ref={register({ required: false, maxLength: 25 })}
//             />
//             <ErrorMessage error={errors.lastName} />

//             <label className={classes.label}>Price:</label>
//             <input
//               className={classes.input}
//               name="price"
//               ref={register({ required: false, maxLength: 25 })}
//             />
//             <ErrorMessage error={errors.lastName} />
//           </div>
//           {/* <Loader /> */}
//           <input
//             className={classes.input}
//             disabled={isSubmitting}
//             type="submit"
//           />
//           <div className={classes.cancelButton} onClick={handleCancel}>
//             Cancel
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ArtForm;
