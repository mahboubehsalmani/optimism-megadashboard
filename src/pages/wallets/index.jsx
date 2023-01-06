import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import apis from "../../services/apis";
import TotalNumberOfActiveWalletsPerWeek from "./totalNumberOfActiveWalletsPerWeek";
import CumulativeNumberOfWalletsOverTime from "./cumulativeNumberOfWalletsOverTime";
import MyChart from "../../components/MyChart";
import { useEffect, useState } from "react";
import http from "../../services/http";
import InfoCard from "../../components/InfoCard";
import MyTable from "../../components/MaterialTable";
import RichList from "../../data/richList";

const Wallets = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [list, setList] = useState([]);
  const [numberOfWallets, setNumberOfWallets] = useState(null);
  const [statusNumberOfWallets, setStatusNumberOfWallets] = useState("loading");
  const [activeNewWallet, setActiveNewWallet] = useState(null);
  const [statusActiveNewWallet, setStatusActiveNewWallet] = useState("loading");
  const [statusAverageTxPerWallet, setStatusAverageTxPerWallet] =
    useState("loading");
  const [averageTxPerWallet, setAverageTxPerWallet] = useState(null);
  const [
    statusTotalNumberOfActiveWalletsPerWeek,
    setStatusTotalNumberOfActiveWalletsPerWeek,
  ] = useState("loading");
  const [
    statusCumulativeNumberOfWalletsOverTime,
    setStatusCumulativeNumberOfWalletsOverTime,
  ] = useState("loading");
  const [
    dataTotalNumberOfActiveWalletsPerWeek,
    setDataTotalNumberOfActiveWalletsPerWeek,
  ] = useState({
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
    getTotalNumberOfActiveWalletsPerWeek();
    getCumulativeNumberOfWalletsOverTime();
    getNumberOfWallets();
    getActiveNewWallet();
    getAverageTxPerWallet();
    getRichList();
  }, []);

  const getAverageTxPerWallet = async () => {
    setStatusAverageTxPerWallet("loading");
    try {
      const res = await http.get(apis.getAverageTxPerWallet);
      setAverageTxPerWallet(res[0].AVERAGE_TX_PER_WALLET);
      setStatusAverageTxPerWallet("loaded");
    } catch (error) {
      setStatusAverageTxPerWallet("error");
    }
  };
  const getNumberOfWallets = async () => {
    setStatusNumberOfWallets("loading");
    try {
      const res = await http.get(apis.getNumberofWallets);
      setNumberOfWallets(res[0].WALLETS);
      setStatusNumberOfWallets("loaded");
    } catch (error) {
      setStatusNumberOfWallets("error");
    }
  };

  const getActiveNewWallet = async () => {
    setStatusActiveNewWallet("loading");
    try {
      const res = await http.get(apis.getActiveNewWallets);
      setActiveNewWallet(res[0]);
      setStatusActiveNewWallet("loaded");
    } catch (error) {
      setStatusActiveNewWallet("error");
    }
  };
  const getTotalNumberOfActiveWalletsPerWeek = async () => {
    let res = [];

    try {
      res = await http.get(apis.getTotalNumberOfActiveWalletsPerWeek);
      setDataTotalNumberOfActiveWalletsPerWeek({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "ACTIVE WALLETS",
            data: res.map((data) => data.ACTIVE_WALLETS),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
            type: "line",
          },
          {
            label: "New WALLETS",
            data: res.map((data) => data.NEW_WALLETS),
            backgroundColor: colors.chartPalette[200],
            borderColor: colors.chartPalette[200],
            borderWidth: 1,
            type: "line",
          },
        ],
      });
      setStatusTotalNumberOfActiveWalletsPerWeek("loaded");
    } catch (error) {
      setStatusTotalNumberOfActiveWalletsPerWeek("error");
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

  const getRichList = () => {
    let list = [];
    RichList.map((data) => {
      list = [
        ...list,
        [data.label, data.totalStake, data.addressBalance, data.totalBalance],
      ];
    });

    setList(list);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Header
        title="Wallets"
        subtitle="Shows charst of Wallets' activities in Terradash"
      />
      <Grid container>
        <Grid item xs={12} lg={8}>
          <Grid
            container
            gap={2}
            sx={{
              justifyContent: "start",
            }}
          >
            <Grid container gap={2}>
              <MyChart
                title="Number Of active/new wallets weekly"
                Chart={TotalNumberOfActiveWalletsPerWeek}
                url={apis.queryTotalNumberOfActiveWalletsPerWeek}
                status={statusTotalNumberOfActiveWalletsPerWeek}
                getData={getTotalNumberOfActiveWalletsPerWeek}
                data={dataTotalNumberOfActiveWalletsPerWeek}
                defaultSize={100}
                id="TotalNumberOfActiveWalletsPerWeek"
              />

              <MyChart
                title="Cumulative Number Of Wallets Over Time"
                Chart={CumulativeNumberOfWalletsOverTime}
                url={apis.queryCumulativeNumberOfWalletsOverTime}
                status={statusCumulativeNumberOfWalletsOverTime}
                getData={getCumulativeNumberOfWalletsOverTime}
                data={dataCumulativeNumberOfWalletsOverTime}
                defaultSize={100}
                id="CumulativeNumberOfWalletsOverTime"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="# of unique wallets"
            source={apis.getNumberofWallets}
            info={
              numberOfWallets ? numberOfWallets.toLocaleString("en-US") : null
            }
            status={statusNumberOfWallets}
            getData={getNumberOfWallets}
          />

          <InfoCard
            title="Average # of active wallets weekly"
            source={apis.getActiveNewWallets}
            info={
              activeNewWallet
                ? activeNewWallet.AVERAGE_ACTIVE_WALLETS.toLocaleString("en-US")
                : null
            }
            status={statusActiveNewWallet}
            getData={getActiveNewWallet}
          />

          <InfoCard
            title="Average # of new wallets weekly"
            source={apis.getActiveNewWallets}
            info={
              activeNewWallet
                ? activeNewWallet.AVERAGE_NEW_WALLETS.toLocaleString("en-US")
                : null
            }
            status={statusActiveNewWallet}
            getData={getActiveNewWallet}
          />

          <InfoCard
            title="Average # of tx per wallet"
            source={apis.getAverageTxPerWallet}
            info={
              averageTxPerWallet
                ? averageTxPerWallet.toLocaleString("en-US")
                : null
            }
            status={statusAverageTxPerWallet}
            getData={getAverageTxPerWallet}
          />
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          marginTop: "28px",
        }}
      >
        <Header
          title="Terra(LUNA) rich list"
          subtitle="This section ranks users of the Terra network by the amount of LUNA they hold.
           It can be used to identify the top holders of
            LUNA and understand the distribution of wealth within the network."
        />
        <Grid xs={12}>
          <MyTable
            data={list}
            columns={["label", "totalStake", "addressBalance", "totalBalance"]}
            title="Rich List"
            defaultSize={100}
            pagination
            download
            sort
            search
            viewColumns
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Wallets;
