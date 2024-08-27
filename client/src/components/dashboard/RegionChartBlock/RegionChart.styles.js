import styled from "styled-components";
import { BlockWrapStyles } from "../../../styles/global/default";

export const RegionChartWrap = styled.div`
  ${BlockWrapStyles}

  .pie-chart {
    width: 100%;
    height: 500px;
  }

  .block-foot {
    .legend-info {
      margin-top: 16px;
    }

    .legend-info-item {
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .info-item-icon {
        min-width: 20px;
        width: 20px;
        height: 20px;
        border-radius: 4px;
      }
    }

    .info-item-l {
      display: flex;
      align-items: center;
      column-gap: 10px;
    }

    .info-item-title {
      font-size: 14px;
      color: ${(props) => props.theme.colors.cadet};
    }

    .info-item-val {
      font-size: 14px;
      font-weight: 600;
      color: ${(props) => props.theme.colors.cadet};
    }
  }
`;
