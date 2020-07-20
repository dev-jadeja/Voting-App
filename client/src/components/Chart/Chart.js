import React from "react";
import { Pie } from "react-chartjs-2";

const Chart = (props) => {
	const dynamicColors = () => {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		return "rgb(" + r + "," + g + "," + b + ")";
	};

	const chartData = {
		labels: props.options.map((optn) => optn.option),
		datasets: [
			{
				label: "Poll",
				data: props.options.map((optn) => optn.votes),
                backgroundColor: props.options.map((optn) => dynamicColors()),
                borderWidth: 1,
                borderColor: "#777",
                hoverBorderWidth: 2,
                hoverBorderColor: "black",
			},
		],
	};

	return (
		<Pie
			data={chartData}
			options={{
				legend: {
					display: true,
					position: "bottom",
				},
			}}
		/>
	);
};

export default Chart;
