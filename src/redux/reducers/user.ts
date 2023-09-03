// Esse reducer será responsável por tratar as informações da pessoa usuária
// import { EmailActionType } from '../actions';
import { EmailType } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action: EmailType) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default user;
