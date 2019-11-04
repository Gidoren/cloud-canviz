var AWS = require('aws-sdk')
// Set the region 
AWS.config.update({region: 'us-west-2'})
var fs = require('fs')

// Create S3 service object
s3 = new AWS.S3()

const uploadImage = (key) => {
  
  // call S3 to retrieve upload file to specified bucket
  var uploadParams = {Bucket: 'cloud-canvis-gallery', Key: '', Body: ''}
  var file = key

// Configure the file stream and obtain the upload parameters
  var fileStream = fs.createReadStream(key)
  fileStream.on('error', function(err) {
    console.log('File Error', err)
  })
  uploadParams.Body = fileStream;
  var path = require('path');
  uploadParams.Key = path.basename(file);

  // call S3 to retrieve upload file to specified bucket
  s3.upload (uploadParams, function (err, data) {
    if (err) {
      console.log("Error", err)
    } if (data) {
      console.log("Upload Success", data.Location)
    }
  })
}

module.exports = {
  uploadImage: uploadImage
}