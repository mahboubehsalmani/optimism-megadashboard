import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import apis from "../../services/apis";
import TxFeeWeekly from "./txFeeWeekly";
import TotalTransactionFeesPerWeek from "./totalTransactionFeesPerWeek";
import MyChart from "../../components/MyChart";
import InfoCard from "../../components/InfoCard";
import { useEffect, useState } from "react";
import http from "../../services/http";
import TxFeeWeeklyDetailed from "./txFeeWeeklyDetailed";
import GasUsedWeekly from "./gasUsedWeekly";
import GasUsedWeeklyDetailed from "./gasUsedWeeklyDetailed";
import TxWeekly from "./txWeekly";
import TPSWeekly from "./TPSWeekly";
import L1GasUsed from "./L1GasUsed";
import TxSendersReceivers from "./txSendersReceivers";

const Activity = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Tx Fee data
  const [statusTxFeeWeekly, setStatusTxFeeWeekly] = useState("loading");
  const [statusTxGasUsedWeekly, setStatusTXGasUsedWeekly] = useState("loading");
  const [statusTxFeeQuickData, setStatusTxFeeQuickData] = useState("loading");
  const [statusTxGasUsedQuickData, setStatusTXGasUsedQuickData] =
    useState("loading");
  const [txFeeQuickData, setTxFeeQuickData] = useState(null);
  const [txGasUsedQuickData, setTXGasUsedQuickData] = useState(null);
  const [dataTxFeeWeekly, setTxFeeWeekly] = useState({
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
  const [txGasUsedWeekly, setTXGasUsedWeekly] = useState({
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
  const [tXGasUsedWeeklyDetailed, setTXGasUsedWeeklyDetailed] = useState({
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
  const [txFeeWeeklyDetailed, setTxFeeWeeklyDetailed] = useState({
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

  // Transaction Count
  const [
    statusNumberOfTxSendersQuickdata,
    setStatusNumberOfTxSendersQuickdata,
  ] = useState("loading");
  const [statusAverageTPSQuickData, setStatusAverageTPSQuickData] =
    useState("loading");
  const [statusNumberOfTxQuickData, setStatusNumberOfTxQuickData] =
    useState("loading");
  const [statusTxWeekly, setStatusTxWeekly] = useState("loading");
  const [statusTPSWeekly, setStatusTPSWeekly] = useState("loading");
  const [statusSenderReceiver, setStatusSenderReceiver] = useState("loading");
  const [statusL1GasUsed, setStatusL1GasUsed] = useState("loading");
  const [dataL1GasUsed, setDataL1GasUsed] = useState({
    labels: [],
    datasets: [
      {
        label: "Total",
        data: [],
        backgroundColor: colors.chartPalette[100],
        borderColor: colors.chartPalette[100],
        borderWidth: 1,
      },
      {
        label: "Average",
        data: [],
        backgroundColor: colors.chartPalette[200],
        borderColor: colors.chartPalette[200],
        borderWidth: 1,
      },
    ],
  });
  const [dataSenderReceiver, setDataSenderReceiver] = useState({
    labels: [],
    datasets: [
      {
        label: "Sender",
        data: [],
        backgroundColor: colors.chartPalette[100],
        borderColor: colors.chartPalette[100],
        borderWidth: 1,
      },
      {
        label: "Receiver",
        data: [],
        backgroundColor: colors.chartPalette[200],
        borderColor: colors.chartPalette[200],
        borderWidth: 1,
      },
    ],
  });
  const [dataTPSWeekly, setDataTPSWeekly] = useState({
    labels: [],
    datasets: [
      {
        label: "TPS",
        data: [],
        backgroundColor: colors.chartPalette[100],
        borderColor: colors.chartPalette[100],
        borderWidth: 1,
      },
    ],
  });
  const [dataTxWeekly, setDataTxWeekly] = useState({
    labels: [],
    datasets: [
      {
        label: "Transactions",
        data: [],
        backgroundColor: colors.chartPalette[100],
        borderColor: colors.chartPalette[100],
        borderWidth: 1,
        type: "line",
      },
      {
        label: "Successful",
        data: [],
        backgroundColor: "#0A9396",
        borderColor: "#0A9396",
        borderWidth: 1,
        type: "bar",
      },
      {
        label: "Failed",
        data: [],
        backgroundColor: "#9B2226",
        borderColor: "#9B2226",
        borderWidth: 1,
        type: "bar",
      },
    ],
  });
  const [dataNumberOfTxQuickData, setDataNumberOfTxQuickData] = useState(null);
  const [dataNumberOfTxSendersQuickdata, setDataNumberOfTxSendersQuickdata] =
    useState(null);
  const [dataAverageTPSQuickData, setDataAverageTPSQuickData] = useState(null);

  //
  const [quickData, setQuickData] = useState({});
  const sourceQuickData = apis.queryAllTimeQuickTransactions;
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [
    statusTotalTransactionFeesPerWeek,
    setStatusTotalTransactionFeesPerWeek,
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

  useEffect(() => {
    getTxFeeQuickData();
    getTxGasUsedQuickData();
    getTxFeeWeekly();
    getTxGasUsedWeekly();
    getNumberOfTxSendersQuickData();
    getAverageTPSQuickData();
    getNumberOfTransactionsQuickData();
    getAverageTPSQuickData();
    getNumberOfTxSendersQuickData();
    getTxWeekly();
    getTPSWeekly();
    getSenderReceiver();
    getL1GasUsed();
  }, []);

  // Transaction Fee
  const getTxFeeWeekly = async () => {
    setStatusTxFeeWeekly("loading");
    try {
      const res = await http.get(apis.getTxFeeWeekly);
      let week = [];
      let total = [];
      res.map((data) => {
        week = [...week, data.WEEK];
        total = [...total, data.TOTAL];
      });
      setTxFeeWeekly({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Total use",
            data: res.map((data) => data.TOTAL),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
            type: "line",
          },
          {
            label: "Average use",
            yAxisID: "avgAxis",
            data: res.map((data) => data.AVERAGE),
            backgroundColor: colors.chartPalette[200],
            borderWidth: 1,
          },
        ],
      });

      setTxFeeWeeklyDetailed({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Average fee",
            data: res.map((data) => data.MAX),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
            type: "line",
          },
          {
            label: "Average fee",
            yAxisID: "medianAxis",
            data: res.map((data) => data.MEDIAN),
            backgroundColor: colors.chartPalette[200],
            borderColor: colors.chartPalette[200],
            borderWidth: 1,
            type: "bar",
          },
        ],
      });
      setStatusTxFeeWeekly("loaded");
    } catch (error) {
      setStatusTxFeeWeekly("error");
    }
  };
  const getTxGasUsedWeekly = async () => {
    setStatusTXGasUsedWeekly("loading");

    try {
      const res = await http.get(apis.getTxGasUsedWeekly);
      setTXGasUsedWeekly({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Average use",
            data: res.map((data) => data.TOTAL),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
            type: "line",
          },
          {
            label: "Average use",
            yAxisID: "avgAxis",
            data: res.map((data) => data.AVERAGE),
            backgroundColor: colors.chartPalette[200],
            borderColor: colors.chartPalette[200],
            borderWidth: 1,
            type: "bar",
          },
        ],
      });

      setTXGasUsedWeeklyDetailed({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Max use",
            data: res.map((data) => data.MAX),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
            type: "line",
          },
          {
            label: "Average fee",
            yAxisID: "medianAxis",
            data: res.map((data) => data.MEDIAN),
            backgroundColor: colors.chartPalette[200],
            borderColor: colors.chartPalette[200],
            borderWidth: 1,
            type: "bar",
          },
        ],
      });
      setStatusTXGasUsedWeekly("loaded");
    } catch (error) {
      setLoadingStatus("error");
    }
  };
  const getTxFeeQuickData = async () => {
    setStatusTxFeeQuickData("loading");
    try {
      const res = await http.get(apis.getTxFeeQuickData);
      setTxFeeQuickData(res[0]);
      setStatusTxFeeQuickData("loaded");
    } catch (error) {
      setStatusTxFeeQuickData("error");
    }
  };
  const getTxGasUsedQuickData = async () => {
    setStatusTXGasUsedQuickData("loading");
    try {
      const res = await http.get(apis.getGasUsedQuickData);
      setTXGasUsedQuickData(res[0]);
      setStatusTXGasUsedQuickData("loaded");
    } catch (error) {
      setStatusTXGasUsedQuickData("error");
    }
  };

  // Transaction Count
  const getNumberOfTransactionsQuickData = async () => {
    setStatusNumberOfTxQuickData("loading");
    try {
      const res = await http.get(apis.getNumberOfTransactionsQuickData);
      setDataNumberOfTxQuickData(res[0].TX_COUNT);
      setStatusNumberOfTxQuickData("loaded");
    } catch (error) {
      setStatusNumberOfTxQuickData("error");
    }
  };
  const getAverageTPSQuickData = async () => {
    setStatusAverageTPSQuickData("loading");
    try {
      const res = await http.get(apis.getAverageTPSQuickData);
      setDataAverageTPSQuickData(res[0].AVERAGE_TPS);
      setStatusAverageTPSQuickData("loaded");
    } catch (error) {
      setStatusAverageTPSQuickData("error");
    }
  };
  const getNumberOfTxSendersQuickData = async () => {
    setStatusNumberOfTxSendersQuickdata("loading");
    try {
      const res = await http.get(apis.getNumberOfTxSendersQuickData);
      setDataNumberOfTxSendersQuickdata(res[0].SENDERS);
      setStatusNumberOfTxSendersQuickdata("loaded");
    } catch (error) {
      setStatusNumberOfTxSendersQuickdata("error");
    }
  };

  const getTxWeekly = async () => {
    setStatusTxWeekly("loading");

    try {
      const res = await http.get(apis.getTxWeekly);
      setDataTxWeekly({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Transactions",
            data: res.map((data) => data.TX_COUNT),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
            type: "line",
          },
          {
            label: "Failed",
            data: res.map((data) => data.FAILED_TRANSACTIONS),
            backgroundColor: "#9B2226",
            borderColor: "#9B2226",
            borderWidth: 1,
            type: "bar",
          },
          {
            label: "Successful",
            data: res.map((data) => data.SUCCESSFUL_TRANSACTIONS),
            backgroundColor: "#0A9396",
            borderColor: "#0A9396",
            borderWidth: 1,
            type: "bar",
          },
        ],
      });
      setStatusTxWeekly("loaded");
    } catch (error) {
      setStatusTxWeekly("error");
    }
  };

  const getTPSWeekly = async () => {
    setStatusTPSWeekly("loading");

    try {
      const res = await http.get(apis.getTPSWeekly);
      setDataTPSWeekly({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "TPS",
            data: res.map((data) => data.AVERAGE_TPS),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
          },
        ],
      });
      setStatusTPSWeekly("loaded");
    } catch (error) {
      setStatusTPSWeekly("error");
    }
  };

  const getSenderReceiver = async () => {
    setStatusSenderReceiver("loading");

    try {
      const res = await http.get(apis.getSenderReceiverWeekly);
      setDataSenderReceiver({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Sender",
            data: res.map((data) => data.SENDERS),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
            type: "line",
          },
          {
            label: "Receiver",
            data: res.map((data) => data.RECEIVERS),
            backgroundColor: colors.chartPalette[200],
            borderColor: colors.chartPalette[200],
            borderWidth: 1,
            type: "line",
          },
        ],
      });
      setStatusSenderReceiver("loaded");
    } catch (error) {
      setStatusSenderReceiver("error");
    }
  };

  const getL1GasUsed = async () => {
    setStatusL1GasUsed("loading");

    try {
      const res = await http.get(apis.getL1GasUsedWeekly);
      setDataL1GasUsed({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Total",
            data: res.map((data) => data.TOTAL),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 3,
            type: "line",
          },
          {
            label: "Average",
            yAxisID: "avgAxis",
            data: res.map((data) => data.AVERAGE),
            backgroundColor: colors.chartPalette[200],
            borderColor: colors.chartPalette[200],
            borderWidth: 1,
            type: "bar",
          },
        ],
      });
      setStatusL1GasUsed("loaded");
    } catch (error) {
      setStatusL1GasUsed("error");
    }
  };

  //

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

  return (
    <Box sx={{ padding: "20px" }}>
      <Header
        title="Activity"
        subtitle="Activity on the Optimism network refers to the various actions and transactions 
        that take place on the Ethereum blockchain, such as transfers of funds, smart contract executions, etc."
      />
      <Grid container gap={2}>
        <Grid item xs={12}>
          <Header
            title="Transaction Fee"
            subtitle="This metric counts the total number of transactions that have taken place on the
             Optimism network over a given time period. These transactions are processed off-chain and
              then recorded on the Ethereum blockchain."
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Average tx fee"
            source={apis.getTxFeeQuickData}
            info={txFeeQuickData ? txFeeQuickData.AVERAGE.toFixed(5) : null}
            status={statusTxFeeQuickData}
            getData={getTxFeeQuickData}
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Total tx fee"
            source={apis.getTxFeeQuickData}
            info={
              txFeeQuickData
                ? txFeeQuickData.TOTAL.toLocaleString("en-US")
                : null
            }
            status={statusTxFeeQuickData}
            getData={getTxFeeQuickData}
          />
        </Grid>

        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Highest tx fee"
            source={apis.getTxFeeQuickData}
            info={
              txFeeQuickData ? txFeeQuickData.MAX.toLocaleString("en-US") : null
            }
            status={statusTxFeeQuickData}
            getData={getTxFeeQuickData}
          />
        </Grid>

        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Average gas used"
            source={apis.getGasUsedQuickData}
            info={
              txGasUsedQuickData
                ? txGasUsedQuickData.AVERAGE.toLocaleString("en-US")
                : null
            }
            status={statusTxGasUsedQuickData}
            getData={getTxGasUsedQuickData}
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Total gas used"
            source={apis.getGasUsedQuickData}
            info={
              txGasUsedQuickData
                ? txGasUsedQuickData.TOTAL.toLocaleString("en-US")
                : null
            }
            status={statusTxGasUsedQuickData}
            getData={getTxGasUsedQuickData}
          />
        </Grid>

        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Highest gas used"
            source={apis.getGasUsedQuickData}
            info={
              txGasUsedQuickData
                ? txGasUsedQuickData.MAX.toLocaleString("en-US")
                : null
            }
            status={statusTxGasUsedQuickData}
            getData={getTxGasUsedQuickData}
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
              title="Tx fee"
              Chart={TxFeeWeekly}
              url={apis.queryTxFeeWeekly}
              status={statusTxFeeWeekly}
              getData={getTxFeeWeekly}
              data={dataTxFeeWeekly}
              id={"TxFeeWeekly"}
            />
            <MyChart
              title="Gas used"
              Chart={GasUsedWeekly}
              url={apis.queryTxGasUsedWeekly}
              status={statusTxGasUsedWeekly}
              getData={getTxGasUsedWeekly}
              data={txGasUsedWeekly}
              id={"GasUsedWeekly"}
            />

            <MyChart
              title="Tx fee details"
              Chart={TxFeeWeeklyDetailed}
              url={apis.queryTxFeeWeekly}
              status={statusTxFeeWeekly}
              getData={getTxFeeWeekly}
              data={txFeeWeeklyDetailed}
              id={"TxFeeWeeklyDetailed"}
            />
            <MyChart
              title="Gas used details"
              Chart={GasUsedWeeklyDetailed}
              url={apis.queryTxGasUsedWeekly}
              status={statusTxGasUsedWeekly}
              getData={getTxGasUsedWeekly}
              data={tXGasUsedWeeklyDetailed}
              id={"GasUsedWeekly"}
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
            title="Transactions count"
            subtitle="This metric counts the total number of transactions that
             have taken place on the Optimism network over a given time period."
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="# of Transactions"
            source={apis.getNumberOfTransactionsQuickData}
            info={
              dataNumberOfTxQuickData
                ? dataNumberOfTxQuickData.toLocaleString("en-US")
                : null
            }
            status={statusNumberOfTxQuickData}
            getData={getNumberOfTransactionsQuickData}
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Average TPS"
            source={apis.getAverageTPSQuickData}
            info={
              dataAverageTPSQuickData
                ? dataAverageTPSQuickData.toLocaleString("en-US")
                : null
            }
            status={statusAverageTPSQuickData}
            getData={getAverageTPSQuickData}
          />
        </Grid>

        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="# of Tx senders"
            source={apis.getNumberOfTxSendersQuickData}
            info={
              dataNumberOfTxSendersQuickdata
                ? dataNumberOfTxSendersQuickdata.toLocaleString("en-US")
                : null
            }
            status={statusNumberOfTxSendersQuickdata}
            getData={getNumberOfTxSendersQuickData}
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
              title="Transactions"
              Chart={TxWeekly}
              url={apis.queryTxWeekly}
              status={statusTxWeekly}
              getData={getTxWeekly}
              data={dataTxWeekly}
              id={"TxFeeWeekly"}
            />
            <MyChart
              title="TPS"
              Chart={TPSWeekly}
              url={apis.queryTPSWeekly}
              status={statusTPSWeekly}
              getData={getTPSWeekly}
              data={dataTPSWeekly}
              id={"TPSWeekly"}
            />

            <MyChart
              title="transaction senders/receivers"
              Chart={TxSendersReceivers}
              url={apis.querySenderReceiverWeekly}
              status={statusSenderReceiver}
              getData={getSenderReceiver}
              data={dataSenderReceiver}
              id={"SenderReceiverChart"}
            />
            <MyChart
              title="L1 gas used"
              Chart={L1GasUsed}
              url={apis.queryL1GasUsedWeekly}
              status={statusL1GasUsed}
              getData={getL1GasUsed}
              data={dataL1GasUsed}
              id={"L1GasUsed"}
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
            title="Transactions function"
            subtitle="The transactions function signature is a unique identifier for a function within
             a smart contract on the Optimism network. It is used to specify which
             function is being called when interacting with a smart contract on the Ethereum blockchain."
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
              title="Most used function signatures"
              Chart={TxFeeWeekly}
              url={apis.queryTxFeeWeekly}
              status={statusTxFeeWeekly}
              getData={getTxFeeWeekly}
              data={dataTxFeeWeekly}
              id={"TxFeeWeekly"}
            />
            <MyChart
              title="Most used functions weekly"
              Chart={TotalTransactionFeesPerWeek}
              url={apis.queryTotalTransactionFeesPerWeek}
              status={statusTotalTransactionFeesPerWeek}
              getData={getTotalTransactionFeesPerWeek}
              data={dataTotalTransactionFeesPerWeek}
              id={"TotalTransactionFeesPerWeek"}
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
            title="Blocks"
            subtitle="TPS (transactions per second) measures the speed at which transactions are processed on the Optimism network,
             while block time refers to the average time it takes for a new block to be added to the blockchain."
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="# of blocks"
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
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Average # of transactions per block"
            source={sourceQuickData}
            info={
              quickData.TOTAL_FEE
                ? quickData.TOTAL_FEE.toLocaleString("en-US")
                : null
            }
            status={loadingStatus}
            getData={getQuickData}
          />
        </Grid>

        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Average block time"
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
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Last created block"
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
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Average block difficulty"
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
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Average block size"
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
        <Grid item xs={12}>
          <Grid
            container
            gap={2}
            sx={{
              justifyContent: "start",
            }}
          >
            <MyChart
              title="Block"
              Chart={TxFeeWeekly}
              url={apis.queryTxFeeWeekly}
              status={statusTxFeeWeekly}
              getData={getTxFeeWeekly}
              data={dataTxFeeWeekly}
              id={"TxFeeWeekly"}
            />
            <MyChart
              title="Block time"
              Chart={TotalTransactionFeesPerWeek}
              url={apis.queryTotalTransactionFeesPerWeek}
              status={statusTotalTransactionFeesPerWeek}
              getData={getTotalTransactionFeesPerWeek}
              data={dataTotalTransactionFeesPerWeek}
              id={"TotalTransactionFeesPerWeek"}
            />

            <MyChart
              title="Block difficulty"
              Chart={TxFeeWeekly}
              url={apis.queryTxFeeWeekly}
              status={statusTxFeeWeekly}
              getData={getTxFeeWeekly}
              data={dataTxFeeWeekly}
              id={"TxFeeWeekly"}
            />
            <MyChart
              title="Block size"
              Chart={TotalTransactionFeesPerWeek}
              url={apis.queryTotalTransactionFeesPerWeek}
              status={statusTotalTransactionFeesPerWeek}
              getData={getTotalTransactionFeesPerWeek}
              data={dataTotalTransactionFeesPerWeek}
              id={"TotalTransactionFeesPerWeek"}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Activity;
