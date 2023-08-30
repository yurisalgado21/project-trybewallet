export const actionEmailUser = (email: string) => {
  return {
    type: 'SET_EMAIL',
    payload: email,
  };
};

export type EmailType = ReturnType<typeof actionEmailUser>;
