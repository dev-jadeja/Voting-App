import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as actions from "./index";
import setAuthToken from "../../utils/setAuthToken";

export const loadUser = () => {
	return async (dispatch) => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		try {
			const res = await axios.get("/api/auth");

			dispatch({
				type: actionTypes.USER_LOADED,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: actionTypes.AUTH_ERROR,
			});
		}
	};
};

export const register = (username, email, password) => {
	return async (dispatch) => {
		try {
			const res = await axios.post("/api/users", {
				username,
				email,
				password,
			});

			dispatch({
				type: actionTypes.REGISTER_SUCCESS,
				payload: res.data,
			});

			dispatch(loadUser());
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(actions.setAlert(error.msg, "danger"))
				);
			}
			dispatch({
				type: actionTypes.REGISTER_FAIL,
			});
		}
	};
};

export const login = (email, password) => {
	return async (dispatch) => {
		try {
			const res = await axios.post("/api/auth", {
				email,
				password,
			});

			dispatch({
				type: actionTypes.LOGIN_SUCCESS,
				payload: res.data,
			});
			dispatch(loadUser());
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(actions.setAlert(error.msg, "danger"))
				);
			}
			dispatch({
				type: actionTypes.LOGIN_FAIL,
			});
		}
	};
};

export const logout = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.LOGOUT,
        })
    }
}