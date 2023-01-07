import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import apis from "../../services/apis";
import MyChart from "../../components/MyChart";
import InfoCard from "../../components/InfoCard";
import { useEffect, useState } from "react";
import http from "../../services/http";
import AverageBlockTime from "./averageBlockTime";
import BlockCount from "./blockCount";
import BlockSize from "./blockSize";
import BlockDifficulty from "./blockDifficulty";

const Activity = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Blocks
  const [statusBlockQuickData, setStatusBlockQuickData] = useState("loading");
  const [statusAverageBlockTime, setStatusAverageBlockTime] =
    useState("loading");
  const [statusBlock, setStatusBlock] = useState("loading");
  const [dataBlockDifficulty, setDataBlockDifficulty] = useState({
    labels: [],
    datasets: [
      {
        label: "Max",
        data: [],
        backgroundColor: colors.chartPalette[100],
        borderColor: colors.chartPalette[100],
        borderWidth: 1,
        type: "line",
      },
      {
        label: "Average",
        data: [],
        backgroundColor: colors.chartPalette[100],
        borderColor: colors.chartPalette[100],
        borderWidth: 1,
        type: "bar",
      },
    ],
  });
  const [dataBlockSize, setDataBlockSize] = useState({
    labels: [],
    datasets: [
      {
        label: "Max",
        data: [],
        backgroundColor: colors.chartPalette[100],
        borderColor: colors.chartPalette[100],
        borderWidth: 1,
        type: "line",
      },
      {
        label: "Average",
        data: [],
        backgroundColor: colors.chartPalette[100],
        borderColor: colors.chartPalette[100],
        borderWidth: 1,
        type: "bar",
      },
    ],
  });
  const [dataBlockCount, setDataBlockCount] = useState({
    labels: [],
    datasets: [
      {
        label: "Max",
        data: [],
        backgroundColor: colors.chartPalette[100],
        borderColor: colors.chartPalette[100],
        borderWidth: 1,
        type: "line",
      },
      {
        label: "Average",
        data: [],
        backgroundColor: colors.chartPalette[100],
        borderColor: colors.chartPalette[100],
        borderWidth: 1,
        type: "bar",
      },
    ],
  });

  const [dataAverageBlockTime, setDataAverageBlockTime] = useState({
    labels: [],
    datasets: [
      {
        label: "Average",
        data: [],
        backgroundColor: colors.chartPalette[100],
        borderColor: colors.chartPalette[100],
        borderWidth: 1,
        type: "line",
      },
    ],
  });
  const [dataBlockQuickData, setDataBlockQuickData] = useState(null);

  useEffect(() => {
    getBlocksQuickData();
    getAverageBlockTime();
    getBlocksData();
  }, []);

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

  const getBlocksData = async () => {
    setStatusBlock("loading");

    try {
      const res = await http.get(apis.getBlockData);
      setDataBlockDifficulty({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Max",
            data: res.map((data) => data.MAX_DIFFICULTY),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
            type: "line",
          },
          {
            label: "Average",
            data: res.map((data) => data.AVERAGE_DIFFICULTY),
            backgroundColor: colors.chartPalette[200],
            borderColor: colors.chartPalette[200],
            borderWidth: 1,
            type: "bar",
          },
        ],
      });
      setDataBlockSize({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Max",
            data: res.map((data) => data.MAX_SIZE),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 3,
            type: "line",
          },
          {
            label: "Average",
            yAxisID: "avgAxis",
            data: res.map((data) => data.AVERAGE_SIZE),
            backgroundColor: colors.chartPalette[200],
            borderColor: colors.chartPalette[200],
            borderWidth: 1,
            type: "bar",
          },
        ],
      });

      setDataBlockCount({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Count",
            data: res.map((data) => data.BLOCKS_COUNT),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
            type: "line",
          },
        ],
      });
      setStatusBlock("loaded");
    } catch (error) {
      setStatusBlock("error");
    }
  };

  const getAverageBlockTime = async () => {
    setStatusAverageBlockTime("loading");

    try {
      const res = await http.get(apis.getAverageBlockTime);
      setDataAverageBlockTime({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Average",
            data: res.map((data) => data.AVERAGE_BLOCK_TIME),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
            type: "line",
          },
        ],
      });
      setStatusAverageBlockTime("loaded");
    } catch (error) {
      setStatusAverageBlockTime("error");
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container gap={2}>
        <Grid item xs={12}>
          <Header
            title="Blocks"
            subtitle="A summary of block data on the Optimism blockchain, including # of blocks, block time, and block size."
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
              Chart={BlockCount}
              url={apis.queryBlockData}
              status={statusBlock}
              getData={getBlocksData}
              data={dataBlockCount}
              id={"BlockCount"}
            />
            <MyChart
              title="Block time"
              Chart={AverageBlockTime}
              url={apis.queryAverageBlockTime}
              status={statusAverageBlockTime}
              getData={getAverageBlockTime}
              data={dataAverageBlockTime}
              id={"AverageBlockTime"}
            />

            <MyChart
              title="Block difficulty"
              Chart={BlockDifficulty}
              url={apis.queryBlockData}
              status={statusBlock}
              getData={getBlocksData}
              data={dataBlockDifficulty}
              id={"BlockDifficulty"}
            />
            <MyChart
              title="Block size"
              Chart={BlockSize}
              url={apis.queryBlockData}
              status={statusBlock}
              getData={getBlocksData}
              data={dataBlockSize}
              id={"BlockSize"}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Activity;
