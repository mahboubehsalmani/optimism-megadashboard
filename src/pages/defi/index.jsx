import { Box, Grid, useTheme } from "@mui/material";
import MyChart from "../../components/MyChart";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import http from "../../services/http";
import apis from "../../services/apis";
import InfoCard from "../../components/InfoCard";
import Header from "../../components/Header";
import SwapsWeekly from "./swapsWeekly";
import PoolsWeekly from "./poolsWeekly";
import MostUsedSwapPools from "./mostUsedSwapPools";
import MostUsedSwapPoolsWeekly from "./mostUsedSwapPoolsWeekly";

const DeFi = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [quickData, setQuickData] = useState(null);
  const [statusQuickData, setStatusQuickData] = useState("loading");
  const [statusDeFiSwapsWeekly, setStatusDeFiSwapsWeekly] = useState("loading");
  const [statusWeeklyPools, setStatusWeeklyPools] = useState("loading");
  const [statusDEXDistribution, setStatusDEXDistribution] = useState("lodaing");
  const [sStatusDEXWeekly, setStatusDEXWeekly] = useState("loading");
  const [DEXWeeklySwaps, setDEXWeeklySwaps] = useState([]);
  const [DEXWeeklySwappers, setDEXWeeklySwappers] = useState([]);
  const [DEXWeeklyPools, setDEXWeeklyPools] = useState([]);
  const [dataDEXDistributionSwaps, setDataDEXDistributionSwaps] = useState([]);
  const [dataDEXDistributionSwappers, setDataDEXDistributionSwappers] =
    useState([]);
  const [dataDEXDistributionPools, setDataDEXDistributionPools] = useState([]);
  const [dataWeeklyPools, setDataWeeklyPools] = useState({
    labels: [],
    datasets: [
      {
        label: "OP/USDC",
        data: [],
        backgroundColor: colors.chartPalette[100],
        stack: "base",
      },
      {
        label: "VELO/OP",
        data: [],
        backgroundColor: colors.chartPalette[200],
        stack: "base",
      },
      {
        label: "WETH/OP",
        data: [],
        backgroundColor: colors.chartPalette[300],
        stack: "base",
      },
      {
        label: "WETH/USDC",
        data: [],
        backgroundColor: colors.chartPalette[400],
        stack: "base",
      },
      {
        label: "VELO/USDC",
        data: [],
        backgroundColor: colors.chartPalette[500],
        stack: "base",
      },
      {
        label: "USDC/DAI",
        data: [],
        backgroundColor: colors.chartPalette[600],
        stack: "base",
      },
      {
        label: "other",
        data: [],
        backgroundColor: colors.chartPalette[700],
        stack: "base",
      },
    ],
  });

  const [dataMostUsedSwapPools, setDataMostUsedSwapPools] = useState([]);
  const [statusMostUsedSwapPools, setStatusMostUsedSwapPools] =
    useState("loading");
  const [dataDeFiSwapsWeekly, setDataDeFiSwapsWeekly] = useState({
    labels: [],
    datasets: [
      {
        label: "Swaps",
        data: [],
        backgroundColor: colors.chartPalette[100],
        type: "line",
      },
      {
        label: "Swappers",
        data: [],
        backgroundColor: colors.chartPalette[200],
        type: "line",
      },
    ],
  });

  const [dataPoolsSwapsWeekly, setDataPoolsSwapsWeekly] = useState({
    labels: [],
    datasets: [
      {
        label: "Swaps",
        data: [],
        backgroundColor: colors.chartPalette[100],
        type: "line",
      },
    ],
  });

  const [StatusWeeklyStaking, setStatusWeeklyStaking] = useState("loading");

  const [dataWeeklyStakingCount, setDataWeeklyStakingCount] = useState({
    labels: [],
    datasets: [
      {
        label: "Redelegate",
        data: [],
        backgroundColor: colors.chartPalette[100],
        stack: "base",
      },
      {
        label: "Undelegate",
        data: [],
        backgroundColor: colors.chartPalette[200],
        stack: "base",
      },
      {
        label: "Delegate",
        data: [],
        backgroundColor: colors.chartPalette[300],
        stack: "base",
      },
    ],
  });

  const [
    dataWeeklyStakingRewardsDistributed,
    setDataWeeklyStakingRewardsDistributed,
  ] = useState({
    labels: [],
    datasets: [
      {
        label: "Volume(LUNA)",
        data: [],
        backgroundColor: colors.chartPalette[200],
        borderColor: colors.chartPalette[200],
        type: "line",
      },

      {
        label: "USD",
        data: [],
        backgroundColor: colors.chartPalette[100],
        borderColor: colors.chartPalette[100],
        type: "line",
      },
      {
        label: "Count",
        yAxisID: "countAxis",
        data: [],
        backgroundColor: "#7f7f7fBF",
      },
    ],
  });

  useEffect(() => {
    getQuickData();
    getDeFiSwapsWeekly();
    getMostUsedSwapPools();
    getWeeklyPools();
    getDEXDistribution();
    getDEXWeeklyData();
  }, []);

  const getQuickData = async () => {
    setStatusQuickData("loading");
    try {
      const res = await http.get(apis.getDeFiQuickData);
      setQuickData(res[0]);
      setStatusQuickData("loaded");
    } catch (error) {
      setStatusQuickData("error");
    }
  };

  const getDeFiSwapsWeekly = async () => {
    setStatusDeFiSwapsWeekly("loading");
    try {
      const res = await http.get(apis.getDeFiTotalSwapsWeekly);

      setDataDeFiSwapsWeekly({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Swappers",
            data: res.map((data) => data.USERS),
            backgroundColor: colors.chartPalette[200],
            borderColor: colors.chartPalette[200],
            borderWidth: 1,
            type: "line",
          },
          {
            label: "Swaps",
            yAxisID: "swapsAxis",
            data: res.map((data) => data.SWAPS),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
            type: "bar",
          },
        ],
      });

      setDataPoolsSwapsWeekly({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Pools",
            data: res.map((data) => data.POOLS),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
            type: "bar",
          },
        ],
      });

      setStatusDeFiSwapsWeekly("loaded");
    } catch (error) {
      setStatusDeFiSwapsWeekly("error");
    }
  };

  const getMostUsedSwapPools = async () => {
    setStatusMostUsedSwapPools("loading");
    try {
      const res = await http.get(apis.getDeFiMostUsedSwapPools);
      let temp = [];
      res.map((data, index) => {
        temp = [
          ...temp,
          {
            id: data.POOL_NAME,
            label: data.POOL_NAME,
            value: data.COUNT.toFixed(2),
            color: colors.chartPalette[(index + 1) * 100],
          },
        ];
      });
      setDataMostUsedSwapPools(temp);
      setStatusMostUsedSwapPools("loaded");
    } catch (error) {
      setStatusMostUsedSwapPools("error");
    }
  };

  const getWeeklyPools = async () => {
    let res = [];
    setStatusWeeklyPools("loading");
    try {
      res = await http.get(apis.getDeFiMostUsedSwapPoolsWeekly);
      let _OP_USDC = [];
      let _VELO_OP = [];
      let _WETH_OP = [];
      let _WETH_USDC = [];
      let _VELO_USDC = [];
      let _USDC_DAI = [];
      let _other = [];

      await res.map((data) => {
        if (data.POOL_NAME === "OP/USDC") _OP_USDC = [..._OP_USDC, data];
        else if (data.POOL_NAME === "VELO/OP") _VELO_OP = [..._VELO_OP, data];
        else if (data.POOL_NAME === "WETH/OP") _WETH_OP = [..._WETH_OP, data];
        else if (data.POOL_NAME === "WETH/USDC")
          _WETH_USDC = [..._WETH_USDC, data];
        else if (data.POOL_NAME === "VELO/USDC")
          _VELO_USDC = [..._VELO_USDC, data];
        else if (data.POOL_NAME === "USDC/DAI")
          _USDC_DAI = [..._USDC_DAI, data];
        else _other = [..._other, data];
      });
      setDataWeeklyPools({
        labels: _OP_USDC.map((data) => data.WEEK),
        datasets: [
          {
            label: "OP/USDC",
            data: _OP_USDC.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[100],
            stack: "base",
          },
          {
            label: "VELO/OP",
            data: _VELO_OP.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[200],
            stack: "base",
          },
          {
            label: "WETH/OP",
            data: _WETH_OP.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[300],
            stack: "base",
          },
          {
            label: "WETH/USDC",
            data: _WETH_USDC.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[400],
            stack: "base",
          },
          {
            label: "VELO/USDC",
            data: _VELO_USDC.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[500],
            stack: "base",
          },
          {
            label: "USDC/DAI",
            data: _USDC_DAI.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[600],
            stack: "base",
          },
          {
            label: "other",
            data: _other.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[700],
            stack: "base",
          },
        ],
      });
      setStatusWeeklyPools("loaded");
    } catch (error) {
      setStatusWeeklyPools("error");
    }
  };

  const getDEXDistribution = async () => {
    setStatusDEXDistribution("loading");
    try {
      const res = await http.get(apis.getDEXDistribution);
      let tx = [];
      let users = [];
      let pools = [];
      await res.map((data, index) => {
        tx = [
          ...tx,
          {
            id: data.DEX,
            label: data.DEX,
            value: data.SWAPS,
            color: colors.chartPalette[(index + 1) * 100],
          },
        ];
        users = [
          ...users,
          {
            id: data.DEX,
            label: data.DEX,
            value: data.USERS,
            color: colors.chartPalette[(index + 1) * 100],
          },
        ];
        pools = [
          ...pools,
          {
            id: data.DEX,
            label: data.DEX,
            value: data.POOLS,
            color: colors.chartPalette[(index + 1) * 100],
          },
        ];
      });
      setDataDEXDistributionSwaps(tx);
      setDataDEXDistributionSwappers(users);
      setDataDEXDistributionPools(pools);
      setStatusDEXDistribution("loaded");
    } catch (error) {
      setStatusDEXDistribution("error");
    }
  };

  const getDEXWeeklyData = async () => {
    let res = [];
    setStatusDEXWeekly("loading");
    try {
      res = await http.get(apis.getDEXWeekly);
      let _Uniswap = [];
      let _Zerox = [];
      let _Sushiswap = [];
      let _Balancer = [];
      let _Veldorome = [];
      let _other = [];
      await res.map((data) => {
        if (data.DEX === "Uniswap") _Uniswap = [..._Uniswap, data];
        else if (data.DEX === "Zerox") _Zerox = [..._Zerox, data];
        else if (data.DEX === "Sushiswap") _Sushiswap = [..._Sushiswap, data];
        else if (data.DEX === "Balancer") _Balancer = [..._Balancer, data];
        else if (data.DEX === "Veldorome") _Veldorome = [..._Veldorome, data];
        else _other = [..._other, data];
      });
      setDEXWeeklySwaps({
        labels: _Uniswap.map((data) => data.WEEK),
        datasets: [
          {
            label: "Uniswap",
            data: _Uniswap.map((data) => data.SWAPS),
            backgroundColor: colors.chartPalette[100],
            stack: "base",
          },
          {
            label: "Zerox",
            data: _Zerox.map((data) => data.SWAPS),
            backgroundColor: colors.chartPalette[200],
            stack: "base",
          },
          {
            label: "Sushiswap",
            data: _Sushiswap.map((data) => data.SWAPS),
            backgroundColor: colors.chartPalette[300],
            stack: "base",
          },
          {
            label: "Balancer",
            data: _Balancer.map((data) => data.SWAPS),
            backgroundColor: colors.chartPalette[400],
            stack: "base",
          },
          {
            label: "Veldorome",
            data: _Veldorome.map((data) => data.SWAPS),
            backgroundColor: colors.chartPalette[500],
            stack: "base",
          },
          {
            label: "other",
            data: _other.map((data) => data.SWAPS),
            backgroundColor: colors.chartPalette[700],
            stack: "base",
          },
        ],
      });

      setDEXWeeklySwappers({
        labels: _Uniswap.map((data) => data.WEEK),
        datasets: [
          {
            label: "Uniswap",
            data: _Uniswap.map((data) => data.USERS),
            backgroundColor: colors.chartPalette[100],
            stack: "base",
          },
          {
            label: "Zerox",
            data: _Zerox.map((data) => data.USERS),
            backgroundColor: colors.chartPalette[200],
            stack: "base",
          },
          {
            label: "Sushiswap",
            data: _Sushiswap.map((data) => data.USERS),
            backgroundColor: colors.chartPalette[300],
            stack: "base",
          },
          {
            label: "Balancer",
            data: _Balancer.map((data) => data.USERS),
            backgroundColor: colors.chartPalette[400],
            stack: "base",
          },
          {
            label: "Veldorome",
            data: _Veldorome.map((data) => data.USERS),
            backgroundColor: colors.chartPalette[500],
            stack: "base",
          },
          {
            label: "other",
            data: _other.map((data) => data.USERS),
            backgroundColor: colors.chartPalette[700],
            stack: "base",
          },
        ],
      });

      setDEXWeeklyPools({
        labels: _Uniswap.map((data) => data.WEEK),
        datasets: [
          {
            label: "Uniswap",
            data: _Uniswap.map((data) => data.POOLS),
            backgroundColor: colors.chartPalette[100],
            stack: "base",
          },
          {
            label: "Zerox",
            data: _Zerox.map((data) => data.POOLS),
            backgroundColor: colors.chartPalette[200],
            stack: "base",
          },
          {
            label: "Sushiswap",
            data: _Sushiswap.map((data) => data.POOLS),
            backgroundColor: colors.chartPalette[300],
            stack: "base",
          },
          {
            label: "Balancer",
            data: _Balancer.map((data) => data.POOLS),
            backgroundColor: colors.chartPalette[400],
            stack: "base",
          },
          {
            label: "Veldorome",
            data: _Veldorome.map((data) => data.POOLS),
            backgroundColor: colors.chartPalette[500],
            stack: "base",
          },
          {
            label: "other",
            data: _other.map((data) => data.POOLS),
            backgroundColor: colors.chartPalette[700],
            stack: "base",
          },
        ],
      });
      setStatusDEXWeekly("loaded");
    } catch (error) {
      setStatusDEXWeekly("error");
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
      }}
    >
      <Grid container gap={2}>
        <Grid item xs={12}>
          <Header
            title="DeFi"
            subtitle="The Staking page includes data about the Terra network's proof-of-stake (PoS) consensus algorithm.
             It can give an indication of the activity and performance of the PoS system."
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="# of swap transactions"
            source={apis.getDeFiQuickData}
            info={quickData ? quickData.SWAPS.toLocaleString("en-US") : null}
            status={statusQuickData}
            getData={getQuickData}
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="# of swappers"
            source={apis.getDeFiQuickData}
            info={quickData ? quickData.USERS.toLocaleString("en-US") : null}
            status={statusQuickData}
            getData={getQuickData}
          />
        </Grid>

        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="# of active pools"
            source={apis.getDeFiQuickData}
            info={quickData ? quickData.POOLS.toLocaleString("en-US") : null}
            status={statusQuickData}
            getData={getQuickData}
          />
        </Grid>

        <MyChart
          title="# of swaps,swappers in optimism weekly"
          Chart={SwapsWeekly}
          data={dataDeFiSwapsWeekly}
          getData={getDeFiSwapsWeekly}
          status={statusDeFiSwapsWeekly}
        />

        <MyChart
          title="# of active pools in optimism weekly"
          Chart={PoolsWeekly}
          data={dataPoolsSwapsWeekly}
          getData={getDeFiSwapsWeekly}
          status={statusDeFiSwapsWeekly}
        />

        <MyChart
          title="most used swap pools"
          Chart={MostUsedSwapPools}
          data={dataMostUsedSwapPools}
          getData={getMostUsedSwapPools}
          status={statusMostUsedSwapPools}
        />

        <MyChart
          title="most used swap pools weekly"
          Chart={MostUsedSwapPoolsWeekly}
          data={dataWeeklyPools}
          getData={getWeeklyPools}
          status={statusWeeklyPools}
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
            title="Dex analysis"
            subtitle="Evaluating DEXs on the Optimism blockchain by comparing swap count, swapper count,
             and number of active pools."
          />
        </Grid>

        <MyChart
          title="# of swap transactions by dex"
          Chart={MostUsedSwapPools}
          data={dataDEXDistributionSwaps}
          getData={getDEXDistribution}
          status={statusDEXDistribution}
        />

        <MyChart
          title="# of swap transactions by dex weekly"
          Chart={PoolsWeekly}
          data={DEXWeeklySwaps}
          getData={getDEXWeeklyData}
          status={sStatusDEXWeekly}
        />

        <MyChart
          title="# of swappers by dex"
          Chart={MostUsedSwapPools}
          data={dataDEXDistributionSwappers}
          getData={getDEXDistribution}
          status={statusDEXDistribution}
        />

        <MyChart
          title="# of swappers by dex weekly"
          Chart={PoolsWeekly}
          data={DEXWeeklySwappers}
          getData={getDEXWeeklyData}
          status={sStatusDEXWeekly}
        />

        <MyChart
          title="# of active pools by dex"
          Chart={MostUsedSwapPools}
          data={dataDEXDistributionPools}
          getData={getDEXDistribution}
          status={statusDEXDistribution}
        />

        <MyChart
          title="# of active pools by dex weekly"
          Chart={PoolsWeekly}
          data={DEXWeeklyPools}
          getData={getDEXWeeklyData}
          status={sStatusDEXWeekly}
        />
      </Grid>
    </Box>
  );
};

export default DeFi;
