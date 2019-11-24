import React from "react";
import classes from "./Art.module.css";
import Heart from "../../../assets/images/heart.png";
import { Link } from "react-router-dom";

/* props are properties that are passed from displayComment such as title, creator of the art.
Think of it as parameters in Functions.*/

const Art = props => (
  <div data-aos="fade-up">
    <img
      className={classes.img}
      src={props.artURL}
      alt={props.title}
    />
    <div
      className={classes.artInfo}
      width={classes.img.width}
    >
      {/* Always use link instead of <a> tag so it doesn't reload the page but rerenders the component. 
            We do this so that website don't do api calls again, or don't lose our website state.
            This is what is called single page Webapp(SPA). */}
      <Link to={{ pathname: props.link }} className={classes.link}>
        <p className={classes.username}>{props.fullname}</p>
      </Link>
      <span>
        <img className={classes.heart} src={Heart} alt="like" />
      </span>
      <p className={classes.title}>
        {props.title}, {props.year}
      </p>
      {/* <p className={classes.desc}>{props.desc}</p> */}
      {props.height && <p className={classes.dimensions}>
        {props.height}x{props.width}
      </p>}
      <p className={classes.dimensions}>
        {props.desc}
      </p>
    </div>
  </div>
);

export default Art;
