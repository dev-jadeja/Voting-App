import React, { Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import classes from "./NavigationBar.module.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

const NavigationBar = (props) => {
	const authLinks = (
		<Fragment>
			<Nav>
				<NavLink
					to="/new"
					className={classes.Link}
					activeClassName={classes.active}
				>
					<i className="fas fa-plus-square"></i>
					&nbsp; NEW POLL
				</NavLink>
				<NavLink
					to="/polls"
					className={classes.Link}
					activeClassName={classes.active}
				>
					<i className="fas fa-chart-pie"></i>
					&nbsp; MY POLLS
				</NavLink>
				<NavLink
					to="/vote"
					className={classes.Link}
					activeClassName={classes.active}
				>
					<i className="fas fa-paper-plane"></i>
					&nbsp; VOTE
				</NavLink>
			</Nav>
			<Nav className="ml-auto mr-5">
				<NavLink onClick={props.logout} to="/" className={classes.Link}>
					<i className="fas fa-sign-out-alt"></i>
					&nbsp; LOGOUT
				</NavLink>
			</Nav>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<Nav className="ml-auto mr-5">
				<NavLink
					to="/login"
					className={classes.Link}
					activeClassName={classes.active}
				>
					<i className="fas fa-sign-in-alt"></i>
					&nbsp; LOGIN
				</NavLink>
				<NavLink
					to="/signup"
					className={classes.Link}
					activeClassName={classes.active}
				>
					<i className="fas fa-user-plus"></i>
					&nbsp; CREATE ACCOUNT
				</NavLink>
			</Nav>
		</Fragment>
	);

	return (
		<Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
			<Navbar.Brand className="ml-md-5">
				<NavLink
					style={{
						fontFamily: "Francois One",
						fontSize: "25px",
					}}
					className={classes.Link}
					to="/"
					activeClassName={classes.active}
					exact
				>
					VOTICA
				</NavLink>
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
