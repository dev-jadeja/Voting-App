import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const NewPoll = (props) => {
	const [formData, setFormData] = useState({
		question: "",
		options: ["", ""],
	});

	const addOption = () => {
		const updatedOptions = [...formData.options];
		updatedOptions.push("");
		setFormData({
			...formData,
			options: updatedOptions,
		});
	};

	const onChange = (e) => {
		if (e.target.name === "question") {
			setFormData({
				...formData,
				[e.target.name]: e.target.value,
			});
		} else {
			const toChangeIdx = e.target.name[e.target.name.length - 1] - 1;
			const updatedOptions = [...formData.options];
			updatedOptions[toChangeIdx] = e.target.value;
			setFormData({
				...formData,
				options: updatedOptions,
			});
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const options = formData.options;

		const updatedOptions = options.filter((option) => option.trim() !== "");

		if (updatedOptions.length < 2) {
			props.setAlert("Please add two or more valid options", "danger");
		} else {
			props.newPoll(formData.question, updatedOptions);
		}
	};

	let optionFields = formData.options.map((option, idx) => {
		return (
			<Form.Control
				key={idx}
				className="mt-2"
				type="text"
				value={option}
				placeholder={`Enter option-${idx + 1}`}
				name={`options-${idx + 1}`}
				onChange={(e) => onChange(e)}
			/>
		);
	});

	return (
		<Container>
			<Row>
				<Col xs={8} className="mx-auto mt-5">
					<h1
						style={{
							color: "#203e5c",
							fontWeight: "bold",
						}}
					>
						New Poll
					</h1>
					<Form className="mt-4" onSubmit={(e) => onSubmit(e)}>
						<Form.Group>
							<Form.Label>Question</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter your question"
								name="question"
								value={formData.question}
								onChange={(e) => onChange(e)}
								size="lg"
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Options</Form.Label>
							{optionFields}
						</Form.Group>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
					<Button
						variant="info"
						type="submit"
						className="my-2"
						onClick={addOption}
					>
						Add an option
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		newPoll: (question, options) =>
			dispatch(actions.newPoll(question, options)),
		setAlert: (msg, alertType) =>
			dispatch(actions.setAlert(msg, alertType)),
	};
};

export default connect(null, mapDispatchToProps)(NewPoll);
