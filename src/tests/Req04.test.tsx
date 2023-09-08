import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import * as APIModule from '../services/fetchApiData';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

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
  test('preenchendo os inputs e os selects, eles retornam o resultado esperado', async () => {
    renderWithRouterAndRedux(<Wallet />);

    expect(screen.getByRole('heading', {
      name: /0\.00/i,
    })).toBeInTheDocument();
    const buttonSubmit = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    const valueInput = screen.getByText(/valor da despesa:/i);
    const descriptionInput = screen.getByText(/descrição da despesa:/i);
    expect(screen.getByText(/moeda:/i)).toBeInTheDocument();
    expect(screen.getByText(/formas de pagamento:/i)).toBeInTheDocument();
    expect(screen.getByText(/categoria da despesa:/i)).toBeInTheDocument();
    const currencySelect = screen.getByTestId('currency-input');
    expect(currencySelect).toBeInTheDocument();
    const methodSelect = screen.getByTestId('method-input');
    expect(methodSelect).toBeInTheDocument();
    const categorySelect = screen.getByTestId('tag-input');
    expect(categorySelect).toBeInTheDocument();
    await userEvent.type(valueInput, '1000');
    await userEvent.type(descriptionInput, 'olá sou yuri');
    await userEvent.selectOptions(currencySelect, 'EUR');
    await userEvent.selectOptions(methodSelect, 'Cartão de crédito');
    await userEvent.selectOptions(categorySelect, 'Lazer');
    await userEvent.click(buttonSubmit);
  });
});
