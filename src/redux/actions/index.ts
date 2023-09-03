import { Dispatch, TypeExpense, Response } from '../../types';

export const actionEmailUser = (email: string) => {
  return {
    type: 'SET_EMAIL',
    payload: email,
  };
};

// console.log()
export const START_REQUEST = 'START_REQUEST';
export const SUCCESS_WALLET = 'SUCCESS_WALLET';
export const EXPENSE_ADD = 'EXPENSE_ADD';

export const startRequest = () => ({
  type: START_REQUEST,
});

export const actionWallet = (wallet: Array<any>) => ({
  type: SUCCESS_WALLET,
  payload: wallet,
});

export const expenseAdd = (expense: TypeExpense) => ({
  type: EXPENSE_ADD,
  payload: expense,
});

export function fetchCurrenciesAction() {
  return async (dispatch: Dispatch) => {
    try {
      const data = await fetch('https://economia.awesomeapi.com.br/json/all');
      const { USDT, ...rest }: Response = await data.json();
      const arrString: string[] = Object.keys(rest);

      arrString.forEach((value, index) => {
        const expense: TypeExpense = {
          id: index,
          value,
          description: '',
          currency: '',
          method: '',
          tag: 'Alimentação',
          exchangeRates: {},
        };

        dispatch(expenseAdd(expense));
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export type EmailType = ReturnType<typeof actionEmailUser>;
