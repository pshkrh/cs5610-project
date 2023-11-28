import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import { format } from "date-fns";
import { connect } from "react-redux";
import isemail from "validator/lib/isEmail";

import * as actions from "../../../Admin/redux-store/actions/gcactions";
// import * as actions from "../../redux-store/actions/gcactions";
import classes from "../../../Admin//containers/GCDetails/GCDetails.css";
// import classes from "../../../Admin/containers/GCDetails/GCDetails.css";

const SignUp = (props) => {
  const [state, setstate] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    password: "",
    address: "",
    inputamount: null,
    sendmoneyId: "",
    errors: {},
    amountError: "",
    valid: false,
  });

  const onaddgc = (e) => {
    e.preventDefault();
  };

  const validate = () => {
    let name = state.name;
    let email = state.email;
    let mobile = state.mobile;
    let city = state.city;
    let password = state.password;
    let address = state.address;
    let isvalid = true;
    let error = {};
    if (name === "") {
      isvalid = false;
      error.name = "name must be required";
    }
    if (email === "") {
      isvalid = false;
      error.email = "email must be required";
    } else if (!isemail(email)) {
      isvalid = false;
      error.email = "enter valid email";
    }
    if (mobile?.toString().length < 10 || mobile?.toString().length > 10) {
      isvalid = false;
      error.mobile = "mobile number must be equal 10 digit";
    }
    if (city === "select-city" || city === "") {
      isvalid = false;
      error.city = "city must be required";
    }
    if (password === "" || password.toString().length < 8) {
      isvalid = false;
      error.password = "enter valid passwprd";
    }
    if (address === "" || address.length < 20) {
      error.address = "Enter valid address";
      isvalid = false;
    }

    setstate({ ...state, errors: error });

    return isvalid;
  };

  const [redirectToGc, setRedirectToGc] = useState(false);

  const addgchandler = async (e) => {
    e.preventDefault();
    try {
      const isvalid = validate();
      if (isvalid) {
        const gc = {
          name: state.name,
          email: state.email,
          mobile: state.mobile,
          city: state.city,
          password: state.password,
          address: state.address,
        };
        await props.addgc(gc);
        await props.getgc();
        setstate({
          ...state,
          name: "",
          email: "",
          mobile: "",
          city: "",
          password: "",
          address: "",
        });
        setRedirectToGc(true);
      }
    } catch (e) {}
  };

  const onaddgccancel = (e) => {
    e.preventDefault();
    setstate({
      ...state,
      errors: {},
      name: "",
      email: "",
      mobile: "",
      city: "",
      password: "",
      address: "",
    });
    setRedirectToGc(true);
  };

  if (redirectToGc) {
    return <Redirect to="/gc" />;
  }

  return (
    <div>
      <div className={classes.container1}>
        <form style={{ border: "1px solid #ccc" }}>
          <div className={classes.container2}>
            <h1>Add Garbage Collector</h1>
            <p>Please fill in this form to add garbage collector.</p>
            <hr />
            <label for="name">
              <b>Name</b>
              <span style={{ color: "red", marginLeft: "20px" }}>
                {state.errors?.name ? state.errors.name : null}
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              name="name"
              value={state.name}
              onChange={(e) => setstate({ ...state, name: e.target.value })}
              required
              autoComplete="off"
            />

            <label for="email">
              <b>Email</b>
              <span style={{ color: "red", marginLeft: "20px" }}>
                {state.errors?.email ? state.errors.email : null}
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              value={state.email}
              onChange={(e) => setstate({ ...state, email: e.target.value })}
              required
              autoComplete="off"
            />

            <label for="mobile">
              <b>Mobile Number</b>
              <span style={{ color: "red", marginLeft: "20px" }}>
                {state.errors?.mobile ? state.errors.mobile : null}
              </span>
            </label>
            <input
              type="number"
              placeholder="Enter Mobile number"
              name="mobile"
              value={state.mobile}
              onChange={(e) => setstate({ ...state, mobile: e.target.value })}
              required
            />

            {/* <label for="city"><b>city</b><span style={{ color: "red", marginLeft: "20px" }}>{state.errors?.city ? state.errors.city : null}</span></label>
                      <input type="text" placeholder="Enter City" name="city" value={state.city} onChange={(e) => setstate({ ...state, city: e.target.value })} required /> */}

            <label for="city">
              <b>Choose city</b>
              <span style={{ color: "red", marginLeft: "20px" }}>
                {state.errors?.city ? state.errors.city : null}
              </span>
            </label>
            <select
              name="city"
              id="city"
              className={classes.city}
              value={state.city}
              onChange={(e) => setstate({ ...state, city: e.target.value })}
            >
              <option value="select-city">select-city</option>
              {props.cityList?.map((city) => {
                return (
                  <option
                    value={city}
                    onChange={(e) =>
                      setstate({ ...state, city: e.target.value })
                    }
                    key={city}
                  >
                    {city}
                  </option>
                );
              })}
            </select>

            <label for="password">
              <b>Password</b>
              <span style={{ color: "red", marginLeft: "20px" }}>
                {state.errors?.password ? state.errors.password : null}
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={state.password}
              onChange={(e) => setstate({ ...state, password: e.target.value })}
              required
            />

            <label>
              <b>Address</b>
            </label>
            <span style={{ color: "red", marginLeft: "20px" }}>
              {state.errors?.address ? state.errors.address : null}
            </span>
            <textarea
              placeholder="Enter Address"
              value={state.address}
              onChange={(e) => setstate({ ...state, address: e.target.value })}
              required
            />

            <span style={{ margin: "15px 0", color: "red" }}>
              {props.error ? props.error : null}
            </span>

            <div class={classes.clearfix}>
              <button
                type="button"
                class={classes.cancelbtn}
                onClick={(e) => onaddgccancel(e)}
              >
                Cancel
              </button>
              <button
                type="submit"
                class={classes.signupbtn}
                onClick={(e) => addgchandler(e)}
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    gcs: state.Admin.gcs.reverse(),
    error: state.Admin.error,
    cityList: state.Admin.cityList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getgc: () => dispatch(actions.getgc()),
    addgc: (gc) => dispatch(actions.addgc(gc)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
