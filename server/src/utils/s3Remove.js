var AWS = require('aws-sdk')
// Set the region 
AWS.config.update({region: 'us-west-2'})

// Create S3 service object
s3 = new AWS.S3()

const deleteObject = (key) => {
    var params = {
        Bucket: 'cloud-canvis-gallery', Key: key
    }
    s3.deleteObject(params, function(err, data) {
        if (err) {
            console.log(err,err.stack)
        } 
        else {
            console.log('Deleted', key);
        }
    })
} 

module.export = {
    deleteObject: deleteObject
}
