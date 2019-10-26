import React from 'react';
import classes from './Art.module.css';
import Heart from '../../../assets/images/heart.png'
import {Link} from 'react-router-dom';

const Art = (props) => (
    <div>
        <img data-aos="zoom-in" className={classes.img} src={props.artURL} alt="image"/>
        <div data-aos="zoom-in" className={classes.artInfo} width={classes.img.width}>
            {/* Always use link so it doesn't reload the page but renders the component*/}
            <Link to={{pathname: props.link}} className={classes.username}>{props.username}</Link>
            <span><img className={classes.heart} src={Heart}/></span>
            <p className={classes.title}>{props.title}, {props.year}</p>
            <p className={classes.desc}>Description</p>
            <p className={classes.dimensions}>{props.height}x{props.width}</p>
        </div>
    </div>
)

export default Art;