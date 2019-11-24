import React from "react";
import classes from "./OptionsList.module.css";
// import { tsPropertySignature } from '@babel/types';

const OptionsList = props => (
  <div>
    <span className={classes.item} >{props.option1}</span>
    <span className={classes.item}>{props.option2}</span>
    <span className={classes.item}>{props.option3}</span>
    <span className={classes.item}>{props.option4}</span>
    <span className={classes.item}>{props.option5}</span>
    <span className={classes.item}>{props.option6}</span>
  </div>
);

export default OptionsList;
