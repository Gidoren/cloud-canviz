import React, { Component } from "react";
import classes from "./UploadImage.module.css";
import Dropzone from "react-dropzone";
import image from "../../assets/images/UploadImage.png";
import Spinner from "../UI/Spinner/Spinner";

class UploadImage extends Component {
  state = {
    selectedFiles: [],
    uploadFiles: false,
    isUploading: false
  };
  fileSelectHandler = async event => {
    this.setState({isUploading: true})
    this.props.handleSetSelectedFiles(event);
    this.props.handleUpload();
  };

  render() {
    if(this.props.s3url && this.state.isUploading === true)
      this.setState({isUploading: false})
      

    return (
      <div>
        {this.state.isUploading && <Spinner margin='0 auto'/>}
        {this.props.s3url && (
          <img className={classes.uploadImage} src={this.props.s3url}></img>
        )}
        {this.props.selectedFiles.length === 0 && !this.props.s3url && (
          <Dropzone onDrop={this.fileSelectHandler}>
            {({ getRootProps, getInputProps }) => (
              <div className={classes.innerBox} {...getRootProps()}>
                <input
                  className={classes.input}
                  onChange={this.fileSelectHandler}
                  {...getInputProps()}
                />
                <img className={classes.image} src={image} alt="img" />
                <p className={classes.p1}>Drag a file here</p>
                <p className={classes.p2}>OR</p>
                <p className={classes.p3}>Select a file from your computer</p>
              </div>
            )}
          </Dropzone>
        )}
        <div>
          {this.state.selectedFiles.map((file, index) => (
            <img
              data-aos="zoom-out"
              key={index}
              className={classes.img}
              src={file.preview}
              alt="file uploaded"
            />
          ))}
          {this.state.selectedFiles.length > 0 && (
            <button className={classes.upload} onClick={this.fileUploadHandler}>
              Upload
            </button>
          )}
        </div>
      </div>
    );
  }
}
export default UploadImage;

// import React, { Component } from "react";
// import classes from "./UploadImage.module.css";
// import Dropzone from "react-dropzone";
// import image from "../../assets/images/UploadImage.png";
// import S3Upload from "./S3/s3Upload";
// import { withPreviews } from "./WithPreviews/WithPreviews";

// class UploadImage extends Component {
//   state = {
//     selectedFiles: [],
//     uploadFiles: false
//   };
//   fileSelectHandler = event => {
//     this.setState({ selectedFiles: [...this.state.selectedFiles, event[0]] });
//   };
//   fileUploadHandler = () => {
//     this.setState({ uploadFiles: true });
//   };
//   render() {
//     return (
//       <div>
//         {this.state.selectedFiles.length === 0 && (
//           <Dropzone onDrop={this.fileSelectHandler}>
//             {({ getRootProps, getInputProps }) => (
//               <div className={classes.innerBox} {...getRootProps()}>
//                 <input
//                   className={classes.input}
//                   onChange={this.fileSelectHandler}
//                   {...getInputProps()}
//                 />
//                 <img className={classes.image} src={image} alt="img" />
//                 <p className={classes.p1}>Drag a file here</p>
//                 <p className={classes.p2}>OR</p>
//                 <p className={classes.p3}>Select a file from your computer</p>
//               </div>
//             )}
//           </Dropzone>
//         )}
//         <div>
//           {this.state.selectedFiles.map((file, index) => (
//             <img
//               data-aos="zoom-out"
//               key={index}
//               className={classes.img}
//               src={file.preview}
//             />
//           ))}
//           {this.state.selectedFiles.length > 0 && (
//             <button className={classes.upload} onClick={this.fileUploadHandler}>
//               Upload
//             </button>
//           )}
//         </div>

//         {this.state.uploadFiles && (
//           <S3Upload
//             filename={this.state.selectedFiles[0].name}
//             file={this.state.selectedFiles[0]}
//             handleUrl={this.props.handleSettingUrl}
//           />
//         )}
//       </div>
//     );
//   }
// }
// export default UploadImage;
