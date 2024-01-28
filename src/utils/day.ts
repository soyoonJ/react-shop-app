import dayjs from "dayjs";

export const formatTime = (time: Date | string, format = "YYYY.MM.DD") => {
  return dayjs(time).format(format);
};
