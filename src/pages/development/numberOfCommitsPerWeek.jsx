import BarChart from "../../components/BarChart";
import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import NumberOfCommitsPerWeekData from "../../data/numberOfCommitsPerWeek";

const NumberOfCommitsPerWeek = ({ id }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Commits",
        data: [],
        backgroundColor: [colors.secondary[400]],
        borderColor: colors.secondary[500],
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    getNumberOfCommitsPerWeek();
  }, []);
  const getNumberOfCommitsPerWeek = () => {
    let dates = [];
    let total = [];
    NumberOfCommitsPerWeekData.map((data) => {
      const date = new Date(data.week * 1000).toLocaleDateString("en-US");
      dates = [...dates, date];
      total = [...total, data.total];
    });
    setData({
      labels: dates,
      datasets: [
        {
          label: "Commits",
          data: total,
          backgroundColor: [colors.secondary[400]],
          borderColor: colors.secondary[500],
          borderWidth: 1,
        },
      ],
    });
  };

  const options = {
    color: colors.grey[100],
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        tick: {
          color: colors.redAccent[800],
          display: true,
        },
        grid: {
          display: true,
          color: colors.grey[600],
        },
        title: {
          display: true,
          color: colors.secondary[400],
          text: "Number of commits",
        },
      },
      x: {
        grid: {
          display: false,
          color: colors.grey[100],
        },
        title: {
          display: true,
          text: "Start date of the week",
          color: colors.secondary[400],
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };
  return <BarChart chartData={data} options={options} id={id} />;
};

export default NumberOfCommitsPerWeek;
