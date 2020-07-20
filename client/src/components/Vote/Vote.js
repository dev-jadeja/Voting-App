import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const Vote = () => {
	const [id, setId] = useState("");

	const onChange = (e) => {
		setId(e.target.value);
	};

	return (
		<Container fluid>
			<Row className="mt-5">
				<Col xs={9}>
					<Form className="mx-5" onSubmit={(e) => e.preventDefault()}>
						<Form.Group>
							<h3
								style={{
									fontFamily: "Fira Sans",
								}}
							>
								{" "}
								Enter the ID of the poll you want to vote on.{" "}
							</h3>
							<Form.Control
								type="text"
								placeholder="Enter Poll ID"
								size="lg"
								value={id}
								className="my-2"
								onChange={(e) => onChange(e)}
							/>
						</Form.Group>
					</Form>
					<Link to={`/poll/${id}`}>
						<Button
							variant="primary"
							type="submit"
							className="mx-5 my-2"
						>
							GO
						</Button>
					</Link>
				</Col>
			</Row>
		</Container>
	);
};

export default Vote;
