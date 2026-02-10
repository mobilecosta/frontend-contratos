import { EntityCrud } from '../components/entity-crud';
import type { Contrato } from '../services/types';

const defaults: Contrato = {
  clienteId: 0,
  dataInicio: '',
  dataFim: '',
  status: ''
};

export function ContratosPage() {
  return (
    <EntityCrud<Contrato>
      title="Contratos"
      endpoint="/contratos"
      defaults={defaults}
      fields={[
        { name: 'clienteId', label: 'ID Cliente', type: 'number' },
        { name: 'dataInicio', label: 'Data Início', type: 'date' },
        { name: 'dataFim', label: 'Data Fim', type: 'date' },
        { name: 'status', label: 'Status' }
      ]}
    />
  );
}
