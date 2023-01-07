import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import apis from "../../services/apis";
import MyChart from "../../components/MyChart";
import InfoCard from "../../components/InfoCard";
import { useEffect, useState } from "react";
import http from "../../services/http";
import TxFeeWeekly from "./txFeeWeekly";
import TxFeeWeeklyDetailed from "./txFeeWeeklyDetailed";
import GasUsedWeekly from "./gasUsedWeekly";
import GasUsedWeeklyDetailed from "./gasUsedWeeklyDetailed";

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

  useEffect(() => {
    getTxFeeQuickData();
    getTxFeeWeekly();
    getTxGasUsedQuickData();
    getTxGasUsedWeekly();
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
      setStatusTXGasUsedWeekly("error");
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

  return (
    <Box sx={{ padding: "20px" }}>
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
    </Box>
  );
};

export default Activity;
