import React from 'react'
import classes from './Item.module.css';

const Item = (props) => (
    <div>
        <p className={classes.item}>{props.children}</p>
    </div>
)
export default Item