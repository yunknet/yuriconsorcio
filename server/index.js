import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER || 'yuriconsorcio',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'yurirodizio',
  password: process.env.DB_PASSWORD || 'yuribdconsorcio',
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-yuri-playbook';

// ==========================================================
// RODÍZIO DE ATENDIMENTO DA EQUIPE (QUEM ESTÁ HÁ MAIS TEMPO SEM RECEBER)
// ==========================================================

// Retorna quem está há mais tempo sem receber e atualiza o timestamp
app.get('/api/team/next', async (req, res) => {
  try {
    // 1. Busca quem tem o last_lead_at mais antigo (ordem ascendente)
    const result = await pool.query(`
      SELECT * FROM team_members 
      WHERE is_active = true 
      ORDER BY last_lead_at ASC 
      LIMIT 1
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Nenhum atendente cadastrado ou ativo' });
    }

    const member = result.rows[0];

    // 2. Atualiza o timestamp para agora
    await pool.query(`
      UPDATE team_members 
      SET last_lead_at = NOW(), total_leads = total_leads + 1 
      WHERE id = $1
    `, [member.id]);

    res.json({
      success: true,
      member: {
        id: member.id,
        name: member.name,
        phone: member.phone,
      }
    });
  } catch (err) {
    console.error('Erro no rodízio de equipe:', err);
    res.status(500).json({ error: 'Erro interno ao consultar rodízio' });
  }
});

// Registra um envio de lead no histórico
app.post('/api/team/dispatch', async (req, res) => {
  const { phone, clientName, leadType } = req.body;
  try {
    await pool.query(`
      INSERT INTO lead_dispatches (team_member_id, client_name, phone, lead_type)
      SELECT id, $2, $1, $3 FROM team_members WHERE phone = $1 LIMIT 1
    `, [phone, clientName || 'Não informado', leadType || 'simulador']);

    await pool.query(`
      UPDATE team_members 
      SET last_lead_at = NOW(), total_leads = total_leads + 1 
      WHERE phone = $1
    `, [phone]);

    res.json({ success: true });
  } catch (err) {
    console.error('Erro ao registrar lead:', err);
    res.status(500).json({ error: 'Erro ao registrar lead' });
  }
});

// ==========================================================
// PLAYBOOK (ÁREA DE MEMBROS)
// ==========================================================

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (password !== 'bookplay') {
    return res.status(401).json({ error: 'Senha incorreta.' });
  }

  try {
    const result = await pool.query('SELECT * FROM customers WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'E-mail não encontrado ou compra não confirmada.' });
    }

    const customer = result.rows[0];

    await pool.query('INSERT INTO access_logs (customer_id, ip_address) VALUES ($1, $2)', [
      customer.id,
      req.ip
    ]);

    const token = jwt.sign({ id: customer.id, email: customer.email }, JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({ token, message: 'Login realizado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Webhook para checkout
app.post('/api/webhook/checkout', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email obrigatório' });
  
  try {
    const result = await pool.query(
      'INSERT INTO customers (email) VALUES ($1) ON CONFLICT (email) DO UPDATE SET status = $2 RETURNING *',
      [email, 'active']
    );
    res.json({ success: true, customer: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao processar webhook' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor Yuri rodando na porta ${PORT}`);
});
