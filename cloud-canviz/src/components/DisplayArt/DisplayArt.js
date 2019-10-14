import React from 'react';
import Art from './Art/Art';
import classes from './DisplayArt.module.css'
import Art1 from '../../assets/images/heart.jpg'
import Art2 from '../../assets/images/2.jpg'
import Art3 from '../../assets/images/3.jpg'
import Art4 from '../../assets/images/bird.jpg'

const DisplayArt = (props) => (
    <div className={classes.DisplayArt}>
        <div className = {classes.row}>
            <div className = {classes.column}>
                <Art artURL={Art1} />
                <Art artURL={Art2} />
                <Art artURL={Art3} />
                <Art artURL={Art4} />
            </div>
            <div className = {classes.column}>
                <Art artURL={Art3} />
                <Art artURL={Art4} />
                <Art artURL={Art1} />
                <Art artURL={Art2} />
            </div>
            <div className = {classes.column}>
                <Art artURL={Art3} />
                <Art artURL={Art4} />
                <Art artURL={Art1} />
                <Art artURL={Art2} />
            </div>

        </div>
    </div>
)

export default DisplayArt;