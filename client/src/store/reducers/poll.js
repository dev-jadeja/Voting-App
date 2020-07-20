import * as actionTypes from "../actions/actionTypes";

const initialState = {
	polls: [],
	loading: false,
	poll: null,
};

const setStart = (state, payload) => {
	return {
		...state,
		loading: true,
		polls: [],
		poll: null,
	};
};

const newPollSuccess = (state, payload) => {
	return {
		...state,
		loading: false,
	};
};

const newPollFail = (state, payload) => {
	return {
		...state,
		loading: false,
		polls: [],
		poll: null,
	};
};

const fetchPollsSuccess = (state, payload) => {
	return {
		...state,
		loading: false,
		polls: [...payload],
	};
};

const fetchPollSuccess = (state, payload) => {
	return {
		...state,
		loading: false,
		poll: payload,
	};
};

const voteSuccess = (state, payload) => {
	return {
		...state,
		poll: payload,
	};
};

const reducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case actionTypes.SET_START:
			return setStart(state, payload);
		case actionTypes.NEW_POLL_SUCCESS:
			return newPollSuccess(state, payload);
		case actionTypes.NEW_POLL_FAIL:
		case actionTypes.FETCH_POLLS_FAIL:
		case actionTypes.FETCH_POLL_FAIL:
			return newPollFail(state, payload);
		case actionTypes.FETCH_POLLS_SUCCESS:
			return fetchPollsSuccess(state, payload);
		case actionTypes.FETCH_POLL_SUCCESS:
			return fetchPollSuccess(state, payload);
		case actionTypes.VOTE_SUCCESS:
			return voteSuccess(state, payload);
		case actionTypes.VOTE_FAIL:
		default:
			return state;
	}
};

export default reducer;
