import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const About = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        margin: "20px",
      }}
    >
      <Header
        title="About"
        subtitle={
          <Box>
            Welcome to the Optimism Network Analytical Dashboard, created by{" "}
            <a
              href="https://discord.com/users/575742893722173442"
              target="_blank"
              style={{
                textDecoration: "none",
                color: colors.chartPalette[100],
              }}
            >
              Mahdi
            </a>{" "}
            and{" "}
            <a
              href="https://discord.com/users/685392041722904589"
              target="_blank"
              style={{
                textDecoration: "none",
                color: colors.chartPalette[100],
              }}
            >
              Mahboubeh
            </a>{" "}
            for the{" "}
            <a
              href="https://metricsdao.notion.site/"
              target="_blank"
              style={{
                textDecoration: "none",
                color: colors.chartPalette[100],
              }}
            >
              MetricsDao
            </a>{" "}
            community. Our goal is to provide a comprehensive and user-friendly
            resource for tracking key metrics and data points related to the
            Optimism network.
          </Box>
        }
      />
      <Header
        title="Tools"
        subtitle={
          <Box>
            To build this dashboard, we used a variety of tools and
            technologies, including React.js, Chart.js, and the official
            Optimism and Cosmos APIs. We also utilized data from{" "}
            <a
              href="https://flipsidecrypto.xyz/"
              target="_blank"
              style={{
                textDecoration: "none",
                color: colors.chartPalette[100],
              }}
            >
              flipsidecrypto
            </a>
            , a leading provider of cryptocurrency market data.
          </Box>
        }
      />
      <Header
        title="Customization"
        subtitle="You can use the settings icon on the charts to customize their appearance, view the source query, download images, and more. Additionally, you can filter and sort the data in the tables, and even download the data as a CSV file."
      />
      <Header
        title="Future Work"
        subtitle="Looking ahead, we have several exciting updates planned for the dashboard. Our roadmap includes finishing the governance page, improving the visual appeal of the data, adding timeframes to the charts, creating a backend server to enhance the capabilities of the dashboard, and adding pages dedicated to NFTs and IBC."
      />
      <Header
        title="Thank you!"
        subtitle={
          <Box>
            We would like to express our sincere gratitude to{" "}
            <a
              href="https://flipsidecrypto.xyz/"
              target="_blank"
              style={{
                textDecoration: "none",
                color: colors.chartPalette[100],
              }}
            >
              flipsidecrypto
            </a>{" "}
            for their invaluable data and to{" "}
            <a
              href="https://metricsdao.notion.site/"
              target="_blank"
              style={{
                textDecoration: "none",
                color: colors.chartPalette[100],
              }}
            >
              MetricsDao
            </a>{" "}
            for their support through their bounty program. If you have any
            suggestions or feedback for us, please don't hesitate to get in
            touch through{" "}
            <a
              href="https://discord.com/users/575742893722173442"
              target="_blank"
              style={{
                textDecoration: "none",
                color: colors.chartPalette[100],
              }}
            >
              Mahdi
            </a>{" "}
            and{" "}
            <a
              href="https://discord.com/users/685392041722904589"
              target="_blank"
              style={{
                textDecoration: "none",
                color: colors.chartPalette[100],
              }}
            >
              Mahboubeh
            </a>
            . Thank you for visiting!
          </Box>
        }
      />
    </Box>
  );
};

export default About;
