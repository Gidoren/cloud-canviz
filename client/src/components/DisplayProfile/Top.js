import React from 'react';
import classes from './Top.module.css'
import Art1 from '../../assets/images/heart.png'


const Top = (props) => (
    <div>
        <div className={classes.all}>
            {/*Image part of top bar*/}
            <img src={Art1} className={classes.img} imagealt="image"></img>
        
            {/*Div holding info*/}
            <div className={classes.content}>
                <p className={classes.name}>{props.name}</p>
                <button className={classes.follow}>Test</button>
            </div>
            
        </div>

        
    </div>
)

export default Top;