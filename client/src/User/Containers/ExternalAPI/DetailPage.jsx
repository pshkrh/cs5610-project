import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import classes from "./index.css";

function DetailPage() {
  const location = useLocation();
  const detail = location.state.detail;
  const history = useHistory();
  const handleBackClick = () => {
    history.push("/search");
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
          {/* Add more details here */}
        </tbody>
      </table>
    </div>
  );
}

export default DetailPage;
