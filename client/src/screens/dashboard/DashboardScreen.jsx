import {
  Customer,
  Revenue,
  Sales,
  Visitors,
  TopProducts,
  VolumeService,
} from "../../components";
import RegionChart from "../../components/dashboard/RegionChartBlock/RegionChart";
import TopicsPolarAreaChart from "../../components/dashboard/TopicsPolarAreaChart/TopicsPolarAreaChart";
import { DashboardScreenWrap } from "./DashboardScreen.styles";

const DashboardScreen = () => {
  return (
    <DashboardScreenWrap className="content-area">
      <div className="area-row ar-one">
        <Sales />
        <Visitors />
      </div>
      <div className="area-row ar-two">
        <Revenue />
        <Customer />
        <RegionChart />
        <TopicsPolarAreaChart />
        <TopProducts />
        <VolumeService />
      </div>
    </DashboardScreenWrap>
  );
};

export default DashboardScreen;
