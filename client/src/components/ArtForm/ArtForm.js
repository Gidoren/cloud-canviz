import React, { useState, useEffect } from "react";
import classes from "./ArtForm.module.css";
import UploadImage from "../UploadImage/UploadImage";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { uploadImage } from "../UploadImage/S3/s3Upload";

import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const initialState = {
  _id: null,
  title: "Untitled",
  artist: "Unknown Artist",
  medium: "",
  dimensions: { height: "", width: "" },
  price: "",
  category: "",
  tags: [],
  styles: [],
  year: "2019",
  description: "",
  img: {
    url: ""
  },
  orientation: ""
};

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

const ArtForm = props => {
  const [state, setState] = useState({
    ...props.artProps
  });

  const styles = useStyles();

  // Error verification dialog
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
  const handleOpenErrorDialog = () => {
    setOpenErrorDialog(true);
  };
  const handleCloseErrorDialog = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenUrlDialog(false);
  };

  // URL verification dialog
  const [openUrlDialog, setOpenUrlDialog] = React.useState(false);
  const handleOpenUrlDialog = () => {
    setOpenUrlDialog(true);
  };
  const handleCloseUrlDialog = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenUrlDialog(false);
  };

  useEffect(() => {
    setState(props.artProps);
  }, [props.artProps]);

  console.log("state: ", state);
  // boolean for when upload was successful
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [addArt, { data }] = useMutation(CREATE_ART);

  // state to hold for uploadImage component
  const [selectedFiles, setSelectedFiles] = useState([]);

  //updates the state of non-array fields on input change
  const updateField = e => {
    e.preventDefault();
    if (e.target.name === "height" || e.target.name === "width") {
      setState({
        ...state,
        dimensions: {
          ...state.dimensions,
          [e.target.name]: e.target.value
        }
      });
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value
      });
    }
  };

  // updates the state of tags when new tag added
  const updateTagsArr = (e, values) => {
    e.preventDefault();
    setState({
      ...state,
      tags: values
    });
  };

  // updates the state of styles when new style added
  const updateStylesArr = (e, values) => {
    e.preventDefault();
    console.log("values: ", values);
    setState({
      ...state,
      styles: values
    });
  };

  // function to pass as props to upload image which adds file to selectedFiles
  const handleSetFiles = event => {
    setSelectedFiles([...selectedFiles, event[0]]);
  };

  // sets the url returned by s3 in state
  const setUrl = s3url => {
    setState({
      ...state,
      img: {
        url: s3url
      }
    });
  };

  // handles cancel button being pushed
  const handleCancel = () => {
    props.handleHideModal();
    setSelectedFiles([]);
    setUrl("");
    setState({ ...initialState });
  };

  const handleClearInputs = () => {
    document.getElementById("create-course-form").reset();
  };
  // function to upload files to S3
  const fileUploadHandler = async () => {
    const fileName = selectedFiles[0].name;
    const file = selectedFiles[0];
    return await uploadImage(fileName, file)
      .then(url => {
        console.log("response from s3 url in ArtForm: ", url);
        setUploadSuccess(true);
        setUrl(url);
        return url;
      })
      .then(() => {
        console.log("upload succes val: ", uploadSuccess);
        console.log("seturl url: ", state.url);
      })
      .catch(err => console.log(err));
  };

  const _getColorStyles = (hexColor, pixelPercent) => {
    const style = {
      background: hexColor,
      width: `${pixelPercent}%`
    };
    return style;
  };

  // handles the submission of art form
  const handleSubmit = event => {
    // preent default submission
    event.preventDefault();
    // check if image was uploaded
    if (!state.img.url) {
      handleOpenUrlDialog();
    } else {
      //reset input values
      event.target.reset();
      // uploadArt to mongoDB
      addArt({
        variables: {
          _id: state._id,
          artInput: {
            artist: state.artist,
            title: state.title,
            medium: state.medium,
            category: state.category,
            dimensions: {
              height: parseInt(state.dimensions.height),
              width: parseInt(state.dimensions.width)
            },
            year: state.year,
            price: state.price.toString(),
            tags: state.tags,
            styles: state.styles,
            description: state.description,
            img: {
              url: state.img.url
            },
            orientation: state.orientation
          }
        }
      })
        .then(res => {
          handleCancel();

          console.log("respoonse from gql addArt", res);
          // refetch current user so new art work shows in CRM
        })
        .then(() => {
          props.handleRefetch();
        })
        .catch(err => {
          console.log(err);
          // handleOpenErrorDialog();
        });
    }
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={openErrorDialog}
        autoHideDuration={6000}
        onClose={handleCloseErrorDialog}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={
          <span id="message-id">
            Ooops, There was an error. Please Try Again.
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={styles.close}
            onClick={handleCloseErrorDialog}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={openUrlDialog}
        autoHideDuration={6000}
        onClose={handleCloseUrlDialog}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">Please Upload an Image File</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={styles.close}
            onClick={handleCloseUrlDialog}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
      <form
        id="upload-art-form"
        className={classes.form}
        onSubmit={event => handleSubmit(event)}
      >
        {/* TODO handle delete s3 image on cancel */}
        <Grid container spacing={1}>
          <div
            style={{
              backgroundColor: "#fafafa",
              width: "100%",
              borderBottom: ".5px solid #ccd"
            }}
          >
            <div style={{ padding: 10 }}>
              <Grid container item xs={12} justify="flex-end">
                <Grid item>
                  <Button
                    className={classes.cancelButton}
                    size="large"
                    onClick={handleCancel}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>

              <Grid container item xs={12} justify="center" alignItems="center">
                <Grid item xs={12} sm={6}>
                  <UploadImage
                    handleSettingUrl={setUrl}
                    handleSetSelectedFiles={handleSetFiles}
                    selectedFiles={selectedFiles}
                    handleUpload={fileUploadHandler}
                    uploadSuccess={uploadSuccess}
                    s3url={state.img.url}
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
            </div>
            {state.colors && (
              <div className={classes.cardColors}>
                {state.colors.map((color, index) => {
                  return (
                    <div
                      className={classes.colorBox}
                      key={index}
                      style={_getColorStyles(
                        color.hexColor,
                        color.pixelPercent
                      )}
                    ></div>
                  );
                })}
              </div>
            )}
          </div>
          <div style={{ padding: 25 }}>
            <Grid
              container
              item
              xs={12}
              spacing={1}
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={6} l={4}>
                <TextField
                  pr={4}
                  label="Artist"
                  name="artist"
                  value={state.artist}
                  fullWidth
                  margin="normal"
                  onChange={updateField}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Title"
                  name="title"
                  value={state.title}
                  fullWidth
                  margin="normal"
                  onChange={updateField}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth margin="normal">
                  <InputLabel required id="category-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    name="category"
                    value={state.category}
                    onChange={updateField}
                    required
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

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth margin="normal">
                  <InputLabel required id="orientation-label">
                    Orientation
                  </InputLabel>
                  <Select
                    required
                    labelId="orientation-label"
                    id="orientation"
                    name="orientation"
                    value={state.orientation}
                    onChange={updateField}
                  >
                    <MenuItem value={"Portrait"}>Portrait</MenuItem>
                    <MenuItem value={"Landscape"}>Landscape</MenuItem>
                    <MenuItem value={"Square"}>Square</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Medium"
                  name="medium"
                  value={state.medium}
                  fullWidth
                  margin="normal"
                  onChange={updateField}
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <TextField
                  id="height"
                  label="Height"
                  type="number"
                  name="height"
                  value={state.dimensions.height}
                  fullWidth
                  onChange={updateField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  id="width"
                  label="Width"
                  type="number"
                  name="width"
                  value={state.dimensions.width}
                  fullWidth
                  onChange={updateField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  id="year"
                  label="Year Created"
                  type="number"
                  name="year"
                  value={state.year}
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
                  id="price"
                  label="Price"
                  type="number"
                  name="price"
                  value={state.price}
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
                  required
                  name="styles"
                  value={state.styles}
                  onChange={updateStylesArr}
                  //autoSelect
                  // multiple
                  id="checkboxes-tags-demo"
                  options={styleOpts}
                  disableCloseOnSelect
                  getOptionLabel={option => option}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </React.Fragment>
                  )}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Style"
                      placeholder="Style"
                      fullWidth
                      margin="normal"
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="tags-filled"
                  name="tags"
                  value={state.tags}
                  onChange={updateTagsArr}
                  freeSolo
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
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
                <TextField
                  id="description"
                  label="Description"
                  multiline
                  fullWidth
                  name="description"
                  value={state.description}
                  rows="3"
                  margin="normal"
                  onChange={updateField}
                />
              </Grid>
            </Grid>
            <input className={classes.input} type="submit" />
          </div>
        </Grid>
      </form>
    </div>
  );
};

export default ArtForm;

const CREATE_ART = gql`
  mutation createArt($_id: String, $artInput: ArtInput) {
    createArt(_id: $_id, artInput: $artInput) {
      _id
      artist
      title
      year
      price
      tags
      styles
      medium
      category
      dimensions {
        height
        width
      }
      img {
        url
      }
      primaryColor {
        hexColor
        pixelPercent
      }
      secondaryColor {
        hexColor
        pixelPercent
      }
      tertiaryColor {
        hexColor
        pixelPercent
      }
      colors {
        hexColor
        pixelPercent
      }
      orientation
    }
  }
`;

const ArtInfo = props => {
  return (
    <div className={classes.artInfoContainer}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h5" color="textPrimary">
            {props.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" color="textSecondary">
            {props.artist}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" color="textSecondary">
            {props.year}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" color="textSecondary">
            {props.price}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

const styleOpts = [
  "Abstract",
  "Fine Art",
  "Modern",
  "Abstract Expressionism",
  "Expressionism",
  "Figurative",
  "Impressionism",
  "Realism",
  "Portraiture",
  "Surrealism",
  "Pop Art",
  "Minimalism",
  "Illustration",
  "Art Deco",
  "Street Art",
  "Photorealism",
  "Hyperrealism",
  "Cubism",
  "Dada",
  "Body Art"
];
