import React from "react";
import AWS from "aws-sdk";
import path from "path";

const dotenv = require("dotenv");
dotenv.config();

// const AWS_ID = process.env.AWS_ACCESS_KEY_ID;
// const AWS_ACCESS = process.env.AWS_SECRET_ACCESS_KEY;

const AWS_ID = "AKIAXEJA2EQA4A6SKF6I";
const AWS_ACCESS = "9o7Y5T33fKW5nDjp8WNTDZkLxJiNWQ105ykdl8bE";

const uploadImage = props => {
  // Set the region
  AWS.config.update({
    region: "us-west-2",
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_ACCESS
  });

  // Create S3 service object
  var s3 = new AWS.S3();

  // call S3 to retrieve upload file to specified bucket
  var uploadParams = {
    Bucket: "cloud-canvis-gallery",
    Key: path.basename(props.filename),
    Body: props.file
  };

  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, function(err, data) {
    if (err) console.log("Error", err);
    if (data) console.log("Upload Success", data.Location);
    //s3.getObject()
  });
  return <div>SUCCESS!</div>;
};

export default uploadImage;
