import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import LineChart from "../../components/LineChart";
import http from "../../services/http";
import apis from "../../services/apis";

const CumulativeNumberOfWalletsOverTime = ({ chartWidth }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Average",
        data: [],
        backgroundColor: [colors.secondary[400]],
        borderColor: colors.secondary[500],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = [];
    try {
      res = await http.get(apis.getCumulativeNumberOfWalletsOverTime);
      setData({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "CUMULATIVE NEW WALLETS",
            data: res.map((data) => data.CUMULATIVE_NEW_WALLETS),
            backgroundColor: [colors.secondary[400]],
            borderColor: colors.secondary[500],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.log("errror");
    }
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
          text: "Average",
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

  return (
    <LineChart chartData={data} options={options} chartWidth={chartWidth} />
  );
};

export default CumulativeNumberOfWalletsOverTime;
