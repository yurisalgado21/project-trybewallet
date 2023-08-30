import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { EmailType, actionEmailUser } from '../redux/actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    validateForm(newEmail, password);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validateForm(email, newPassword);
  };

  const validateForm = (newEmail: string, newPassword: string) => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    const validPassword = newPassword.length >= 6;
    setIsDisabled(!(validEmail && validPassword));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (validEmail && password.length >= 6) {
      const actionEmail: EmailType = actionEmailUser(email);
      dispatch(actionEmail);
      navigate('/carteira');
    }
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          type="email"
          value={ email }
          data-testid="email-input"
          onChange={ handleChangeEmail }
        />
        <input
          id="password"
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ handleChangePassword }
        />
        <button type="submit" disabled={ isDisabled }>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
