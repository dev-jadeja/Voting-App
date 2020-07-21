import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as actions from "./index";

export const newPoll = (question, choices) => {
	return async (dispatch) => {
		dispatch({
			type: actionTypes.SET_START,
		});
		try {
			const res = await axios.post("/api/polls", {
				question,
				choices,
			});

			dispatch({
				type: actionTypes.NEW_POLL_SUCCESS,
			});

			dispatch(actions.setAlert("New Poll has been created", "success"));
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(actions.setAlert(error.msg, "danger"))
				);
			}
			dispatch({
				type: actionTypes.NEW_POLL_FAIL,
			});
		}
	};
};

export const fetchPolls = () => {
	return async (dispatch) => {
		dispatch({
			type: actionTypes.SET_START,
		});
		try {
			const res = await axios.get("/api/polls");
			dispatch({
				type: actionTypes.FETCH_POLLS_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(actions.setAlert(error.msg, "danger"))
				);
			}
			dispatch({
				type: actionTypes.FETCH_POLLS_FAIL,
			});
		}
	};
};

export const fetchPoll = (id) => {
	return async (dispatch) => {
		dispatch({
			type: actionTypes.SET_START,
		});
		try {
			const res = await axios.get(`/api/polls/${id}`);
			dispatch({
				type: actionTypes.FETCH_POLL_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(actions.setAlert(error.msg, "danger"))
				);
			}
			dispatch({
				type: actionTypes.FETCH_POLL_FAIL,
			});
		}
	};
};

export const setStart = () => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.SET_START,
		});
	};
};

export const vote = (pollId, optionId) => {
	return async (dispatch) => {
		dispatch({
			type: actionTypes.SET_START,
		});
		try {
			const res = await axios.put(
				`/api/polls/vote/${pollId}/${optionId}`
			);
			dispatch({
				type: actionTypes.VOTE_SUCCESS,
				payload: res.data,
			});

			dispatch(actions.setAlert("Vote has been registered", "success"));
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(actions.setAlert(error.msg, "danger"))
				);
			}
			dispatch({
				type: actionTypes.VOTE_FAIL,
			});
		}
	};
};

export const declare = (id) => {
	return async (dispatch) => {
		dispatch({
			type: actionTypes.SET_START,
		});
		try {
			const res = await axios.put(`/api/polls/declare/${id}`);
			dispatch({
				type: actionTypes.DECLARE_SUCCESS,
				payload: res.data,
			});
			dispatch(
				actions.setAlert("Result declared successfully", "success")
			);
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(actions.setAlert(error.msg, "danger"))
				);
			}
			dispatch({
				type: actionTypes.DECLARE_FAIL,
			});
		}
	};
};

export const deletePoll = (id) => {
	return async (dispatch) => {
		dispatch({
			type: actionTypes.SET_START,
		});
		try {
			const res = await axios.delete(`/api/polls/${id}`);

			dispatch({
				type: actionTypes.DELETE_POLL_SUCCESS,
			});
			dispatch(actions.setAlert(res.data.msg, "success"));
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(actions.setAlert(error.msg, "danger"))
				);
			}
			dispatch({
				type: actionTypes.DELETE_POLL_FAIL,
			});
		}
	};
};
