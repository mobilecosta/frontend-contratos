import { type FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../services/auth-context';
import { api } from '../services/api';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/clientes';

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isRegistering) {
        await handleRegister();
      } else {
        await handleLogin();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      await login({ email, password: senha });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      let errorMessage = 'Erro ao fazer login. Tente novamente.';

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          errorMessage = 'E-mail ou senha inválidos.';
        } else if (err.response?.status === 400) {
          errorMessage = 'Campos obrigatórios não preenchidos corretamente.';
        } else if (!err.response) {
          errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
        } else if (err.response?.status >= 500) {
          errorMessage = 'Erro no servidor. Tente novamente em alguns momentos.';
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    }
  };

  const handleRegister = async () => {
    // Validações
    if (!email || !senha || !confirmPassword) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (senha !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (senha.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    try {
      await api.post('/auth/register', {
        email,
        password: senha,
      });

      // Registro bem-sucedido, executar login automático
      setError('');
      setEmail('');
      setSenha('');
      setConfirmPassword('');
      setIsRegistering(false);
      setError('Registro realizado com sucesso! Fazendo login...');

      // Aguardar um momento antes de fazer login
      setTimeout(async () => {
        try {
          await login({ email, password: senha });
          navigate(redirectTo, { replace: true });
        } catch {
          setError('Registro realizado. Por favor, faça login com suas credenciais.');
        }
      }, 1500);
    } catch (err) {
      let errorMessage = 'Erro ao registrar. Tente novamente.';

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          errorMessage = err.response.data?.message || 'E-mail já registrado ou dados inválidos.';
        } else if (err.response?.status === 409) {
          errorMessage = 'Este e-mail já está registrado.';
        } else if (!err.response) {
          errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
        } else if (err.response?.status >= 500) {
          errorMessage = 'Erro no servidor. Tente novamente em alguns momentos.';
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>{isRegistering ? 'Criar Conta' : 'Entrar'}</h1>
        <p>{isRegistering ? 'Preencha os dados para criar uma nova conta.' : 'Use seu usuário para acessar o sistema.'}</p>
        {error && <p className={`error ${isRegistering && error.includes('sucesso') ? 'success' : ''}`}>{error}</p>}

        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Senha
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>

        {isRegistering && (
          <label>
            Confirmar Senha
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? (isRegistering ? 'Registrando...' : 'Acessando...') : isRegistering ? 'Registrar' : 'Acessar'}
        </button>

        <button
          type="button"
          className="toggle-button"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError('');
            setEmail('');
            setSenha('');
            setConfirmPassword('');
          }}
        >
          {isRegistering ? 'Já tem conta? Entrar' : 'Não tem conta? Registrar'}
        </button>
      </form>
    </div>
  );
}
