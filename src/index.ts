import express, { Request, Response } from 'express';


const app = express();
const port = 5000; 

app.get('/', (req: Request, res: Response) => { 
    res.send('Hello Mind Group!'); 
}); 

app.listen(port, () => { 
    console.log(`Servidor rodando na porta ${port}`); 
});