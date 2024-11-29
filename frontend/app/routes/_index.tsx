import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "../components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination"
import { MoreHorizontal, Download, Printer } from 'lucide-react'

interface Contact {
  id: string
  name: string
  email?: string
  phone: string
  jobTitle?: string
  company?: string
  initials: string
  color: string
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "123",
    phone: "+989171572143",
    initials: "1",
    color: "bg-brown-500",
  },
  {
    id: "2",
    name: "123",
    phone: "+989171572143",
    initials: "1",
    color: "bg-cyan-500",
  },
  {
    id: "3",
    name: "2r",
    phone: "+989184368987",
    initials: "2",
    color: "bg-brown-500",
  },
  {
    id: "4",
    name: "Aa",
    phone: "+992980049042",
    initials: "A",
    color: "bg-purple-500",
  },
  {
    id: "5",
    name: "Aaab",
    jobTitle: "Developer",
    company: "Tech Co",
    phone: "+989354930086",
    initials: "A",
    color: "bg-purple-500",
  },
  // Add more contacts as needed
]

export default function PhoneBook() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.jobTitle && contact.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const pageCount = Math.ceil(filteredContacts.length / itemsPerPage)
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name or job title" 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1) // Reset to first page on new search
            }}
          />
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Contacts <span className="text-muted-foreground">({filteredContacts.length})</span>
        </h2>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone number</TableHead>
              <TableHead>Job title & company</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className={`h-8 w-8 ${contact.color}`}>
                      <AvatarFallback>{contact.initials}</AvatarFallback>
                    </Avatar>
                    {contact.name}
                  </div>
                </TableCell>
                <TableCell>{contact.email || "-"}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.jobTitle ? `${contact.jobTitle}${contact.company ? ` at ${contact.company}` : ''}` : "-"}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Printer className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage(prev => Math.max(prev - 1, 1))
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {[...Array(pageCount)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(i + 1)
                  }}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage(prev => Math.min(prev + 1, pageCount))
                }}
                className={currentPage === pageCount ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

