import { useState } from "react";
import BarChart from "../charts/bar-chart";
import DateFilter from "../date-filter";
import Icon from "../icon";
import Loader from "../loader";

export default function DashboardCard(props) {
    const { text, loading, chartData } = props;

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="border-4 p-4 rounded-md">
            <DateFilter />
            <BarChart chartData={chartData} />
        </div>
    );
}
