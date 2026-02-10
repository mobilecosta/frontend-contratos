#!/bin/bash

# Arquivo para facilitar a inicialização do projeto

echo "======================================"
echo "Frontend Contratos - Angular"
echo "======================================"
echo ""

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "Instalando dependências..."
    npm install
    echo ""
fi

# Iniciar servidor de desenvolvimento
echo "Iniciando servidor de desenvolvimento..."
echo "Acesse http://localhost:4200"
echo ""

npm run dev
