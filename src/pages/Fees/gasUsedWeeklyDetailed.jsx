import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import BarChart from "../../components/BarChart";

const GasUsedWeeklyDetailed = ({ data, chartWidth, id }) => {
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
        },
      },
      medianAxis: {
        position: "right",
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
    <BarChart
      chartData={data}
      options={options}
      chartWidth={chartWidth}
      id={id}
    />
  );
};

export default GasUsedWeeklyDetailed;