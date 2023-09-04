import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import * as APIModule from '../services/fetchApiData';
import mockData from './helpers/mockData';

beforeEach(() => {
  vi.spyOn(APIModule, 'fetchApiData').mockResolvedValue(mockData);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Testes da aplicação', () => {
  test('Testes para ver se os elementos estão no componente Login', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  test('Testes para ver se depois de preenchido os inputs e ao clicar no botão, mude para a rota /carteira', async () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    await userEvent.type(inputEmail, 'yuri@gmail.com');
    await userEvent.type(inputPassword, '1234567');
    await userEvent.click(button);

    const emailDigited = screen.getByText(/yuri@gmail\.com/i);
    const valueInput = screen.getByText(/valor da despesa:/i);
    const descriptionInput = screen.getByText(/descrição da despesa:/i);

    expect(emailDigited).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });
  test('Testando o componente Wallet, na rota /carteira', async () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    await userEvent.type(inputEmail, 'yuri@gmail.com');
    await userEvent.type(inputPassword, '1234567');
    await userEvent.click(button);

    expect(screen.getByRole('heading', {
      name: /0\.00/i,
    })).toBeInTheDocument();

    const buttonSubmit = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    const valueInput = screen.getByText(/valor da despesa:/i);
    const descriptionInput = screen.getByText(/descrição da despesa:/i);

    await userEvent.type(valueInput, '100');
    await userEvent.type(descriptionInput, 'olá sou yuri');
    await userEvent.click(buttonSubmit);
  });
});
