import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const AboutTerra = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        About Optimism
      </Typography>
      <Typography
        sx={{
          textAlign: "justify",
          fontSize: "1rem",
          marginTop: "8px",
        }}
      >
        Optimism is a layer 2 scaling solution for Ethereum, a decentralized,
        open-source blockchain platform that enables the creation and use of
        smart contracts. It was developed by the Optimism team and is supported
        by a large and active community of users and developers.
      </Typography>

      <Typography
        sx={{
          textAlign: "justify",
          fontSize: "1rem",
          marginTop: "8px",
        }}
      >
        One of the key features of Optimism is its use of rollup technology,
        which allows transactions to be processed off-chain and then bundled
        together and recorded on the Ethereum blockchain. This approach allows
        for faster and cheaper transactions, while still maintaining the
        security and decentralization of Ethereum.
      </Typography>
      <Typography
        sx={{
          textAlign: "justify",
          fontSize: "1rem",
          marginTop: "8px",
        }}
      >
        The Optimism Network Analytical Dashboard is a comprehensive resource
        for tracking key metrics and data points related to the Optimism layer 2
        scaling solution for Ethereum. With data that is updated in real time,
        you can stay informed on the latest trends and developments on the
        Optimism network. On this dashboard, you can explore a range of data,
        including transaction volume, fees, and network usage. The interactive
        charts and customizable views make it easy to analyze the data and gain
        insights into the inner workings of the Optimism network. Whether you
        are an Optimism network user, investor, or simply interested in learning
        more about the platform, we hope this dashboard will be a valuable
        resource for you.
      </Typography>
    </Box>
  );
};

export default AboutTerra;
