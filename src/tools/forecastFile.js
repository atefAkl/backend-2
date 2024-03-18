const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.weatherapi.com/v1/current.json?key=51a20bc2793045b6b26142621220803&q=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, response) => {
    // low level error
    if (error) {
      callback("Unable to connect weather service", undefined);
    } else if (response.body.error) {
      callback(response.body.error.message, undefined);
    } else {
      callback(undefined, response.body);
    }
  });
};
module.exports = forecast;
