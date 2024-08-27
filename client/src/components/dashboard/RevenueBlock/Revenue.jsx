import { useContext } from "react";
import DataContext from "../../../context/DataContext";
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import { RevenueWrap } from "./Revenue.styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Format tooltip values
const formatTooltipValue = (value) => `${value}`;

// Format YAxis labels
const formatYAxisLabel = (value) => `${value}`;

// Format legend values
const formatLegendValue = (value) =>
  `${value.charAt(0).toUpperCase() + value.slice(1)}`;

// Region-to-Continent Mapping
const regionToContinent = {
  "Northern America": "America",
  "South America": "America",
  "Central America": "America",
  "Northern Africa": "Africa",
  "Southern Africa": "Africa",
  "Western Africa": "Africa",
  "Eastern Africa": "Africa",
  "Central Africa": "Africa",
  "Western Asia": "Asia",
  "Southern Asia": "Asia",
  "Central Asia": "Asia",
  "South-Eastern Asia": "Asia",
  "Eastern Asia": "Asia",
  "Eastern Europe": "Europe",
  "Northern Europe": "Europe",
  "Southern Europe": "Europe",
  "Western Europe": "Europe",
  Europe: "Europe",
  Oceania: "Oceania",
  Africa: "Africa",
  Asia: "Asia",
  World: "World",
};

// Transform data function
const transformRevenueData = (data) => {
  const continentData = data.reduce((acc, item) => {
    const continent = regionToContinent[item.region] || "World";
    if (!acc[continent]) {
      acc[continent] = {
        continent,
        intensity: 0,
        relevance: 0,
        likelihood: 0,
        count: 0,
      };
    }
    acc[continent].intensity += item.intensity;
    acc[continent].relevance += item.relevance;
    acc[continent].likelihood += item.likelihood;
    acc[continent].count += 1;
    return acc;
  }, {});

  return Object.values(continentData).map((item) => ({
    continent: item.continent,
    intensity: item.intensity / item.count,
    relevance: item.relevance / item.count,
    likelihood: item.likelihood / item.count,
  }));
};

const Revenue = () => {
  const data = useContext(DataContext);

  const transformedData = transformRevenueData(data);

  return (
    <RevenueWrap>
      <div className="block-head">
        <BlockTitle className="block-title">
          <h3>Data Insights by Continent</h3>
        </BlockTitle>
      </div>
      <BlockContentWrap className="bar-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={transformedData}
            margin={{
              top: 5,
              right: 5,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              stroke="#f8f8f9"
              horizontal={true}
              vertical={false}
              strokeDasharray="3 0"
            />
            <XAxis
              dataKey="continent"
              tickSize={0}
              axisLine={false}
              tick={({ payload, x, y, dy }) => (
                <text
                  x={x + 10}
                  y={y + 5}
                  dy={dy}
                  // textAnchor="middle"
                  fill="#7B91B0"
                  fontSize={14}
                  transform={`rotate(90 ${x},${y})`}
                >
                  {payload.value}
                </text>
              )}
            />
            <YAxis
              tickFormatter={formatYAxisLabel}
              tickCount={6}
              axisLine={false}
              tickSize={0}
              tick={{
                fill: "#7B91B0",
                fontSize: 14,
              }}
              interval={0}
            />
            <Tooltip formatter={formatTooltipValue} />
            <Legend
              iconType="circle"
              iconSize={10}
              formatter={formatLegendValue}
              style={{
                paddingTop: "20px",
                marginTop: "100px",
              }}
            />
            <Bar
              dataKey="intensity"
              fill="#0095FF"
              activeBar={false}
              isAnimationActive={false}
              radius={[4, 4, 4, 4]}
              barSize={18}
            />
            <Bar
              dataKey="relevance"
              fill="#00E096"
              activeBar={false}
              isAnimationActive={false}
              radius={[4, 4, 4, 4]}
              barSize={18}
            />
            <Bar
              dataKey="likelihood"
              fill="#FF6F61"
              activeBar={false}
              isAnimationActive={false}
              radius={[4, 4, 4, 4]}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </BlockContentWrap>
    </RevenueWrap>
  );
};

export default Revenue;
