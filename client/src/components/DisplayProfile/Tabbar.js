import React from 'react';
import classes from './Tabbar.module.css'

const Tabbar = (props) => (
    <div>
        <div className={classes.all}>
            <div className={classes.tab}>Artwork</div>
            <div className={classes.tab}>About</div>
            <div className={classes.tab}>Followers</div> 
        </div> 

        <hr />
    </div>
)

export default Tabbar;