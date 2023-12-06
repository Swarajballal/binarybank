import { Payment, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const getTransactions = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/user/transactions`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const transactions = response.data.transactions;
      setData(transactions);
    }

    getTransactions();
  }, []);

  return (
    <section className="py-8">
        <div className="container">
            <DataTable columns={columns} data={data} />
        </div>
    </section>
  );
}
