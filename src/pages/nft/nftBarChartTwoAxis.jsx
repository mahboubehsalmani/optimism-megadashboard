import BarChart from "../../components/BarChart";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const NFTBarChartTwoAxis = ({ data, chartWidth }) => {
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
      secondAxis: {
        position: "right",
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

export default NFTBarChartTwoAxis;
