import { ThunkDispatch } from 'redux-thunk';

import { AnyAction } from 'redux';

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

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;

export type User = {
  email: string;
  password: string;
};
