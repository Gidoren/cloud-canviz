import React, { useState, useEffect } from "react";
import { Grid, StylesProvider } from "@material-ui/core";
import classes from "./Splash.module.css";
import { makeStyles } from "@material-ui/core/styles";
import SplashCarousel from "../SplashCarousel/SplashCarousel";
import AnimatedLogo from "../UI/Logo/AnimatedLogo";

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

  const [state, setState] = useState(null);

  return (
    <div className={styles.root}>
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
