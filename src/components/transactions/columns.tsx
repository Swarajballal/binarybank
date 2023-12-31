
import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  type: "deposit" | "withdrawal" 
  date: Date  
  balance: number
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
    header: "Type",
    cell: ({ row }) => {
          if (row.original.type === "deposit") {
              return <button className="bg-green-400 dark:bg-green-500 dark:text-black text-white rounded px-2 py-1">Deposit</button>;
          } else if (row.original.type === "withdrawal") {
              return <button className="bg-red-400 dark:bg-red-500 dark:text-black text-white rounded px-2 py-1">Withdrawal</button>;
          } else {
              return row.original.type;
          }
      },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      if (row.original.status === "success") {
        return <button className="bg-green-400 dark:bg-green-500 dark:text-black text-white  rounded px-2 py-1">Success</button>;
      } else {
        return row.original.status;
      }
    },
  },
  {
    accessorKey: "date",  
    header: "Date",
  },
  {
    accessorKey: "balance",  
    header: "Balance",
  },
]

