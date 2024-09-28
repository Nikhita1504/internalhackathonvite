import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

// Updated mockLineData with high variations for India Post schemes
const mockLineData = [
  {
    id: "Senior Citizens Savings Scheme (SCSS)",
    color: "hsl(100, 70%, 50%)",
    data: [
      { x: 2018, y: 8000 },
      { x: 2019, y: 12000 }, // Significant increase
      { x: 2020, y: 3000 },  // Significant drop
      { x: 2021, y: 15000 }, // Huge spike
      { x: 2022, y: 18000 }, // Continued growth
      { x: 2023, y: 14000 }, // Slight decline
    ],
  },
  {
    id: "Sukanya Samriddhi Account (SSA)",
    color: "hsl(200, 70%, 50%)",
    data: [
      { x: 2018, y: 15000 },
      { x: 2019, y: 20000 }, // Increase
      { x: 2020, y: 10000 }, // Large drop
      { x: 2021, y: 30000 }, // Huge spike
      { x: 2022, y: 25000 }, // Moderate decline
      { x: 2023, y: 40000 }, // Massive increase
    ],
  },
  {
    id: "Kisan Vikas Patra (KVP)",
    color: "hsl(300, 70%, 50%)",
    data: [
      { x: 2018, y: 5000 },
      { x: 2019, y: 15000 }, // Huge spike
      { x: 2020, y: 4000 },   // Significant drop
      { x: 2021, y: 18000 },  // Massive recovery
      { x: 2022, y: 13000 },  // Slight dip
      { x: 2023, y: 25000 },  // Huge spike
    ],
  },
  {
    id: "Mahila Samman Savings Certificate (MSSC)",
    color: "hsl(400, 70%, 50%)",
    data: [
      { x: 2018, y: 3000 },
      { x: 2019, y: 5000 },   // Gradual increase
      { x: 2020, y: 12000 },  // Huge jump
      { x: 2021, y: 9000 },
      { x: 2022, y: 17000 },  // Big spike
      { x: 2023, y: 9500 },   // Significant drop
    ],
  },
  {
    id: "Public Provident Fund (PPF)",
    color: "hsl(500, 70%, 50%)",
    data: [
      { x: 2018, y: 10000 },
      { x: 2019, y: 12000 },
      { x: 2020, y: 8000 },   // Drop
      { x: 2021, y: 20000 },  // Large spike
      { x: 2022, y: 15000 },
      { x: 2023, y: 25000 },  // Massive increase
    ],
  },
  {
    id: "Postal Life Insurance (PLI)",
    color: "hsl(600, 70%, 50%)",
    data: [
      { x: 2018, y: 7000 },
      { x: 2019, y: 13000 }, // Significant increase
      { x: 2020, y: 5000 },   // Significant drop
      { x: 2021, y: 16000 },  // Huge spike
      { x: 2022, y: 9000 },   // Significant drop
      { x: 2023, y: 12000 },  // Gradual increase
    ],
  },
  {
    id: "Rural Postal Life Insurance (RPLI)",
    color: "hsl(700, 70%, 50%)",
    data: [
      { x: 2018, y: 4000 },
      { x: 2019, y: 10000 }, // Huge increase
      { x: 2020, y: 2000 },   // Large drop
      { x: 2021, y: 7000 },   // Recovery
      { x: 2022, y: 12000 },  // Continued growth
      { x: 2023, y: 15000 },  // Further growth
    ],
  },
];

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveLine
      data={mockLineData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom" // Smooth curves
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Year",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Registrations",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
