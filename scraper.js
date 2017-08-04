var client = require('http-api-client');
 
client.request({
    url: 'https://public.api.openprocurement.org/api/2.3/tenders/f5fc672c3d034d1bbee42e8bfca41e4b'
}).then(function (response) {
  
    console.log(response.getData()); // returns the string representation of the response body 
   
});
