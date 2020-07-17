import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./Landing.module.css";

const Landing = () => {
	return (
		<Container fluid>
			<Row>
				<Col>
					<Jumbotron className={classes.Jumbo}>
						<h1>VOTICA</h1>
						<h5>
							Conducting a Poll? You are at the right place.
							&nbsp;
							<i class="fas fa-smile-wink"></i>
						</h5>
					</Jumbotron>
				</Col>
			</Row>
			<Row className="mt-5 mx-auto">
				<Col md={6} xl={3} className="my-3">
					<Card
						style={{ width: "16rem" }}
						className={classes.Card}
						bg="dark"
						text="light"
					>
						<Card.Body>
							<Card.Title>
								<i class="fas fa-vote-yea"></i>
								&nbsp; Vote
							</Card.Title>
							<Card.Text>
								Vote on the polls whose links are shared by their creators.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={6} xl={3} className="my-3">
					<Card
						style={{ width: "16rem" }}
						className={classes.Card}
						bg="dark"
						text="light"
					>
						<Card.Body>
							<Card.Title>
								<i class="far fa-plus-square"></i>
								&nbsp; Create
							</Card.Title>
							<Card.Text>
								Create a poll and share it with the people to vote in it.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={6} xl={3} className="my-3">
					<Card
						style={{ width: "16rem" }}
						className={classes.Card}
						bg="dark"
						text="light"
					>
						<Card.Body>
							<Card.Title>
								<i class="fas fa-chart-line"></i>
								&nbsp; View
							</Card.Title>
							<Card.Text>
								See the results of the polls in real-time charts.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={6} xl={3} className="my-3">
					<Card
						style={{ width: "16rem" }}
						className={classes.Card}
						bg="dark"
						text="light"
					>
						<Card.Body>
							<Card.Title>
								<i class="fas fa-share-alt"></i>
								&nbsp; Share
							</Card.Title>
							<Card.Text>
								As a creator share the results with the voters.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Landing;
