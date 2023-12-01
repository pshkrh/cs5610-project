// src/components/ProfileDetail.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux-store/Actions/authAction";
import classes from "./index.css";

class ProfileDetail extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const userId = this.props.match.params.id;
    // Fetch user details using userId
    // You might need to create a new Redux action for this
    this.props.getUserById(userId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({ user: this.props.user });
    }
  }

  render() {
    const { user } = this.state;

    return (
      <div className={classes.container}>
        {user ? (
          <div>
            <h1>User Details</h1>
            <table>
              <tbody>
                <tr>
                  <td>
                    <strong>Name:</strong>
                  </td>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Email:</strong>
                  </td>
                  <td>{user.email}</td>
                </tr>
                {/* Add more rows for other user details here */}
              </tbody>
            </table>
            {/* Add more user details here */}
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.User.user, // Ensure this matches how your state is structured
});

const mapDispatchToProps = {
  getUserById: actions.getUserById,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail);
