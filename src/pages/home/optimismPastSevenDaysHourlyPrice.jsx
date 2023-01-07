import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import LineChart from "../../components/LineChart";
import { tokens } from "../../theme";

const TerraPastSevenDaysHourlyPrice = ({ data, chartWidth }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const options = {
    color: colors.grey[100],
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        display: true,
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
          color: colors.chartPalette[100],
          text: "Price (USD)",
        },
      },
      x: {
        display: false,
        stacked: true,
        grid: {
          display: false,
          color: colors.grey[100],
        },
        title: {
          display: true,
          text: "Time",
          color: colors.chartPalette[100],
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
    <Box
      sx={{
        border: `1px solid ${colors.backgroundColor[400]}`,
        borderRadius: "10px",
        backgroundColor: colors.backgroundColor[400],
        boxShadow: `1px 2px ${colors.backgroundColor[900]}`,
        justifyContent: "start",
        display: "flex",
        padding: "20px",
        flexDirection: "column",
        marginTop: "10px",
      }}
    >
      <Typography
        sx={{
          color: colors.grey[200],
          fontSize: "1.4rem",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Hourly Price
      </Typography>
      <LineChart
        chartData={data}
        options={options}
        chartWidth={chartWidth}
        noPoint
      />
    </Box>
  );
};

export default TerraPastSevenDaysHourlyPrice;
