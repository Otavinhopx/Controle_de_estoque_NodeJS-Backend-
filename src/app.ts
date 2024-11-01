import express, { Request, Response } from 'express';
import routerProdutos from './routes/products';
import cors from 'cors';
import routerUsuarios from './routes/users';

const app = express();
const port = 5000; 

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use('/api', routerProdutos);
app.use('/api', routerUsuarios);


app.get('/', (req: Request, res: Response) => { 
    res.send('Hello Mind Group!'); 
}); 

app.listen(port, () => { 
    console.log(`Servidor rodando na porta ${port}`); 
});
