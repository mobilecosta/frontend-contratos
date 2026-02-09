import { EntityCrud } from '../components/entity-crud';
import type { Produto } from '../services/types';

const defaults: Produto = {
  nome: '',
  descricao: '',
  valor: 0
};

export function ProdutosPage() {
  return (
    <EntityCrud<Produto>
      title="Produtos"
      endpoint="/produtos"
      defaults={defaults}
      fields={[
        { name: 'nome', label: 'Nome' },
        { name: 'descricao', label: 'Descrição' },
        { name: 'valor', label: 'Valor', type: 'number' }
      ]}
    />
  );
}
