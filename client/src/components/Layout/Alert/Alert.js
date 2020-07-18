import React from "react";
import { connect } from "react-redux";

const Alert = (props) =>
	props.alerts !== null &&
	props.alerts.length > 0 &&
	props.alerts.map((alert) => (
		<div key={alert.id} className="col-sm-8 mx-auto mt-3">
			<div className={`alert alert-${alert.alertType}`}>
				{alert.msg}
			</div>
		</div>
	));

const mapStateToProps = (state) => {
	return {
		alerts: state.alert,
	};
};

export default connect(mapStateToProps)(Alert);
