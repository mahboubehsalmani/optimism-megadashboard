import { Box, Grid, useTheme } from "@mui/material";
import WeeklyStaking from "./weeklyStaking";
import MyChart from "../../components/MyChart";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import http from "../../services/http";
import apis from "../../services/apis";
import WeeklyStakingRewardsDistributed from "./weeklyStakingRewardsDistributed";
import InfoCard from "../../components/InfoCard";
import Header from "../../components/Header";
import StakingActionDistributionCount from "./stakingActionDistributionCount";
import StakingActionDistributionVolume from "./StakingActionDistributionVolume";
import WeeklyStakingCount from "./weeklyStakingCount";

const Staking = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [quickReward, setQuickReward] = useState(null);
  const [statusQuickReward, setStatusQuickReward] = useState("loading");
  const [
    dataStakingActionDistributionVolume,
    setDataStakingActionDistributionVolume,
  ] = useState([]);
  const [
    dataStakingActionDistributionCount,
    setDataStakingActionDistributionCount,
  ] = useState([]);
  const [statusStakingActionDistribution, setStatusStakingActionDistribution] =
    useState("loading");
  const [StatusWeeklyStaking, setStatusWeeklyStaking] = useState("loading");
  const [statusTotalSupply, setStatusTotalSupply] = useState("loading");
  const [statusTotalLunaStaked, setStatusTotalLunaStaked] = useState("loading");
  const [dataTotalLunaStaked, setDataTotalLunaStaked] = useState(null);
  const [dataTotalSupply, setDataTotalSupply] = useState(null);
  const [dataCirculatingSupply, setDataCirculatingSupply] = useState(null);
  const [dataTotalPercentStakedLUNA, setDataTotalPercentStakedLUNA] =
    useState(null);
  const [statusTotalAndCirculatingSupply, setStatusTotalAndCirculatingSupply] =
    useState("loading");
  const [dataTotalNumberOfStakedLUNA, setDataTotalNumberOfStakedLUNA] =
    useState(null);
  const [
    statusTotalNumberAndPercentOfStakedLUNA,
    setStatusTotalNumberAndPercentOfStakedLUNA,
  ] = useState("loading");
  const [
    statusWeeklyStakingRewardsDistributed,
    setStatusWeeklyStakingRewardsDistributed,
  ] = useState("loading");
  const [dataWeeklyStaking, setDataWeeklyStaking] = useState({
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
    getWeeklyStaking();
    getWeeklyStakingRewardsDistributed();
    getTotalNumberOfStakedLUNA();
    getStakingActionDistribution();
    getQuickReward();
    getTotalSupply();
    getTotalLunaStaked();
  }, []);

  useEffect(() => {
    getTotalPercentofStakedLUNA();
  }, [dataTotalSupply, dataTotalNumberOfStakedLUNA]);

  const getQuickReward = async () => {
    setStatusQuickReward("loading");
    try {
      const res = await http.get(apis.getQuickReward);
      setQuickReward(res[0]);
      setStatusQuickReward("loaded");
    } catch (error) {
      setStatusQuickReward("error");
    }
  };
  const getStakingActionDistribution = async () => {
    setStatusStakingActionDistribution("loading");
    try {
      const res = await http.get(apis.getStakingActionDistribution);
      setDataStakingActionDistributionVolume([
        {
          id: res[0].ACTION,
          label: res[0].ACTION,
          value: res[0].VOLUME.toFixed(2),
          color: colors.chartPalette[100],
        },
        {
          id: res[1].ACTION,
          label: res[1].ACTION,
          value: res[1].VOLUME.toFixed(2),
          color: colors.chartPalette[200],
        },
        {
          id: res[2].ACTION,
          label: res[2].ACTION,
          value: res[2].VOLUME.toFixed(2),
          color: colors.chartPalette[300],
        },
      ]);

      setDataStakingActionDistributionCount([
        {
          id: res[0].ACTION,
          label: res[0].ACTION,
          value: res[0].COUNT.toFixed(2),
          color: colors.chartPalette[100],
        },
        {
          id: res[1].ACTION,
          label: res[1].ACTION,
          value: res[1].COUNT.toFixed(2),
          color: colors.chartPalette[200],
        },
        {
          id: res[2].ACTION,
          label: res[2].ACTION,
          value: res[2].COUNT.toFixed(2),
          color: colors.chartPalette[300],
        },
      ]);

      setStatusStakingActionDistribution("loaded");
    } catch (error) {
      setStatusStakingActionDistribution("error");
    }
  };

  const getWeeklyStaking = async () => {
    let res = [];
    setStatusWeeklyStaking("loading");
    try {
      res = await http.get(apis.getWeeklyStaking);
      let _delegate = [];
      let _undelegate = [];
      let _redelegate = [];
      await res.map((data) => {
        if (data.ACTION === "Redelegate") _redelegate = [..._redelegate, data];
        else if (data.ACTION === "Undelegate")
          _undelegate = [..._undelegate, data];
        else _delegate = [..._delegate, data];
      });
      setDataWeeklyStaking({
        labels: _redelegate.map((data) => data.WEEK),
        datasets: [
          {
            label: "Redelegate",
            data: _redelegate.map((data) => data.VOLUME),
            backgroundColor: colors.chartPalette[100],
            stack: "base",
          },
          {
            label: "Undelegate",
            data: _undelegate.map((data) => data.VOLUME),
            backgroundColor: colors.chartPalette[200],
            stack: "base",
          },
          {
            label: "Delegate",
            data: _delegate.map((data) => data.VOLUME),
            backgroundColor: colors.chartPalette[300],
            stack: "base",
          },
        ],
      });

      setDataWeeklyStakingCount({
        labels: _redelegate.map((data) => data.WEEK),
        datasets: [
          {
            label: "Redelegate",
            data: _redelegate.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[100],
            stack: "base",
          },
          {
            label: "Undelegate",
            data: _undelegate.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[200],
            stack: "base",
          },
          {
            label: "Delegate",
            data: _delegate.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[300],
            stack: "base",
          },
        ],
      });

      setStatusWeeklyStaking("loaded");
    } catch (error) {
      setStatusWeeklyStaking("error");
    }
  };

  const getWeeklyStakingRewardsDistributed = async () => {
    let res = [];
    setStatusWeeklyStakingRewardsDistributed("loading");
    try {
      res = await http.get(apis.getWeeklyStakingRewardsDistributed);
      let _delegate = [];
      let _undelegate = [];
      let _redelegate = [];
      await res.map((data) => {
        if (data.ACTION === "Redelegate") _redelegate = [..._redelegate, data];
        else if (data.ACTION === "Undelegate")
          _undelegate = [..._undelegate, data];
        else _delegate = [..._delegate, data];
      });
      setDataWeeklyStakingRewardsDistributed({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Volume(LUNA)",
            data: res.map((data) => data.VOLUME),
            backgroundColor: colors.chartPalette[200],
            borderColor: colors.chartPalette[200],
            type: "line",
          },

          {
            label: "USD",
            data: res.map((data) => data.USD_TOTAL),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            type: "line",
          },
          {
            label: "Count",
            yAxisID: "countAxis",
            data: res.map((data) => data.COUNT),
            backgroundColor: "#7f7f7fBF",
          },
        ],
      });
      setStatusWeeklyStakingRewardsDistributed("loaded");
    } catch (error) {
      setStatusWeeklyStakingRewardsDistributed("error");
    }
  };

  const getTotalNumberOfStakedLUNA = async () => {
    setStatusTotalNumberAndPercentOfStakedLUNA("loading");
    try {
      const res = await http.get(apis.getTotalNumberOfStakedLUNA);
      setDataTotalNumberOfStakedLUNA(res.result.bonded_tokens / 1e6);

      setStatusTotalNumberAndPercentOfStakedLUNA("loaded");
    } catch (error) {
      setStatusTotalNumberAndPercentOfStakedLUNA("error");
    }
  };

  const getTotalPercentofStakedLUNA = () => {
    if (dataTotalNumberOfStakedLUNA != null) {
      const temp = (dataTotalNumberOfStakedLUNA / dataTotalSupply) * 100;
      console.log(temp.toFixed(2));
      setDataTotalPercentStakedLUNA(temp.toFixed(2));
    }
  };

  const getTotalSupply = async () => {
    setStatusTotalSupply("loading");
    try {
      const res = await http.get(apis.getTotalAndCirculatingSupply);
      setDataTotalSupply(res.market_data.total_supply);
      setStatusTotalSupply("loaded");
    } catch (error) {
      console.log(error.message);
      setStatusTotalSupply("error");
    }
  };

  const getTotalLunaStaked = async () => {
    setStatusTotalLunaStaked("loading");
    try {
      const res = await http.get(apis.getTotalLunaStaked);
      setDataTotalLunaStaked(res.result.bonded_tokens / 1e6);
      setStatusTotalLunaStaked("loaded");
    } catch (error) {
      console.log(error.message);
      setStatusTotalLunaStaked("error");
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
            title="Staking"
            subtitle="The Staking page includes data about the Terra network's proof-of-stake (PoS) consensus algorithm.
         It can give an indication of the activity and performance of the PoS system.
        "
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Total Supply"
            source={apis.getTotalAndCirculatingSupply}
            info={
              dataTotalSupply ? dataTotalSupply.toLocaleString("en-US") : null
            }
            status={statusTotalSupply}
            getData={getTotalSupply}
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Total staked LUNA"
            source={apis.getTotalLunaStaked}
            info={
              dataTotalLunaStaked
                ? dataTotalLunaStaked.toLocaleString("en-US")
                : null
            }
            status={statusTotalLunaStaked}
            getData={getTotalLunaStaked}
          />
        </Grid>

        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Staking Ratio"
            source={apis.queryTotalAndCirculatingSupply}
            info={
              dataTotalLunaStaked && dataTotalSupply
                ? ((dataTotalLunaStaked * 100) / dataTotalSupply).toFixed(2) +
                  "%"
                : null
            }
            status={statusTotalSupply}
            getData={getTotalSupply}
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
            title="Staking actions"
            subtitle="This section includes data about staking actions on the Terra network.
             It can give an indication of the level of engagement and 
            participation in the network's proof-of-stake (PoS) consensus algorithm."
          />
        </Grid>

        <MyChart
          title="Weekly staking actions by count"
          Chart={WeeklyStakingCount}
          data={dataWeeklyStakingCount}
          getData={getWeeklyStaking}
          status={StatusWeeklyStaking}
        />

        <MyChart
          title="Staking actions distribution by count"
          Chart={StakingActionDistributionCount}
          data={dataStakingActionDistributionCount}
          getData={getStakingActionDistribution}
          status={statusStakingActionDistribution}
        />

        <MyChart
          title="Weekly staking actions by volume"
          Chart={WeeklyStaking}
          data={dataWeeklyStaking}
          getData={getWeeklyStaking}
          status={StatusWeeklyStaking}
        />

        <MyChart
          title="Staking actions distribution by volume"
          Chart={StakingActionDistributionVolume}
          data={dataStakingActionDistributionVolume}
          getData={getStakingActionDistribution}
          status={statusStakingActionDistribution}
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
            title="Rewards distribution"
            subtitle="This section includes data about the distribution of staking rewards on the Terra network.
             It can give an indication of the distribution of rewards among stakers and the overall health of the PoS system."
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Total rewards distributed"
            info={
              quickReward
                ? quickReward.TOTAL_REWARDS.toLocaleString("en-US")
                : null
            }
            status={statusQuickReward}
            getData={getQuickReward}
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="# of receivers"
            info={
              quickReward
                ? quickReward.RECEIVERS_COUNT.toLocaleString("en-US")
                : null
            }
            status={statusQuickReward}
            getData={getQuickReward}
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Average reward per receiver"
            info={
              quickReward
                ? quickReward.AVERAGE_REWARD_PER_RECEIVER.toLocaleString(
                    "en-US"
                  )
                : null
            }
            status={statusQuickReward}
            getData={getQuickReward}
          />
        </Grid>
        <MyChart
          title="Weekly Staking Reward Distributed"
          Chart={WeeklyStakingRewardsDistributed}
          data={dataWeeklyStakingRewardsDistributed}
          getData={getWeeklyStakingRewardsDistributed}
          status={statusWeeklyStakingRewardsDistributed}
          defaultSize={100}
        />
      </Grid>
    </Box>
  );
};

export default Staking;
