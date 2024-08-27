import { useContext } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TopicsPolarAreaChartWrap } from "./TopicsPolarAreaChart.styles";
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import DataContext from "../../../context/DataContext";

const COLORS = ["#4BC0C0", "#FF9F40", "#FFCD56", "#36A2EB", "#9966FF"];

const TopicsPolarAreaChart = () => {
  const data = useContext(DataContext);

  const topicsData = data.reduce((acc, item) => {
    if (item.topic && item.topic.trim() !== "") {
      if (!acc[item.topic]) {
        acc[item.topic] = 0;
      }
      acc[item.topic] += item.relevance;
    }
    return acc;
  }, {});

  const chartData = Object.entries(topicsData).map(
    ([topic, relevance], index) => ({
      topic,
      relevance,
      fill: COLORS[index % COLORS.length],
      stroke: COLORS[index % COLORS.length],
    })
  );

  return (
    <TopicsPolarAreaChartWrap>
      <div className="block-head">
        <BlockTitle className="block-title">
          <h3>Topics Distribution</h3>
        </BlockTitle>
      </div>
      <BlockContentWrap className="polar-area-chart">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius="90%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis
              dataKey="topic"
              tick={false}
              axisLine={{ strokeOpacity: 0 }}
            />
            <PolarRadiusAxis angle={45} domain={[0, "dataMax"]} />
            <Radar
              name="Relevance"
              dataKey="relevance"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Tooltip
              formatter={(value) => [`${value}`]}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </BlockContentWrap>
    </TopicsPolarAreaChartWrap>
  );
};

export default TopicsPolarAreaChart;
