import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import classes from "./NavigationBar.module.css";

const NavigationBar = () => {
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
				<Nav>
					<Link to="/new" className={classes.Link}>
						<i class="fas fa-plus-square"></i>
						&nbsp; NEW POLL
					</Link>
					<Link to="/polls" className={classes.Link}>
						<i class="fas fa-chart-pie"></i>
						&nbsp; MY POLLS
					</Link>
				</Nav>
				<Nav className="ml-auto mr-5">
					<Link to="/login" className={classes.Link}>
						<i class="fas fa-sign-in-alt"></i>
						&nbsp; LOGIN
					</Link>
					<Link to="/signup" className={classes.Link}>
						<i class="fas fa-user-plus"></i>
						&nbsp; CREATE ACCOUNT
					</Link>
					<Link to="/profile" className={classes.Link}>
						<i class="fas fa-id-badge"></i>
						&nbsp; PROFILE
					</Link>
					<Link className={classes.Link}>
						<i class="fas fa-sign-out-alt"></i>
						&nbsp; LOGOUT
					</Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavigationBar;
