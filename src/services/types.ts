export type Cliente = {
  id?: number;
  nome: string;
  documento: string;
  email: string;
  telefone: string;
};

export type Produto = {
  id?: number;
  nome: string;
  descricao: string;
  valor: number;
};

export type Contrato = {
  id?: number;
  clienteId: number;
  produtoId: number;
  dataInicio: string;
  dataFim: string;
  status: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};
