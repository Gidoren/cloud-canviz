import React from 'react';
import classes from './Art.module.css';
import Heart from '../../../assets/images/heart.png'

const Art = (props) => (
    <div>
        <img data-aos="zoom-in" data-aos-delay="15000"  className={classes.img} src={props.artURL} alt="image"/>
        <div data-aos="zoom-in" className={classes.artInfo} width={classes.img.width}>
            <p className={classes.username}>{props.username} <span><img className={classes.heart} src={Heart}/></span></p>
            <p className={classes.artname}>{props.title}, {props.year}</p>
            <p className={classes.desc}>Description</p>
            <p className={classes.dimensions}>{props.height}x{props.width}</p>
        </div>
    </div>
)

export default Art;