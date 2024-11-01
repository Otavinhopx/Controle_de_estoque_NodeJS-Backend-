import { Router, Request, Response } from 'express';
import connection from '../database';
import bcrypt from 'bcrypt';  // Para criptografar a senha
import jwt from 'jsonwebtoken';  // Para gerar tokens JWT

const router = Router();

router.post('/login', (req: Request, res: Response) => {
  const { email, senha } = req.body;
  
  connection.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário: ', err);
      res.status(500).send('Erro ao buscar usuário');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Usuário não encontrado');
      return;
    }

    const usuario = results[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      res.status(401).send('Senha inválida');
      return;
    }

    const token = jwt.sign({ id: usuario.id }, 'secreta');  // Use uma chave secreta segura no seu ambiente de produção
    res.json({ token });
  });
});

export default router;
