import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL } from "../types/userTypes";
import axios from "axios";

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Get all users from the db.json
    const { data } = await axios.get("http://localhost:5000/users", config);

    // Find the user with the provided email and password
    const user = data.find((user) => user.email === email && user.password === password);

    if (user) {
      // Store the user and fake access token in localStorage
      const userInfo = { ...user, accessToken: "fake-access-token" };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userInfo,
      });
    } else {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error.message);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const signup = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Post request to create a new user
    const { data } = await axios.post("http://localhost:5000/users", { email, password }, config);

    // Handle the success case
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });

    // Optional: Automatically log in the user after sign-up
    const userInfo = { ...data, accessToken: "fake-access-token" };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};






// {export const login = (email, password) => async (dispatch) => {
//   try {
//     dispatch({ type: USER_LOGIN_REQUEST });

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     // Make the POST request to login endpoint
//     const { data } = await axios.post("http://localhost:5000/login", { email, password }, config);

//     if (data && data.accessToken) {
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       dispatch({
//         type: USER_LOGIN_SUCCESS,
//         payload: data,
//       });
//     } else {
//       dispatch({
//         type: USER_LOGIN_FAIL,
//         payload: "Invalid email or password",
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: USER_LOGIN_FAIL,
//       payload: error.response && error.response.data.message ? error.response.data.message : error.message,
//     });
//   }
// };
// }