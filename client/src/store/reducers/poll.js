import * as actionTypes from "../actions/actionTypes";

const initialState = {
	polls: [],
	loading: false,
	poll: null,
	deleted: false,
};

const setStart = (state, payload) => {
	return {
		...state,
		loading: true,
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
		deleted: false,
	};
};

const fetchPollSuccess = (state, payload) => {
	return {
		...state,
		loading: false,
		poll: payload,
		deleted: false,
	};
};

const voteSuccess = (state, payload) => {
	return {
		...state,
		poll: payload,
		loading: false,
	};
};

const voteFail = (state, payload) => {
	return {
		...state,
		loading: false,
	};
};

const deletePoll = (state, payload) => {
	return {
		...state,
		deleted: true,
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
		case actionTypes.DECLARE_SUCCESS:
			return voteSuccess(state, payload);
		case actionTypes.VOTE_FAIL:
		case actionTypes.DECLARE_FAIL:
			return voteFail(state, payload);
		case actionTypes.DELETE_POLL_FAIL:
		case actionTypes.DELETE_POLL_SUCCESS:
			return deletePoll(state, payload)
		default:
			return state;
	}
};

export default reducer;
