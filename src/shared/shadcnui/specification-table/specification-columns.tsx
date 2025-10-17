"use client";
import LongText from "@/shared/shadcnui/long-text";
import { DataTableColumnHeader } from "@/shared/shadcnui/specification-table/data-table-column-header";
import { DataTableRowActions } from "@/shared/shadcnui/specification-table/data-table-row-actions";
import { SpecificationAdmin } from "@/shared/types/schemas";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<SpecificationAdmin>[] = [
  {
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Название" />
    ),
    cell: ({ row }) => {
      const name = row.original.name;
      return <LongText className="w-full">{name}</LongText>;
    },

    meta: { className: "w-full" },
  },

  {
    id: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Пол" />
    ),
    cell: ({ row }) => {
      const name = row.original.gender === "MAN" ? "Мужской" : "Женский";
      return <LongText className="w-full">{name}</LongText>;
    },

    meta: { className: "w-full" },
  },
  {
    id: "actions",
    cell: DataTableRowActions,
  },
];

