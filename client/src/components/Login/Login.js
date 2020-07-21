import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const Login = (props) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		props.login(email, password);
	};

	if (props.isAuthenticated) {
		return <Redirect to="/" />;
	}

	if(props.loading) {
		return <Spinner />
	}

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
						Sign In
					</h1>
					<Form onSubmit={(e) => onSubmit(e)} className="mt-4">
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								name="email"
								onChange={(e) => onChange(e)}
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter Password"
								value={password}
								name="password"
								onChange={(e) => onChange(e)}
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		loading: state.auth.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (email, password) => dispatch(actions.login(email, password)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
