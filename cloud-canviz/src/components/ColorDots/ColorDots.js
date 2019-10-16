import React from 'react';
import classes from './ColorDots.module.css'
const ColorDots = (props) => (
    <div>
        <span><button className={classes.red}/></span>
        <span><button className={classes.blue}/></span>
        <span><button className={classes.green}/></span>
        <span><button className={classes.yellow}/></span>
        <span><button className={classes.brown}/></span>
        <span><button className={classes.orange}/></span>
        <span><button className={classes.pink}/></span>
        <span><button className={classes.purple}/></span>
        <span><button className={classes.black}/></span>
    </div>
)
export default ColorDots;