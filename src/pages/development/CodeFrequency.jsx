import BarChart from "../../components/BarChart";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import CodeFreq from "../../data/codeFreq";

const CodeFrequency = ({ id }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Added",
        data: [],
        backgroundColor: "#0a9396",
        borderColor: "#0a9396",
        borderWidth: 1,
        type: "bar",
      },
      {
        label: "Removed",
        data: [],
        backgroundColor: "#9b2226",
        borderColor: "#9b2226",
        borderWidth: 1,
        type: "bar",
      },
    ],
  });
  useEffect(() => {
    getNumberOfCommitsPerWeek();
  }, []);
  const getNumberOfCommitsPerWeek = () => {
    let dates = [];
    let pos = [];
    let neg = [];
    CodeFreq.map((data) => {
      const date = new Date(data[0] * 1000).toLocaleDateString("en-US");
      dates = [...dates, date];
      pos = [...pos, data[1]];
      neg = [...neg, data[2]];
    });
    setData({
      labels: dates,
      datasets: [
        {
          label: "Added",
          data: pos,
          backgroundColor: "#0a9396",
          borderColor: "#0a9396",
          borderWidth: 1,
          type: "bar",
        },
        {
          label: "Removed",
          data: neg,
          backgroundColor: "#9b2226",
          borderColor: "#9b2226",
          borderWidth: 1,
          type: "bar",
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
          text: "Number of lines",
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

export default CodeFrequency;
