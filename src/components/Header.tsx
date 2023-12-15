import { useSelector } from 'react-redux';
import { RootState } from '../types';
import styles from './Header.module.css';
import emojiLogo from '../assets/🦆 emoji _money with wings_.jpg';
import trybeLogo from '../assets/Trybe.jpg';
import walletLogo from '../assets/Wallet.jpg';
import imageEmail from '../assets/Vector (1).jpg';
import moedas from '../assets/Moedas.jpg';

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
    <div className={ styles.container }>
      <div className={ styles.trybewallet }>
        <img src={ emojiLogo } alt="emoji" />
        <img src={ trybeLogo } alt="trybeLogo" />
        <img src={ walletLogo } alt="walletLogo" />
      </div>
      <div className={ styles.container }>
        <img src={ imageEmail } alt="imageEmail" />
        <p className={ styles.email } data-testid="email-field">{email}</p>
      </div>
      <div>
        <label className={ styles.labelMoedas }>
          <img src={ moedas } alt="moedasImage" />
          Despesa Total:
          <h3 data-testid="total-field">{total}</h3>
          <p data-testid="header-currency-field">BRL</p>
        </label>
      </div>
    </div>
  );
}

export default Header;
