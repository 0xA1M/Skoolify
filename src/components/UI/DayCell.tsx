/* Utils */
import { Dispatch, SetStateAction } from "react";
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";

/* Components */
import { Button } from "@nextui-org/react";

interface DayCellProps {
  selectedDate: CalendarDate;
  day: number;
  setDay: Dispatch<SetStateAction<number>>;
}

const DayCell = ({ selectedDate, day, setDay }: DayCellProps) => {
  return (
    <p className="w-14 h-8">
      <span className="w-full h-full flex items-center justify-center">
        {new DateFormatter(getLocalTimeZone(), {
          weekday: "narrow",
        }).format(selectedDate.toDate(getLocalTimeZone()))}
      </span>

      <Button
        isIconOnly
        radius="full"
        size="sm"
        onClick={() => setDay(selectedDate.day)}
        className={`flex items-center justify-center text-sm ${
          selectedDate.day === day
            ? "bg-primary-500 text-white font-bold"
            : "bg-foreground bg-opacity-5"
        }`}
      >
        {selectedDate.day}
      </Button>
    </p>
  );
};

export default DayCell;
