import { useContext } from "react";
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomerWrap } from "./Customer.styles";
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import PropTypes from "prop-types";
import DataContext from "../../../context/DataContext";

const formatLegendValue = (value) => {
  return (
    <span className="custom-legend-item-text-group">
      <span className="custom-legend-item-text">{value}</span>
    </span>
  );
};

// Custom tooltip content to handle the display of labels and data
const CustomTooltipContent = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  // Ensure label is always a string
  const labelString = typeof label === "string" ? label : `${label}`;

  return (
    <div className="custom-recharts-tooltip">
      <p className="recharts-tooltip-label">{labelString}</p>
      <ul className="recharts-tooltip-item-list">
        {payload.map((entry, index) => (
          <li key={index}>{`${entry.name}: ${entry.value}`}</li>
        ))}
      </ul>
    </div>
  );
};

CustomTooltipContent.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Accept string or number for label
};

const Customer = () => {
  const data = useContext(DataContext);

  // Transform the data for the chart
  const chartData = data
    .map((item, index) => ({
      name: index,
      intensity: item.intensity,
      likelihood: item.likelihood,
    }))
    .slice(0, 10); // Limit to 10 items for better visibility

  return (
    <CustomerWrap>
      <div className="block-head">
        <BlockTitle className="block-title">
          <h3>Intensity vs Likelihood</h3>
        </BlockTitle>
      </div>
      <BlockContentWrap className="area-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0095FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0095FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLikelihood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#07E098" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#07E098" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltipContent />} />
            <Legend formatter={formatLegendValue} />
            <Area
              type="monotone"
              dataKey="intensity"
              stroke="#0095FF"
              fillOpacity={1}
              fill="url(#colorIntensity)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="likelihood"
              stroke="#07E098"
              fillOpacity={1}
              fill="url(#colorLikelihood)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </BlockContentWrap>
    </CustomerWrap>
  );
};

export default Customer;
