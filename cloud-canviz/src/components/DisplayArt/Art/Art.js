import React from 'react';
import classes from './Art.module.css';

const Art = (props) => (
    <div>
        <img className={classes.img} src={props.artURL} alt="image"/>
    </div>
)

export default Art;