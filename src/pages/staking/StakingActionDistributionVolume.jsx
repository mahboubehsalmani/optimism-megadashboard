import { useTheme } from "@mui/material";
import PieChart from "../../components/PieChart";
import { tokens } from "../../theme";

const StakingActionDistributionVolume = ({ data, id }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const options = {
    color: colors.grey[100],
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
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
          text: "Volume (LUNA)",
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

  return <PieChart data={data} id={id} />;
};
export default StakingActionDistributionVolume;
