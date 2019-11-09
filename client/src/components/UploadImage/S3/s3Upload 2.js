import React from 'react'
import AWS from 'aws-sdk'
import path from 'path'

const uploadImage = (props) => {
  console.log(props.file)
  console.log(props.filename)
  // Set the region 
  AWS.config.update({
    region: 'us-west-2'
  })
  // Create S3 service object 
  let s3 = new AWS.S3()

  // call S3 to retrieve upload file to specified bucket
  var uploadParams = {
    Bucket: 'cloud-canvis-gallery', 
    Key: path.basename(props.filename), 
    Body: props.file
  }

  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, function (err, data) {
    if(err)
      console.log("Error", err)
    if(data) 
      console.log("Upload Success", data.Location)
  })
  return <div>
      SUCCESS!
  </div>
}

export default uploadImage