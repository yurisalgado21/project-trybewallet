import { useSelector } from 'react-redux';
import { ReduxState, TypeExpense } from '../types';

function Table() {
  const expenses = useSelector((globalState: ReduxState) => globalState.wallet.expenses);

  return (
    <>
      <div>Table</div>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          <tbody>
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
                  <button>Editar</button>
                  <button>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </thead>
      </table>
    </>
  );
}

export default Table;
