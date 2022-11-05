import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

export default function BarChart(props) {
    const { chartData } = props;
    
    return <Bar data={chartData}/>;
}
