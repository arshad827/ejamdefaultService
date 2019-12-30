var express = require('express');
var router = express.Router();
var OAuth = require('oauth');
var header = {
  "X-Yahoo-App-Id": "noBSbm78"
};

/* POST  API- by array of Zip Codes */
router.post('/getWeatherByZipcodes', function (req, res, next) {
  let promise = [];
  let request = new OAuth.OAuth(
    null,
    null,
    'dj0yJmk9RTlOWVhjT1QyNVIzJmQ9WVdrOWJtOUNVMkp0TnpnbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTAw',
    '9f59568efc025b78f12811ffb76879d5cc439cce',
    '1.0',
    null,
    'HMAC-SHA1',
    null,
    header
  );
  const locations = req.body;
  if (locations.length > 0) {
    // foreach on locations
    locations.forEach(element => {
      // pushing promise 
      promise.push(new Promise((resolve, reject) => {
        request.get(`https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${element.zipCode}&format=json`, null, null, function (err, data, result) {
          if (err) {
            reject(JSON.parse(err));
          }
          else {
            resolve(JSON.parse(data));
          }
        });
      }));
    });
  }
  // waiting for all fulfillments (or the first rejection).
  Promise.all(promise).then(resp => {
    res.send(resp);
  });
});


/* GET API- for single zipcode*/
router.get('/getWeatherByZipcode', function (req, res, next) {
  var request = new OAuth.OAuth(
    null,
    null,
    'dj0yJmk9RTlOWVhjT1QyNVIzJmQ9WVdrOWJtOUNVMkp0TnpnbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTAw',
    '9f59568efc025b78f12811ffb76879d5cc439cce',
    '1.0',
    null,
    'HMAC-SHA1',
    null,
    header
  );
  console.log('====req=>>>>>', req.body);
  const location = req.body ? req.body.zipCode : '';
  // calling Weather API
  request.get(
    `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${location}&format=json`,
    null,
    null,
    function (err, data, result) {
      if (err) {
        console.log(err);
        res.send(JSON.parse(err));
      } else {
        console.log(data)
        res.send(JSON.parse(data));
      }
    }
  );
});


module.exports = router;
