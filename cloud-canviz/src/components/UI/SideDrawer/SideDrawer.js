import React from 'react';
import classes from './SideDrawer.module.css';
import ColorDots from '../../ColorPicker/ColorPicker'
import ProductsList from '../../ProductsList/ProductsList';

const SideDrawer = (props) => (
    <div className={classes.SideDrawer}>
        <div className={classes.productType}>
            <span className={classes.heading}>Product Type</span>
            <ProductsList />
        </div>
        <div className={classes.color}>
            <span className={classes.heading}>Color</span>
            <ColorDots />
        </div>
        
        
    </div>
)

export default SideDrawer