/* Components */
import { Card, CardBody, Divider } from "@nextui-org/react";
import CountUp from "react-countup";

interface Props {
  role: string;
  val: number;
  Icon: React.JSX.Element;
  isSmall?: boolean;
  className?: string;
}

function StatsCard({ role, val, isSmall, Icon, className }: Props) {
  return (
    <Card className={`${isSmall ? "" : "h-[5.5rem]"}`}>
      <CardBody
        className={`w-full flex flex-row items-center justify-center ${className}`}
      >
        {Icon}

        <Divider orientation="vertical" />

        <div
          className={`mx-auto text-center ${
            isSmall ? "flex items-center justify-center gap-4" : ""
          }`}
        >
          {isSmall ? (
            <h2 className="text-lg font-semibold">{role}s</h2>
          ) : (
            <h2 className="font-semibold">Number of {role}s</h2>
          )}

          <CountUp end={val} duration={2.5} className="text-xl font-bold" />
        </div>
      </CardBody>
    </Card>
  );
}

export default StatsCard;
