"use client";
/* Utils */
import { useState, useMemo, useCallback } from "react";

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
  fullName: string;
  id: number;
  email: string;
  subjects?: string[];
  level?: string;
};

interface Props {
  users: User[];
  role: string;
}

function UsersGrid({ users, role }: Props) {
  const [page, setPage] = useState<number>(1);
  const renderCell = useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "subjects":
        return cellValue.map((subject: string, index: number) => (
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
        ));

      case "level":
        return (
          <Chip
            className="capitalize"
            color="secondary"
            size="md"
            radius="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );

      default:
        return cellValue;
    }
  }, []);

  const rowsPerPage = 8;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

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
      key: "level",
      label: "Level",
    });
  }

  return (
    <Table
      fullWidth
      isStriped
      color="secondary"
      selectionMode="single"
      aria-label="User's Data"
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
            total={pages}
            loop
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-full",
        th: "shadow-md",
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

      {users.length > 0 ? (
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className="p-4">
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
