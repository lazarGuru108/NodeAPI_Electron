import React, { Component } from 'react';
import CanvasJSReact from '../../assets/js/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ColumnChart extends Component {
	render() {
		const options = {
			title: {
				text: "Income vs. Expenses → February, 2020",
				padding: 5,
				margin: 20,
				fontSize: 20,
				// backgroundColor: "#f4d5a6",
				horizontalAlign: "left",
			},
			// backgroundColor: "#f0f2f5",
			margin: 10,
			width: 1500,
			animationEnabled: true,
			dataPointWidth: 20,
			legend: {
				maxWidth: 400,
				itemWidth: 120,
				fontSize: 12,
				fontFamily: "tamoha",
				fontColor: "Sienna",
				verticalAlign: "top",
				// horizontalAlign: "left",
			},
			markerType: "square",
			data: [
				{
					// Change type to "doughnut", "line", "splineArea", etc.					
					type: "column",
					showInLegend: "true",
					legendText: "{label}",
					indexLabelFontSize: 12,
					legendMarkerType: "square",
					/* indexLabel: "{label} - {y}%",
					indexLabelPlacement: "outside", */
					dataPoints: [
						{ label: "Apple", y: 2111,legendText: "{label}" },
						{ label: "Orange", y: 4113,legendText: "{label}" },
						{ label: "Banana", y: 1111 },
						{ label: "Mango", y: 5116 },
						{ label: "Apple", y: 7118,legendText: "{label}" },
						{ label: "Orange", y: 1122,legendText: "{label}" },
						{ label: "Banana", y: 4112 },
						{ label: "Mango", y: 6227 },
						{ label: "Apple", y: 21121,legendText: "{label}" },
						{ label: "Orange", y: 2115,legendText: "{label}" },
						{ label: "Banana", y: 12253 },
						{ label: "Mango", y: 1283 },
						{ label: "Grape", y: 9110 }
					]
				},
				{
					// Change type to "doughnut", "line", "splineArea", etc.					
					type: "column",
					showInLegend: "true",
					legendText: "{label}",
					indexLabelFontSize: 12,
					legendMarkerType: "square",
					/* indexLabel: "{label} - {y}%",
					indexLabelPlacement: "outside", */
					dataPoints: [
						{ label: "Apple", y: 2121,legendText: "{label}" },
						{ label: "Orange", y: 4433,legendText: "{label}" },
						{ label: "Banana", y: 1651 },
						{ label: "Mango", y: 2861 },
						{ label: "Apple", y: 1221,legendText: "{label}" },
						{ label: "Orange", y: 3243,legendText: "{label}" },
						{ label: "Banana", y: 5411 },
						{ label: "Mango", y: 4321 },
						{ label: "Apple", y: 2121,legendText: "{label}" },
						{ label: "Orange", y: 6643,legendText: "{label}" },
						{ label: "Banana", y: 3411 },
						{ label: "Mango", y: 2321 },
						{ label: "Grape", y: 3253 }
					]
				}
			]
		}

		return (
			<div>
				<CanvasJSChart options={options}
				/* onRef={ref => this.chart = ref} */
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}

export default ColumnChart;