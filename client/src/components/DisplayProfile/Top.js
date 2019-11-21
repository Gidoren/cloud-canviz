import React from "react";
import classes from "./Top.module.css";
import Add from "../../assets/images/Add.png"
import Art1 from "../../assets/images/heart.png";

const Top = props => (
  <div>
    <div className={classes.all}>
      {/*Image part of top bar*/}
      <img
        src={Art1}
        className={classes.img}
        imagealt="image"
        alt="profile"
      />

      {/*Div holding info*/}
      <div className={classes.content}>
        <p className={classes.name}>{props.name}</p>
        <button className={classes.follow}>
          <img 
            src={Add}
            className={classes.addImage}
            imagealt="follow button"
          />
          Follow
        </button>
      </div>
    </div>
  </div>
);

export default Top;
