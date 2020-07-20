import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const PollBox = (props) => {

	return (
		<Card bg="dark" text="light" className="my-2">
			<Card.Header as="h5">{props.question}</Card.Header>
			<Card.Body>
				<Card.Title>{props.date}</Card.Title>
				<Card.Text>Number of options: {props.optionsNum}</Card.Text>
				<Card.Text>Number of voters: {props.votersNum}</Card.Text>
				<Link to={`/poll/${props.id.toString()}`}>
					<Button variant="light">
						<i className="far fa-eye"></i>
						&nbsp;View
					</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};

export default PollBox;
