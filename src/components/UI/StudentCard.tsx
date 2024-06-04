/* Components */
import { Button, Card, CardBody, Chip, User } from "@nextui-org/react";

/* Assets */
import { FaRegMessage } from "react-icons/fa6";

interface Props {
  name: string;
  description: string;
  groups: {
    value: string;
    label: string;
  }[];
  profilePic?: string;
}

function StudentCard({ profilePic, name, description, groups }: Props) {
  return (
    <Card fullWidth className="min-h-20">
      <CardBody className="px-6 flex flex-row items-center justify-between">
        <User
          name={<p className="text-medium">{name}</p>}
          description={<p className="text-sm text-zinc-500">{description}</p>}
          avatarProps={{
            src: profilePic,
            showFallback: true,
            color: "primary",
          }}
        />

        <div aria-label="groups" className="flex items-center gap-2">
          {groups.map((group, index) => (
            <>
              {index < 3 && (
                <Chip
                  key={group.value}
                  radius="sm"
                  color="primary"
                  variant="dot"
                >
                  {group.label}
                </Chip>
              )}
            </>
          ))}

          {groups.length > 3 && (
            <div className="ml-1 flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-secondary-500"></div>
              <div className="w-1 h-1 rounded-full bg-secondary-500"></div>
              <div className="w-1 h-1 rounded-full bg-secondary-500"></div>
            </div>
          )}
        </div>

        <Button isIconOnly radius="sm" variant="light" color="primary">
          <FaRegMessage size={20} />
        </Button>
      </CardBody>
    </Card>
  );
}

export default StudentCard;
