const ARCHIVE = "archive";
const TRACKER = "tracker";

const RoutesValues = {
  root: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  archiveMonth: `/${ARCHIVE}/:monthIndex`,
  archiveDay: `/${ARCHIVE}/:monthIndex/:date`,
  archive: `/${ARCHIVE}`,
  tracker: `/${TRACKER}`,
  trackerDayDynamic: `/${TRACKER}/:date`,
  trackerDay: `/${TRACKER}`,
  notFound: "/404",
};

export default RoutesValues;
