import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { TypeExpense } from '../types';
import { expenseAdd, actionWallet } from '../redux/actions';
import { fetchApiData } from '../services/fetchApiData';

function WalletForm() {
  const dispatch = useDispatch();
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');
  const [currencyValue, setCurrencyValue] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [category, setCategory] = useState('Alimentação');
  const [description, setDescription] = useState('');
  const [exchangeRates, setExchangeRates] = useState();
  console.log(exchangeRates);
  useEffect(() => {
    async function fetchCurrency() {
      try {
        const data = await fetchApiData();
        const ObjCurrencies = Object.keys(data)
          .filter((currencie) => currencie !== 'USDT');
        setCurrencies(ObjCurrencies);
        const act = actionWallet(ObjCurrencies);
        dispatch(act);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCurrency();
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await fetchApiData();
    setExchangeRates(data);

    if (value && description && currencyValue && method && category) {
      const expense: TypeExpense = {
        value,
        description,
        currency: currencyValue,
        method,
        tag: category,
        exchangeRates: data,
      };

      const act = expenseAdd(expense);

      dispatch(act);

      setValue(''); setDescription('');
      setCategory(''); setCurrencyValue(''); setMethod('');
    } else {
      console.error('Erro!');
    }
  };

  return (
    <>
      <div>WalletForm</div>
      <form>
        <label htmlFor="value">
          Valor da despesa:
          {' '}
          <input
            value={ value }
            onChange={ (e) => setValue(e.target.value) }
            type="number"
            data-testid="value-input"
            name="value"
          />
        </label>
        {' '}
        <label htmlFor="description">
          Descrição da despesa:
          {' '}
          <input
            value={ description }
            onChange={ (e) => setDescription(e.target.value) }
            type="text"
            data-testid="description-input"
            name="description"
          />
        </label>
        {' '}
        <label htmlFor="currency">
          Moeda:
          {' '}
          <select
            value={ currencyValue }
            onChange={ (e) => setCurrencyValue(e.target.value) }
            data-testid="currency-input"
            name="currency"
          >
            {currencies.map((currency) => (
              <option key={ currency } value={ currency }>
                {currency}
              </option>
            ))}
          </select>
        </label>
        {' '}
        <label htmlFor="method">
          Formas de pagamento:
          {' '}
          <select
            value={ method }
            onChange={ (e) => setMethod(e.target.value) }
            data-testid="method-input"
            id="method"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Categoria da despesa:
          <select
            value={ category }
            onChange={ (e) => setCategory(e.target.value) }
            data-testid="tag-input"
            id="category"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="submit" onClick={ handleSubmit }>
          Adicionar despesa
        </button>
      </form>
    </>

  );
}

export default WalletForm;
