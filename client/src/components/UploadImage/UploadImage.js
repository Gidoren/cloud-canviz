import React from 'react'
import classes from './UploadImage.module.css'
import {useDropzone} from 'react-dropzone'
import image from '../../assets/images/UploadImage.png'

const UploadImage = (props) => {
    const {getRootProps, getInputProps} = useDropzone()

    return (
        <div className={classes.box} {...getRootProps()}>
            <div className={classes.innerBox}>
                <input className={classes.input} {...getInputProps()} />
                <img className={classes.image} src={image} alt="img"/>
                <p className={classes.p1}>Drag a file here</p>
                <p className={classes.p2}>OR</p>
                <p className={classes.p3}>Select a file from your computer</p>
            </div>
        </div>
    )

}
export default UploadImage