const path = require('path');
var fs = require('fs');
var AWS = require('aws-sdk');
var S3 = require('aws-sdk').S3
var Promise = require('promise');
var S3S = require('s3-streams');
var config = require('config');
const moduleName = 's3';

// configure S3 bucket
var s3Config = config.get('s3.config');
AWS.config.update(s3Config);
const bucketName = config.get('s3.bucket.name');

// Create an S3 client setting the Endpoint to DigitalOcean Spaces
var spacesEndpoint = new AWS.Endpoint(config.get('s3.config.endpoint'));
var s3 = new AWS.S3({endpoint: spacesEndpoint});

module.exports = {
    // uploads a file to S3
    uploadFile: function(file, key){
        return new Promise(function (fulfill, reject){
            try
            {
                //var s3 = new AWS.S3();
                s3.upload({
                    Bucket: bucketName,
                    Key: key,
                    Body: file,
                    ACL: 'public-read'
                },function (err, data) {
                    if(err){
                        reject(err);
                    } else {
                        fulfill(data);
                    }
                });

            } catch(ex){
                reject(ex);
            }
        });
    }
}


  /* FUNCTIONS
  - - - - - - - - - - - - - - - - - */
/*
  function createBucket(id, name, makePublic){
    return new Promise(function (fulfill, reject){
      var log = logger.get(id, moduleName, 'createBucket');
      log.debug('params', {id: id, name: name, makePublic: makePublic});
      var options = {Bucket: name};
      if(makePublic)
        options.ACL = 'public-read';
      s3.createBucket(options, function(err, data) {
        if (err) {
          log.error('error', err);
          reject(err);
        } else {
          fulfill();
        }
      })
    });
  }

   // deletes a file
   function deleteBucket(id, bucket){
    return new Promise(function (fulfill, reject){
      var log = logger.get(id, moduleName, 'deleteBucket');
      try
      {
        log.debug('params', {id: id, bucket: bucket});
        var s3 = new AWS.S3();
        s3.deleteBucket({Bucket: bucket}, function(err, data) {
          if (err){
            reject(err);
          } else {
            log.info('succeeded');
            fulfill();
          }
        });
      } catch(ex){
        log.error('threw exception', ex);
        reject(ex);
      }
    });
  }

  // deletes a file
  function deleteFile(id, bucket, key){
    return new Promise(function (fulfill, reject){
      var log = logger.get(id, moduleName, 'deleteFile');
      try
      {
        log.debug('params', {id: id, bucket: bucket, key: key});
        var s3 = new AWS.S3();
        s3.deleteObject({Bucket: bucket, Key: key}, function(err, data) {
          if (err){
            reject(err);
          } else {
            log.info('succeeded');
            fulfill();
          }
        });
      } catch(ex){
        log.error('delete file failed', ex);
        reject(ex);
      }
    });
  }

  // deletes a folder
  function deleteFolder(id, prefix){
    return new Promise(function (fulfill, reject){
      var log = logger.get(id, moduleName, 'deleteFolder');
      try
      {

        var params = {
          Bucket: bucketName,
          Prefix: prefix
        };
        log.debug('params', params);

        var s3 = new AWS.S3();

        s3.listObjects(params, function(err, data) {
          if (err){
            log.error('failed', err.message);
            return reject(err.message);
          }

          if (data.Contents.length == 0) {
            log.debug('succeeded');
            return fulfill();
          }

          var deleteParams = {Bucket: bucketName};
          deleteParams.Delete = {Objects:[]};

          // add a key for ecah file to be deleted
          data.Contents.forEach(function(content) {
            deleteParams.Delete.Objects.push({Key: content.Key});
          });

          log.debug('deleteParams', deleteParams);

          // perform the delete operation
          s3.deleteObjects(deleteParams, function(err, data) {
            if (err){
              log.info('failed');
              log.error('failed', err.message);
              reject(err.message);
            } else {
              log.info('succeeded');
              fulfill();
            }
          });
        });
      } catch(ex){
        log.error('threw exception', ex);
        reject(ex);
      }

    });
  }

  // downloads a file from s3 to dst file
  function downloadFile(id, key, res){
    return new Promise(function (fulfill, reject){
      var log = logger.get(id, moduleName, 'downloadFile');
      try
      {

        log.debug('params', {id: id, key: key});

        // read from S3, write to temp file
        var readStream = getReadStream(id, key);

        // when the read finishes
        readStream.on('end', function () {
          log.trace('succeeded');
          fulfill();
        });

        // if there's an error
        readStream.on('error', function(err){
          reject(err.message);
        })

        log.trace('invoking the download');

        // invoke the download
        readStream.pipe(res);

      } catch(ex){
        log.error('threw exception', ex);
        reject(ex);
      }
    });
  }

  // downloads all files into the folder
  function downloadFolder(id, prefix, folder){
    return new Promise(function (fulfill, reject){
      var log = logger.get(id, moduleName, 'downloadFolder');
      try
      {

        log.debug('params', {id: id, prefix: prefix, folder: folder});
        getFiles(id, prefix)
        .then(function(files){
          // queue a list of promises to download all files
          var promises = [];
          files.forEach(function(file){
            var dest = path.join(folder, path.basename(file));
            var promise = downloadFile(id, file, dest);
            promises.push(promise);
          });

          // wait on all to finish
          Promise.all(promises)
          .then(function(){
            setTimeout(fulfill, 1000);
          })
          .catch(function(err){
            log.error('Promise.all failed', err.message);
            reject(err.message);
          })
        })
        .catch(function(err){
          log.error("'getFiles --> then' failed", err.message);
          reject(err.message);
        })

      } catch(ex){
        log.error('threw exception', ex);
        reject(ex);
      }

    })
  }

  function makePublic(id, key){
    return new Promise(function (fulfill, reject){
      var log = logger.get(id, moduleName, 'makePublic');
      try
      {

        var params = {
            Bucket: bucketName,
            Key: key,
            ACL: 'public-read'
        };

        log.debug('params', params);

        // get head content
        var _s3 = new S3();
        _s3.putObjectAcl(params, function (err, metadata) {
          if (err && err.code === 'NotFound') {
            // this is not an error - the file just doesn't exist
            log.trace('s3 file doesn\'t exist');
            fulfill(false);
          } else {
            log.trace('s3 file exists');
            fulfill(true);
          }
        });
      } catch(ex){
        log.error('threw exception', ex);
        reject(ex);
      }
    });
  }

  // determines if a file exists on S3
  function fileExists(id, key){
    return new Promise(function (fulfill, reject){
      var log = logger.get(id, moduleName, 'fileExists');
      try
      {
        // identify the file on s3
        var params = {
            Bucket: bucketName,
            Key: key
        };

        log.debug('params', {id: id, key: key});

        // get head content
        var _s3 = new S3();
        _s3.headObject(params, function (err, metadata) {
          if (err && err.code === 'NotFound') {
            // this is not an error - the file just doesn't exist
            log.trace('s3 file doesn\'t exist');
            fulfill(false);
          } else {
            log.trace('s3 file exists');
            fulfill(true);
          }
        });


      } catch(ex){
        log.error('threw exception', ex);
        reject(ex);
      }
    });
  }

  // returns an array of bucket objects
  function getBuckets(id){
    return new Promise(function (fulfill, reject){
      var log = logger.get(id, moduleName, 'getBuckets');
      try
      {
        var s3 = new AWS.S3();
        var params = {};
        s3.listBuckets(params, function(err, data) {
          if (err) 
            reject(err);
          else
            fulfill(data.Buckets);
        });

      } catch(ex){
        reject(ex);
      }
    });
  }

  // returns a list of files matching the prefix (does not include folders)
  function getFiles(id, MaxKeys){
    return new Promise(function (fulfill, reject){
      var log = logger.get(id, moduleName, 'getFiles');
      try
      {
        var s3 = new AWS.S3();
        var params = { Bucket: bucketName };
        if(MaxKeys)
          params.MaxKeys = MaxKeys;
        s3.listObjects(params, function(err, data) {
          if (err){
            reject(err);
          } else {
            var files = [];
            var paths = data.Contents.map(function(item){
                files.push(item.Key);
            });
            log.debug('succeeded', files);
            fulfill(files);
          }
        });

      } catch(ex){
        reject(ex);
      }

    });
  }

  function getFolders(id){
    return new Promise(function (fulfill, reject){
      var log = logger.get(id, moduleName, 'getFolders');
      const s3params = {
        Bucket: bucketName,
        MaxKeys: 15000,
        Delimiter: '/'
      };
      var s3 = new AWS.S3();
      s3.listObjectsV2 (s3params, (err, data) => {
        if (err) {
          reject (err);
        }
        fulfill (data);
      });
    });
  }

  // returns a read stream for a s3 bucket file
  function getReadStream(id, key){
      return S3S.ReadStream(new S3(), {
          Bucket: bucketName,
          Key: key,
     });
  }

  function publish(id, filePathOnDisk, key){
    return uploadFile(id, filePathOnDisk, key);
  }
  
  // uploads all files in a folder into a location on S3
  function uploadFolder(id, folder, prefix){
    return new Promise(function (fulfill, reject){
      var log = logger.get(id, moduleName, 'uploadFolder');
      try
      {
        log.debug('params', {id: id, folder: folder, prefix: prefix});

        // keep track of all upload promises
        var uploadPromises = [];

        // invoke all upload promises
        folder.files.forEach(function(fileName){
          var _path = path.join(folder.name, fileName);
          var key = prefix + fileName;
          var uploadPromise = uploadFile(id, _path, key);
          uploadPromises.push(uploadPromise);
        })

        log.info(uploadPromises.length + ' promises invoked');

        Promise.all(uploadPromises)
        .then(function(){
          log.info('all promises finished');

          // compare number of files on S3 to local
          var count = 0;
          var wait = config.get('s3.upload.wait');
          var attempts = config.get('s3.upload.attempts');
          var interval = setInterval(function(){
            getFiles(id, prefix).
            then(function(s3files){
              count+=1;
              log.trace(`comparing s3 count to local: ${s3files.length} vs ${folder.files.length}`);
              //console.log(`count: ${count}, s3files = ${s3files.length}, local files = ${folder.files.length}`);
              if(s3files.length == folder.files.length || count > attempts)
              {
                if(count > attempts)
                  log.trace('exceeded maximum number of attempts to find files on s3: count = ' + count);
                else
                  log.trace('all files have been found on s3');

                //console.log('S3 count matches local, clearing interval and returning');
                clearInterval(interval);
                fulfill();
              }
            })
          }, wait);

        });

      } catch(ex){
        log.error('threw exception', ex);
        reject(ex);
      }

    });
  }
  */



  


