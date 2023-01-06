import { Pie } from "react-chartjs-2";
import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const PieChart = ({ data, id }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div style={{ height: 360, maxHeight: "80vh" }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        sortByValue={true}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "category10" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#f8f9fa"
        arcLinkLabelsThickness={2}
        arcLabelsTextColor={colors.grey[300]}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        // arcLabelsTextColor={{
        //   from: "color",
        //   modifiers: [["darker", 2]],
        // }}
        legends={[
          {
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 64,
            translateY: 0,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: colors.grey[300],
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            // effects: [
            //   {
            //     on: "hover",
            //     style: {
            //       itemTextColor: "#000",
            //     },
            //   },
            // ],
          },
        ]}
        tooltip={({ datum: point }) => {
          return (
            <div
              style={{
                minWidth: "100px",
                background: colors.backgroundColor[500],
                padding: "9px 12px",
                border: `1px solid ${colors.grey[300]}`,
                color: colors.grey[300],
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                label: {point.label}
              </div>
              <div>value: {point.value}</div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default PieChart;
