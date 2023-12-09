import React, { Component } from "react";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import * as actions from "../../redux-store/Actions/authAction";
import classes from "./index.css";

class ProfileDetail extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    // const userId = this.props.match.params.id;
    if (this.props.location && this.props.location.state) {
      const detail = this.props.location.state.user;
      this.setState({ user: detail });
      console.log(detail);
    }
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
                <tr>
                  <td>
                    <strong>City:</strong>
                  </td>
                  <td>{user.city}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Mobile:</strong>
                  </td>
                  <td>{user.mobile}</td>
                </tr>
                {/* <tr>
                  <td>
                    <strong>Wallet Amount:</strong>
                  </td>
                  <td>{user.walletAmount}</td>
                </tr> */}
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