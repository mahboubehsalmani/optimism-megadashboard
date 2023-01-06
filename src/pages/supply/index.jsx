import { Box, Grid, useTheme } from "@mui/material";
import MyChart from "../../components/MyChart";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import http from "../../services/http";
import apis from "../../services/apis";
import InfoCard from "../../components/InfoCard";
import OPTransferedWeekly from "./OPTransferedWeekly";
import Header from "../../components/Header";
import OPTransferedWeeklySenderReceiver from "./OPTransferedWeeklySenderReceiver";

const Supply = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [statusSupplyQuickData, setStatusSupplyQuickData] = useState("loading");
  const [dataTotalSupply, setDataTotalSupply] = useState(null);
  const [dataCirculatingSupply, setDataCirculatingSupply] = useState(null);

  const [dataOPTransferedWeekly, setDataOPTransferedWeekly] = useState({
    labels: [],
    datasets: [
      {
        label: "Volume",
        data: [],
        backgroundColor: colors.chartPalette[100],
        borderColor: colors.chartPalette[100],
        borderWidth: 3,
        type: "line",
      },
      {
        label: "Count",
        yAxisID: "avgAxis",
        data: [],
        backgroundColor: colors.chartPalette[200],
        borderColor: colors.chartPalette[200],
        borderWidth: 1,
        type: "bar",
      },
    ],
  });

  const [
    dataOPTransferedWeeklySenderReceiver,
    setDataOPTransferedWeeklySenderReceiver,
  ] = useState({
    labels: [],
    datasets: [
      {
        label: "Sender",
        data: [],
        backgroundColor: colors.chartPalette[100],
        borderColor: colors.chartPalette[100],
        borderWidth: 3,
        type: "line",
      },
      {
        label: "Receiver",
        yAxisID: "avgAxis",
        data: [],
        backgroundColor: colors.chartPalette[200],
        borderColor: colors.chartPalette[200],
        borderWidth: 1,
        type: "line",
      },
    ],
  });
  const [statusOPTransferedWeekly, setStatusOPTransferedWeekly] =
    useState("loading");

  useEffect(() => {
    getSupplyQuickData();
    getOPTransferedWeekly();
  }, []);

  const getSupplyQuickData = async () => {
    setStatusSupplyQuickData("loading");
    try {
      const res = await http.get(apis.getSupplyQuickData);
      console.log(res);
      setDataTotalSupply(res[0].total_supply);
      setDataCirculatingSupply(res[0].circulating_supply);
      setStatusSupplyQuickData("loaded");
    } catch (error) {
      console.log(error.message);
      setStatusSupplyQuickData("error");
    }
  };

  const getOPTransferedWeekly = async () => {
    setStatusOPTransferedWeekly("loading");

    try {
      const res = await http.get(apis.getOPTransferedWeekly);
      setDataOPTransferedWeekly({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Volume",
            data: res.map((data) => data.VOLUME),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 3,
            type: "line",
          },
          {
            label: "Count",
            yAxisID: "countAxis",
            data: res.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[200],
            borderColor: colors.chartPalette[200],
            borderWidth: 1,
            type: "bar",
          },
        ],
      });

      setDataOPTransferedWeeklySenderReceiver({
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
      setStatusOPTransferedWeekly("loaded");
    } catch (error) {
      setStatusOPTransferedWeekly("error");
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
      }}
    >
      <Header
        title="Supply"
        subtitle="The Supply page includes data about the supply and distribution of OP,
         the native token of the Optimism blockchain. It can give an indication of the overall supply and distribution of OP."
      />
      <Grid
        container
        gap={2}
        sx={{
          marginTop: "80px",
        }}
      >
        <Grid item xs={12}>
          <Header
            title="OP Token"
            subtitle="This section includes data about the supply of OP. 
            It can give an indication of the overall distribution of OP."
          />
        </Grid>

        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Total Supply"
            source={apis.getTotalAndCirculatingSupply}
            info={
              dataTotalSupply ? dataTotalSupply.toLocaleString("en-US") : null
            }
            status={statusSupplyQuickData}
            getData={getSupplyQuickData}
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Circulating Supply"
            source={apis.queryTotalAndCirculatingSupply}
            info={
              dataCirculatingSupply
                ? dataCirculatingSupply.toLocaleString("en-US")
                : null
            }
            status={statusSupplyQuickData}
            getData={getSupplyQuickData}
          />
        </Grid>

        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Circulation Ratio"
            source={apis.queryTotalAndCirculatingSupply}
            info={
              dataCirculatingSupply && dataTotalSupply
                ? ((dataCirculatingSupply * 100) / dataTotalSupply).toFixed(2) +
                  "%"
                : null
            }
            status={statusSupplyQuickData}
            getData={getSupplyQuickData}
          />
        </Grid>

        <MyChart
          title="OP Transfers weekly"
          Chart={OPTransferedWeekly}
          data={dataOPTransferedWeekly}
          getData={getOPTransferedWeekly}
          status={statusOPTransferedWeekly}
          id="IBCPercent"
        />

        <MyChart
          title="OP Transfers weekly(senders/receivers)"
          Chart={OPTransferedWeeklySenderReceiver}
          data={dataOPTransferedWeeklySenderReceiver}
          getData={getOPTransferedWeekly}
          status={statusOPTransferedWeekly}
        />
      </Grid>
    </Box>
  );
};

export default Supply;
