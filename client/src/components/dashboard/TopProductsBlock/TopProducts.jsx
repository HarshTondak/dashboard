import { useContext } from "react";
import DataContext from "../../../context/DataContext";
import { BlockTitle } from "../../../styles/global/default";
import { TopProductsWrap } from "./TopProducts.styles";

const TopProducts = () => {
  // Use context to get data from the database
  const data = useContext(DataContext);

  // Aggregate data by sector
  // Aggregate relevance and impact for each sector
  const sectorData = data.reduce((acc, item) => {
    const sector = item.sector || "Unknown";
    const relevance = parseFloat(item.relevance) || 0;
    const impact = parseFloat(item.impact) || 0;

    if (!acc[sector]) {
      acc[sector] = { relevance: 0, impact: 0 };
    }

    acc[sector].relevance += relevance;
    acc[sector].impact += impact;

    return acc;
  }, {});

  // Convert the aggregated data into an array and sort it by combined relevance and impact
  const sectors = Object.entries(sectorData)
    .map(([sector, { relevance, impact }]) => ({
      sector,
      relevance,
      impact,
      total: relevance + impact,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 4);

  return (
    <TopProductsWrap>
      <div className="block-head">
        <BlockTitle className="block-title">
          <h3>Top Sectors</h3>
        </BlockTitle>
      </div>
      <div className="tbl-products">
        <table>
          <thead>
            <tr>
              <th># </th>
              <th>Sector </th>
              <th>Total Relevance </th>
              <th>Total Impact</th>
            </tr>
          </thead>
          <tbody>
            {sectors?.map((sector, index) => {
              return (
                <tr key={sector.sector}>
                  <td>{index + 1}</td>
                  <td>{sector.sector}</td>
                  <td>
                    <div className="tbl-progress-bar">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${sector.relevance * 0.1}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                  <td>
                    <div className="tbl-badge">{sector.impact}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TopProductsWrap>
  );
};

export default TopProducts;
