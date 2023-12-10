import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

import * as actions from "../../redux-store/Actions/authAction";
import classes from "./index.css";

class Profiles extends Component {
    state = {
        activePage: 1,
        currentRowData: [],
        itemLength: 0,
    };

    componentDidMount = async () => {
        // const resp = await axios.get("https://localhost:5001/api/users/allusers");
        // console.log("Response", resp);
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/users/getallusers`
        );
        console.log(typeof response.data, response.data);
        // await this.props.getAllUsers();
        this.updateCurrentRowData(1, response.data);
    };

    handlePageChange = (pageNumber) => {
        this.updateCurrentRowData(pageNumber);
    };

    updateCurrentRowData = (pageNumber, response) => {
        let upperLimit = pageNumber * 5;
        let lowerLimit = upperLimit - 5;
        let data = response.slice(lowerLimit, upperLimit);
        this.setState({
            currentRowData: data,
            activePage: pageNumber,
        });
    };

    handleUserClick = (userData) => {
        this.props.history.push({
            pathname: `/profile/${userData._id}`,
            state: { user: userData },
        });
    };

    render() {
        return (
            <div className={classes.container}>
                <h1 className={classes.title}>All Users</h1>
                <table className={classes.usersTable}>
                    <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>Name</th>
                            <th>Email</th>
                            <th>City</th>
                            {/* <th>Wallet Amount</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.currentRowData.map((user) => (
                            <tr key={user._id}>
                                {/* <td>{user._id}</td> */}
                                <td
                                    onClick={() => this.handleUserClick(user)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {user.name}
                                </td>
                                <td>{user.email}</td>
                                <td>{user.city}</td>
                                {/* <td>{user.walletAmount}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {this.props.allUsers.length > 5 && (
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={5}
                        totalItemsCount={this.props.allUsers.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allUsers: state.User.allUsers, // Update according to your state management
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: () => dispatch(actions.getAllUsers()), // Define this action in your Redux store
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);