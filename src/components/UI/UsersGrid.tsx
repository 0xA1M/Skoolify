"use client";
/* Utils */
import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";

/* Components */
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
  Chip,
  Button,
} from "@nextui-org/react";
import { LuCheckCircle, LuXCircle } from "react-icons/lu";

/* Types */
export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  profilePic?: string;
  subjects?: {
    subject: string;
    group: string;
    sessions?: number;
  }[];
  levels?: string[];
  role: string;
};

interface Props {
  users: User[];
  role: string;
  search: string;
  selectedUser: number;
  enrolled?: boolean;
  setSelectedUser: Dispatch<SetStateAction<number>>;
}

function UsersGrid({
  users,
  role,
  search,
  selectedUser,
  setSelectedUser,
  enrolled,
}: Props) {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const renderCell = useCallback(
    (user: any, columnKey: any) => {
      const cellValue = user[columnKey as keyof User];
      interface SubjectProps {
        value: { subject: string; group: string }[];
      }

      const TeacherSubjects = ({ value }: SubjectProps) => (
        <>
          {value.slice(0, 3).map((obj, index) => (
            <Chip
              key={index}
              className="capitalize mx-1"
              color="secondary"
              size="md"
              radius="sm"
              variant="flat"
            >
              {obj.subject}
            </Chip>
          ))}
        </>
      );

      const StudentSubjects = ({ value }: SubjectProps) => (
        <>
          {value.slice(0, 3).map((obj, index) => (
            <Chip
              key={index}
              className="capitalize mx-1"
              color="secondary"
              size="md"
              radius="sm"
              variant="flat"
            >
              {obj.group}
            </Chip>
          ))}
        </>
      );

      // Approve Student' Enrollment
      const handleApprove = (id: string) => {
        console.log(users[parseInt(id) - 1]);
      };

      // Discard Student's Enrollment
      const handleDiscard = (id: string) => {
        console.log(users[parseInt(id) - 1]);
      };

      switch (columnKey) {
        case "subjects":
          return (
            <div className="max-w-[300px] w-full flex">
              {role === "teacher" ? (
                <TeacherSubjects value={cellValue} />
              ) : (
                <StudentSubjects value={cellValue} />
              )}

              {cellValue.length > 3 && (
                <div className="ml-1 flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-secondary-500"></div>
                  <div className="w-1 h-1 rounded-full bg-secondary-500"></div>
                  <div className="w-1 h-1 rounded-full bg-secondary-500"></div>
                </div>
              )}
            </div>
          );

        case "levels":
          return (
            <Chip
              className="capitalize"
              color="primary"
              size="md"
              radius="sm"
              variant="flat"
            >
              {cellValue[0]}
            </Chip>
          );

        case "actions":
          return (
            <div className="flex items-center gap-1">
              <Button
                aria-label="Approve"
                isIconOnly
                size="sm"
                variant="light"
                color="success"
                onClick={() => handleApprove(user.id)}
              >
                <LuCheckCircle size={24} />
              </Button>

              <Button
                aria-label="Discard"
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                onClick={() => handleDiscard(user.id)}
              >
                <LuXCircle size={24} />
              </Button>
            </div>
          );

        default:
          return cellValue;
      }
    },
    [role, users]
  );

  const rowsPerPage = enrolled ? 8 : 7;

  const items = useMemo(() => {
    // Filter users only if a search value exists
    const filteredUsers = search
      ? users.filter(
          (user) =>
            user.fullName.toLowerCase().includes(search.toLowerCase()) ||
            parseInt(user.id) == parseInt(search)
        ) /* to add search by subject
         ||
            user.subjects?.includes(
              search.charAt(0).toUpperCase() + search.slice(1)
            )  */
      : users; // Use all users if no search

    // Calculate the total number of pages to display in the pagination
    const pages = Math.ceil(filteredUsers?.length / rowsPerPage); // error : i add ?
    setTotalPages(pages);

    // Perform pagination on the filtered or original user list
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredUsers?.slice(start, end);
  }, [page, rowsPerPage, search, users]);

  let columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "fullName",
      label: "Full Name",
    },
    {
      key: "email",
      label: "Email",
    },
  ];

  let enrolledColumns = [
    {
      key: "fullName",
      label: "Full Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "levels",
      label: "Level",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  if (role === "teacher") {
    columns.push({
      key: "subjects",
      label: "Subjects",
    });
  } else if (role === "student") {
    columns.push({
      key: "levels",
      label: "Levels",
    });

    columns.push({
      key: "subjects",
      label: "Groups",
    });
  } else {
    columns.push({
      key: "phone",
      label: "Phone",
    });
  }

  /* Reset The pagination each time the search value is updated */
  useEffect(() => {
    setPage(1);
  }, [search]);

  return enrolled ? (
    <Table
      fullWidth
      isStriped
      color="secondary"
      selectionBehavior="toggle"
      selectionMode="single"
      aria-label="Enrolled Users Data"
      onRowAction={(key) => setSelectedUser(parseInt(key.toString()))}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            size="sm"
            showControls
            showShadow
            variant="flat"
            color="primary"
            page={page}
            total={totalPages}
            loop
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-full",
      }}
      className="col-span-4 row-span-5 col-start-1 row-start-2"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            className="p-4 text-medium bg-primary-500 text-white"
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      {items.length > 0 ? (
        <TableBody items={items}>
          {(item) => (
            <TableRow
              key={item.id}
              className={`rounded-lg relative ${
                parseInt(item.id) === selectedUser ? "blue-dot" : "remove-dot"
              }`}
            >
              {(columnKey) => (
                <TableCell className="p-4 first-of-type:rounded-s-lg last-of-type:rounded-e-lg">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      ) : (
        <TableBody emptyContent={"There is nothing here!"}>{[]}</TableBody>
      )}
    </Table>
  ) : (
    <Table
      fullWidth
      isStriped
      color="secondary"
      selectionBehavior="toggle"
      selectionMode="single"
      aria-label="Non Enrolled Users Data"
      onRowAction={(key) => setSelectedUser(parseInt(key.toString()))}
      bottomContent={
        <div className="flex w-full justify-center mb-4">
          <Pagination
            isCompact
            size="sm"
            showControls
            showShadow
            variant="flat"
            color="primary"
            page={page}
            total={totalPages}
            loop
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-full",
      }}
      className="col-span-4 row-span-5 col-start-1 row-start-2"
    >
      <TableHeader columns={role === "teacher" ? columns : enrolledColumns}>
        {(column) => (
          <TableColumn
            key={column.key}
            className="p-4 text-medium bg-primary-500 text-white"
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      {items?.length > 0 ? (
        <TableBody items={items}>
          {(item) => (
            <TableRow
              key={item.id}
              className={`rounded-lg relative ${
                parseInt(item.id) === selectedUser ? "blue-dot" : "remove-dot"
              }`}
            >
              {(columnKey) => (
                <TableCell className="p-4 first-of-type:rounded-s-lg last-of-type:rounded-e-lg">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      ) : (
        <TableBody emptyContent={"There is nothing here!"}>{[]}</TableBody>
      )}
    </Table>
  );
}

export default UsersGrid;
