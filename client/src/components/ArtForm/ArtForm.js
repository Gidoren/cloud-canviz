import React, { useState } from "react";
import classes from "./ArtForm.module.css";
import UploadImage from "../UploadImage/UploadImage";

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

import { uploadImage } from "../UploadImage/S3/s3Upload";

import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const initialState = {
  title: "Untitled",
  artist: "Unknown Artist",
  medium: "",
  height: "",
  width: "",
  price: "",
  category: "",
  tags: [],
  styles: [],
  year: "2019",
  description: "",
  url: ""
};

const ArtForm = props => {
  const [state, setState] = useState({
    ...initialState
  });

  // boolean for when upload was successful
  const [uploadSuccess, setUploadSuccess] = useState(false);

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
    console.log("text context: ", e.target.textContent);
    console.log("value: ", e.target.value);
    setState({
      ...state,
      styles: state.styles.concat(e.target.textContent)
    });
  };

  // function to pass as props to upload image which adds file to selectedFiles
  const handleSetFiles = event => {
    setSelectedFiles([...selectedFiles, event[0]]);
  };

  const setUrl = s3url => {
    setState({
      ...state,
      url: s3url
    });
  };

  const handleCancel = () => {
    props.handleHideModal();
    setSelectedFiles([]);
    setUrl("");
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
  // prints the current state
  const printState = e => {
    // e.preventDefault();
    console.log(state);
  };

  // handles the submission of art form
  const handleSubmit = event => {
    // preent default submission
    event.preventDefault();
    //reset input values
    // TODO fix bug - autocomplete inputs not resetting
    event.target.reset();
    // uploadArt to mongoDB
    addArt({
      variables: {
        artInput: {
          artist: state.artist,
          title: state.title,
          medium: state.medium,
          category: state.category,
          dimensions: {
            height: parseInt(state.height),
            width: parseInt(state.width)
          },
          year: state.year,
          price: state.price.toString(),
          tags: state.tags,
          styles: state.styles,
          description: state.description,
          img: {
            url: state.url
          }
        }
      }
    })
      .then(res => {
        // reset intitial state
        setState({ ...initialState });

        console.log("respoonse from gql addArt", res);
        // refetch current user so new art work shows in CRM
        props.handleRefetch();
      })
      .then(() => {
        handleCancel();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form
      id="upload-art-form"
      className={classes.form}
      onSubmit={event => handleSubmit(event)}
    >
      {/* TODO handle delete s3 image on cancel */}
      <Grid container spacing={2}>
        <Grid container item xs={12} justify="flex-end">
          <Grid item>
            <Button size="large" onClick={handleCancel} color="secondary">
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
              s3url={state.url}
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
        <Grid item xs={12} sm={6} l={4}>
          <TextField
            pr={4}
            label="Artist"
            name="artist"
            fullWidth
            margin="normal"
            onChange={updateField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            onChange={updateField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Medium"
            name="medium"
            fullWidth
            margin="normal"
            onChange={updateField}
          />
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

        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <TextField
            id="price"
            label="Price"
            type="number"
            name="price"
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
            autoSelect
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
        <Grid item xs={12}>
          <TextField
            id="description"
            label="Description"
            multiline
            fullWidth
            name="description"
            rows="3"
            margin="normal"
            onChange={updateField}
          />
        </Grid>
      </Grid>
      <input className={classes.input} type="submit" />
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
