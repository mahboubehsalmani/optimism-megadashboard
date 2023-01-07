import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData, options, id, chartWidth }) {
  return (
    <Bar
      data={chartData}
      options={{
        ...options,
        scales: {
          ...options.scales,
          x: {
            ...options.scales.x,
            display: chartWidth > 11,
          },
        },
        elements: {
          ...options.elements,
          point: {
            radius: chartWidth < 11 ? 1 : 3,
          },
        },
      }}
      id={id}
    />
  );
}

export default BarChart;
