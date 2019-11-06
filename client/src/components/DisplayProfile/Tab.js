import React from 'react';
import classes from './Tab.module.css'

const Tab = (props) => (
        <button className={classes.tab}>{props.option}</button>
)

export default Tab;