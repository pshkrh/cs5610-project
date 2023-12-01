import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./index.css"; // Adjust the path as necessary

function ExternalAPI() {
  const [type, setType] = useState("garbage");
  const [radius, setRadius] = useState(1);
  const [location, setLocation] = useState("San Francisco");
  const [results, setResults] = useState([]);

  const history = useHistory();

  const locations = {
    "San Francisco": { lat: 37.7749, lng: -122.4194 },
    "New York": { lat: 40.7128, lng: -74.006 },
    Boston: { lat: 42.3601, lng: -71.0589 },
  };

  const handleSubmit = () => {
    if (window.google) {
      const selectedLocation = locations[location];
      const map = new window.google.maps.Map(document.createElement("div"));
      const service = new window.google.maps.places.PlacesService(map);

      const numericRadius = parseInt(radius);

      const request = {
        location: new window.google.maps.LatLng(
          selectedLocation.lat,
          selectedLocation.lng
        ),
        radius: numericRadius * 1609.34, // Convert miles to meters
        keyword: [type], // type from the state
      };

      service.nearbySearch(request, (res, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setResults(res);
        } else {
          console.error("Places API error:", status);
          setResults([]);
        }
      });
    }
  };

  const handleDetailClick = (placeData) => {
    const serializablePlaceData = {
      // Include only serializable properties
      name: placeData.name,
      vicinity: placeData.vicinity,
      place_id: placeData.place_id,
      // other properties you need
    };

    history.push({
      pathname: `/search/${placeData.place_id}`,
      state: { detail: serializablePlaceData },
    });
  };

  return (
    <div className={classes.container}>
      <div id="division1">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="garbage">Garbage Collector</option>
          <option value="waste">Waste Collector</option>
          <option value="recycling">Recycling</option>
        </select>
      </div>
      <div className={classes.division2}>
        <select value={radius} onChange={(e) => setRadius(e.target.value)}>
          <option value="1">1 Mile</option>
          <option value="200">200 Miles</option>
          <option value="500">500 Miles</option>
          <option value="1000">1000 Miles</option>
        </select>
      </div>
      <div className={classes.division2}>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="San Francisco">San Francisco</option>
          <option value="New York">New York</option>
          <option value="Boston">Boston</option>
        </select>
      </div>
      <div className={classes.division3}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className={classes.division4}>
        <table className={classes.resultsTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {results.map((place, index) => (
              <tr key={index}>
                <td onClick={() => handleDetailClick(place)}>{place.name}</td>
                <td>{place.vicinity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExternalAPI;
