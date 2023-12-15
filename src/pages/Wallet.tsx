import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import styles from '../WalletForm.module.css';

function Wallet() {
  return (
    <div className={ styles.background }>
      <div className={ styles.container }>
        <Header />
        <WalletForm />
      </div>
      <div>
        <Table />
      </div>
    </div>
  );
}

export default Wallet;
