import { EntityCrud } from '../components/entity-crud';
import type { Cliente } from '../services/types';

const defaults: Cliente = {
  nome: '',
  documento: '',
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
        { name: 'nome', label: 'Nome' },
        { name: 'documento', label: 'Documento' },
        { name: 'email', label: 'E-mail' },
        { name: 'telefone', label: 'Telefone' }
      ]}
    />
  );
}
