import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import apis from "../../services/apis";
import MyChart from "../../components/MyChart";
import NewContractsDeployedEachWeek from "./newContractsDeployedEachWeek";
import { useEffect, useState } from "react";
import http from "../../services/http";
import NumberOfCommitsPerWeek from "./numberOfCommitsPerWeek";
import TotalContractsDeployedEachWeek from "./totalContractsDeployedEachWeek";
import ActiveContractsWeekly from "./activeContractsWeekly";
import MostUsedContracts from "./mostUsedContracts";
import CodeFrequency from "./CodeFrequency";

const Development = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dataMostUsedContracts, setDataMostUsedContracts] = useState([]);
  const [statusMostUsedContracts, setStatusMostUsedContracts] =
    useState("loadig");
  const [statusActiveContractsWeekly, setStatusActiveContractsWeekly] =
    useState("loading");
  const [dataActiveContractsWeekly, setDataActiveContractsWeekly] = useState({
    labels: [],
    datasets: [
      {
        label: "Active Contract",
        data: [],
        backgroundColor: [colors.chartPalette[100]],
        borderColor: colors.chartPalette[100],
        borderWidth: 1,
      },
    ],
  });
  const [loading, setLoading] = useState("loaded");
  const [
    statusTotalContractsDeployedEachWeek,
    setStatusTotalContractsDeployedEachWeek,
  ] = useState("loading");
  const [
    dataTotalContractsDeployedEachWeek,
    setDataTotalContractsDeployedEachWeek,
  ] = useState({
    labels: [],
    datasets: [
      {
        label: "Deployed contract",
        data: [],
        backgroundColor: [colors.chartPalette[100]],
        borderColor: colors.chartPalette[100],
        borderWidth: 1,
      },
    ],
  });
  const [
    dataNewContractsDeployedEachWeek,
    setDataNewContractsDeployedEachWeek,
  ] = useState({
    labels: [],
    datasets: [
      {
        label: "NEW CONTRACTS",
        data: [],
        backgroundColor: [colors.chartPalette[100]],
        borderColor: colors.chartPalette[100],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    getNewContractsDeployedEachWeek();
    getTotalContractsDeployedEachWeek();
    getActiveContractsWeekly();
    getMostUsedContracts();
  }, []);

  const getActiveContractsWeekly = async () => {
    let res = [];
    setStatusActiveContractsWeekly("loading");
    try {
      res = await http.get(apis.getActiveContractsWeekly);
      setDataActiveContractsWeekly({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Active Contract",
            data: res.map((data) => data.CONTRACTS),
            backgroundColor: [colors.chartPalette[100]],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
          },
        ],
      });
      setStatusActiveContractsWeekly("loaded");
    } catch (error) {
      setStatusActiveContractsWeekly("error");
    }
  };

  const getNewContractsDeployedEachWeek = async () => {
    let res = [];
    setLoading("loading");
    try {
      res = await http.get(apis.getNewContractsDeployedEachWeek);
      setDataNewContractsDeployedEachWeek({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "NEW CONTRACTS",
            data: res.map((data) => data.NEW_CONTRACTS),
            backgroundColor: [colors.chartPalette[100]],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
          },
        ],
      });
      setLoading("loaded");
    } catch (error) {
      setLoading("error");
    }
  };

  const getTotalContractsDeployedEachWeek = async () => {
    let res = [];
    setStatusTotalContractsDeployedEachWeek("loading");
    try {
      res = await http.get(apis.getTotalContractsDeployedEachWeek);
      setDataTotalContractsDeployedEachWeek({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Deployed contract",
            data: res.map((data) => data.TOTAL_CONTRACTS),
            backgroundColor: [colors.chartPalette[100]],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
          },
        ],
      });
      setStatusTotalContractsDeployedEachWeek("loaded");
    } catch (error) {
      setStatusTotalContractsDeployedEachWeek("error");
    }
  };

  const getMostUsedContracts = async () => {
    let res = [];
    setStatusMostUsedContracts("loading");
    try {
      res = await http.get(apis.getMoatUsedContracts);

      let temp = [];
      res.map((data, index) => {
        temp = [
          ...temp,
          {
            id: data.CONTRACT,
            label: data.CONTRACT,
            value: data.TRANSACTIONS,
            color: colors.chartPalette[(index + 1) * 100],
          },
        ];
      });
      setDataMostUsedContracts(temp);
      setStatusMostUsedContracts("loaded");
    } catch (error) {
      console.log(error.message);
      setStatusMostUsedContracts("error");
    }
  };
  return (
    <Box sx={{ padding: "20px" }}>
      <Header
        title="Developments"
        subtitle="The Development page includes data about contracts and development activity within the Terra community.
         It can give an indication of the community's progress and adoption of smart contracts on the network.
        "
      />

      <Grid container gap={2}>
        <Header
          title="Contracts"
          subtitle="This section includes data about the contracts on the Terra network. 
          It can give an indication of the activity and popularity of smart contracts on the network."
        />
        <MyChart
          title="# of new contracts weekly"
          Chart={NewContractsDeployedEachWeek}
          url={apis.queryNewContractsDeployedEachWeek}
          status={loading}
          data={dataNewContractsDeployedEachWeek}
          getData={getNewContractsDeployedEachWeek}
          id={"NewContractsDeployedEachWeek"}
        />

        <MyChart
          title="# of total contracts weekly"
          Chart={TotalContractsDeployedEachWeek}
          url={apis.queryTotalContractsDeployedEachWeek}
          status={statusTotalContractsDeployedEachWeek}
          data={dataTotalContractsDeployedEachWeek}
          getData={getTotalContractsDeployedEachWeek}
          id={"TotalContractsDeployedEachWeek"}
        />

        <MyChart
          title="# of active contracts weekly"
          Chart={ActiveContractsWeekly}
          url={apis.queryActiveContractsWeekly}
          status={statusActiveContractsWeekly}
          data={dataActiveContractsWeekly}
          getData={getActiveContractsWeekly}
          id={"ActiveContractsWeekly"}
        />

        <MyChart
          title="Most used contracts"
          Chart={MostUsedContracts}
          url={apis.queryMostUsedContracts}
          status={statusMostUsedContracts}
          data={dataMostUsedContracts}
          getData={getMostUsedContracts}
        />
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
            title="Github development"
            subtitle=" This section includes data about the development activity on the Terra Github repository."
          />
        </Grid>

        <MyChart
          title="# of commits Weekly"
          Chart={NumberOfCommitsPerWeek}
          url={
            "https://github.com/terra-money/core/graphs/commit-activity-data"
          }
          id={"NumberOfCommitsPerWeek"}
        />

        <MyChart
          title="code frequency"
          Chart={CodeFrequency}
          url={"https://github.com/terra-money/core/graphs/code-frequency"}
          id={"CodeFrequency"}
        />
      </Grid>
    </Box>
  );
};

export default Development;
