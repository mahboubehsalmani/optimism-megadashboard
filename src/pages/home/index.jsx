import { useTheme } from "@emotion/react";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import apis from "../../services/apis";
import http from "../../services/http";
import { tokens } from "../../theme";
import OptimismPastSevenDaysHourlyPrice from "./optimismPastSevenDaysHourlyPrice";
import AboutTerra from "./aboutOptimism";
import CurrentPrice from "./currentPrice";
import QuickAccess from "./quickAccess";
import PastDayData from "./pastDayData";

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [statusAverageTPS, setStatusAverageTPS] = useState("loading");
  const [statusNewUsers, setStatusNewUsers] = useState("loading");
  const [statusTransactions, setStatusTransactions] = useState("loading");
  const [statusHourlyPrice, setStatusHourlyPrice] = useState("loading");
  const [statusCurrentPrice, setStatusCurrentPrice] = useState("loading");
  const [statusActiveUsers, setStatusActiveUsers] = useState("loading");
  const [statusBlocks, setStatusBlocks] = useState("loading");
  const [statusGasPrice, setStatusGasPrice] = useState("loading");
  const [statusTotalFee, setStatusTotalFee] = useState("loading");
  const [statusTxSuccessRate, setStatusTxSuccessRate] = useState("loading");
  const [dataTotalFee, setDataTotalFee] = useState(null);
  const [dataTxSuccessRate, setDataTxSuccessRate] = useState(null);
  const [dataGasPrice, setdataGasPrice] = useState(null);
  const [dataBlocks, setdataBlocks] = useState(null);
  const [dataActiveUsers, setDataActiveUsers] = useState(null);
  const [dataCurrentPrice, setCurrentPrice] = useState(null);
  const [dataAverageTPS, setDataAverageTPS] = useState(null);
  const [dataNewUsers, setDataNewUsers] = useState(null);
  const [dataTransactions, setDataTransactions] = useState(null);
  const [dataHourlyPrice, setDataHourlyPrice] = useState({
    labels: [],
    datasets: [
      {
        label: "Average",
        data: [],
        backgroundColor: [colors.secondary[400]],
        borderColor: colors.secondary[500],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    getHourlyPrice();
    getCurrentPrice();
    getTransactions();
    getNewUsers();
    getAverageTPS();
    getActiveUsers();
    getPastDayBlocks();
    getPastDayGasPrice();
    getPastDayTotalFee();
    getPastDayTxSuccessRate();
  }, []);

  const getHourlyPrice = async () => {
    setStatusHourlyPrice("loading");

    try {
      const res = await http.get(apis.getHourlyPrice);
      setDataHourlyPrice({
        labels: res.map((data) => data.HOUR),
        datasets: [
          {
            label: "Price",
            data: res.map((data) => data.PRICE),
            backgroundColor: [colors.chartPalette[100]],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
          },
        ],
      });
      setStatusHourlyPrice("loaded");
    } catch (error) {
      setStatusHourlyPrice("error");
    }
  };

  const getCurrentPrice = async () => {
    setStatusCurrentPrice("loading");
    try {
      const res = await http.get(apis.getCurrentPrice);
      setCurrentPrice(res[0]);
      console.log(res);
      setStatusCurrentPrice("loaded");
    } catch (error) {
      setStatusCurrentPrice("error");
    }
  };

  const getAverageTPS = async () => {
    setStatusAverageTPS("loading");
    try {
      const res = await http.get(apis.getAverageTPSForPastDay);
      setDataAverageTPS(res[0].AVERAGE_TPS);
      setStatusAverageTPS("loaded");
    } catch (error) {
      setStatusAverageTPS("error");
    }
  };

  const getTransactions = async () => {
    setStatusTransactions("loading");
    try {
      const res = await http.get(apis.getNumberOfTransactionsPastDay);
      setDataTransactions(res[0].TX_COUNT);
      setStatusTransactions("loaded");
    } catch (error) {
      setStatusTransactions("error");
    }
  };

  const getNewUsers = async () => {
    setStatusNewUsers("loading");
    try {
      const res = await http.get(apis.getNewWalletsPastDay);

      setDataNewUsers(res[0].NEW_WALLETS);
      setStatusNewUsers("loaded");
    } catch (error) {
      console.log(error.message);
      setStatusNewUsers("error");
    }
  };

  const getActiveUsers = async () => {
    setStatusActiveUsers("loading");
    try {
      const res = await http.get(apis.getActiveUserForPastDay);

      setDataActiveUsers(res[0].USERS);
      setStatusActiveUsers("loaded");
    } catch (error) {
      console.log(error.message);
      setStatusActiveUsers("error");
    }
  };

  const getPastDayBlocks = async () => {
    setStatusBlocks("loading");
    try {
      const res = await http.get(apis.getPastDayBlocks);

      setdataBlocks(res[0].BLOCK_COUNT);
      setStatusBlocks("loaded");
    } catch (error) {
      console.log(error.message);
      setStatusBlocks("error");
    }
  };

  const getPastDayGasPrice = async () => {
    setStatusGasPrice("loading");
    try {
      const res = await http.get(apis.getPastDayGasPrice);

      setdataGasPrice(res[0].AVERAGE_GAS);
      setStatusGasPrice("loaded");
    } catch (error) {
      console.log(error.message);
      setStatusGasPrice("error");
    }
  };
  const getPastDayTotalFee = async () => {
    setStatusTotalFee("loading");
    try {
      const res = await http.get(apis.getPastDayTotalFee);
      console.log(res);
      setDataTotalFee(res[0].TOTAL_FEE);
      setStatusTotalFee("loaded");
    } catch (error) {
      console.log(error.message);
      setStatusTotalFee("error");
    }
  };
  const getPastDayTxSuccessRate = async () => {
    setStatusTxSuccessRate("loading");
    try {
      const res = await http.get(apis.getPastDayTxSuccessRate);
      setDataTxSuccessRate(res[0].SUCCESS_RATE);
      setStatusTxSuccessRate("loaded");
    } catch (error) {
      console.log(error.message);
      setStatusTxSuccessRate("error");
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
        paddingLeft: "0px",
      }}
    >
      <Grid container gap={2}>
        <Grid item xs={12} lg={8}>
          <AboutTerra />
          <QuickAccess />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <CurrentPrice
            data={dataCurrentPrice}
            status={statusCurrentPrice}
            getData={getCurrentPrice}
          />
          <OptimismPastSevenDaysHourlyPrice data={dataHourlyPrice} />
          <PastDayData
            data={{
              dataAverageTPS,
              dataNewUsers,
              dataTransactions,
              dataActiveUsers,
              dataTotalFee,
              dataTxSuccessRate,
              dataGasPrice,
              dataBlocks,
            }}
            status={{
              statusAverageTPS,
              statusNewUsers,
              statusTransactions,
              statusActiveUsers,
              statusBlocks,
              statusGasPrice,
              statusTotalFee,
              statusTxSuccessRate,
            }}
            getData={{
              getAverageTPS,
              getNewUsers,
              getTransactions,
              getActiveUsers,
              getPastDayBlocks,
              getPastDayGasPrice,
              getPastDayTotalFee,
              getPastDayTxSuccessRate,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
