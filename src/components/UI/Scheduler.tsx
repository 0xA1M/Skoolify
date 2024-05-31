"use client";
/* Utils */
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useTheme } from "next-themes";
import { useLocale } from "@react-aria/i18n";

/* Components */
import { viewWeek } from "@schedule-x/calendar";

/* Plugins */
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createResizePlugin } from "@schedule-x/resize";
import { createEventModalPlugin } from "@schedule-x/event-modal";

/* Styles */
import "@schedule-x/theme-default/dist/index.css";

/* Types */
import type { Event } from "@/app/dashboard/timetable/page";

interface Props {
  event: Event;
  removeAll: boolean;
  setRemoveAll: Dispatch<SetStateAction<boolean>>;
}

function Scheduler({ event, removeAll, setRemoveAll }: Props) {
  const [mounted, setMounted] = useState<boolean>(false);
  const { resolvedTheme } = useTheme();
  const { locale } = useLocale();

  const calendar = useNextCalendarApp({
    views: [viewWeek],
    firstDayOfWeek: 0,
    selectedDate: today(getLocalTimeZone()).toString(),
    locale: locale,
    dayBoundaries: {
      start: "08:00",
      end: "16:00",
    },
    weekOptions: {
      gridHeight: 495,
    },
    calendars: {
      school: {
        colorName: "school",
        lightColors: {
          main: "#4169E1",
          container: "#D9E6FD",
          onContainer: "#000000",
        },
        darkColors: {
          main: "#D9E6FD",
          container: "#4169E1",
          onContainer: "#ffffff",
        },
      },
    },
    plugins: [
      createDragAndDropPlugin(30),
      createResizePlugin(30),
      createEventModalPlugin(),
    ],
    callbacks: {
      onEventUpdate(updatedEvent) {
        calendar?.events.update(updatedEvent);
      },
    },
  });

  calendar?.setTheme(resolvedTheme === "light" ? "light" : "dark");

  useEffect(() => {
    if (!calendar?.events.get(event.id)) {
      calendar?.events.add(event);
    } else {
      calendar?.events.update(event);
    }

    console.log(calendar?.events.getAll());
  }, [event, calendar]);

  useEffect(() => {
    if (removeAll) {
      calendar?.events
        .getAll()
        .map((event) => calendar?.events.remove(event.id));

      setRemoveAll(false);
    }
  }, [removeAll, calendar, setRemoveAll]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return;

  return (
    <>
      <ScheduleXCalendar calendarApp={calendar} />
    </>
  );
}

export default Scheduler;
