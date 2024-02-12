/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const AreaChart = ({ title, dataset, ...option }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const data = {
    labels: dataset.labels,
    datasets: [
      {
        fill: "start",
        tension: 0.1,
        label: "Answered",
        data: dataset.values ? dataset.values : Array(12).fill(0),
        borderColor: "#2B6112",
        backgroundColor: "rgba(11, 100, 22, .3)",
        ...option,
      },
    ],
  };

  return <Line className="z-10" options={options} data={data} />;
};

export default AreaChart;
