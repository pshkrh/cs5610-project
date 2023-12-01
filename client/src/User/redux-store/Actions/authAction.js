import * as actionsTypes from "./ActionType";
import axios from "../../../axios";

export const Signup = (user) => {
  return async (dispatch) => {
    await axios
      .post("api/users/signup", user)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user._id);
        dispatch({
          type: actionsTypes.SIGNUP,
          token: res.data.token,
          userId: res.data.user._id,
        });
      })
      .catch((error) => {
        dispatch({
          type: actionsTypes.SIGNUP_FAILED,
          error: "email already exists",
        });
      });
  };
};

export const Signin = (user) => {
  return async (dispatch) => {
    await axios
      .post("api/users/login", user)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user._id);
        dispatch({
          type: actionsTypes.LOGIN,
          token: res.data.token,
          userId: res.data.user._id,
        });
      })
      .catch((error) => {
        dispatch({
          type: actionsTypes.LOGIN_FAILED,
          error: "invalid email or password",
        });
      });
  };
};

export const checkuser = (email) => {
  return async (dispatch) => {
    await axios
      .post("api/users/checkuser", { email })
      .then((res) => {
        dispatch({
          type: actionsTypes.CHECK_USER,
        });
      })
      .catch((error) => {
        dispatch({
          type: actionsTypes.USER_NOT_FOUND,
          message: "user not found",
        });
      });
  };
};

export const checkotp = (otp) => {
  const otp_dummy = 12345;
  return async (dispatch) => {
    await axios
      .post("api/users/checkotp", { otp: otp_dummy })
      .then((res) => {
        dispatch({
          type: actionsTypes.CHECK_OTP,
        });
      })
      .catch((error) => {
        dispatch({
          type: actionsTypes.CHECK_OTP_FAILED,
          message: "Enter valid otp",
        });
      });
  };
};

export const updatepassword = (password, email) => {
  return async (dispatch) => {
    await axios
      .post("api/users/updatepassword", { password, email })
      .then((res) => {
        dispatch({
          type: actionsTypes.UPDATE_PASSWORD,
        });
      });
  };
};

export const editprofile = (user) => {
  return async (dispatch) => {
    await axios.post("api/users/editprofile", user).then((res) => {
      dispatch({
        type: actionsTypes.EDIT_PROFILE,
        user: res.data.user,
      });
    });
  };
};

export const getUserById = () => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    await axios
      .get("api/users/getuser", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        dispatch({
          type: actionsTypes.GET_SINGLE_USER,
          error: "",
          user: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: actionsTypes.GET_SINGLE_USER_FAILED,
        });
      });
  };
};

export const getAllUsers = () => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    await axios
      .get("api/users/allusers", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        dispatch({
          type: actionsTypes.GET_ALL_USERS,
          error: "",
          users: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: actionsTypes.GET_ALL_USERS_FAILED,
          error: "failed to fetch users",
        });
      });
  };
};

export const logout = () => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    await axios
      .get("api/users/logout", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        dispatch({
          type: actionsTypes.LOGOUT,
        });
      })
      .catch((error) => {});
  };
};

export const changepassword = (pass) => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    await axios
      .post("api/users/changepassword", pass, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then(() => {
        dispatch({
          type: actionsTypes.CHANGE_PASSWORD,
        });
      })
      .catch(() => {
        dispatch({
          type: actionsTypes.CHANGE_PASSWORD_FAILED,
          message: "Enter valid old password",
        });
      });
  };
};

export const getuserTransaction = () => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    await axios
      .get("/api/users/usertransaction", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        dispatch({
          type: actionsTypes.GET_USER_TRANSACTION,
          userTransaction: res.data,
        });
      })
      .catch((e) => {
        dispatch({
          type: actionsTypes.GET_USER_TRANSACTION_FAILED,
        });
      });
  };
};

export const reedommoney = (money) => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    await axios
      .post(
        "api/users/reedommoney",
        { money },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: actionsTypes.REEDOM_MONEY,
        });
      })
      .catch((e) => {
        dispatch({
          type: actionsTypes.REEDOM_MONEY_FAILED,
        });
      });
  };
};

export const sendOtp = (mobile) => {
  return async (dispatch) => {
    await axios
      .post("api/users/sendotp", { mobile })
      .then((res) => {
        dispatch({
          type: actionsTypes.SEND_OTP,
        });
      })
      .catch((e) => {
        dispatch({
          type: actionsTypes.SEND_OTP_FAILED,
          error: "otp send failed",
        });
      });
  };
};

export const verifyUserByOtp = (otp) => {
  const otp_dummy = 12345;
  return async (dispatch) => {
    await axios
      .post("api/users/verifyuserbyotp", { otp: otp_dummy })
      .then((res) => {
        dispatch({
          type: actionsTypes.VERIFY_USER_BY_OTP,
        });
      })
      .catch((e) => {
        dispatch({
          type: actionsTypes.VERIFY_USER_BY_OTP_FAILED,
          error: "verification failed",
        });
      });
  };
};
