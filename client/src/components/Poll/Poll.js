import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "./Select/Select";
import Chart from "../Chart/Chart";
import Voters from "../Voters/Voters";

const Poll = (props) => {
	useEffect(() => {
		props.fetchPoll(props.match.params.id);
	}, []);

	let pollPage = null;

	if (!props.loading && props.poll !== null) {
		pollPage = (
			<Container className="m-5">
				<Row>
					<Col xs={12}>
						<h2
							style={{
								color: "#203e5c",
								fontWeight: "bold",
							}}
						>
							QUESTION
						</h2>
						<h3
							style={{
								fontFamily: "Fira Sans",
							}}
						>
							{props.poll.question}
						</h3>
						<div>
							<i className="fas fa-user-edit"></i> :{" "}
							{props.poll.username}
						</div>
						<div>
							<i className="fas fa-envelope-square"></i>
							{"  "}: {props.poll.email}
						</div>
						<div>
							<i className="far fa-calendar-alt"></i>
							{"  "}: {props.poll.date.substring(0, 10)}
						</div>
						<div
							style={{
								color: "green",
							}}
						>
							<i className="fas fa-hashtag"></i>
							{"  "}: {props.poll._id}
							{" (Share this ID for others to vote)"}
						</div>
						<hr />
					</Col>
					<Col xs={11} lg={6}>
						<h2
							style={{
								color: "#203e5c",
								fontWeight: "bold",
							}}
						>
							VOTE
						</h2>
						<Select
							options={props.poll.choices}
							pollid={props.match.params.id}
						/>
					</Col>
					<Col xs={12} lg={6}>
						<h2
							style={{
								color: "#203e5c",
								fontWeight: "bold",
							}}
						>
							RESULT
						</h2>
						<Chart options={props.poll.choices} />
					</Col>
					<Col xs={12}>
						<hr />
						<h2
							style={{
								color: "#203e5c",
								fontWeight: "bold",
							}}
						>
							VOTERS
						</h2>
                        <Voters voters={props.poll.voters} />
					</Col>
				</Row>
			</Container>
		);
	}

	return <Fragment>{pollPage}</Fragment>;
};

const mapStateToProps = (state) => {
	return {
		poll: state.poll.poll,
		loading: state.poll.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPoll: (id) => dispatch(actions.fetchPoll(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
