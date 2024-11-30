

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
import { getContactsList } from "~/services/contactService"
import {  useLoaderData } from "@remix-run/react"
import { DataTable } from "~/components/data-table"



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


export const loader = async () => {
  const contacts = await getContactsList();

  return { contacts: contacts };
};


export default function PhoneBook() {
  const { contacts } = useLoaderData<typeof loader>();




  return (
    <div className="w-3/5 mx-auto mt-12">

      <div className="rounded-md border">
        <DataTable columns={columns} data={contacts} hasGlobalSearch hasPaginate />
      </div>
      <p className="text-xs text-slate-500 m-4">جهت هرگونه تغییرات و حذف اضافه با قسمت اطلاعات تماس بگیرید</p>

    </div>
  )
}
