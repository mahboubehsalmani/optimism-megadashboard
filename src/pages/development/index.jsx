import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import apis from "../../services/apis";
import MyChart from "../../components/MyChart";
import NewContractsDeployedEachWeek from "./newContractsDeployedEachWeek";
import { useEffect, useState } from "react";
import http from "../../services/http";
import NumberOfCommitsPerWeek from "./numberOfCommitsPerWeek";
import MostUsedContracts from "./mostUsedContracts";
import CodeFrequency from "./CodeFrequency";

const Development = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dataMostUsedContracts, setDataMostUsedContracts] = useState([]);
  const [statusMostUsedContracts, setStatusMostUsedContracts] =
    useState("loadig");
  const [loading, setLoading] = useState("loaded");

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
    getMostUsedContracts();
  }, []);

  const getNewContractsDeployedEachWeek = async () => {
    let res = [];
    setLoading("loading");
    try {
      res = await http.get(apis.getNewContractsDeployedEachWeek);
      setDataNewContractsDeployedEachWeek({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "New",
            data: res.map((data) => data.NEW_CONTRACTS),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
            type: "line",
          },
          {
            label: "Active",
            yAxisID: "activeAxis",
            data: res.map((data) => data.ACTIVE_CONTRACTS),
            backgroundColor: colors.chartPalette[200],
            borderColor: colors.chartPalette[200],
            borderWidth: 1,
            type: "line",
          },
        ],
      });
      setLoading("loaded");
    } catch (error) {
      setLoading("error");
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
            id: data.NAME,
            label: data.NAME,
            value: data.COUNT,
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
            subtitle=" This section includes data about the development activity on the Otimism Github repository."
          />
        </Grid>

        <MyChart
          title="# of commits Weekly"
          Chart={NumberOfCommitsPerWeek}
          url={"https://github.com/ethereum-optimism"}
          id={"NumberOfCommitsPerWeek"}
        />

        <MyChart
          title="code frequency"
          Chart={CodeFrequency}
          url={"https://github.com/ethereum-optimism"}
          id={"CodeFrequency"}
        />
      </Grid>
    </Box>
  );
};

export default Development;
