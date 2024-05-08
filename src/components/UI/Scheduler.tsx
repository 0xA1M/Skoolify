"use client";
/* Utils */
import { useState, useEffect } from "react";
import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useTheme } from "next-themes";

/* Components */
import { viewWeek } from "@schedule-x/calendar";

/* Plugins */
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createResizePlugin } from "@schedule-x/resize";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createEventRecurrencePlugin } from "@schedule-x/event-recurrence";

/* Styles */
import "@schedule-x/theme-default/dist/index.css";

/* Types */

type Event = {
  id: string | number;
  start: string;
  end: string;
  calendarId: string;
  title?: string;
  description?: string;
  location?: string;
  people?: string[];
  rrule?: string;
};

interface Props {
  level: string | Object;
}

function Scheduler({ level }: Props) {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      calendarId: "school",
      title: "Coffee with John",
      start: "2024-05-08 10:00",
      end: "2024-05-08 10:30",
    },
    {
      id: 2,
      calendarId: "school",
      title: "Ski trip",
      start: "2024-05-08 11:00",
      end: "2024-05-08 12:00",
    },
  ]);
  const [mounted, setMounted] = useState<boolean>(false);
  const { resolvedTheme } = useTheme();

  const calendar = useNextCalendarApp({
    views: [viewWeek],
    firstDayOfWeek: 0,
    selectedDate: today(getLocalTimeZone()).toString(),
    locale: "en-UK",
    dayBoundaries: {
      start: "08:00",
      end: "18:00",
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
    events: events,
    plugins: [
      createDragAndDropPlugin(30),
      createResizePlugin(30),
      createEventModalPlugin(),
      createEventRecurrencePlugin(),
    ],
  });

  calendar?.setTheme(resolvedTheme === "light" ? "light" : "dark");

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
