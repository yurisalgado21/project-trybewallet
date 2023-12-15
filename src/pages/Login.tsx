import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from '../Login.module.css';
import { EmailType, actionEmailUser } from '../redux/actions';
import emojiLogo from '../assets/🦆 emoji _money with wings_.jpg';
import trybeLogo from '../assets/Trybe.jpg';
import walletLogo from '../assets/Wallet.jpg';

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
    <div className={ styles.container }>
      <form className={ styles.formContainer } onSubmit={ handleSubmit }>
        <div className={ styles.trybewallet }>
          <img src={ emojiLogo } alt="emoji" />
          <img src={ trybeLogo } alt="trybeLogo" />
          <img src={ walletLogo } alt="walletLogo" />
        </div>
        <label>

          <input
            className={ styles.input }
            placeholder="Email"
            type="email"
            value={ email }
            data-testid="email-input"
            onChange={ handleChangeEmail }
          />
        </label>
        <label>
          <input
            className={ styles.input }
            placeholder="Senha"
            id="password"
            type="password"
            data-testid="password-input"
            value={ password }
            onChange={ handleChangePassword }
          />
        </label>
        <button className={ styles.button } type="submit" disabled={ isDisabled }>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
