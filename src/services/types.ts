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

export type RegisterPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user?: {
    id: string;
    email: string;
    role: string;
  };
  session?: {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
  };
  token?: string;
  accessToken?: string;
  access_token?: string;
  data?: {
    token?: string;
    accessToken?: string;
    access_token?: string;
    session?: {
      access_token: string;
    };
  };
};
