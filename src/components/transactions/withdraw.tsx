import { Dialog } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useBalance } from "@/store/selectors/userBalanceSelector";
import { ToastContainer, toast } from 'react-toastify';
import { balanceState } from '@/store/atoms/userBalancerAtom';

interface WithdrawProps {
    refreshTransactions: () => void;
}

export const Withdrawfunc: React.FC<WithdrawProps> = ({ refreshTransactions }) => {
  const [amount, setAmount] = useState<string>('');
  const balanceValue = useRecoilValue(useBalance);
  const token = localStorage.getItem('token');
  const setBalance = useSetRecoilState(balanceState);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
      if (/^\d*\.?\d*$/.test(value)) {
          setAmount(value);
      } else {
          setAmount('');
      }
  }, []);

  const handleWithdraw = async() => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/user/withdraw`, {
            amount: parseInt(amount)
        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        const balance = response.data.balance;
        setBalance(balance);
        refreshTransactions();

        toast.success(`Withdrawal successful. Deducted ${amount}. Current balance: ${balance}`, {
            theme: "colored",
            position: toast.POSITION.TOP_CENTER,
        });

        setAmount('0');
        
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message || "Something went wrong", {
                theme: "colored",
                position: toast.POSITION.TOP_CENTER,
            });
        } else {
            toast.error("Something went wrong", {
                theme: "colored",
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }
}


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-red-400 dark:bg-red-500 w-fit text-xs md:text-sm">Withdraw</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Withdraw Money</DialogTitle>
          <DialogDescription>
            Withdraw money from your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input id="amount" className="col-span-3" name="amount" type="text" onChange={handleChange}  value={amount}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="balance" className="text-right">
              Balance
            </Label>
            <Input id="balance" value={`${balanceValue}`} className="col-span-3" disabled />
          </div>
        </div>
        <DialogFooter>
        <Button type="submit" onClick={handleWithdraw}>Withdraw</Button>
        </DialogFooter>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  )
}
