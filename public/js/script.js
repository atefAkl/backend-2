let form = document.getElementById("form1");
let the_address = document.getElementById("address");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  the_location.innerText =
    "You are searching for: " + UCFirst(the_address.value);
  weatherFun();
  form.reset();
});
const the_error = document.getElementById("error");
const the_location = document.getElementById("location");
const the_forecast = document.getElementById("forecast");

let weatherFun = async () => {
  try {
    const res = await fetch(
      "http://localhost:3000/weather?address=" + the_address.value
    );
    const data = await res.json();
    if (data.error) {
      the_error.innerText = data.error;
      the_error.style.display = "block";

      the_forecast.style.display = "none";
    } else {
      el("country").innerHTML =
        "The country: " + data.forecast.location.country;
      el("tz_id").innerHTML = "Time Zone: " + data.forecast.location.tz_id;
      el("region").innerHTML = "The Region: " + data.forecast.location.region;
      el("lat").innerHTML = "Lattitude Position: " + data.forecast.location.lat;
      el("lon").innerHTML =
        "Longtitude Position: " + data.forecast.location.lon;

      el("icon").style.backgroundImage =
        "url('" + data.forecast.current.condition.icon + "')";
      el("last_updated").innerHTML =
        "Last Updated: " + data.forecast.current.last_updated;
      el("temp_c").innerHTML = "Temp C:" + data.forecast.current.temp_c;
      the_forecast.style.display = "block";
      the_error.innerText = "";
      the_error.style.display = "none";
    }
  } catch (e) {
    the_error.innerText = e;
    the_error.style.display = "block";
  }
};

function el(id) {
  return document.getElementById(id);
}
function UCFirst(str) {
  if (typeof str !== "string") {
    throw new TypeError("Input must be a string");
  }
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
