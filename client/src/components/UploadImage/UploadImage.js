import React, {useCallback, useState} from 'react'
import classes from './UploadImage.module.css'
import Dropzone, {useDropzone} from 'react-dropzone'
import image from '../../assets/images/UploadImage.png'
import { withPreviews } from './WithPreviews/WithPreviews'

const UploadImage = (props) => {
    const [files, setFiles] = useState([])
    const handleDrop = useCallback(acceptedFile => {
        setFiles([...files, ...acceptedFile])
    })

    return (
        <div>
            {files.map((file, index) => (
                <img key={index} className={classes.img} src={file.preview} />
            ))}
            <div className={classes.box}>
                <Dropzone onDrop={withPreviews(handleDrop)}>
                    {({getRootProps, getInputProps}) => (
                        <div className={classes.innerBox} {...getRootProps()}>
                            <input className={classes.input} {...getInputProps()} />
                            <img className={classes.image} src={image} alt="img"/>
                            <p className={classes.p1}>Drag a file here</p>
                            <p className={classes.p2}>OR</p>
                            <p className={classes.p3}>Select a file from your computer</p>
                        </div>

                    )}
                </Dropzone>
            </div>
        </div>
    )

}
export default UploadImage