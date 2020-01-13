import React, { useState, useEffect } from "react";
import { Grid, StylesProvider } from "@material-ui/core";
import classes from "./Splash.module.css";
import { makeStyles } from "@material-ui/core/styles";
import SplashCarousel from "../SplashCarousel/SplashCarousel";
import AnimatedLogo from "../UI/Logo/AnimatedLogo";
import ImageReveal from "../UI/ImageReveal/ImageReveal";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  splash: {
    height: "100vh"
  },
  show: {
    height: "60%"
  },
  slide: {
    height: "40%"
  }
  // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // },
}));

const Splash = props => {
  const styles = useStyles();

  const [state, setState] = useState({});

  return (
    <div className={styles.root}>
      <ImageReveal
        overlayColor="#fff"
        overlayOpacity="0.5"
        bgImage="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Flaurabegleybloom%2Ffiles%2F2018%2F06%2FCalifornia-sunset-1200x799.jpg"
        width="50"
        height="50"
        borderWidth="0.5"
        text="Painting"
        marginPercent="10"
        widthPercent="80"
        fontSize="10px"
      />
      <ImageReveal
        overlayColor="#fff"
        overlayOpacity="0.5"
        bgImage="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Flaurabegleybloom%2Ffiles%2F2018%2F06%2FCalifornia-sunset-1200x799.jpg"
        width="50"
        height="50"
        borderWidth="0.5"
        text="Photo"
        marginPercent="10"
        widthPercent="80"
        fontSize="10px"
      />
      <Grid
        className={styles.splash}
        container
        alignItems="center"
        alignContent="center"
        justify="center"
      >
        <Grid className={styles.show} item xs={12}>
          <div className={classes.showContainer}></div>
        </Grid>
        <Grid className={styles.slide} item xs={12}>
          <div className={classes.slideContainer}>
            <SplashCarousel />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Splash;
