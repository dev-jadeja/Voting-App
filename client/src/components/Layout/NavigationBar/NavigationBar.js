import React, { Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import classes from "./NavigationBar.module.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

const NavigationBar = (props) => {
	const authLinks = (
		<Fragment>
			<Nav>
				<Link to="/new" className={classes.Link}>
					<i className="fas fa-plus-square"></i>
					&nbsp; NEW POLL
				</Link>
				<Link to="/polls" className={classes.Link}>
					<i className="fas fa-chart-pie"></i>
					&nbsp; MY POLLS
				</Link>
			</Nav>
			<Nav className="ml-auto mr-5">
				<Link to="/profile" className={classes.Link}>
					<i className="fas fa-id-badge"></i>
					&nbsp; PROFILE
				</Link>
				<Link onClick={props.logout} to="/" className={classes.Link}>
					<i className="fas fa-sign-out-alt"></i>
					&nbsp; LOGOUT
				</Link>
			</Nav>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<Nav className="ml-auto mr-5">
				<Link to="/login" className={classes.Link}>
					<i className="fas fa-sign-in-alt"></i>
					&nbsp; LOGIN
				</Link>
				<Link to="/signup" className={classes.Link}>
					<i className="fas fa-user-plus"></i>
					&nbsp; CREATE ACCOUNT
				</Link>
			</Nav>
		</Fragment>
	);

	return (
		<Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
			<Navbar.Brand className="ml-md-5">
				<Link
					style={{
						fontFamily: "Francois One",
						fontSize: "25px",
					}}
					className={classes.Link}
					to="/"
				>
					VOTICA
				</Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				{!props.auth.loading && (
					<Fragment>
						{props.auth.isAuthenticated ? authLinks : guestLinks}
					</Fragment>
				)}
			</Navbar.Collapse>
		</Navbar>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(actions.logout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
