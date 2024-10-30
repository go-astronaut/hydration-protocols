type DateFormat =
  | "DD.MM.YYYY.HH"
  | "DD.MM.YYYY"
  | "DD.MM.YY"
  | "MM-YYYY"
  | "WW-MM-YYYY"
  | "WW-YYYY"
  | "w-M-YYYY"
  | "D MMMM"
  | "D MMM"
  | "D"
  | "HH"
  | "MMMM YYYY";

type MonthIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

interface HeadersReq {
  headers: {
    Authorization: string;
    "Content-Type": string;
  };
}

export type { DateFormat, MonthIndex, HeadersReq };
