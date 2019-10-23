import React from 'react';
import classes from './Top.module.css'
import Art1 from '../../assets/images/heart.png'
import Art from '../DisplayArt/Art/Art'


const Top = (props) => (
    <div>
        <img src={props.imgURL} className={classes.image} imagealt="image"></img>
        <p ClassName={classes.name}>{props.name}</p>
    </div>
)

export default Top;