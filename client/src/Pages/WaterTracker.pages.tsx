import { Container } from "@mui/material";
import Menu from "../Components/Menu/Menu";
import { MonthTraverse } from "../Components/Watertracker/MonthTraverse/MonthTraverse";
import Footer from "../Components/Footer/Footer";
import { CurrentMonth } from "../Components/Watertracker/CurrentMonth/CurrentMonth";
import { Day } from "../Components/Watertracker/DataToView/Day/Day";

/**
 * Water Tracker Page
 */
const TimeTraversePage = () => {
  return (
    <>
      <Menu />
      <Container fixed disableGutters>
        <MonthTraverse />
      </Container>
      <Footer />
    </>
  );
};

const CurrentMonthPage = () => {
  return (
    <>
      <Menu />
      <Container fixed disableGutters>
        <CurrentMonth />
      </Container>
      <Footer />
    </>
  );
};

const DayPage = () => {
  return (
    <>
      <Menu />
      <Container fixed disableGutters>
        <Day />
      </Container>
      <Footer />
    </>
  );
};

export { TimeTraversePage, CurrentMonthPage, DayPage };
