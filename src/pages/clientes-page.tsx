import { EntityCrud } from '../components/entity-crud';
import type { Cliente } from '../services/types';

const defaults: Cliente = {
  nome: '',
  email: '',
  telefone: ''
};

export function ClientesPage() {
  return (
    <EntityCrud<Cliente>
      title="Clientes"
      endpoint="/clientes"
      defaults={defaults}
      fields={[
        { name: 'nome', label: 'Nome', type: 'text' },
        { name: 'email', label: 'E-mail', type: 'email' },
        { name: 'telefone', label: 'Telefone', type: 'tel' }
      ]}
    />
  );
}
