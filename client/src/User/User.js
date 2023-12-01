import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Home from "./Containers/Home/Home";
import SignIn from "./Containers/Signin/Signin";
import SignUp from "./Containers/Signup/Signup";
import Forgotpsw from "./Containers/Forgotpsw/Forgotpsw";
import Scraprate from "./Containers/Scraprate/scraprate";
import Passwordrec from "./Containers/Passwordrec/Passwordrec";
import Editprofile from "./Containers/Editprofile/EditProfile";
import Changepsw from "./Containers/Changepsw/Changepsw";
import PickupReq from "./Containers/PickupReq/PickupReq";
import Wallet from "./Containers/Wallet/Wallet";
import BankInfo from "./Containers/BankInfo/BankInfo";
import Orders from "./Containers/Orders/Orders";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ExternalAPI from "./Containers/ExternalAPI/index";
import DetailPage from "./Containers/ExternalAPI/DetailPage";
import Profiles from "./Containers/Profiles/index";
import ProfileDetail from "./Containers/Profiles/ProfileDetail";
class User extends Component {
  render() {
    const token = localStorage.getItem("token");
    let route = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/scraprate" component={Scraprate} />
        <Route path="/forgot" component={Forgotpsw} />
        <Route path="/passwordrec/:id" component={Passwordrec} />
        <Route path="/profile/:id" component={ProfileDetail} />
        <Route path="/profiles" component={Profiles} />
        <Redirect to="/" />
      </Switch>
    );
    if (token !== null) {
      route = (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/scraprate" component={Scraprate} />
          <Route path="/editprofile" component={Editprofile} />
          <Route path="/changepsw" component={Changepsw} />
          <Route path="/wallet" component={Wallet} />
          <Route path="/bankinfo/:amount" component={BankInfo} />
          <Route path="/pickuprquest" component={PickupReq} />
          <Route path="/orders" component={Orders} />
          <Route path="/profile/:id" component={ProfileDetail} />
          <Route path="/profiles" component={Profiles} />
          <Route path="/search/:detail" component={DetailPage} />
          <Route path="/search" component={ExternalAPI} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Header />
        {route}
        <Footer />
      </div>
    );
  }
}

export default User;
