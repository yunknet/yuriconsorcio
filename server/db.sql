-- =======================================================
-- Banco de dados: yurirodizio (VPS PostgreSQL)
-- =======================================================

-- Criação do banco de dados (executar no psql do postgres):
-- CREATE DATABASE yurirodizio OWNER yuriconsorcio;
-- GRANT ALL PRIVILEGES ON DATABASE yurirodizio TO yuriconsorcio;

-- Conectar no banco yurirodizio:
-- \c yurirodizio

-- 1. Tabela dos Atendentes da Equipe
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    last_lead_at TIMESTAMP WITH TIME ZONE DEFAULT '1970-01-01 00:00:00+00',
    total_leads INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Inserir os dois números com o 9º dígito
INSERT INTO team_members (name, phone) 
VALUES 
  ('Equipe Yuri (BH)', '5531984175305'),
  ('Equipe Yuri (Norte de Minas)', '5538998422719')
ON CONFLICT (phone) DO UPDATE 
SET is_active = TRUE;

-- 3. Histórico de Leads Enviados
CREATE TABLE IF NOT EXISTS lead_dispatches (
    id SERIAL PRIMARY KEY,
    team_member_id INTEGER REFERENCES team_members(id) ON DELETE SET NULL,
    client_name VARCHAR(150),
    phone VARCHAR(20),
    lead_type VARCHAR(50) DEFAULT 'simulador',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Permissões para o usuário yuriconsorcio:
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO yuriconsorcio;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO yuriconsorcio;
