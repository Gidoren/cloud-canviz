import React from 'react';
import classes from './Tab.module.css'

const Tab = (props) => {
        let multiClass = classes.tab
        if(props.active == props.option){
                multiClass += ' ' + classes.active
        }
        return (
                <button className={multiClass}>
                        {props.option}
                </button>
        )

}
        


export default Tab;