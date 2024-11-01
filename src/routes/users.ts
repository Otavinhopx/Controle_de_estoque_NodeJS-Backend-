import { Router, Request, Response } from 'express'; import connection from '../database';
import { ResultSetHeader } from 'mysql2';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const router = Router()

router.get('/usuarios', (req: Request, res: Response) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários: ', err);
            res.status(500).send('Erro ai buscar usuários');
            return;
        }
        res.json(results);
    });
});



router.get('/usuarios/:id', (req: Request, res: Response) => {
    const {id} = req.params;
    connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro na busca do produto: ', err);
            res.status(500).send('Erro ao buscar produto');
            return;
        }
        if ((results as Array<any>).length === 0) {
            res.status(404).send('Produto não encontrado');
            return;
        }
        res.json((results as Array<any>)[0]);
    });
});



router.post('/usuarios', async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body;
  
    try {
      const hashedSenha = await bcrypt.hash(senha, 10);
  
      connection.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, hashedSenha],
        (err, results) => {
          if (err) {
            console.error('Erro ao adicionar usuário: ', err);
            res.status(500).send('Erro ao adicionar usuário');
            return;
          }
          res.status(201).send('Sucesso ao adicionar usuário');
        }
      );
    } catch (error) {
      console.error('Erro ao processar a requisição:', error);
      res.status(500).send('Erro ao processar a requisição');
    }
  });
  

router.delete('/usuarios/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query<ResultSetHeader>('DELETE FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar usuario');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Usuário não encontrado');
            return;
        }
        res.send('Usuário deletado com sucesso');
});
});


router.put('/usuarios/:id', (req: Request, res: Response) => {
    const {id} = req.params;
    const {nome, email, senha} = req.body;
    connection.query<ResultSetHeader>(
        'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?', [nome, email, senha, id],
        (err, results) => {
            if (err) {
                console.error('Erro ao editar usuário: ', err);
                res.status(500).send('Erro ao editar usuário');
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).send('Usuário não encontrado');
                return
            }
            res.send('Usuário atualizado!');
        }
    )
});

//==========================================================================================================

router.post('/login', (req: Request, res: Response) => {
    const { email, senha } = req.body;
  
    connection.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results: any) => {
      if (err) {
        console.error('Erro ao buscar usuário: ', err);
        res.status(500).send('Erro ao buscar usuário');
        return;
      }
  
      if (Array.isArray(results) && results.length > 0) {
        const usuario = results[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
  
        if (!senhaValida) {
          res.status(401).send('Senha inválida');
          return;
        }
  
        const token = jwt.sign({ id: usuario.id }, 'secreta'); // Use uma chave secreta segura no seu ambiente de produção
        res.json({ token });
      } else {
        res.status(404).send('Usuário não encontrado');
      }
    });
  });
  




export default router;