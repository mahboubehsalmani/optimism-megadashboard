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
import FunctionDistribution from "./functionDistribution";
import MoastUsedFunctionWeekly from "./mostUsedFunctionWeekly";
import MostUsedProtocolAction from "./mostUsedProtocolActions";
import MostUsedProtocolActionsWeekly from "./mostUsedProtocolActionsWeekly";
import MostUsedProjects from "./mostUsedProjects";
import MostUsedProjectsWeekly from "./mostUsedProjectsWeekly";

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

  // Transaction Function
  const [statusFunctionDistribution, setStatusFunctionDistribution] =
    useState("loading");
  const [statusMostUsedFunctionWeekly, setStatusMostUsedFunctionWeekly] =
    useState("loading");
  const [dataMostUsedFunctionWeekly, setDataMostUsedFunctionWeekly] =
    useState(null);
  const [dataFunctionDistribution, setDataFunctionDistribution] =
    useState(null);

  // Most used actions
  const [statusMostUsedProtocolActions, setStatusMostUsedProtocolActions] =
    useState("loading");
  const [
    statusMostUsedProtocolActionsWeekly,
    setStatusMostUsedProtocolActionsWeekly,
  ] = useState("loading");
  const [
    dataMostUsedProtocolActionsWeekly,
    setDataMostUsedProtocolActionsWeekly,
  ] = useState(null);
  const [dataMostUsedProtocolActions, setDataMostUsedProtocolActions] =
    useState(null);

  //Most Used Projects

  const [statusMostUsedProjects, setStatusMostUsedProjects] =
    useState("loading");
  const [statusMostUsedProjectsWeekly, setStatusMostUsedProjectsWeekly] =
    useState("loading");
  const [dataMostUsedProjectsWeekly, setDataMostUsedProjectsWeekly] = useState(
    []
  );
  const [dataMostUsedProjects, setDataMostUsedProjects] = useState([]);

  // Blocks

  const [statusBlockQuickData, setStatusBlockQuickData] = useState("loading");
  const [dataBlockQuickData, setDataBlockQuickData] = useState(null);
  //
  const [quickData, setQuickData] = useState({});
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
    getFunctionDistribution();
    getMostUsedFunctionWeekly();
    getMostUsedProtocolActions();
    getMostUsedProtocolActionsWeekly();
    getMostUsedProjects();
    getMostUsedProjectsWeekly();
    getBlocksQuickData();
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

  // Transaction Function
  const getFunctionDistribution = async () => {
    setStatusFunctionDistribution("loading");
    try {
      const res = await http.get(apis.getFunctionDistribution);
      let temp = [];
      res.map((data, index) => {
        temp = [
          ...temp,
          {
            id: data.SIGNATURE,
            label: data.SIGNATURE,
            value: data.COUNT,
            color: colors.chartPalette[(index + 1) * 100],
          },
        ];
      });
      setDataFunctionDistribution(temp);
      setStatusFunctionDistribution("loaded");
    } catch (error) {
      setStatusFunctionDistribution("error");
    }
  };

  const getMostUsedFunctionWeekly = async () => {
    let res = [];
    setStatusMostUsedFunctionWeekly("loading");
    try {
      res = await http.get(apis.getFunctionWeekly);
      let week = [];
      let _Approve = [];
      let _sign_szabo = [];
      let _openPosition = [];
      let _transmit = [];
      let _multicall = [];
      let _submit = [];
      let _many_msg_babbage = [];
      let _func_2093253501 = [];
      let _transfer = [];
      let _addLiquidity = [];
      let _setL1BaseFee = [];
      let _swapAndSend = [];
      let _swapExactTokensForTokensSimple = [];
      let _mintToken = [];

      await res.map((data) => {
        week = [...week, data.WEEK];
        if (data.FUNCTION === "Approve") _Approve = [..._Approve, data];
        else if (data.FUNCTION === "sign_szabo")
          _sign_szabo = [..._sign_szabo, data];
        else if (data.FUNCTION === "openPosition")
          _openPosition = [..._openPosition, data];
        else if (data.FUNCTION === "transmit") _transmit = [..._transmit, data];
        else if (data.FUNCTION === "multicall")
          _multicall = [..._multicall, data];
        else if (data.FUNCTION === "submit") _submit = [..._submit, data];
        else if (data.FUNCTION === "many_msg_babbage")
          _many_msg_babbage = [..._many_msg_babbage, data];
        else if (data.FUNCTION === "func_2093253501")
          _func_2093253501 = [..._func_2093253501, data];
        else if (data.FUNCTION === "transfer") _transfer = [..._transfer, data];
        else if (data.FUNCTION === "addLiquidity")
          _addLiquidity = [..._addLiquidity, data];
        else if (data.FUNCTION === "setL1BaseFee")
          _setL1BaseFee = [..._setL1BaseFee, data];
        else if (data.FUNCTION === "swapAndSend")
          _swapAndSend = [..._swapAndSend, data];
        else if (data.FUNCTION === "swapExactTokensForTokensSimple")
          _swapExactTokensForTokensSimple = [
            ..._swapExactTokensForTokensSimple,
            data,
          ];
        else if (data.FUNCTION === "mintToken")
          _mintToken = [..._mintToken, data];
      });
      setDataMostUsedFunctionWeekly({
        labels: _Approve.map((data) => data.WEEK),
        datasets: [
          {
            label: "Approved",
            data: _Approve.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[100],
            stack: "base",
          },
          {
            label: "addLiquidity",
            data: _addLiquidity.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[200],
            stack: "base",
          },
          {
            label: "func_2093253501",
            data: _func_2093253501.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[300],
            stack: "base",
          },
          {
            label: "many_msg_babbage",
            data: _many_msg_babbage.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[400],
            stack: "base",
          },
          {
            label: "mintToken",
            data: _mintToken.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[500],
            stack: "base",
          },
          {
            label: "multicall",
            data: _multicall.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[600],
            stack: "base",
          },
          {
            label: "openPosition",
            data: _openPosition.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[700],
            stack: "base",
          },
          {
            label: "setL1BaseFee",
            data: _setL1BaseFee.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[800],
            stack: "base",
          },
          {
            label: "submit",
            data: _submit.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[900],
            stack: "base",
          },
          {
            label: "sign_szabo",
            data: _sign_szabo.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[100],
            stack: "base",
          },
          {
            label: "swapAndSend",
            data: _swapAndSend.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[200],
            stack: "base",
          },
          {
            label: "transmit",
            data: _transmit.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[300],
            stack: "base",
          },

          {
            label: "swapExactTokensForTokensSimple",
            data: _swapExactTokensForTokensSimple.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[400],
            stack: "base",
          },

          {
            label: "transfer",
            data: _transfer.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[500],
            stack: "base",
          },
        ],
      });

      setStatusMostUsedFunctionWeekly("loaded");
    } catch (error) {
      setStatusMostUsedFunctionWeekly("error");
    }
  };

  // Most Used Actions
  const getMostUsedProtocolActions = async () => {
    setStatusMostUsedProtocolActions("loading");
    try {
      const res = await http.get(apis.getMostUsedProtocolActions);
      let temp = [];
      res.map((data, index) => {
        temp = [
          ...temp,
          {
            id: data.LABEL_TYPE,
            label: data.LABEL_TYPE,
            value: data.COUNT,
            color: colors.chartPalette[(index + 1) * 100],
          },
        ];
      });
      setDataMostUsedProtocolActions(temp);
      setStatusMostUsedProtocolActions("loaded");
    } catch (error) {
      setStatusMostUsedProtocolActions("error");
    }
  };

  const getMostUsedProtocolActionsWeekly = async () => {
    let res = [];
    setStatusMostUsedProtocolActionsWeekly("loading");
    try {
      res = await http.get(apis.getMostUsedProtocolActionsWeekly);
      let _dapp = [];
      let _token = [];
      let _defi = [];
      let _layer2 = [];
      let _nft = [];
      let _dex = [];
      let _chadmin = [];
      let _cex = [];
      let _operator = [];
      await res.map((data) => {
        if (data.LABEL_TYPE === "dapp") _dapp = [..._dapp, data];
        else if (data.LABEL_TYPE === "token") _token = [..._token, data];
        else if (data.LABEL_TYPE === "defi") _defi = [..._defi, data];
        else if (data.LABEL_TYPE === "layer2") _layer2 = [..._layer2, data];
        else if (data.LABEL_TYPE === "nft") _nft = [..._nft, data];
        else if (data.LABEL_TYPE === "dex") _dex = [..._dex, data];
        else if (data.LABEL_TYPE === "chadmin") _chadmin = [..._chadmin, data];
        else if (data.LABEL_TYPE === "cex") _cex = [..._cex, data];
        else if (data.LABEL_TYPE === "operator")
          _operator = [..._operator, data];
      });

      setDataMostUsedProtocolActionsWeekly({
        labels: _dex.map((data) => data.WEEK),
        datasets: [
          {
            label: "dapp",
            data: _dapp.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[100],
            stack: "base",
          },
          {
            label: "token",
            data: _token.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[200],
            stack: "base",
          },
          {
            label: "defi",
            data: _defi.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[300],
            stack: "base",
          },
          {
            label: "layer2",
            data: _layer2.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[400],
            stack: "base",
          },
          {
            label: "nft",
            data: _nft.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[500],
            stack: "base",
          },
          {
            label: "dex",
            data: _dex.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[600],
            stack: "base",
          },
          {
            label: "chadmin",
            data: _chadmin.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[700],
            stack: "base",
          },
          {
            label: "cex",
            data: _cex.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[800],
            stack: "base",
          },
          {
            label: "operator",
            data: _operator.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[900],
            stack: "base",
          },
        ],
      });

      setStatusMostUsedProtocolActionsWeekly("loaded");
    } catch (error) {
      setStatusMostUsedProtocolActionsWeekly("error");
    }
  };

  // Most Used Projects
  const getMostUsedProjects = async () => {
    setStatusMostUsedProjects("loading");
    try {
      const res = await http.get(apis.getMostUsedProjects);
      let temp = [];
      res.map((data, index) => {
        temp = [
          ...temp,
          {
            id: data.PROJECT_NAME,
            label: data.PROJECT_NAME,
            value: data.COUNT,
            color: colors.chartPalette[(index + 1) * 100],
          },
        ];
      });
      setDataMostUsedProjects(temp);
      setStatusMostUsedProjects("loaded");
    } catch (error) {
      setStatusMostUsedProjects("error");
    }
  };

  const getMostUsedProjectsWeekly = async () => {
    let res = [];
    setStatusMostUsedProjectsWeekly("loading");
    try {
      res = await http.get(apis.getMostUsedProjectsWeekly);
      let _hop_protocol = [];
      let _uniswap = [];
      let _project_galaxy = [];
      let _velodrome_finance = [];
      let _synthetix = [];
      let _pika_protocol = [];
      let _optimism = [];
      let _rubicon = [];
      let _granary_finance = [];

      await res.map((data) => {
        if (data.PROJECT_NAME === "hop protocol")
          _hop_protocol = [..._hop_protocol, data];
        else if (data.PROJECT_NAME === "uniswap")
          _uniswap = [..._uniswap, data];
        else if (data.PROJECT_NAME === "project galaxy")
          _project_galaxy = [..._project_galaxy, data];
        else if (data.PROJECT_NAME === "velodrome finance")
          _velodrome_finance = [..._velodrome_finance, data];
        else if (data.PROJECT_NAME === "synthetix")
          _synthetix = [..._synthetix, data];
        else if (data.PROJECT_NAME === "pika protocol")
          _pika_protocol = [..._pika_protocol, data];
        else if (data.PROJECT_NAME === "optimism")
          _optimism = [..._optimism, data];
        else if (data.PROJECT_NAME === "rubicon")
          _rubicon = [..._rubicon, data];
        else if (data.PROJECT_NAME === "granary finance")
          _granary_finance = [..._granary_finance, data];
      });

      setDataMostUsedProjectsWeekly({
        labels: _hop_protocol.map((data) => data.WEEK),
        datasets: [
          {
            label: "hop protocol",
            data: _hop_protocol.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[100],
            stack: "base",
          },
          {
            label: "uniswap",
            data: _uniswap.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[200],
            stack: "base",
          },
          {
            label: "project galaxy",
            data: _project_galaxy.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[300],
            stack: "base",
          },
          {
            label: "velodrome finance",
            data: _velodrome_finance.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[400],
            stack: "base",
          },
          {
            label: "synthetix",
            data: _synthetix.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[500],
            stack: "base",
          },
          {
            label: "dex",
            data: _pika_protocol.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[600],
            stack: "base",
          },
          {
            label: "optimism",
            data: _optimism.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[700],
            stack: "base",
          },
          {
            label: "rubicon",
            data: _rubicon.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[800],
            stack: "base",
          },
          {
            label: "granary finance",
            data: _granary_finance.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[900],
            stack: "base",
          },
        ],
      });

      setStatusMostUsedProjectsWeekly("loaded");
    } catch (error) {
      setStatusMostUsedProjectsWeekly("error");
    }
  };

  // Blocks

  const getBlocksQuickData = async () => {
    setStatusBlockQuickData("loading");
    try {
      const blockTime = await http.get(apis.getBlocksAvgBlockTime);
      const res = await http.get(apis.getBlocksQuickData);
      setDataBlockQuickData({
        ...res[0],
        avgBlockTime: blockTime[0].AVERAGE_BLOCK_TIME,
      });
      setStatusBlockQuickData("loaded");
    } catch (error) {
      setStatusBlockQuickData("error");
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
              Chart={FunctionDistribution}
              url={apis.queryFunctionDistribution}
              status={statusFunctionDistribution}
              getData={getFunctionDistribution}
              data={dataFunctionDistribution}
              id={"FunctionDistribution"}
            />
            <MyChart
              title="Most used functions weekly"
              Chart={MoastUsedFunctionWeekly}
              url={apis.queryMostUsedContracts}
              status={statusMostUsedFunctionWeekly}
              getData={getMostUsedFunctionWeekly}
              data={dataMostUsedFunctionWeekly}
              id={"MoastUsedFunctionWeekly"}
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
            title="Most used actions"
            subtitle="the functions or activities that are most frequently called or executed on the Optimism network."
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
              title="Most used protocol actions"
              Chart={MostUsedProtocolAction}
              url={apis.queryMostUsedProtocolActions}
              status={statusMostUsedProtocolActions}
              getData={getMostUsedProtocolActions}
              data={dataMostUsedProtocolActions}
              id={"getMostUsedProtocolActions"}
            />
            <MyChart
              title="Most used protocol actions weekly"
              Chart={MostUsedProtocolActionsWeekly}
              url={apis.queryMostUsedProtocolActionsWeekly}
              status={statusMostUsedProtocolActionsWeekly}
              getData={getMostUsedProtocolActionsWeekly}
              data={dataMostUsedProtocolActionsWeekly}
              id={"MostUsedProtocolActionsWeekly"}
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
            title="Most used projects"
            subtitle="the smart contracts or decentralized applications (dApps)
             that are most frequently accessed and utilized by users."
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
              title="Most used projects"
              Chart={MostUsedProjects}
              url={apis.queryMostUsedProjects}
              status={statusFunctionDistribution}
              getData={getMostUsedProjects}
              data={dataMostUsedProjects}
              id={"MostUsedProjects"}
            />
            <MyChart
              title="Most used projects weekly"
              Chart={MostUsedProjectsWeekly}
              url={apis.queryMostUsedProjectsWeekly}
              status={statusMostUsedFunctionWeekly}
              getData={getMostUsedProjectsWeekly}
              data={dataMostUsedProjectsWeekly}
              id={"MostUsedProjectsWeekly"}
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
            source={apis.getBlocksQuickData}
            info={
              dataBlockQuickData
                ? dataBlockQuickData.BLOCKS_COUNT.toLocaleString("en-US")
                : null
            }
            status={statusBlockQuickData}
            getData={getBlocksQuickData}
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Average # of transactions per block"
            source={apis.getBlocksQuickData}
            info={
              dataBlockQuickData
                ? dataBlockQuickData.AVERAGE_TX_COUNT.toLocaleString("en-US")
                : null
            }
            status={statusBlockQuickData}
            getData={getBlocksQuickData}
          />
        </Grid>

        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Average block time"
            source={apis.getBlocksQuickData}
            info={
              dataBlockQuickData
                ? dataBlockQuickData.avgBlockTime.toLocaleString("en-US")
                : null
            }
            status={statusBlockQuickData}
            getData={getBlocksQuickData}
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Last created block"
            source={apis.getBlocksQuickData}
            info={
              dataBlockQuickData ? dataBlockQuickData.LAST_BLOCK_NUMBER : null
            }
            status={statusBlockQuickData}
            getData={getBlocksQuickData}
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Average block difficulty"
            source={apis.getBlocksQuickData}
            info={
              dataBlockQuickData
                ? dataBlockQuickData.AVERAGE_DIFFICULTY.toLocaleString("en-US")
                : null
            }
            status={statusBlockQuickData}
            getData={getBlocksQuickData}
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Average block size"
            source={apis.getBlocksQuickData}
            info={
              dataBlockQuickData
                ? dataBlockQuickData.AVERAGE_SIZE.toLocaleString("en-US")
                : null
            }
            status={statusBlockQuickData}
            getData={getBlocksQuickData}
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
