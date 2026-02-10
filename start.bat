@echo off
REM Arquivo para facilitar a inicialização do projeto

echo ======================================
echo Frontend Contratos - Angular
echo ======================================
echo.

REM Verificar se node_modules existe
if not exist node_modules (
    echo Instalando dependências...
    call npm install
    echo.
)

REM Iniciar servidor de desenvolvimento
echo Iniciando servidor de desenvolvimento...
echo Acesse http://localhost:4200
echo.

call npm run dev
