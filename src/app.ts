// Importando os módulos necessários
import express from 'express'; // Framework web para Node.js
import cors from 'cors'; // Middleware para permitir requisições de diferentes origens
import { DatabaseModel } from './model/DatabaseModel'; // Modelo de banco de dados
import AveController from './controller/AveController'; // Controlador para aves
import { HabitatController } from './controller/HabitatController'; // Controlador para habitats
import { AtracaoController } from './controller/AtracaoController'; // Controlador para atrações

// Instanciando controladores
const aveController = new AveController('', 0, '', 0); // Controlador de aves
const habitatController = new HabitatController(''); // Controlador de habitats
const atracaoController = new AtracaoController(''); // Controlador de atrações

// Criando uma instância do servidor Express
const server = express();

// Definindo a porta onde o servidor irá escutar
const port = 3000;

// Configurando o servidor para usar JSON e habilitando o CORS
server.use(express.json());
server.use(cors());

// Rota padrão para testes
server.get('/', (req, res) => {
    res.send('Hello World!');
});

// Rota para login
server.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Informações: ${username} - ${password}`);
});

// Rotas para listar informações cadastradas no banco de dados
server.get('/listar-aves', aveController.todos); // Lista todas as aves cadastradas
server.get('/habitats', habitatController.tds); // Lista todos os habitats cadastrados
server.get('/atracoes', atracaoController.ts); // Lista todas as atrações cadastradas

// Rotas para cadastrar informações no sistema
server.post('/novo/ave', aveController.novo); // Cadastra uma nova ave
server.post('/novo/habitat', habitatController.nov); // Cadastra um novo habitat
server.post('/novo/atracao', atracaoController.nv); // Cadastra uma nova atração

// Rotas para remover informações do sistema
server.delete('/remover/animal', aveController.remover); // Remove informações de uma ave
server.delete('/remover/atracao', atracaoController.remover); // Remove informações de uma atração
server.delete('/remover/habitat', habitatController.remover); // Remove informações de um habitat

// Rotas para atualizar informações no sistema
server.put('/atualizar/animal', aveController.atualizar); // Atualiza informações de uma ave
server.put('/atualizar/atracao', atracaoController.atualizar); // Atualiza informações de uma atração
server.put('/atualizar/habitat', habitatController.atualizar); // Atualiza informações de um habitat

// Testa a conexão com o banco de dados antes de iniciar o servidor
new DatabaseModel().testeConexao().then((resbd) => {
    if (resbd) {
        // Inicia o servidor na porta especificada
        server.listen(port, () => {
            console.info(`Servidor executando no endereço http://localhost:${port}/`);
        });
    } else {
        console.log(`Não foi possível conectar ao banco de dados`);
    }
});
