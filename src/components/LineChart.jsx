import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData, options, chartWidth, id, noPoint }) {
  return (
    <Line
      id={id}
      data={chartData}
      options={{
        ...options,
        scales: {
          x: {
            ...options.scales.x,
            display: chartWidth > 11,
          },
        },
        elements: {
          ...options.elements,
          point: {
            radius: chartWidth < 11 || noPoint ? 0 : 3,
          },
        },
      }}
    />
  );
}

export default LineChart;
