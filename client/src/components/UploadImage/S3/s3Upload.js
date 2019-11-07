import AWS from "aws-sdk";
import path from "path";

const dotenv = require("dotenv");
dotenv.config();

const AWS_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const AWS_ACCESS = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

export const uploadImage = async (filename, file) => {
  // Set the region
  AWS.config.update({
    region: "us-west-1",
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_ACCESS
  });

  // Create S3 service object
  var s3 = new AWS.S3();

  // call S3 to retrieve upload file to specified bucket
  var uploadParams = {
    Bucket: "cloud-canviz-photos-1",
    Key: path.basename(filename),
    Body: file,
    ACL: "public-read",
    ContentType: "text/plain"
  };

  // call S3 to retrieve upload file to specified bucket
  // await s3.upload(uploadParams, async (err, data) => {
  //   if (err) console.log("Error", err);
  //   if (data) {
  //     console.log("Upload Success", data.Location);
  //     //handleUrl(data.Location);
  //     return data.Location;
  //   }
  // });

  return await s3
    .upload(uploadParams)
    .promise()
    .then(res => {
      console.log("upload url in promise: ", res.Location);
      return res.Location;
    })
    .catch(err => {
      console.log("s3 error", err);
    });
};

export default uploadImage;
