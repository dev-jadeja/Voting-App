import React, { Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NotFound = () => {
	return (
		<Fragment>
			<Container>
				<Row className="justify-content-md-center">
					<Col className="mt-5">
						<h1
							style={{
								color: "#203e5c",
								fontWeight: "bold",
							}}
						>
							<i className="fas fa-exclamation-triangle" /> Page
							Not Found
						</h1>
						<p className="large">Sorry, this page does not exist</p>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default NotFound;
