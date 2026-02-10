import { type FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../services/api';

type Field<T> = {
  name: keyof T;
  label: string;
  type?: 'text' | 'number' | 'email' | 'tel' | 'date';
};

type EntityCrudProps<T extends { id?: number }> = {
  title: string;
  endpoint: string;
  fields: Field<T>[];
  defaults: T;
};

export function EntityCrud<T extends { id?: number }>({ title, endpoint, fields, defaults }: EntityCrudProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [form, setForm] = useState<T>(defaults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<T[]>(endpoint);
      setItems(data);
    } catch (err) {
      let errorMessage = 'Falha ao carregar dados. Verifique se o backend está disponível.';
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        errorMessage = 'Sua sessão expirou. Por favor, faça login novamente.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, [endpoint]);

  const clearForm = () => {
    setForm(defaults);
    setSuccess(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSaving(true);

    try {
      const isUpdate = Boolean(form.id);
      if (isUpdate) {
        await api.put(`${endpoint}/${form.id}`, form);
      } else {
        await api.post(endpoint, form);
      }

      setSuccess(isUpdate ? 'Registro atualizado com sucesso!' : 'Registro criado com sucesso!');
      clearForm();
      await loadItems();
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      let errorMessage = 'Não foi possível salvar o registro.';

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          errorMessage = err.response.data?.message || 'Dados inválidos. Verifique os campos.';
        } else if (err.response?.status === 401) {
          errorMessage = 'Sua sessão expirou. Por favor, faça login novamente.';
        } else if (err.response?.status === 409) {
          errorMessage = 'Este registro já existe.';
        } else if (!err.response) {
          errorMessage = 'Erro de conexão. Verifique sua internet.';
        } else if (err.response?.status >= 500) {
          errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
        }
      }

      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (item: T) => {
    setForm(item);
    setError(null);
    setSuccess(null);
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;

    const confirmDelete = window.confirm('Tem certeza que deseja excluir este registro?');
    if (!confirmDelete) return;

    setError(null);
    setIsSaving(true);

    try {
      await api.delete(`${endpoint}/${id}`);
      setSuccess('Registro excluído com sucesso!');
      
      if (form.id === id) clearForm();
      await loadItems();
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      let errorMessage = 'Não foi possível excluir o registro.';

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          errorMessage = 'Sua sessão expirou. Por favor, faça login novamente.';
        } else if (err.response?.status === 404) {
          errorMessage = 'Registro não encontrado.';
        } else if (!err.response) {
          errorMessage = 'Erro de conexão. Verifique sua internet.';
        } else if (err.response?.status >= 500) {
          errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
        }
      }

      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section>
      <h1>{title}</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <div className="panel">
        <form onSubmit={handleSubmit} className="grid-form">
          {fields.map((field) => (
            <label key={String(field.name)}>
              {field.label}
              <input
                type={field.type ?? 'text'}
                value={String(form[field.name] ?? '')}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    [field.name]: field.type === 'number' ? Number(e.target.value) : e.target.value
                  }))
                }
                disabled={isSaving}
                required
              />
            </label>
          ))}
          <div className="actions">
            <button type="submit" disabled={isSaving}>
              {isSaving ? (form.id ? 'Atualizando...' : 'Criando...') : form.id ? 'Atualizar' : 'Criar'}
            </button>
            <button type="button" className="secondary" onClick={clearForm} disabled={isSaving}>
              Limpar
            </button>
          </div>
        </form>
      </div>

      <div className="panel">
        {loading ? (
          <p>Carregando...</p>
        ) : items.length === 0 ? (
          <p>Nenhum registro encontrado.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                {fields.map((field) => (
                  <th key={String(field.name)}>{field.label}</th>
                ))}
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  {fields.map((field) => (
                    <td key={String(field.name)}>{String(item[field.name] ?? '')}</td>
                  ))}
                  <td>
                    <button onClick={() => handleEdit(item)} disabled={isSaving}>
                      Editar
                    </button>
                    <button className="danger" onClick={() => handleDelete(item.id)} disabled={isSaving}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
