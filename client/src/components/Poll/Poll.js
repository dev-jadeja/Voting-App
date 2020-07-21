import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "./Select/Select";
import Chart from "../Chart/Chart";
import Voters from "../Voters/Voters";
import Button from "react-bootstrap/Button";
import NotFound from "../NotFound/NotFound";
import Spinner from "../Spinner/Spinner";
import { Redirect } from "react-router-dom";

const Poll = (props) => {
	useEffect(() => {
		props.fetchPoll(props.match.params.id);
	}, []);

	if (props.deleted) {
		return <Redirect to="/polls" />;
	}

	let pollPage = null;

	let isOwner = false;

	if (props.user && props.poll && props.user._id === props.poll.user) {
		isOwner = true;
	}

	const declare = (id) => {
		props.declare(id);
	};

	const deletePoll = (id) => {
		props.deletePoll(id);
	};

	if (props.loading) {
		return <Spinner />;
	}

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
						{isOwner ? null : (
							<div>
								<i className="fas fa-user-edit"></i> :{" "}
								{props.poll.username}
							</div>
						)}
						{isOwner ? null : (
							<div>
								<i className="fas fa-envelope-square"></i>
								{"  "}: {props.poll.email}
							</div>
						)}
						<div>
							<i className="far fa-calendar-alt"></i>
							{"  "}: {props.poll.date.substring(0, 10)}
						</div>
						{isOwner ? (
							<div
								style={{
									color: "green",
								}}
							>
								<i className="fas fa-hashtag"></i>
								{"  "}: {props.poll._id}
								{" (Share this ID for others to vote)"}
							</div>
						) : null}
						{isOwner ? (
							<Fragment>
								<Button
									variant="info"
									onClick={() => declare(props.poll._id)}
								>
									<i class="fas fa-poll-h"></i>
									&nbsp;Declare results
								</Button>
								<Button
									variant="danger"
									className="ml-2"
									onClick={() => deletePoll(props.poll._id)}
								>
									<i class="fas fa-trash-alt"></i>
									&nbsp;Delete Poll
								</Button>
							</Fragment>
						) : null}
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
						{isOwner || props.poll.declare_result ? (
							<Chart options={props.poll.choices} />
						) : (
							<h3
								style={{
									fontFamily: "Fira Sans",
								}}
							>
								Looks like creator of this poll has not declared
								the results yet.
							</h3>
						)}
					</Col>
					{isOwner ? (
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
					) : null}
				</Row>
			</Container>
		);
	}

	if (!props.loading && props.poll === null) {
		pollPage = <NotFound />;
	}

	return <Fragment>{pollPage}</Fragment>;
};

const mapStateToProps = (state) => {
	return {
		poll: state.poll.poll,
		loading: state.poll.loading,
		user: state.auth.user,
		deleted: state.poll.deleted,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPoll: (id) => dispatch(actions.fetchPoll(id)),
		declare: (id) => dispatch(actions.declare(id)),
		deletePoll: (id) => dispatch(actions.deletePoll(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
