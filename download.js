var fs = require('fs');
var request = require('request');
var Converter = require('csvtojson').Converter;
var converter = new Converter({delimiter:';'});

/*
converter.on('end_parsed',function(jsonArray){
  var arr = JSON.parse(jsonArray);
  console.log(arr);
});
require('fs').createReadStream('./facebookbilder.csv').pipe(converter);
*/

var index = 0;
var images = [];

converter.fromFile("./facebookbilder2.csv",function(err,result){
  console.log(result[0]);
  images = result;
  downloadImage();
});

function downloadImage(){
  var uri = images[index]['Facebook Image'];
  var filename = 'rb-fb-img-' + index + '.jpg';
  index++;
  console.log(uri,filename);
  if(index == images.length-1){
    console.log('done');
    return;
  }
  else {
    download(uri,filename,downloadImage);
  }
}


var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

/*
download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
  console.log('done');
});

*/





