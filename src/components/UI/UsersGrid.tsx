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
} from "@nextui-org/react";

/* Types */
export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  groups?: string[];
  profilePic?: string;
  subjects?: string[];
  levels?: string[];
  role: string;
};

interface Props {
  users: User[];
  role: string;
  search: string;
  selectedUser: number;
  setSelectedUser: Dispatch<SetStateAction<number>>;
}

function UsersGrid({
  users,
  role,
  search,
  selectedUser,
  setSelectedUser,
}: Props) {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const renderCell = useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "subjects":
        return (
          <div className="max-w-[300px] w-full flex">
            {cellValue.map(
              (subject: string, index: number) =>
                index <= 2 && (
                  <Chip
                    key={index}
                    className="capitalize mx-1"
                    color="secondary"
                    size="md"
                    radius="sm"
                    variant="flat"
                  >
                    {subject}
                  </Chip>
                )
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
            color="secondary"
            size="md"
            radius="sm"
            variant="flat"
          >
            {cellValue[0]}
          </Chip>
        );

      case "groups":
        return (
          <div className="max-w-[300px] w-full flex">
            {cellValue.map(
              (group: string, index: number) =>
                index <= 2 && (
                  <Chip
                    key={index}
                    className="capitalize mx-1"
                    color="secondary"
                    size="md"
                    radius="sm"
                    variant="flat"
                  >
                    {group}
                  </Chip>
                )
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

      default:
        return cellValue;
    }
  }, []);

  const rowsPerPage = 8;

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
    const pages = Math.ceil(filteredUsers.length / rowsPerPage);
    setTotalPages(pages);

    // Perform pagination on the filtered or original user list
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredUsers.slice(start, end);
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

  if (role === "teacher") {
    columns.push({
      key: "subjects",
      label: "Subjects",
    });
  } else {
    columns.push({
      key: "levels",
      label: "Levels",
    });

    columns.push({
      key: "groups",
      label: "Groups",
    });
  }

  /* Reset The pagination each time the search value is updated */
  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <Table
      fullWidth
      isStriped
      color="secondary"
      selectionBehavior="toggle"
      selectionMode="single"
      aria-label="User's Data"
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
      <TableHeader columns={columns} className="">
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
  );
}

export default UsersGrid;
