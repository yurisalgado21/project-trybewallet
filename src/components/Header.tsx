import { useSelector } from 'react-redux';
import { RootState } from '../types';

type UserType = {
  user: {
    email: string,
  }
};

function Header() {
  const expenses = useSelector((globalState: RootState) => globalState
    .wallet.expenses || []);
  const email = useSelector((state: UserType) => state.user.email);

  const sum = expenses.reduce((total: any, expense: any) => {
    return total
    + (parseFloat(expense.value)
    * expense.exchangeRates[expense.currency].ask);
  }, 0);

  const total = sum.toFixed(2);

  return (
    <>
      <div>Header</div>
      <p data-testid="email-field">{email}</p>
      <h3 data-testid="total-field">{total}</h3>
      <p data-testid="header-currency-field">BRL</p>
    </>
  );
}

export default Header;
