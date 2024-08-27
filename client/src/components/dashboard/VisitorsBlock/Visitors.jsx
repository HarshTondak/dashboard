import { useContext } from "react";
import DataContext from "../../../context/DataContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Dot,
} from "recharts";
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import PropTypes from "prop-types";
import { VisitorsBlockWrap } from "./Visitors.styles";

// Function to format tooltip values
const formatTooltipValue = (value, name) => `${name}: ${value}`;

// Custom Tooltip component
const CustomTooltipContent = ({ payload }) => {
  if (!payload || !payload.length) return null;

  return (
    <div className="custom-recharts-tooltip">
      <p className="recharts-tooltip-label">{payload[0].payload?.month}</p>
      <ul className="recharts-tooltip-item-list">
        {payload?.map((payloadItem, index) => (
          <li key={index}>
            {formatTooltipValue(payloadItem.value, payloadItem.name)}
          </li>
        ))}
      </ul>
    </div>
  );
};

CustomTooltipContent.propTypes = {
  payload: PropTypes.any,
};

// Function to transform data
const transformData = (data) => {
  const aggregatedData = data.reduce((acc, item) => {
    const month = item.start_year; // Assuming start_year represents a time period

    if (!acc[month]) {
      acc[month] = {
        month: month,
        total_intensity: 0,
        average_relevance: 0,
        total_likelihood: 0,
        count: 0,
      };
    }

    acc[month].total_intensity += item.intensity || 0;
    acc[month].average_relevance += item.relevance || 0;
    acc[month].total_likelihood += item.likelihood || 0;
    acc[month].count += 1;

    return acc;
  }, {});

  // Convert aggregated data to an array format for recharts
  return Object.values(aggregatedData).map((item) => ({
    month: item.month,
    total_intensity: item.total_intensity,
    average_relevance: (item.average_relevance / item.count).toFixed(1),
    total_likelihood: item.total_likelihood,
  }));
};

const VisitorsBlock = () => {
  const data = useContext(DataContext);
  const transformedData = transformData(data);

  return (
    <VisitorsBlockWrap>
      <div className="block-head">
        <BlockTitle className="block-title">
          <h3>Data Insights Over Time</h3>
        </BlockTitle>
      </div>
      <BlockContentWrap className="line-chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={transformedData}
            margin={{
              top: 10,
              right: 5,
              left: 0,
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
              dataKey="month"
              tickSize={0}
              axisLine={false}
              padding={{ left: 20 }}
              tick={({ payload, x, y, dy }) => (
                <text
                  x={x}
                  y={y + 20}
                  dy={dy}
                  textAnchor="middle"
                  fill="#7B91B0"
                  fontSize={14}
                >
                  {payload.value}
                </text>
              )}
            />
            <YAxis
              tickSize={0}
              axisLine={false}
              tick={{
                fill: "#7B91B0",
                fontSize: 14,
              }}
            />
            <Tooltip content={<CustomTooltipContent />} />
            <Legend
              iconType="square"
              formatter={(value) => value.replace("_", " ")}
            />
            <ReferenceLine
              isFront={true}
              x="Jan"
              stroke="#F64E60"
              strokeDasharray="3 3"
            >
              <Dot r={5} fill="#F64E60" />
            </ReferenceLine>
            <Line
              dot={false}
              strokeWidth={4}
              type="monotone"
              dataKey="total_intensity"
              stroke="#A700FF"
            />
            <Line
              dot={false}
              strokeWidth={4}
              type="monotone"
              dataKey="average_relevance"
              stroke="#F64E60"
            />
            <Line
              dot={false}
              strokeWidth={4}
              type="monotone"
              dataKey="total_likelihood"
              stroke="#3CD856"
            />
          </LineChart>
        </ResponsiveContainer>
      </BlockContentWrap>
    </VisitorsBlockWrap>
  );
};

export default VisitorsBlock;
