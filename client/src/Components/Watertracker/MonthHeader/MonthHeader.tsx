import React from "react";
import { v4 } from "uuid";
import { OverlayScrollbars } from "overlayscrollbars";
import { useMonthHeader } from "./MonthHeader.hooks";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  List,
  ListItem,
  Skeleton,
} from "@mui/material";
import { TimeTraverseModal } from "../Modals/TimeTraverseModal/TimeTraverseModal";
import { Statistics } from "../DataToView/Statistics/Statistics";
import { ExtendedStatistics } from "../DataToView/Statistics/ExtendedStatistics";
import classes from "./MonthHeader.module.css";

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

interface MonthControlsProps {
  date: Date;
}

/**
 * MonthControls component for month overview and time navigation
 */
const MonthHeader: React.FC<MonthControlsProps> = ({ date }) => {
  // Get all necessary data and functions for month controls
  const monthControls = useMonthHeader(date);

  // Loading skeleton for the list of drinks
  const loadingList = (
    <List className={`${classes["list"]}`}>
      {[1, 2, 3, 4, 5, 6, 7].map((_, i, arr) => (
        <React.Fragment key={v4()}>
          <ListItem key={v4()} className={`${classes["list-item"]}`}>
            <Skeleton
              variant="text"
              width={`${monthControls.isMobile ? 10 : 17}rem`}
              height={"1.5rem"}
            />
            <Skeleton variant="text" width={`2.25rem`} height={"1.5rem"} />
          </ListItem>
          {i < arr.length - 1 && (
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

  // Create list of drinks
  const list = (
    <List className={`${classes["list"]}`}>
      {monthControls.drinks.map((drink, i, arr) => (
        <React.Fragment key={v4()}>
          <ListItem key={v4()} className={`${classes["list-item"]}`}>
            <span className={`${classes["list-item__type"]}`}>{`${i + 1}. ${
              drink.type
            }`}</span>
            <span>{`${drink.amount} ${monthControls.translations.l}`}</span>
          </ListItem>
          {i < arr.length - 1 && (
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

  // Create accordion with drinks for mobile view
  const accordionWithDrinks = (
    <Accordion className={`${classes["accordion"]}`}>
      <AccordionSummary
        expandIcon={
          <div className={`${classes["circle"]}`}>
            <svg
              className={`${classes["icon"]}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
            </svg>
          </div>
        }
        aria-controls="panel-content"
        id="panel-header"
      >
        <div className={`${classes["description"]}`}>
          {monthControls.translations.drinksListTitle}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {monthControls.isLoading ? loadingList : list}
      </AccordionDetails>
    </Accordion>
  );

  // Create drink list with scrollable container for large screens
  const drinkList = (
    <div className={`${classes["list__background"]}`}>
      <ScrollableContainer>
        {monthControls.isLoading ? loadingList : list}
      </ScrollableContainer>
    </div>
  );

  // Choose content based on screen size
  const listContent = monthControls.isMobile ? accordionWithDrinks : drinkList;

  return (
    <>
      {monthControls.showTimeTraverse && (
        <TimeTraverseModal closeModal={monthControls.closeModal} />
      )}
      <Grid item xs={12}>
        <div className={classes["month-controls__wrapper"]}>
          <Grid container>
            <Grid item lg={6} xs={12}>
              <div className={classes["month-controls-container"]}>
                <div className={classes["header-container"]}>
                  {monthControls.isLoading ? (
                    <Skeleton
                      variant="rounded"
                      width={"10rem"}
                      height={"1.8rem"}
                    />
                  ) : (
                    <h3 className={classes["header"]}>
                      {monthControls.translations.title}
                    </h3>
                  )}
                </div>
                <div className={`flex justify-center align-center`}>
                  {monthControls.isLoading ? (
                    <Skeleton
                      className="mt-8"
                      variant="rounded"
                      width={"14rem"}
                      height={"2.75rem"}
                    />
                  ) : (
                    <div
                      onClick={monthControls.openModal}
                      className={classes["button"]}
                    >
                      <div className={classes["button-output"]}>
                        {monthControls.translations.navigate}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <Statistics {...monthControls.statisticsConfig} />
                </div>
                <ExtendedStatistics
                  {...monthControls.extendedStatisticsConfig}
                />
              </div>
            </Grid>
            <Grid item lg={6} xs={12}>
              {!monthControls.isMobile && (
                <h5 className={classes["sub-header"]}>
                  {monthControls.translations.drinksListTitle}
                </h5>
              )}
              {!monthControls.isMobile && (
                <Divider
                  style={{ margin: "0.5rem 1rem" }}
                  orientation={"horizontal"}
                  variant={"middle"}
                  component={"div"}
                />
              )}
              {listContent}
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
};

export default MonthHeader;
