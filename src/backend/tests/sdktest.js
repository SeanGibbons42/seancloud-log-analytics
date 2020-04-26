const aws = require('aws-sdk');
const uuid = require('uuid');

let s3 = new aws.S3()

listBuckets()
  .then(data=>console.log(data))
  .catch(err=>console.log(err))

function listBuckets(){
    return new Promise(function(resolve, reject) {
      s3.listBuckets({}, (err, data) => {
        if(err){ reject(err); }
        else{ resolve(data); }
      });
    });
}
