import {  columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Depositfunc } from '@/components/transactions/deposit';    
import { Withdrawfunc } from '@/components/transactions/withdraw';
import { useRecoilState } from 'recoil';
import { transactionsState } from '@/store/atoms/userPayments';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
  const [transactions, setTransactions] = useRecoilState(transactionsState);
  const [refreshKey, setRefreshKey] = useState(0);
  const token = localStorage.getItem('token');

  
  useEffect(() => {
    const getTransactions = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/user/transactions`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            const transactions = response.data.transactions;
            setTransactions(transactions);
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

    getTransactions();
}, [refreshKey]);



  const refreshTransactions = () => {
      setRefreshKey(oldKey => oldKey + 1); 
  }

  return (
    <section className="py-8 min-h-screen">
        <div className="container">
          {token && <div className='mb-4 flex md:gap-4 gap-2'>
            <Depositfunc refreshTransactions={refreshTransactions} />
            <Withdrawfunc refreshTransactions={refreshTransactions} />
          </div>}

          {token ? (<DataTable columns={columns} data={transactions} />) : (<div className="text-center">Please login to view your transactions</div>)}
        </div>
        <ToastContainer />
    </section>
  );
}
