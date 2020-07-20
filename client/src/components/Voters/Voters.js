import React from "react";

const Voters = (props) => {
	return (
		<ul class="list-group">
			{props.voters.map((voter, idx) => (
				<li
					class="list-group-item d-flex justify-content-between align-items-center list-group-item-dark"
					key={idx}
				>
					{voter.email}
					<span class="badge badge-primary badge-pill">
						<i class="far fa-calendar-alt"></i>
						&nbsp; {voter.date.substring(0, 10)}
					</span>
				</li>
			))}
		</ul>
	);
};

export default Voters;
