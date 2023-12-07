
import { selector } from 'recoil';
import { transactionsState } from '@/store/atoms/userPayments';

export const useBalance = selector({
  key: 'useBalance',
  get: ({ get }) => {
    const transactions = get(transactionsState);

    const balance = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'deposit') {
        return acc + transaction.amount;
      } else if (transaction.type === 'withdrawal') {
        return acc - transaction.amount;
      }
      return acc;
    }, 0);

    return balance;
  },
});
