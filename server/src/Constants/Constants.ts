import { ControlsData } from "../Types/WaterTracker";

const DB_WATERTRACKER_PATH = "waterTracker";
const DB_DATA_PATH = `${DB_WATERTRACKER_PATH}/data`;
const DB_CONTROLS_PATH = `${DB_WATERTRACKER_PATH}/controls`;

const EMPTY = "empty";

const CONTROLS_INIT = { amount: 100, goal: 1000 } as ControlsData;

const MIN_GOAL = 500;
const MAX_GOAL = 9000;
const MIN_AMOUNT = 0;
const MAX_AMOUNT = 9000;
const MIN_CONTROL_AMOUNT = 100;
const MAX_CONTROL_AMOUNT = 9000;
const TODAY = new Date();
const CURRENT_YEAR = TODAY.getFullYear();
const MIN_YEAR = CURRENT_YEAR - 2;
const MAX_YEAR = CURRENT_YEAR + 2;
const MIN_MONTH_INDEX = 0;
const MAX_MONTH_INDEX = 11;
const MAX_TYPE_LENGTH = 40;

enum SingleDayKeys {
  date = "date",
  goal = "goal",
}

enum ControlKeys {
  amount = "amount",
  goal = "goal",
  type = "type",
}

enum HTTPStatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_CONTENT = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export {
  DB_WATERTRACKER_PATH,
  DB_DATA_PATH,
  DB_CONTROLS_PATH,
  EMPTY,
  CONTROLS_INIT,
  MIN_GOAL,
  MAX_GOAL,
  MIN_AMOUNT,
  MAX_AMOUNT,
  CURRENT_YEAR,
  MAX_YEAR,
  MIN_YEAR,
  MIN_MONTH_INDEX,
  MAX_MONTH_INDEX,
  MIN_CONTROL_AMOUNT,
  MAX_CONTROL_AMOUNT,
  MAX_TYPE_LENGTH,
  TODAY,
  SingleDayKeys,
  HTTPStatusCodes,
  ControlKeys,
};
