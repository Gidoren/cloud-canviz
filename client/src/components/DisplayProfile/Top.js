import React from 'react';
import classes from './Top.module.css'
import Art1 from '../../assets/images/heart.png'


const Top = (props) => (
    <div className={classes.all}>
        
        {/*Image part of top bar*/}
        <img src={Art1} className={classes.img} imagealt="image"></img>
        
        {/*Div holding info*/}
        <div className={classes.content}>
            <p ClassName={classes.name}>{props.name}</p>
        </div>
    </div>
)

export default Top;