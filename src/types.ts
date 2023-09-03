import { ThunkDispatch } from 'redux-thunk';

import { AnyAction } from 'redux';

export type TypeExpense = {
  id?: number,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: object,
};

export type ReduxState = {
  user: {
    email: string,
  },
  wallet: {
    currencies: [],
    expenses: [],
    editor: boolean,
    idToEdit: number,
  },
};

export type Dispatch = ThunkDispatch<RootState, null, AnyAction>;

export type User = {
  email: string;
  password: string;
};

export type Response = {
  [x: string]: {
    code:string;
    codein:string;
    name:string;
    high:string;
    low:string;
    varBid:string;
    pctChange:string;
    bid:string;
    ask:string;
    timestamp:string;
    create_date:string;
  }
};

export type RootState = {
  user: {
    email: string,
  };
  expenses: {
    data: TypeExpense[],
  }
  wallet: {
    expenses: TypeExpense[],
  }
};
