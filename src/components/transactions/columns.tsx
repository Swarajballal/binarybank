
import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  type: "deposit" | "withdrawal" 
  date: Date  
}


export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "type",  
    header: "Transaction Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "date",  
    header: "Transaction Date",
  },
]

