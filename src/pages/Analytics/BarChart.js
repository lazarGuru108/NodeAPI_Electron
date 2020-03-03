import React, { Component } from 'react';
import CanvasJSReact from '../../assets/js/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

class BarChart extends Component {
	/* addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	} */
	render() {
		const options = {
			animationEnabled: true,
			height: 240,
			width: 740,
			theme: "light2",
			/* title:{
				text: "Most Popular Social Networking Sites"
			}, */
			axisX: {
				// title: "Social Network",
				reversed: true,
			},
			axisY: {
				// title: "Monthly Active Users",
				// labelFormatter: this.addSymbols
			},
			dataPointMaxWidth: 15,
			data: [{
				type: "bar",
				indexLabel: "{y}",
				// percentFormatString: "#0.##",
				indexLabelPlacement: "outside",
				indexLabelOrientation: "horizontal",
				dataPoints: [
					{ x: 10,y: 2200000, label: "Facebook" },
					{ x: 20,y: 1800000, label: "YouTube" },
					{ x: 30,y: 8000000, label: "Instagram" },
					{ x: 40,y: 5630000, label: "Qzone" },
					{ x: 50,y: 3760000, label: "Weibo" },
					{ x: 60,y: 3360000, label: "Twitter" },
					{ x: 70,y: 3300000, label: "Reddit" }
				]
			}]
		}

		return (
			<div>
				{/* <h1>React Bar Chart</h1> */}
				<CanvasJSChart options={options}
				/* onRef={ref => this.chart = ref} */
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}

export default BarChart;