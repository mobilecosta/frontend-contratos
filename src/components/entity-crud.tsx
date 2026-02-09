import { type FormEvent, useEffect, useState } from 'react';
import { api } from '../services/api';

type Field<T> = {
  name: keyof T;
  label: string;
  type?: 'text' | 'number' | 'date';
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

  const loadItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<T[]>(endpoint);
      setItems(data);
    } catch {
      setError('Falha ao carregar dados. Verifique se o backend está disponível.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, [endpoint]);

  const clearForm = () => setForm(defaults);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (form.id) {
        await api.put(`${endpoint}/${form.id}`, form);
      } else {
        await api.post(endpoint, form);
      }
      clearForm();
      await loadItems();
    } catch {
      setError('Não foi possível salvar o registro.');
    }
  };

  const handleEdit = (item: T) => setForm(item);

  const handleDelete = async (id?: number) => {
    if (!id) return;
    try {
      await api.delete(`${endpoint}/${id}`);
      if (form.id === id) clearForm();
      await loadItems();
    } catch {
      setError('Não foi possível excluir o registro.');
    }
  };

  return (
    <section>
      <h1>{title}</h1>
      {error && <p className="error">{error}</p>}
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
                required
              />
            </label>
          ))}
          <div className="actions">
            <button type="submit">{form.id ? 'Atualizar' : 'Criar'}</button>
            <button type="button" className="secondary" onClick={clearForm}>
              Limpar
            </button>
          </div>
        </form>
      </div>

      <div className="panel">
        {loading ? (
          <p>Carregando...</p>
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
                    <button onClick={() => handleEdit(item)}>Editar</button>
                    <button className="danger" onClick={() => handleDelete(item.id)}>
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
