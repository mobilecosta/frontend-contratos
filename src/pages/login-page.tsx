import { type FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../services/auth-context';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/clientes';

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Entrar</h1>
        <p>Use seu usuário para acessar o sistema.</p>
        {error && <p className="error">{error}</p>}

        <label>
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label>
          Senha
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Acessando...' : 'Acessar'}
        </button>
      </form>
    </div>
  );
}
