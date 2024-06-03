/* Components */
import { Card, CardBody, Divider } from "@nextui-org/react";
import CountUp from "react-countup";

/* Assets */
import { BsPersonGear } from "react-icons/bs";
import { GoMortarBoard } from "react-icons/go";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

interface Props {
  role: string;
  val: number;
}

function StatsCard({ role, val }: Props) {
  return (
    <Card className="h-[5.5rem]">
      <CardBody className="w-full flex flex-row items-center">
        {role === "Student" && <GoMortarBoard size={36} className="mx-3" />}
        {role === "Teacher" && (
          <LiaChalkboardTeacherSolid size={36} className="mx-3" />
        )}
        {role === "Staff" && <BsPersonGear size={36} className="mx-3" />}

        <Divider orientation="vertical" />

        <div className="mx-auto text-center">
          <h2 className="font-semibold">Number of {role}s</h2>

          <CountUp end={val} duration={2.5} className="text-xl font-bold" />
        </div>
      </CardBody>
    </Card>
  );
}

export default StatsCard;
