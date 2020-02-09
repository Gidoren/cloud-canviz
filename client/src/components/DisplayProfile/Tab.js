import React from 'react';
import classes from './Tab.module.css'

const Tab = (props) => (
        <button className={classes.tab}>
                <span className={props.active == props.option ? classes.active : ""}>
                        {props.option}
                </span>
        </button>
)

export default Tab;