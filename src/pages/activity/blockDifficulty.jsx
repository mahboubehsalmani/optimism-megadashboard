import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import LineChart from "../../components/LineChart";

const BlockDifficulty = ({ data, chartWidth, id }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
        stacked: true,
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
          text: "Volume (LUNA)",
        },
      },
      x: {
        stacked: true,
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
    <LineChart
      chartData={data}
      options={options}
      chartWidth={chartWidth}
      id={id}
    />
  );
};

export default BlockDifficulty;
