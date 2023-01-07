import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import apis from "../../services/apis";
import MyChart from "../../components/MyChart";
import InfoCard from "../../components/InfoCard";
import { useEffect, useState } from "react";
import http from "../../services/http";
import NFTBarChart from "./nftBarChart";
import NFTBarChartTwoAxis from "./nftBarChartTwoAxis";
import NFTPieChart from "./nftPieChart";

const NFT = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Sales
  const [statusSalesQuickData, setStatusSalesQuickData] = useState("loading");
  const [statusSalesWeekly, setStatusSalesWeekly] = useState("loading");
  const [salesQuickData, setSalesQuickData] = useState(null);
  const [salesWeekly, setSalesWeekly] = useState({
    labels: [],
    datasets: [
      {
        label: "Buyer",
        data: [],
        backgroundColor: colors.chartPalette[100],
        borderColor: colors.chartPalette[100],
        borderWidth: 1,
        type: "line",
      },
      {
        label: "Sales",
        data: [],
        backgroundColor: colors.chartPalette[200],
        borderColor: colors.chartPalette[200],
        borderWidth: 1,
        type: "line",
      },
      {
        label: "Total USD",
        data: [],
        backgroundColor: colors.chartPalette[300],
        borderColor: colors.chartPalette[300],
        borderWidth: 1,
        type: "bar",
      },
    ],
  });
  const [salesFeeWeekly, setSalesFeeWeekly] = useState({
    labels: [],
    datasets: [
      {
        label: "Total",
        data: [],
        backgroundColor: colors.chartPalette[100],
        borderColor: colors.chartPalette[100],
        borderWidth: 1,
        type: "line",
      },
      {
        label: "Creator",
        data: [],
        backgroundColor: colors.chartPalette[200],
        borderColor: colors.chartPalette[200],
        borderWidth: 1,
        type: "bar",
      },
      {
        label: "Platform",
        data: [],
        backgroundColor: colors.chartPalette[300],
        borderColor: colors.chartPalette[300],
        borderWidth: 1,
        type: "bar",
      },
    ],
  });

  // Platforms
  const [statusPlatformsQuickData, setStatusPlatformsQuickData] =
    useState("loading");
  const [statusPlatformsWeekly, setStatusPlatformsWeekly] = useState("loading");
  const [platformsWeekly, setPlatformsWeekly] = useState(null);
  const [platformsTotalVolume, setPlatformsTotalVolume] = useState(null);
  const [platformsBuyersCount, setPlatformsBuyersCount] = useState(null);
  const [platformsSalesCount, setPlatformsSalesCount] = useState(null);

  // Currency
  const [statusCurrencyQuickData, setStatusCurrencyQuickData] =
    useState("loading");
  const [statusCurrencyWeekly, setStatusCurrencyWeekly] = useState("loading");
  const [currencyWeekly, setCurrencyWeekly] = useState(null);
  const [currencyTotalVolume, setCurrencyTotalVolume] = useState(null);
  const [currencyBuyersCount, setCurrencyBuyersCount] = useState(null);
  const [currencySalesCount, setCurrencySalesCount] = useState(null);

  // Top NFT Projects
  const [statusTopByVolume, setStatusTopByVolume] = useState("loading");
  const [statusTopByCount, setStatusTopByCount] = useState("loading");
  const [topByCount, setTopByCount] = useState([]);
  const [topByVolume, setTopByVolume] = useState([]);

  useEffect(() => {
    getSalesQuickData();
    getSalesWeekly();
    getPlatformsQuickData();
    getPlatformsWeekly();
    getCurrencyQuickData();
    getCurrencyWeekly();
    getTopByCount();
    getTopByVolume();
  }, []);

  // Sales
  const getSalesQuickData = async () => {
    setStatusSalesQuickData("loading");
    try {
      const res = await http.get(apis.getNFTSalesQuickData);
      setSalesQuickData(res[0]);
      setStatusSalesQuickData("loaded");
    } catch (error) {
      setStatusSalesQuickData("error");
    }
  };

  const getSalesWeekly = async () => {
    setStatusSalesWeekly("loading");
    try {
      const res = await http.get(apis.getNFTSalesWeekly);
      setSalesWeekly({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Buyer",
            yAxisID: "secondAxis",
            data: res.map((data) => data.BUYERS_COUNT),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
            type: "line",
          },
          {
            label: "Sales",
            yAxisID: "secondAxis",
            data: res.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[200],
            borderColor: colors.chartPalette[200],
            borderWidth: 1,
            type: "line",
          },
          {
            label: "Total USD",
            data: res.map((data) => data.TOTAL_USD),
            backgroundColor: colors.chartPalette[300],
            borderColor: colors.chartPalette[300],
            borderWidth: 1,
            type: "bar",
          },
        ],
      });
      setSalesFeeWeekly({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Total",
            data: res.map((data) => data.TOTAL_FEE_USD),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
            type: "line",
          },
          {
            label: "Creator",
            data: res.map((data) => data.TOTAL_CREATOR_FEE_USD),
            backgroundColor: colors.chartPalette[200],
            borderColor: colors.chartPalette[200],
            borderWidth: 1,
            type: "bar",
          },
          {
            label: "Platform",
            data: res.map((data) => data.TOTAL_PLATFORM_FEE_USD),
            backgroundColor: colors.chartPalette[300],
            borderColor: colors.chartPalette[300],
            borderWidth: 1,
            type: "bar",
          },
        ],
      });
      setStatusSalesWeekly("loaded");
    } catch (error) {
      setStatusSalesWeekly("error");
    }
  };

  // Platforms
  const getPlatformsQuickData = async () => {
    setStatusPlatformsQuickData("loading");
    try {
      const res = await http.get(apis.getNFTPlatformsQuickData);
      let totalVolume = [];
      let buyerCount = [];
      let salesCount = [];
      await res.map((data, index) => {
        totalVolume = [
          ...totalVolume,
          {
            id: data.PLATFORM,
            label: data.PLATFORM,
            value: data.TOTAL_USD,
            color: colors.chartPalette[(index + 1) * 100],
          },
        ];
        buyerCount = [
          ...buyerCount,
          {
            id: data.PLATFORM,
            label: data.PLATFORM,
            value: data.BUYERS_COUNT,
            color: colors.chartPalette[(index + 1) * 100],
          },
        ];
        salesCount = [
          ...salesCount,
          {
            id: data.PLATFORM,
            label: data.PLATFORM,
            value: data.COUNT,
            color: colors.chartPalette[(index + 1) * 100],
          },
        ];
      });
      setPlatformsTotalVolume(totalVolume);
      setPlatformsBuyersCount(buyerCount);
      setPlatformsSalesCount(salesCount);
      setStatusPlatformsQuickData("loaded");
    } catch (error) {
      setStatusPlatformsQuickData("error");
    }
  };

  const getPlatformsWeekly = async () => {
    setStatusPlatformsWeekly("loading");
    try {
      const res = await http.get(apis.getNFTPlatformsWeekly);
      setPlatformsWeekly({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Total USD",
            yAxisID: "secondAxis",
            data: res.map((data) => data.TOTAL_USD),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
            type: "line",
          },
          {
            label: "Creator Fee",
            data: res.map((data) => data.TOTAL_CREATOR_FEE_USD),
            backgroundColor: colors.chartPalette[200],
            borderColor: colors.chartPalette[200],
            borderWidth: 1,
            type: "bar",
          },
          {
            label: "Platform Fee",
            data: res.map((data) => data.TOTAL_PLATFORM_FEE_USD),
            backgroundColor: colors.chartPalette[300],
            borderColor: colors.chartPalette[300],
            borderWidth: 1,
            type: "bar",
          },
        ],
      });
      setStatusPlatformsWeekly("loaded");
    } catch (error) {
      setStatusPlatformsWeekly("error");
    }
  };

  // Currency
  const getCurrencyQuickData = async () => {
    setStatusCurrencyQuickData("loading");
    try {
      const res = await http.get(apis.getNFTCurrencyQuickData);
      let totalVolume = [];
      let buyerCount = [];
      let salesCount = [];
      await res.map((data, index) => {
        totalVolume = [
          ...totalVolume,
          {
            id: data.CURRENCY,
            label: data.CURRENCY,
            value: data.TOTAL_USD,
            color: colors.chartPalette[(index + 1) * 100],
          },
        ];
        buyerCount = [
          ...buyerCount,
          {
            id: data.CURRENCY,
            label: data.CURRENCY,
            value: data.BUYERS_COUNT,
            color: colors.chartPalette[(index + 1) * 100],
          },
        ];
        salesCount = [
          ...salesCount,
          {
            id: data.CURRENCY,
            label: data.CURRENCY,
            value: data.COUNT,
            color: colors.chartPalette[(index + 1) * 100],
          },
        ];
      });
      setCurrencyTotalVolume(totalVolume);
      setCurrencyBuyersCount(buyerCount);
      setCurrencySalesCount(salesCount);
      setStatusCurrencyQuickData("loaded");
    } catch (error) {
      setStatusCurrencyQuickData("error");
      console.log(error.message);
    }
  };

  const getCurrencyWeekly = async () => {
    setStatusCurrencyWeekly("loading");
    try {
      const res = await http.get(apis.getNFTCurrencyWeekly);
      setCurrencyWeekly({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Total USD",
            yAxisID: "secondAxis",
            data: res.map((data) => data.TOTAL_USD),
            backgroundColor: colors.chartPalette[100],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
            type: "line",
          },
          {
            label: "Creator Fee",
            data: res.map((data) => data.TOTAL_CREATOR_FEE_USD),
            backgroundColor: colors.chartPalette[200],
            borderColor: colors.chartPalette[200],
            borderWidth: 1,
            type: "bar",
          },
          {
            label: "Platform Fee",
            data: res.map((data) => data.TOTAL_PLATFORM_FEE_USD),
            backgroundColor: colors.chartPalette[300],
            borderColor: colors.chartPalette[300],
            borderWidth: 1,
            type: "bar",
          },
        ],
      });
      setStatusCurrencyWeekly("loaded");
    } catch (error) {
      setStatusCurrencyWeekly("error");
    }
  };

  // Top NFT Projects

  const getTopByVolume = async () => {
    setStatusTopByVolume("loading");
    try {
      const res = await http.get(apis.getNFTTopByVolume);
      let tops = [];
      await res.map((data, index) => {
        tops = [
          ...tops,
          {
            id: data.ADDRESS_NAME,
            label: data.ADDRESS_NAME,
            value: data.TOTAL_USD,
            color: colors.chartPalette[(index + 1) * 100],
          },
        ];
      });
      setTopByVolume(tops);
      setStatusTopByVolume("loaded");
    } catch (error) {
      setStatusTopByVolume("error");
    }
  };

  const getTopByCount = async () => {
    setStatusTopByCount("loading");
    try {
      const res = await http.get(apis.getNFTTopByCount);
      let tops = [];
      await res.map((data, index) => {
        tops = [
          ...tops,
          {
            id: data.ADDRESS_NAME,
            label: data.ADDRESS_NAME,
            value: data.COUNT,
            color: colors.chartPalette[(index + 1) * 100],
          },
        ];
      });
      setTopByCount(tops);
      setStatusTopByCount("loaded");
    } catch (error) {
      setStatusTopByCount("error");
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Header
        title="NFT"
        subtitle="features charts and data on NFT sales, popular NFT projects, top NFT platforms,
         and the most commonly used currencies for NFT transactions on the Optimism network.
          This page provides insights into the current state and trends of the NFT market on the Optimism blockchain."
      />
      <Grid
        container
        gap={2}
        sx={{
          marginTop: "80px",
        }}
      >
        <Grid item xs={12}>
          <Header title="Sales" subtitle="overall sales analysis" />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="# of NFT sales"
            source={apis.getNFTSalesQuickData}
            info={
              salesQuickData
                ? salesQuickData.COUNT.toLocaleString("en-US")
                : null
            }
            status={statusSalesQuickData}
            getData={getSalesQuickData}
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="$ amount of NFTs sold"
            source={apis.getNFTSalesQuickData}
            info={
              salesQuickData
                ? salesQuickData.TOTAL_USD.toLocaleString("en-US")
                : null
            }
            status={statusSalesQuickData}
            getData={getSalesQuickData}
          />
        </Grid>

        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="# of buyers"
            source={apis.getNFTSalesQuickData}
            info={
              salesQuickData
                ? salesQuickData.BUYERS_COUNT.toLocaleString("en-US")
                : null
            }
            status={statusSalesQuickData}
            getData={getSalesQuickData}
          />
        </Grid>

        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="$ amount of creator fee generated"
            source={apis.getNFTSalesQuickData}
            info={
              salesQuickData
                ? salesQuickData.TOTAL_CREATOR_FEE_USD.toLocaleString("en-US")
                : null
            }
            status={statusSalesQuickData}
            getData={getSalesQuickData}
          />
        </Grid>

        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="$ amount of platform fee generated"
            source={apis.getNFTSalesQuickData}
            info={
              salesQuickData
                ? salesQuickData.TOTAL_PLATFORM_FEE_USD.toLocaleString("en-US")
                : null
            }
            status={statusSalesQuickData}
            getData={getSalesQuickData}
          />
        </Grid>

        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="$ amount of total fee generated"
            source={apis.getNFTSalesQuickData}
            info={
              salesQuickData
                ? salesQuickData.TOTAL_FEE_USD.toLocaleString("en-US")
                : null
            }
            status={statusSalesQuickData}
            getData={getSalesQuickData}
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
              title="# of sales count, buyers, volume"
              Chart={NFTBarChartTwoAxis}
              url={apis.getNFTSalesWeekly}
              status={statusSalesWeekly}
              getData={getSalesWeekly}
              data={salesWeekly}
              id={"salesWeekly"}
            />
            <MyChart
              title="fees generated in $"
              Chart={NFTBarChart}
              url={apis.getNFTSalesWeekly}
              status={statusSalesWeekly}
              getData={getSalesWeekly}
              data={salesFeeWeekly}
              id={"salesFeeWeekly"}
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
            title="Platforms"
            subtitle="This subsection presents data on the top platforms for NFT purchases
             on the Optimism network, including sales volume and transaction numbers."
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
              title="Total volume"
              Chart={NFTPieChart}
              url={apis.queryPlatformQuickData}
              status={statusPlatformsQuickData}
              getData={getPlatformsQuickData}
              data={platformsTotalVolume}
              id={"PlatformTotalVolume"}
            />
            <MyChart
              title="fees generated in $"
              Chart={NFTBarChartTwoAxis}
              url={apis.queryNFTPlatformsWeekly}
              status={statusPlatformsWeekly}
              getData={getPlatformsWeekly}
              data={platformsWeekly}
              id={"PlatformFeesGeneratedinUSD"}
            />

            <MyChart
              title="sales count"
              Chart={NFTPieChart}
              url={apis.queryPlatformQuickData}
              status={statusPlatformsQuickData}
              getData={getPlatformsQuickData}
              data={platformsSalesCount}
              id={"PlatformTotalVolume"}
            />
            <MyChart
              title="buyers count"
              Chart={NFTPieChart}
              url={apis.queryPlatformQuickData}
              status={statusPlatformsQuickData}
              getData={getPlatformsQuickData}
              data={platformsBuyersCount}
              id={"PlatformTotalVolume"}
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
            title="Currency"
            subtitle="This subsection shows data on the top currencies for NFT purchases on
             the Optimism network, including sales volume and transaction numbers."
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
              title="Total volume"
              Chart={NFTPieChart}
              url={apis.queryCurrencyQuickData}
              status={statusCurrencyQuickData}
              getData={getCurrencyQuickData}
              data={currencyTotalVolume}
              id={"PlatformTotalVolume"}
            />
            <MyChart
              title="fees generated in $"
              Chart={NFTBarChartTwoAxis}
              url={apis.queryCurrencyQuickData}
              status={statusCurrencyWeekly}
              getData={getCurrencyWeekly}
              data={currencyWeekly}
              id={"PlatformTotalVolume"}
            />

            <MyChart
              title="sales count"
              Chart={NFTPieChart}
              url={apis.queryCurrencyQuickData}
              status={statusCurrencyQuickData}
              getData={getCurrencyQuickData}
              data={currencySalesCount}
              id={"PlatformTotalVolume"}
            />
            <MyChart
              title="buyers count"
              Chart={NFTPieChart}
              url={apis.queryCurrencyQuickData}
              status={statusCurrencyQuickData}
              getData={getCurrencyQuickData}
              data={currencyBuyersCount}
              id={"PlatformTotalVolume"}
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
            title="Top NFT projects"
            subtitle="This subsection lists the top NFT projects by sales volume 
            and transaction numbers on the Optimism network."
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
              title="top 10 by count"
              Chart={NFTPieChart}
              url={apis.queryNFTTopByCount}
              status={statusTopByCount}
              getData={getTopByCount}
              data={topByCount}
              id={"Top10ByCount"}
            />
            <MyChart
              title="top 10 by volume"
              Chart={NFTPieChart}
              url={apis.queryNFTTopByVolume}
              status={statusTopByVolume}
              getData={getTopByVolume}
              data={topByVolume}
              id={"Top10ByCount"}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NFT;
