import { useContext } from "react";
import { Icons } from "../../../assets/icons";
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import { SalesBlockWrap } from "./Sales.styles";
import DataContext from "../../../context/DataContext";

const SalesBlock = () => {
  const data = useContext(DataContext);

  const totalIntensity = data.reduce((acc, item) => acc + item.intensity, 0);

  const averageRelevance = (
    data.reduce((acc, item) => acc + item.relevance, 0) / data.length
  ).toFixed(1);

  const totalLikelihood = data.reduce((acc, item) => acc + item.likelihood, 0);

  const mostCommonPestle = data
    .map((item) => item.pestle)
    .reduce(
      (acc, curr, _, arr) =>
        arr.filter((v) => v === curr).length >
        arr.filter((v) => v === acc).length
          ? curr
          : acc,
      ""
    );

  return (
    <SalesBlockWrap>
      <div className="block-head">
        <div className="block-head-l">
          <BlockTitle className="block-title">
            <h3>Data Insights</h3>
          </BlockTitle>
          <p className="text">Summary of collected data</p>
        </div>
        <div className="block-head-r">
          <button type="button" className="export-btn">
            <img src={Icons.ExportDark} alt="" />
            <span className="text">Export</span>
          </button>
        </div>
      </div>
      <BlockContentWrap>
        <div className="cards">
          <div className="card-item card-misty-rose">
            <div className="card-item-icon">
              <img src={Icons.CardSales} alt="" />
            </div>
            <div className="card-item-value">{totalIntensity}</div>
            <p className="card-item-text text">Total Intensity</p>
            <span className="card-item-sm-text">
              Sum of all intensity values
            </span>
          </div>
          <div className="card-item card-latte">
            <div className="card-item-icon">
              <img src={Icons.CardOrder} alt="" />
            </div>
            <div className="card-item-value">{averageRelevance}</div>
            <p className="card-item-text text">Average Relevance</p>
            <span className="card-item-sm-text">Average relevance score</span>
          </div>
          <div className="card-item card-nyanza">
            <div className="card-item-icon">
              <img src={Icons.CardProduct} alt="" />
            </div>
            <div className="card-item-value">{totalLikelihood}</div>
            <p className="card-item-text text">Total Likelihood</p>
            <span className="card-item-sm-text">
              Sum of all likelihood values
            </span>
          </div>
          <div className="card-item card-pale-purple">
            <div className="card-item-icon">
              <img src={Icons.CardCustomer} alt="" />
            </div>
            <div className="card-item-value">{mostCommonPestle}</div>
            <p className="card-item-text text">Most Common PESTLE</p>
            <span className="card-item-sm-text">
              Most frequent PESTLE category
            </span>
          </div>
        </div>
      </BlockContentWrap>
    </SalesBlockWrap>
  );
};

export default SalesBlock;
