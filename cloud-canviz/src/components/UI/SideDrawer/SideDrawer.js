import React from 'react';
import classes from './SideDrawer.module.css';
import ColorPicker from '../../ColorPicker/ColorPicker'
import OptionsList from '../../OptionsList/OptionsList';

const SideDrawer = (props) => (
    <div className={classes.SideDrawer}>
        <div className={classes.productType}>
            <span className={classes.heading}>CATEGORY</span>
            <OptionsList option1="Option 1" option2="Option 2" option3="Option 3"/>
        </div>
        <div className={classes.color}>
            <span className={classes.heading}>COLOR</span>
            <ColorPicker />
        </div>
        <div className={classes.size}>
            <span className={classes.heading}>SIZE</span>
            <OptionsList option1="Option 1" option2="Option 2" option3="Option 3"/>
        </div>
        <div className={classes.price}>
            <span className={classes.heading}>PRICE</span>
            <OptionsList option1="Option 1" option2="Option 2" option3="Option 3"/>
        </div>
        <div className={classes.orientation}>
            <span className={classes.heading}>ORIENTATION</span>
            <OptionsList option1="Option 1" option2="Option 2" option3="Option 3"/>
        </div>
        <div className={classes.artistCountry}>
            <span className={classes.heading}>ARTIST COUNTRY</span>
            <OptionsList option1="Option 1" option2="Option 2" option3="Option 3"/>
        </div>
    </div>
)

export default SideDrawer