import { useDispatch, useSelector } from 'react-redux';
import { ReduxState, TypeExpense } from '../types';
import { deleteExpense } from '../redux/actions';
import styles from './Table.module.css';
import excluirFig from '../assets/Vector.jpg';
import editarFig from '../assets/Editar.jpg';

function Table() {
  const expenses = useSelector((globalState: ReduxState) => globalState.wallet.expenses);
  const dispatch = useDispatch();
  const handleDelete = (id: number) => {
    dispatch(deleteExpense(id));
  };

  return (
    <table className={ styles.container }>
      <thead className={ styles.tabela }>
        <tr className={ styles.cabecalho }>
          <th>Descrição</th>
          <hr />
          <th>Tag</th>
          <hr />
          <th>Método de pagamento</th>
          <hr />
          <th>Valor</th>
          <hr />
          <th>Moeda</th>
          <hr />
          <th>Câmbio utilizado</th>
          <hr />
          <th>Valor convertido</th>
          <hr />
          <th>Moeda de conversão</th>
          <hr />
          <th>Editar/Excluir</th>
        </tr>
        <tbody className={ styles.elements }>
          {expenses.map((expense: TypeExpense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency]?.name}</td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                {Number((expense.exchangeRates[expense.currency].ask) as any
                  * Number(expense.value)).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button>
                  <img src={ editarFig } alt="editarFig" />
                </button>
                <button
                  data-testid="delete-btn"
                  onClick={ () => handleDelete(Number(expense.id)) }
                >
                  <img src={ excluirFig } alt="excluirButton" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </thead>
    </table>
  );
}

export default Table;
