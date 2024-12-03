import { Container } from "@mui/material";
import Menu from "../Components/Menu/Menu";
import { Archive } from "../Components/Watertracker/Archive/Archive";
import Footer from "../Components/Footer/Footer";
import { Tracker } from "../Components/Watertracker/Tracker/Tracker";
import { Day } from "../Components/Watertracker/DataToView/Day/Day";

/**
 * Water Tracker Page
 */
const ArchivePage = () => {
  return (
    <>
      <Menu />
      <Container fixed disableGutters>
        <Archive />
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
        <Tracker />
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

export { ArchivePage, CurrentMonthPage, DayPage };
