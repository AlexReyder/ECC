"use client";
import LongText from "@/shared/shadcnui/long-text";
import { DataTableRowActions } from "@/shared/shadcnui/product-table/data-table-row-actions";
import { ProductsDb } from "@/shared/types/validation/products";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<ProductsDb>[] = [
  {
    id: "isActive",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Активирован" />
    ),
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <LongText className="max-w-36">{isActive ? "Да" : "Нет"}</LongText>
      );
    },
    meta: { className: "w-18" },
  },
  {
    accessorKey: "name",
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Название" />
    ),
    cell: ({ row }) => {
      const name = row.original.name;
      return <LongText className="max-w-36">{name}</LongText>;
    },
    enableSorting: false,
    meta: { className: "w-36" },
  },
  {
    accessorKey: "articleNumber",
    id: "articleNumber",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Артикул" />
    ),
    cell: ({ row }) => {
      const name = row.original.articleNumber;
      return <LongText className="max-w-36">{name}</LongText>;
    },
    enableSorting: false,
    meta: { className: "w-36" },
  },
  {
    id: "description",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Описание" />
    ),
    cell: ({ row }) => {
      const description = row.original.description;
      return <LongText className="max-w-36">{description}</LongText>;
    },

    meta: { className: "w-36" },
  },
  {
    id: "category",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Категория" />
    ),
    cell: ({ row }) => {
      const category = row.original.category[0].label;
      return <LongText className="max-w-36">{category}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    id: "price",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Стоимость" />
    ),
    cell: ({ row }) => {
      const price = row.original.price;
      const strPrice = JSON.stringify(price);
      const replaceOnePrice = strPrice.replace("{", "").replace("}", "");
      return <LongText className="max-w-36">{replaceOnePrice}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    id: "colors",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Цвета" />
    ),
    cell: ({ row }) => {
      let colors: string[] = [];
      const colorsArr = row.original.colors.forEach((color: any) =>
        colors.push(color.label),
      );
      const colorStr = colors.join(",");
      return <LongText className="max-w-36">{colorStr}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    id: "sizes",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Размеры" />
    ),
    cell: ({ row }) => {
      let sizes: string[] = [];
      const colorsArr = row.original.sizes.forEach((size: any) =>
        sizes.push(size.label),
      );
      const sizesStr = sizes.join(", ");
      return <LongText className="max-w-36">{sizesStr}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    id: "material",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Материалы" />
    ),
    cell: ({ row }) => {
      const material =
        row.original.material.length > 0 ? row.original.material[0].label : "";
      return <LongText className="max-w-36">{material}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    accessorKey: "createdAt",
    id: "createdAt",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Создан" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return (
        <div>
          {date.toLocaleString("ru-RU", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
          })}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: DataTableRowActions,
  },
];
