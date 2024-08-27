import { useContext } from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { RegionChartWrap } from "./RegionChart.styles";
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import DataContext from "../../../context/DataContext";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const formatTooltipValue = (value, name) => {
  return [`${name}: ${value} items`];
};

const RegionChart = () => {
  const data = useContext(DataContext);

  // Count occurrences of each region, excluding undefined or empty string values
  const regionCounts = data.reduce((acc, item) => {
    if (item.region && item.region.trim() !== "") {
      acc[item.region] = (acc[item.region] || 0) + 1;
    }
    return acc;
  }, {});

  // Prepare data for the pie chart
  const chartData = Object.entries(regionCounts).map(([region, count]) => ({
    name: region,
    value: count,
  }));

  return (
    <RegionChartWrap>
      <div className="block-head">
        <BlockTitle className="block-title">
          <h3>Region Distribution</h3>
        </BlockTitle>
      </div>
      <BlockContentWrap className="pie-chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius="90%"
              innerRadius="40%"
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={formatTooltipValue} />
          </PieChart>
        </ResponsiveContainer>
      </BlockContentWrap>
    </RegionChartWrap>
  );
};

export default RegionChart;
