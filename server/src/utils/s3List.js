var AWS = require('aws-sdk')
// Set the region 
AWS.config.update({region: 'us-west-2'})

// Create S3 service object
s3 = new AWS.S3()

// Create the parameters for calling listObjects
var bucketParams = {
  Bucket : 'cloud-canvis-gallery',
}
// Call S3 to obtain a list of the objects in the bucket
const listObject = () => {
  s3.listObjects(bucketParams, function(err, data){
    if (err) {
      console.log('Error', err)
    } else {
      console.loh("Success", data)
    }
  })
}

module.exports = {
  listObject: listObject
}