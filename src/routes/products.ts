import { Router, Request, Response } from 'express'; import connection from '../database';
import { ResultSetHeader } from 'mysql2';

const router = Router()

router.get('/produtos', (req: Request, res: Response) => {
    connection.query('SELECT * FROM produtos', (err, results) => {
        if (err) {
            console.error('Erro ao buscar produtos: ', err);
            res.status(500).send('Erro ai buscar produtos');
            return;
        }
        res.json(results);
    });
});



router.get('/produtos/:id', (req: Request, res: Response) => {
    const {id} = req.params;
    connection.query('SELECT * FROM produtos WHERE id = ?', [id], (err, results) => {
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



router.post('/produtos', (req: Request, res: Response) => {
    const {nome, descricao, imagem, valor, quantidade} = req.body;
    connection.query('INSERT INTO produtos (nome, descricao, imagem, valor, quantidade) VALUES (?, ?, ?, ?, ?)',
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

router.delete('/produtos/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query<ResultSetHeader>('DELETE FROM produtos WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar produto');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Produto não encontrado');
            return;
        }
        res.send('Produto deletado com sucesso');
});
});


router.put('/produtos/:id', (req: Request, res: Response) => {
    const {id} = req.params;
    const {nome, descricao, imagem, valor, quantidade} = req.body;
    connection.query<ResultSetHeader>(
        'UPDATE produtos SET nome = ?, descricao = ?, imagem = ?, valor = ?, quantidade = ? WHERE id = ?', [nome, descricao, imagem, valor, quantidade, id],
        (err, results) => {
            if (err) {
                console.error('Erro ao editar produto: ', err);
                res.status(500).send('Erro ao editar produto');
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).send('Produto não encontrado');
                return
            }
            res.send('Produto atualizado!');
        }
    )
});

router.patch('/produtos/:id/quantidade', (req: Request, res: Response) => {
    const {id} = req.params;
    const {quantidade} = req.body;
    if (quantidade !== undefined) { if (quantidade < 1) { 
        connection.query<ResultSetHeader>( 'DELETE FROM produtos WHERE id = ?', [id], (err, result) => { 
            if (err) { 
                console.error('Erro ao deletar produto: ', err); 
                res.status(500).send('Erro ao deletar produto'); 
                return; 
    } 
            if (result.affectedRows === 0) { 
                res.status(404).send('Produto não encontrado'); 
                return; } res.send('Produto deletado com sucesso'); 
    } ); } 
            else { 
                connection.query<ResultSetHeader>( 'UPDATE produtos SET quantidade = ? WHERE id = ?', [quantidade, id], (err, result) => { 
                    if (err) { console.error('Erro ao atualizar quantidade: ', err); 
                    res.status(500).send('Erro ao atualizar quantidade'); 
                    return; 
            } 
            if (result.affectedRows === 0) { res.status(404).send('Produto não encontrado'); 
                return; 
            } 
                res.send('Quantidade atualizada com sucesso'); 
        } ); 
    } } 
    else { 
        res.status(400).send('Quantidade não fornecida'); 
    } 
});



export default router;