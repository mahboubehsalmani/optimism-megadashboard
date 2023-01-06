import { Box, Grid, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import apis from "../../services/apis";
import AverageTransactionFeePerTransactionPerWeek from "./averageTransactionFeePerTransactionPerWeek";
import AverageBlockTimePerWeek from "./averageBlockTimePerWeek";
import AverageTPSPerWeek from "./averageTPSPerWeek";
import TotalNumberOfTransactionsPerWeek from "./totalNumberOfTransactionsPerWeek";
import TotalTransactionFeesPerWeek from "./totalTransactionFeesPerWeek";
import MyChart from "../../components/MyChart";
import InfoCard from "../../components/InfoCard";
import { useEffect, useState } from "react";
import http from "../../services/http";

const Activity = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [quickData, setQuickData] = useState({});
  const sourceQuickData = apis.queryAllTimeQuickTransactions;
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [
    statusTotalTransactionFeesPerWeek,
    setStatusTotalTransactionFeesPerWeek,
  ] = useState("loading");
  const [statusAverageTPSPerWeek, setStatusAverageTPSPerWeek] =
    useState("loading");
  const [
    statusTotalNumberOfTransactionsPerWeek,
    setStatusTotalNumberOfTransactionsPerWeek,
  ] = useState("loading");
  const [statusAverageBlockTimePerWeek, setStatusAverageBlockTimePerWeek] =
    useState("loading");
  const [
    statusAverageTransactionFeePerTransactionPerWeek,
    setStatusAverageTransactionFeePerTransactionPerWeek,
  ] = useState("loading");

  const [dataTotalTransactionFeesPerWeek, setDataTotalTransactionFeesPerWeek] =
    useState({
      labels: [],
      datasets: [
        {
          label: "Total Fee",
          data: [],
          backgroundColor: [colors.secondary[400]],
          borderColor: colors.secondary[500],
          borderWidth: 1,
        },
      ],
    });
  const [dataAverageTPSPerWeek, setDataAverageTPSPerWeek] = useState({
    labels: [],
    datasets: [
      {
        label: "Average TPS",
        data: [],
        backgroundColor: [colors.secondary[400]],
        borderColor: colors.secondary[500],
        borderWidth: 1,
      },
    ],
  });

  const [
    dataTotalNumberOfTransactionsPerWeek,
    setDataTotalNumberOfTransactionsPerWeek,
  ] = useState({
    labels: [],
    datasets: [
      {
        label: "Transactions",
        data: [],
        backgroundColor: [colors.chartPalette[100]],
        borderColor: colors.chartPalette[100],
        borderWidth: 3,
        type: "line",
      },

      {
        label: "Sucessful",
        data: [],
        backgroundColor: "#0a9396",
        stack: "base",
        type: "bar",
      },

      {
        label: "Failed",
        data: [],
        backgroundColor: "#9b2226",
        stack: "base",
        type: "bar",
      },
    ],
  });

  const [dataAverageBlockTimePerWeek, setDataAverageBlockTimePerWeek] =
    useState({
      labels: [],
      datasets: [
        {
          label: "Average block time",
          data: [],
          backgroundColor: [colors.secondary[400]],
          borderColor: colors.secondary[500],
          borderWidth: 1,
        },
      ],
    });

  const [
    dataAverageTransactionFeePerTransactionPerWeek,
    setDataAverageTransactionFeePerTransactionPerWeek,
  ] = useState({
    labels: [],
    datasets: [
      {
        label: "Average fee",
        data: [],
        backgroundColor: [colors.secondary[400]],
        borderColor: colors.secondary[500],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    getQuickData();
    getTotalTransactionFeesPerWeek();
    getAverageTPSPerWeek();
    getTotalNumberOfTransactionsPerWeek();
    getAverageBlockTimePerWeek();
    getAverageTransactionFeePerTransactionPerWeek();
  }, []);

  const getQuickData = async () => {
    try {
      const res = await http.get(apis.getAllTimeQuickTransactions);
      setQuickData(res[0]);
      setLoadingStatus("loaded");
    } catch (error) {
      setLoadingStatus("error");
    }
  };

  const getTotalTransactionFeesPerWeek = async () => {
    let res = [];
    setStatusTotalTransactionFeesPerWeek("loading");
    try {
      res = await http.get(apis.getTotalTransactionFeesPerWeek);
      setDataTotalTransactionFeesPerWeek({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Total Fee",
            data: res.map((data) => data.TOTAL),
            backgroundColor: [colors.secondary[400]],
            borderColor: colors.secondary[500],
            borderWidth: 1,
          },
        ],
      });
      setStatusTotalTransactionFeesPerWeek("loaded");
    } catch (error) {
      setStatusTotalTransactionFeesPerWeek("error");
    }
  };

  const getAverageTPSPerWeek = async () => {
    let res = [];
    setStatusAverageTPSPerWeek("loading");
    try {
      res = await http.get(apis.getAverageTPSPerWeek);
      setDataAverageTPSPerWeek({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Average TPS",
            data: res.map((data) => data.AVERAGE_TPS),
            backgroundColor: [colors.secondary[400]],
            borderColor: colors.secondary[500],
            borderWidth: 1,
          },
        ],
      });
      setStatusAverageTPSPerWeek("loaded");
    } catch (error) {
      setStatusAverageTPSPerWeek("error");
    }
  };

  const getTotalNumberOfTransactionsPerWeek = async () => {
    let res = [];
    setStatusTotalNumberOfTransactionsPerWeek("loading");
    try {
      res = await http.get(apis.getTotalNumberOfTransactionsPerWeek);
      let _sucessful = [];
      let unsucessful = [];
      setDataTotalNumberOfTransactionsPerWeek({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Transactions",
            data: res.map((data) => data.TOTAL),
            backgroundColor: [colors.chartPalette[100]],
            borderColor: colors.chartPalette[100],
            borderWidth: 3,
            type: "line",
          },

          {
            label: "Sucessful",
            data: res.map((data) => data.SUCCESSFUL_TRANSACTIONS),
            backgroundColor: "#0a9396",
            stack: "base",
            type: "bar",
          },

          {
            label: "Failed",
            data: res.map((data) => data.FAILED_TRANSACTIONS),
            backgroundColor: "#9b2226",
            stack: "base",
            type: "bar",
          },
        ],
      });
      setStatusTotalNumberOfTransactionsPerWeek("loaded");
    } catch (error) {
      setStatusTotalNumberOfTransactionsPerWeek("error");
    }
  };

  const getAverageBlockTimePerWeek = async () => {
    let res = [];
    setStatusAverageBlockTimePerWeek("loading");
    try {
      res = await http.get(apis.getAverageBlockTimePerWeek);
      setDataAverageBlockTimePerWeek({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Average block time",
            data: res.map((data) => data.AVERAGE_BLOCK_TIME),
            backgroundColor: [colors.secondary[400]],
            borderColor: colors.secondary[500],
            borderWidth: 1,
          },
        ],
      });
      setStatusAverageBlockTimePerWeek("loaded");
    } catch (error) {
      setStatusAverageBlockTimePerWeek("error");
    }
  };

  const getAverageTransactionFeePerTransactionPerWeek = async () => {
    let res = [];
    setStatusAverageTransactionFeePerTransactionPerWeek("loading");
    try {
      res = await http.get(apis.getAverageTransactionFeePerTransactionPerWeek);
      setDataAverageTransactionFeePerTransactionPerWeek({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Average fee",
            data: res.map((data) => data.AVERAGE),
            backgroundColor: [colors.secondary[400]],
            borderColor: colors.secondary[500],
            borderWidth: 1,
          },
        ],
      });
      setStatusAverageTransactionFeePerTransactionPerWeek("loaded");
    } catch (error) {
      setStatusAverageTransactionFeePerTransactionPerWeek("error");
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Header
        title="Activity"
        subtitle="Activity on the Terra network refers to the various actions and transactions that take place on the blockchain,
         such as transfers of funds, smart contract executions, and voting on governance proposals."
      />
      <Grid container gap={2}>
        <Grid item xs={12}>
          <Header
            title="Transaction Fee"
            subtitle="This metric tracks the average fee paid per transaction on the Terra network."
          />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Grid
            container
            gap={2}
            sx={{
              justifyContent: "start",
            }}
          >
            <MyChart
              title="Average Transaction Fee Weekly"
              Chart={AverageTransactionFeePerTransactionPerWeek}
              url={apis.queryAverageTransactionFeePerTransactionPerWeek}
              status={statusAverageTransactionFeePerTransactionPerWeek}
              getData={getAverageTransactionFeePerTransactionPerWeek}
              data={dataAverageTransactionFeePerTransactionPerWeek}
              id={"AverageTransactionFeePerTransactionPerWeek"}
            />

            <MyChart
              title="Total Transaction Fee Weekly"
              Chart={TotalTransactionFeesPerWeek}
              url={apis.queryTotalTransactionFeesPerWeek}
              status={statusTotalTransactionFeesPerWeek}
              getData={getTotalTransactionFeesPerWeek}
              data={dataTotalTransactionFeesPerWeek}
              id={"TotalTransactionFeesPerWeek"}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Total Transaction Fee"
            source={sourceQuickData}
            info={
              quickData.TOTAL_FEE
                ? quickData.TOTAL_FEE.toLocaleString("en-US")
                : null
            }
            status={loadingStatus}
            getData={getQuickData}
          />
          <InfoCard
            title="Average Transaction Fee"
            source={sourceQuickData}
            info={
              quickData.AVERAGE_FEE
                ? quickData.AVERAGE_FEE.toLocaleString("en-US")
                : null
            }
            status={loadingStatus}
            getData={getQuickData}
          />
        </Grid>
      </Grid>

      <Grid
        container
        gap={2}
        sx={{
          marginTop: "80px",
        }}
      >
        <Grid item xs={12}>
          <Header
            title="Transactions count"
            subtitle="This metric counts the total number of transactions that have taken place on the Terra network over a given time period.
          "
          />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Grid
            container
            gap={2}
            sx={{
              justifyContent: "start",
            }}
          >
            <MyChart
              title="Total Number Of Transactions Per Week"
              Chart={TotalNumberOfTransactionsPerWeek}
              url={apis.queryTotalNumberOfTransactionsPerWeek}
              status={statusTotalNumberOfTransactionsPerWeek}
              getData={getTotalNumberOfTransactionsPerWeek}
              data={dataTotalNumberOfTransactionsPerWeek}
              id={"TotalNumberOfTransactionsPerWeek"}
              defaultSize={100}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <Grid
            container
            sx={{
              width: "100%",
            }}
          >
            <InfoCard
              title="Number of Transactions"
              source={sourceQuickData}
              info={
                quickData.TOTAL_TRANSACTIONS
                  ? quickData.TOTAL_TRANSACTIONS.toLocaleString("en-US")
                  : null
              }
              status={loadingStatus}
              getData={getQuickData}
            />
            <InfoCard
              title="Number of transaction senders"
              source={sourceQuickData}
              info={
                quickData.USERS ? quickData.USERS.toLocaleString("en-US") : null
              }
              status={loadingStatus}
              getData={getQuickData}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        gap={2}
        sx={{
          marginTop: "80px",
        }}
      >
        <Grid item xs={12}>
          <Header
            title="TPS and block time"
            subtitle="TPS (transactions per second) measures the speed at which transactions 
          are processed on the Terra network, while block time refers to the average time 
          it takes for a new block to be added to the blockchain. Together,
           these metrics can give an indication of the overall performance and efficiency of the network."
          />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Grid
            container
            gap={2}
            sx={{
              justifyContent: "start",
            }}
          >
            <MyChart
              title="Average Block Time Per Week"
              Chart={AverageBlockTimePerWeek}
              url={apis.queryAverageBlockTimePerWeek}
              status={statusAverageBlockTimePerWeek}
              getData={getAverageBlockTimePerWeek}
              data={dataAverageBlockTimePerWeek}
              id={"AverageBlockTimePerWeek"}
            />

            <MyChart
              title="Average TPS Per Week"
              Chart={AverageTPSPerWeek}
              url={apis.queryAverageTPSPerWeek}
              status={statusAverageTPSPerWeek}
              getData={getAverageTPSPerWeek}
              data={dataAverageTPSPerWeek}
              id="AverageTPSPerWeek"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <Grid
            container
            sx={{
              width: "100%",
            }}
          >
            <InfoCard
              title="Number of blocks"
              source={sourceQuickData}
              info={
                quickData.TOTAL_BLOCKS
                  ? quickData.TOTAL_BLOCKS.toLocaleString("en-US")
                  : null
              }
              status={loadingStatus}
              getData={getQuickData}
            />
            <InfoCard
              title="Average TPS"
              source={sourceQuickData}
              info={quickData.TPS ? quickData.TPS.toFixed(2) : null}
              status={loadingStatus}
              getData={getQuickData}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Activity;
