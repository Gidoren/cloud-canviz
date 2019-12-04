import React from 'react';
import classes from './Spinner.module.css'

const Spinner = (props) => (

    <div style={{margin: props.margin}} className={classes.loader}>Loading...</div>

)

export default Spinner;