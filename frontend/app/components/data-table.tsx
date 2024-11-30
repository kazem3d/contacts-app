import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    getPaginationRowModel,
    Row,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table"
import { useState } from "react"
import { Input } from "../components/ui/input"

import { FileUp } from "lucide-react"

import { DataTablePagination } from "./data-table-pagination"
import { Button } from "./ui/button"


const CLIENT_SIDE_PAGE_SIZE = 10

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    filterColumn?: string
    hasGlobalSearch?: boolean
    exportFn?: (rows: Row<TData>[]) => void;
    hasPaginate?: boolean;

}



export function DataTable<TData, TValue>({
    columns,
    data,
    filterColumn,
    hasGlobalSearch,
    exportFn,
    hasPaginate,
}: DataTableProps<TData, TValue>) {


    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: hasPaginate ? false : true,
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            columnFilters,
            globalFilter
        },
        initialState: {
            pagination: {
                pageSize: CLIENT_SIDE_PAGE_SIZE,
            },
        },
    })



    return (
        <div>
            <div className="flex items-center justify-between p-4">
                {filterColumn &&
                    <Input
                        placeholder="جستجو ..."
                        value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn(filterColumn)?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />}
                {hasGlobalSearch &&
                    <Input
                        placeholder="جستجو ..."
                        value={globalFilter ?? ''}
                        onChange={value => setGlobalFilter(String(value.target.value))}
                        className="max-w-sm"
                    />}
                <div >
                    <div className="flex">
                        {exportFn &&
                            <Button className="h-8 gap-1 mx-2" onClick={() => exportFn(table.getFilteredRowModel().rows)} variant='outline'>
                                <FileUp className=" h-3.5 w-3.5" />
                                Excel
                            </Button>
                        }
                    </div>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-center">
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
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="text-center"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    نتیجه ای وجود ندارد!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    
                </Table>
            </div>
            {hasPaginate && <DataTablePagination table={table} />}

        </div>

    )
}
