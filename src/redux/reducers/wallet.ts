// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { AnyAction } from 'redux';
import { EXPENSE_ADD, SUCCESS_WALLET, START_REQUEST, DELETE_EXPENSE } from '../actions';
import { TypeExpense } from '../../types';

// console.log()

const INITIAL_STATE = {
  currencies: [''],
  expenses: [],
  editor: false,
  edToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case START_REQUEST:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case SUCCESS_WALLET:
      return {
        ...state,
        currencies: action.payload,
      };
    case EXPENSE_ADD:
      return {
        ...state,
        expenses: [
          ...state.expenses,
          {
            id: state.expenses.length,
            ...action.payload,
          },
        ],
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses
          .filter((expense: TypeExpense) => expense.id !== action.payload),
      };
    default:
      return state;
  }
};

export default wallet;
