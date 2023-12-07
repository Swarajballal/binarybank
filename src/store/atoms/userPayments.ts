import { atom } from 'recoil';

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  type: "deposit" | "withdrawal" 
  date: Date  
  balance: number
}

export const transactionsState = atom<Payment[]>({
  key: 'transactionsState',
  default: [],
});
