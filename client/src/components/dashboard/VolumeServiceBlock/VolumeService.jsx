import { useContext } from "react";
import DataContext from "../../../context/DataContext";
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import { VolumeServiceWrap } from "./VolumeService.styles";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const VolumeService = () => {
  // Use context to get data from the database
  const data = useContext(DataContext);

  // Helper function to get month name from the date
  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? null
      : date.toLocaleString("default", { month: "short" }); // Returns Jan, Feb, Mar, etc.
  };

  // Helper function to get month index
  const getMonthIndex = (monthName) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months.indexOf(monthName);
  };

  // Aggregate data by published month
  const monthData = data.reduce((acc, item) => {
    const month = getMonthName(item.published);
    if (!month) return acc; // Skip invalid dates
    const relevance = parseFloat(item.relevance) || 0;
    const impact = parseFloat(item.impact) || 0;

    if (!acc[month]) {
      acc[month] = { relevance: 0, impact: 0, count: 0 };
    }

    acc[month].relevance += relevance;
    acc[month].impact += impact;
    acc[month].count += 1;

    return acc;
  }, {});

  // Convert aggregated data into an array, calculate average, and sort by month index
  const chartData = Object.entries(monthData)
    .map(([month, { relevance, impact, count }]) => ({
      month,
      relevance: count ? relevance / count : 0,
      impact: count ? (impact / count) * 10 : 0,
    }))
    .sort((a, b) => getMonthIndex(a.month) - getMonthIndex(b.month)); // Sort months chronologically

  // Format legend value
  const formatLegendValue = (name, legendObj) => {
    const totalVal = chartData.reduce((acc, dataItem) => {
      if (legendObj.dataKey in dataItem) {
        return acc + dataItem[legendObj.dataKey];
      }
      return acc;
    }, 0);

    return (
      <span className="custom-legend-item-text-group">
        <span className="custom-legend-item-text">{name}</span>
        <span className="custom-legend-item-text">{totalVal.toFixed(2)}</span>
      </span>
    );
  };

  return (
    <VolumeServiceWrap>
      <div className="block-head">
        <BlockTitle className="block-title">
          <h3>Relevance vs Impact over Months</h3>
        </BlockTitle>
      </div>
      <BlockContentWrap className="stacked-bar-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 5,
              left: 5,
            }}
          >
            <XAxis dataKey="month" />
            <Tooltip cursor={{ fill: "transparent" }} />
            <Legend
              iconType="circle"
              iconSize={10}
              formatter={formatLegendValue}
            />
            <Bar
              dataKey="relevance"
              stackId="a"
              fill="#0095FF"
              radius={[0, 0, 4, 4]}
              barSize={16}
            />
            <Bar
              dataKey="impact"
              stackId="a"
              fill="#00E096"
              radius={[4, 4, 0, 0]}
              barSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </BlockContentWrap>
    </VolumeServiceWrap>
  );
};

export default VolumeService;
