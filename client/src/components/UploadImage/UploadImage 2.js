import React, {Component} from 'react'
import classes from './UploadImage.module.css'
import Dropzone from 'react-dropzone'
import image from '../../assets/images/UploadImage.png'
import S3Upload from './S3/s3Upload'

class UploadImage extends Component {
    state = {
        selectedFiles: [],
        uploadFiles: false
    }
    fileSelectHandler = event => {
        this.setState({selectedFiles: [... this.state.selectedFiles, event[0]]})
    }
    fileUploadHandler = () => {
        this.setState({uploadFiles: true})
    }
    render(){
        return (
            <div>
                {this.state.uploadFiles === false && <Dropzone onDrop={this.fileSelectHandler}>
                    {({getRootProps, getInputProps}) => (
                        <div className={classes.innerBox} {...getRootProps()}>
                            <input className={classes.input} onChange={this.fileSelectHandler} {...getInputProps()} />
                            <img className={classes.image} src={image} alt="img"/>
                            <p className={classes.p1}>Drag a file here</p>
                            <p className={classes.p2}>OR</p>
                            <p className={classes.p3}>Select a file from your computer</p>
                        </div>
                    )}
                </Dropzone>}
                <button onClick={this.fileUploadHandler}>Upload</button>
                {this.state.uploadFiles && <S3Upload filename={this.state.selectedFiles[0].name} file={this.state.selectedFiles[0]} />}
             </div>
        
        )

    }
    

}
export default UploadImage