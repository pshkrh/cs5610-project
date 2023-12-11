import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import classes from "./index.css";
import { axios } from 'axios';

function DetailPage() {
  const location = useLocation();
  const detail = location.state.detail;
  const history = useHistory();
  const handleBackClick = () => {
    history.push("/search");
  };

  const [isDataAvailable, setIsDataAvailable] = useState(null);

  const checkGet = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/externalapis?name=${encodeURIComponent(
        detail.name
      )}`
    );

    if (response.data) {
      setIsDataAvailable(response.data);
    }
  };

  useEffect(() => {
    checkGet();
  }, []);

  const handlePostRequest = async () => {
    // const response = await axios.post(
    //   `${process.env.REACT_APP_API_URL}/api/users/getallusers`
    // );

    // const isDataAvailable = await axios.get(
    //   `http://localhost:5001/api/externalapis?name=${encodeURIComponent(
    //     detail.name
    //   )}`
    // );

    checkGet();

    if (isDataAvailable) {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/externalapis`,
        detail
      );
    } else {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/externalapis`,
        detail
      );
      setIsDataAvailable(response.data);
    }
  };

  return (
    <div className={classes.container}>
      <button onClick={handleBackClick} className={classes.backButton}>
        Back to Search
      </button>
      <h1>Place Details</h1>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{detail.name}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{detail.vicinity}</td>
          </tr>
          <tr>
            <td>Place Id</td>
            <td>{detail.place_id}</td>
          </tr>
          <tr>
            <td>Ratings</td>
            <td>{detail.rating}</td>
          </tr>
          <tr>
            <td>Total ratings by users</td>
            <td>{detail.user_ratings_total}</td>
          </tr>
          {/* Add more details here */}
        </tbody>
      </table>
      <button onClick={handlePostRequest} className={classes.backButton}>
        Post to Database
      </button>
      <h1>Result From Database</h1>
      {isDataAvailable ? (
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{isDataAvailable.name}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{isDataAvailable.address}</td>
            </tr>
            <tr>
              <td>Rating</td>
              <td>{isDataAvailable.rating}</td>
            </tr>
            <tr>
              <td>Total User Ratings</td>
              <td>{isDataAvailable.totalUserRatings}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <h3>There is no data in database for this name</h3>
      )}
    </div>
  );
}

export default DetailPage;
