import React from 'react'
import AWS from 'aws-sdk'
import path from 'path'

const uploadImage = (props) => {
  // Set the region 
  AWS.config.update({
    region: 'us-west-2',
    accessKeyId: 'AKIAXEJA2EQA4GG7FPVS',
    secretAccessKey: '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'
  })
  // Create S3 service object 
  var s3 = new AWS.S3()

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