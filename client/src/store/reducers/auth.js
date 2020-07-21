import * as actionTypes from "../actions/actionTypes";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: false,
	user: null,
};

const registerSuccess = (state, payload) => {
	localStorage.setItem("token", payload.token);
	return {
		...state,
		...payload,
		isAuthenticated: true,
		loading: false,
	};
};

const registerFail = (state, payload) => {
	localStorage.removeItem("token");
	return {
		...state,
		token: null,
		isAuthenticated: false,
		loading: false,
		user: null,
	};
};

const userLoaded = (state, payload) => {
	return {
		...state,
		isAuthenticated: true,
		loading: false,
		user: payload,
	};
};

const setStartAuth = (state, payload) => {
	return {
		...state,
		loading: true,
	};
};

const reducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case actionTypes.REGISTER_SUCCESS:
		case actionTypes.LOGIN_SUCCESS:
			return registerSuccess(state, payload);
		case actionTypes.REGISTER_FAIL:
		case actionTypes.AUTH_ERROR:
		case actionTypes.LOGIN_FAIL:
		case actionTypes.LOGOUT:
			return registerFail(state, payload);
		case actionTypes.USER_LOADED:
			return userLoaded(state, payload);
		case actionTypes.SET_START_AUTH:
			return setStartAuth(state, payload);
		default:
			return state;
	}
};

export default reducer;
