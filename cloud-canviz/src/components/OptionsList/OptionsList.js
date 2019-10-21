import React from 'react';
import classes from './OptionsList.module.css'
import { tsPropertySignature } from '@babel/types';

const OptionsList = (props) => (
        <div data-aos="zoom-in-right" data-aos-easing="ease-in-sine">
            <span className={classes.item}>{props.option1}</span>
            <span className={classes.item}>{props.option2}</span>
            <span className={classes.item}>{props.option3}</span>
        </div>
)
    

export default OptionsList;