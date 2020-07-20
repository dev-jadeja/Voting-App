import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

const Select = (props) => {
	const [selectedOpn, setSelectedOpn] = useState(props.options[0]._id);

	const onChange = (e) => {
		setSelectedOpn(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		props.vote(props.pollid, selectedOpn);
	};

	return (
		<form className="form-group m-3" onSubmit={(e) => onSubmit(e)}>
			<select
				value={selectedOpn}
				className="form-control"
				onChange={(e) => onChange(e)}
			>
				{props.options.map((optn) => (
					<option key={optn._id} value={optn._id}>
						{optn.option}
					</option>
				))}
			</select>
			<Button variant="primary" className="mt-2" type="submit">
				<i className="fas fa-paper-plane"></i>&nbsp;SEND
			</Button>
		</form>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		vote: (pollId, optionId) => dispatch(actions.vote(pollId, optionId)),
	};
};

export default connect(null, mapDispatchToProps)(Select);
