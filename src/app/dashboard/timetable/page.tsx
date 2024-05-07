/* Components */
import { Card, CardBody, CardHeader } from "@nextui-org/react";

/* It's going to be a scheduler, with the ability to choose levels and edit the current time plan for each level and save those changes, how to edit same as in google calendar, and each time the admin changes the timetable we should send a notification to all teacher and student in that level informing them about the new time plan. */

function TimeTable() {
  return (
    <Card fullWidth className="h-full">
      <CardHeader></CardHeader>
      <CardBody></CardBody>
    </Card>
  );
}

export default TimeTable;
