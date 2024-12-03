import React from "react";
import { v4 } from "uuid";
import { useTranslation } from "react-i18next";
import { CircularProgress, Divider, List, ListItem } from "@mui/material";
import { OverlayScrollbars } from "overlayscrollbars";
import classes from "./Charts.module.css";

const ChartIsLoading: React.FC = () => {
  return (
    <div className={`${classes["loading-container"]}`}>
      <CircularProgress />
    </div>
  );
};

interface ScrollableContainerProps {
  children: React.ReactNode;
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  children,
}) => {
  // create a ref for the container
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // check if the container ref is set
    if (containerRef.current) {
      // set up the options for the overlay scrollbars
      const options = {
        theme: "dark",
        showNativeScrollbars: false,
        scrollbars: {
          dragScroll: true,
          clickScrolling: true,
        },
      };

      // initialize the overlay scrollbars
      const overlayScrollbarsInstance = OverlayScrollbars(
        containerRef.current,
        options
      );

      // destroy the overlay scrollbars when the component is unmounted
      return () => {
        overlayScrollbarsInstance.destroy();
      };
    }
  }, []);

  return (
    <div ref={containerRef} className={`${classes["legend-container"]}`}>
      {children}
    </div>
  );
};

interface ChartLegendListProps {
  data: {
    id: string;
    label: string;
    value: number;
    color: string;
  }[];
}

const ChartLegendList: React.FC<ChartLegendListProps> = ({ data }) => {
  // Get translations
  const { t } = useTranslation();
  const ml = t("measuringUnits.ml");

  const list = (
    <List className={`${classes["list"]}`}>
      {data.map((item, index, arr) => (
        <React.Fragment key={v4()}>
          <ListItem className={`${classes["list-item"]}`}>
            <div className={`${classes["type-container"]}`}>
              <div
                className={`${classes["color-box"]}`}
                style={{ backgroundColor: item.color }}
              ></div>
              <span>{item.label}</span>
            </div>

            <span>{`${item.value} ${ml}`}</span>
          </ListItem>
          {index < arr.length - 1 && (
            <Divider
              orientation={"horizontal"}
              variant={"middle"}
              component={"li"}
            />
          )}
        </React.Fragment>
      ))}
    </List>
  );

  return (
    <ScrollableContainer>
      <div className={`${classes["list__background"]}`}>{list}</div>
    </ScrollableContainer>
  );
};

/**
 * No Data Element
 */
const NoData: React.FC<{ emptyMessage: string }> = ({ emptyMessage }) => {
  return (
    <div className={`${classes["no-data-container"]}`}>
      <svg
        className={`${classes["icon"]} my-3`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0l1.8 0c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z" />
      </svg>

      <h4 className={`${classes["no-data-text"]}`}>{emptyMessage}</h4>
    </div>
  );
};

export { ChartIsLoading, ScrollableContainer, ChartLegendList, NoData };
