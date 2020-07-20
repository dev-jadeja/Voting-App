import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import PollBox from "./PollBox/PollBox";

const Polls = (props) => {
	useEffect(() => {
		props.fetchPolls();
	}, []);

	let separatePolls = null;

	if (!props.loading) {
		separatePolls = props.polls.map((poll) => (
			<Col xs={12} lg={6} key={poll._id}>
				<PollBox
					id={poll._id}
					question={poll.question}
					optionsNum={poll.choices.length}
					votersNum={poll.voters.length}
					date={poll.date.substring(0, 10)}
				/>
			</Col>
		));
	}

	return (
		<Container>
			<Row>
				<Col xs={12} className="mx-auto mt-5">
					<h1
						style={{
							color: "#203e5c",
							fontWeight: "bold",
						}}
					>
						Your Polls
					</h1>
				</Col>
			</Row>
			<Row>{separatePolls}</Row>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		polls: state.poll.polls,
		loading: state.poll.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPolls: () => dispatch(actions.fetchPolls()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Polls);
