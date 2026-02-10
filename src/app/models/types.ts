export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
}

export interface Contrato {
  id: string;
  numero: string;
  cliente: Cliente;
  produto: Produto;
  dataInicio: Date;
  dataFim: Date;
  status: string;
}
