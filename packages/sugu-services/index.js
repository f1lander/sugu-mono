'use strict'
const https = require('https');

const baseURL = `https://jsonmock.hackerrank.com/api/movies/search/?Title=spiderman&page=1`;
https.get(baseURL, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
