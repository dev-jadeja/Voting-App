import * as actionTypes from "../actions/actionTypes";

const initialState = [];

const setAlert = (state, payload) => {
	return [...state, payload];
};

const removeAlert = (state, payload) => {
	return state.filter((alert) => alert.id !== payload);
};

const reducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case actionTypes.SET_ALERT:
			return setAlert(state, payload);
		case actionTypes.REMOVE_ALERT:
			return removeAlert(state, payload);
		default:
			return state;
	}
};

export default reducer;
