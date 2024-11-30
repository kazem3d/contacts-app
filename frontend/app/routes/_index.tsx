

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "../components/ui/button"
import { Checkbox } from "../components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Input } from "../components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"

const data: Contact[] = [
  {
    id: "m5gr84i9",
    name:"sas",
    int_phone:"123",
    out_phone:"123",
    ip_phone:"",
    job:"sss"
  },
  {
    id: "3u1reuv4",
    name:"sas",
    int_phone:"123",
    out_phone:"123",
    ip_phone:"",
    job:"sss"
  },
  {
    name:"sas",
    id: "derv1ws0",
    int_phone:"123",
    out_phone:"123",
    ip_phone:"",
    job:"sss"
  },
  {
    id: "5kma53ae",
    name:"sas",
    int_phone:"123",
    out_phone:"123",
    ip_phone:"",
    job:"sss"
  },
  {
    id: "bhqecj4p",
    name:"sas",
    int_phone:"123",
    out_phone:"123",
    ip_phone:"",
    job:"sss"
  },
]

export type Contact = {
  id: string
  job: string
  name: string
  int_phone: string
  out_phone?: string
  ip_phone?: string
  fax?: string
}

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "name",
    header: "نام",
    cell: ({ row }) => (
      <div >{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "job",
    header: "محل کار"
  },
  {
    accessorKey: "int_phone",
    header: "داخلی"
  },
  {
    accessorKey: "out_phone",
    header: "مستقیم"
  },
  {
    accessorKey: "ip_phone",
    header: "IP Phone"
  },
  {
    accessorKey: "fax",
    header: "فکس"
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>ویرایش</DropdownMenuItem>
            <DropdownMenuItem>حذف</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function PhoneBook() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4 mx-5">
        <Input
          placeholder="جستجوی نام یا محل کار ..."
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value.target.value))}
          className="max-w-full py-6"
        />

      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow  key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-center" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                className="text-center"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  چیزی یافت نشد
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} از{" "}
          {table.getFilteredRowModel().rows.length} ردیف.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            قبل
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            بعد
          </Button>
        </div>
      </div>
    </div>
  )
}
