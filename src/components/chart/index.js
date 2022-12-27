import { Bar, Line, Radar } from "react-chartjs-2";
import Chart from 'chart.js/auto'; //Error is raised on removal

export default function graphType(props) {
    const { chartData, type } = props;
    console.log(chartData)

    let graph;

    switch (type) {
        case "bar":
            graph = <Bar data={chartData} />;
            break;
        case "line":
            graph = <Line data={chartData} />;
            break;
        case "comparison":
            graph = <Line data={chartData} />;
            break;
        case "histogram":
            graph = <Bar data={chartData} />;
            break;
        case "radar":
            graph = <Radar data={chartData} />;
            break;
        case "sum":
            graph = <Bar data={chartData} />;
            break;
        case "2d":
            graph = <Bar data={chartData} />;
            break;
    }

    return graph;
}
