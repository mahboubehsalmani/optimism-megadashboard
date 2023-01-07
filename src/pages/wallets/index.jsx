import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import apis from "../../services/apis";
import CumulativeNumberOfWalletsOverTime from "./cumulativeNumberOfWalletsOverTime";
import MyChart from "../../components/MyChart";
import { useEffect, useState } from "react";
import http from "../../services/http";
import InfoCard from "../../components/InfoCard";
import ActiveNewWallet from "./activeNewWallet";
import DistributionOfWallets from "./distributionOfWallets";

const Wallets = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [statusWalletQuickData, setStatusWalletQuickData] = useState("loading");
  const [statusActiveNewWallet, setStatusActiveNewWallet] = useState("loading");
  const [statusDistributionOfWallets, setStatusDistributionOfWallets] =
    useState("loading");
  const [dataDistributionOfWallets, setDataDistributionOfWallets] =
    useState(null);
  const [walletQuickData, setWalletQuickData] = useState(null);

  const [
    statusCumulativeNumberOfWalletsOverTime,
    setStatusCumulativeNumberOfWalletsOverTime,
  ] = useState("loading");
  const [dataActiveNewWallet, setDataActiveNewWallet] = useState({
    labels: [],
    datasets: [
      {
        label: "Active Wallets",
        data: [],
        backgroundColor: [colors.chartPalette[100]],
        borderColor: colors.chartPalette[100],
        borderWidth: 1,
      },

      {
        label: "New wallets",
        data: [],
        backgroundColor: [colors.chartPalette[200]],
        borderColor: colors.chartPalette[200],
        borderWidth: 1,
      },
    ],
  });
  const [
    dataCumulativeNumberOfWalletsOverTime,
    setDataCumulativeNumberOfWalletsOverTime,
  ] = useState({
    labels: [],
    datasets: [
      {
        label: "CUMULATIVE NEW WALLETS",
        data: [],
        backgroundColor: [colors.chartPalette[100]],
        borderColor: colors.chartPalette[100],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    getDistributionOfWallets();
    getCumulativeNumberOfWalletsOverTime();
    getActiveNewWallet();
    getQuickData();
  }, []);

  const getQuickData = async () => {
    setStatusWalletQuickData("loading");
    try {
      const res = await http.get(apis.getWalletQuickData);
      const resAvg = await http.get(apis.getWalletAvgQuickData);
      setWalletQuickData({ ...res[0], ...resAvg[0] });
      setStatusWalletQuickData("loaded");
    } catch (error) {
      setStatusWalletQuickData("error");
    }
  };
  const getDistributionOfWallets = async () => {
    setStatusDistributionOfWallets("loading");
    try {
      const res = await http.get(apis.getDistributionOfWallets);
      let temp = [];
      res.map((data, index) => {
        temp = [
          ...temp,
          {
            id: data.SLICE,
            label: data.SLICE,
            value: data.ANGLE,
            color: colors.chartPalette[(index + 1) * 100],
          },
        ];
      });
      setDataDistributionOfWallets(temp);
      setStatusDistributionOfWallets("loaded");
    } catch (error) {
      setStatusDistributionOfWallets("error");
    }
  };

  const getActiveNewWallet = async () => {
    setStatusActiveNewWallet("loading");
    try {
      const res = await http.get(apis.getActiveNewWallets);

      setDataActiveNewWallet({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Active",
            data: res.map((data) => data.ACTIVE_WALLETS),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
            type: "line",
          },
          {
            label: "New",
            data: res.map((data) => data.NEW_WALLETS),
            backgroundColor: colors.chartPalette[200],
            borderColor: colors.chartPalette[200],
            borderWidth: 1,
            type: "line",
          },
        ],
      });

      setStatusActiveNewWallet("loaded");
    } catch (error) {
      setStatusActiveNewWallet("error");
    }
  };

  const getCumulativeNumberOfWalletsOverTime = async () => {
    let res = [];
    setStatusCumulativeNumberOfWalletsOverTime("loading");
    try {
      res = await http.get(apis.getCumulativeNumberOfWalletsOverTime);
      setDataCumulativeNumberOfWalletsOverTime({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "CUMULATIVE NEW WALLETS",
            data: res.map((data) => data.CUMULATIVE_NEW_WALLETS),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
          },
        ],
      });
      setStatusCumulativeNumberOfWalletsOverTime("loaded");
    } catch (error) {
      setStatusCumulativeNumberOfWalletsOverTime("error");
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Header
        title="Wallets"
        subtitle="This section includes data about the number and activity of wallets on the Optimism network.
         It can give an indication of the adoption and usage of the network.
        "
      />
      <Grid container gap={2}>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="# of Unique wallets"
            source={apis.getWalletQuickData}
            info={
              walletQuickData
                ? walletQuickData.WALLETS.toLocaleString("en-US")
                : null
            }
            status={statusWalletQuickData}
            getData={getQuickData}
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="average # of active wallets weekly"
            source={apis.getWalletAvgQuickData}
            info={
              walletQuickData
                ? walletQuickData.AVERAGE_ACTIVE_WALLETS.toLocaleString("en-US")
                : null
            }
            status={statusWalletQuickData}
            getData={getQuickData}
          />
        </Grid>

        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="average # of tx per wallet"
            source={apis.getWalletQuickData}
            info={
              walletQuickData
                ? walletQuickData.AVERAGE_TX_PER_WALLET.toLocaleString("en-US")
                : null
            }
            status={statusWalletQuickData}
            getData={getQuickData}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid
            container
            gap={2}
            sx={{
              justifyContent: "start",
            }}
          >
            <MyChart
              title="# Of Active/new Wallets weekly"
              Chart={ActiveNewWallet}
              url={apis.queryActiveNewWallet}
              status={statusActiveNewWallet}
              getData={getActiveNewWallet}
              data={dataActiveNewWallet}
              id={"ActiveNewWallet"}
            />
            <MyChart
              title="Cumulative # Of Wallets over time"
              Chart={CumulativeNumberOfWalletsOverTime}
              url={apis.queryCumulativeNumberOfWalletsOverTime}
              status={statusCumulativeNumberOfWalletsOverTime}
              getData={getCumulativeNumberOfWalletsOverTime}
              data={dataCumulativeNumberOfWalletsOverTime}
              id={"CumulativeNumberOfWalletsOverTime"}
            />

            <MyChart
              title="distribution by tx count"
              Chart={DistributionOfWallets}
              url={apis.queryDistributionOfWallets}
              status={statusDistributionOfWallets}
              getData={getDistributionOfWallets}
              data={dataDistributionOfWallets}
              id={"DistributionOfWallets"}
              defaultSize={100}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Wallets;
