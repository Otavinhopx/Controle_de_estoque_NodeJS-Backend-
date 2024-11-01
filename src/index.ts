import express, { Request, Response } from 'express';
import connection from './database';

const app = express();
const port = 5000; 

app.use(express.json());

app.get('/', (req: Request, res: Response) => { 
    res.send('Hello Mind Group!'); 
}); 

app.listen(port, () => { 
    console.log(`Servidor rodando na porta ${port}`); 
});

//===========================================================

app.get('/produtos', (req: Request, res: Response) => {
    connection.query('SELECT * FROM produtos', (err, results) => {
        if (err) {
            console.error('Erro ao buscar produtos: ', err);
            res.status(500).send('Erro ai buscar produtos');
            return;
        }
        res.json(results);
    });
});

app.post('/produtos', (req: Request, res: Response) => {
    const {nome, descricao, imagem, valor, quantidade} = req.body;
    connection.query('INSERT INTO produtos (nome, descricao, imagem, valor, quantidade) VALUES (?, ?, ?)',
        [nome, descricao, imagem, valor, quantidade],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar produto: ', err);
                res.status(500).send('Erro ao adicionar produto');
                return;
            }
            res.status(201).send('Sucesso ao adicionar produto');
        }
    )
});