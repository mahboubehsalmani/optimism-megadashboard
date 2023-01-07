import BarChart from "../../components/BarChart";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const SwapsWeekly = ({ data, chartWidth }) => {
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
          display: false,
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
      swapsAxis: {
        position: "right",
      },
    },
    elements: {
      point: {
        radius: chartWidth < 11 ? 1 : 3,
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  return <BarChart chartData={data} options={options} />;
};

export default SwapsWeekly;
