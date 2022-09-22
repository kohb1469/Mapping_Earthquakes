// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//create dark view
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Dark: dark
};

// Create the map object with center at the San Francisco airport.
let map = L.map('mapid', {
  center: [40.7,-94.5],
  zoom: 4,
  layers: [streets]
});
//pass our mapp layers into our layer control and add the layer control to the map
L.control.layers(baseMaps).addTo(map);



// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/kohb1469/Mapping_Earthquakes/Mapping_GeoJSON_Points/Mapping_GeoJSON_Points/static/js/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    onEachFeature: function(features, type){
      let x = features.properties.faa 
      console.log(x);
      type.bindPopup("<h2> Airprot code: " + x + "</h2><br /><h4> Airport name: " + features.properties.name + "</h4>");
      
    }
  }).addTo(map);
});




