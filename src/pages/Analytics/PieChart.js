import React, { Component } from 'react';
import CanvasJSReact from '../../assets/js/canvasjs.react'
// import CanvasJSReact from '../../assets/js/canvasjs.min.js'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class PieChart extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let title = this.props.title;
		const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: title,
				padding: 5,
				margin: 20,
				// backgroundColor: "#f4d5a6",
				horizontalAlign: "left",
			},
			backgroundColor: "#f0f2f5",
			width: 360,
			creditText: false,
			creditHref : false,
			zoomEnabled: true,
			legend:{
					maxWidth: 400,
					itemWidth: 120,
					fontSize: 12,
					fontFamily: "tamoha",
					fontColor: "Sienna",
					verticalAlign: "top",
					horizontalAlign: "left",
					itemclick: function(e){
						// alert( "Legend item clicked with type : " + e );
						console.log(e);
						e.dataPoint.y = null;
						e.chart.creditText = "";
						/* if (typeof (e.dataPoints.visible) === "undefined" || e.dataPoints.visible) {
							e.dataPoints.visible = false;
						} else {
							e.dataPoints.visible = true;
						}
		
						e.chart.render(); */
					}
			},
			markerType: "square",
			data: [{
				type: "pie",
				startAngle: 90,
				radius: "70%",
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 12,
				legendMarkerType: "square",
				indexLabel: "{label} - {y}%",
				indexLabelPlacement: "outside",
				dataPoints: [
					{ y: 18, label: "Direct" },
					{ y: 49, label: "Organic Search" },
					{ y: 9, label: "Paid Search" },
					{ y: 15, label: "Referral" },
					{ y: 19, label: "Social" }
				]
			}]
		}
		
		return (
		<div>
			{/* <h1>Top Products</h1> */}
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default PieChart;