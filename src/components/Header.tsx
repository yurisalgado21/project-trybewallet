import { useSelector } from 'react-redux';

type UserType = {
  user: {
    email: string,
  }
};

function Header() {
  const email = useSelector((state: UserType) => state.user.email);

  return (
    <>
      <div>Header</div>
      <p data-testid="email-field">{email}</p>
      <h3 data-testid="total-field">0</h3>
      <p data-testid="header-currency-field">BRL</p>
    </>
  );
}

export default Header;
