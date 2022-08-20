import { Router } from 'express'
import { ClienteController } from './controllers/ClienteController';
import { EmpresaController } from './controllers/EmpresaController';
import { LocalController } from './controllers/LocalController';
import { LoginController } from './controllers/LoginController';
import { ResponsavelController } from './controllers/ResponsavelController';
import { TickerController } from './controllers/TicketController';
import { UserController } from './controllers/UserController';
import { Auth } from './middlewares/auth';

const routes = Router();

// Endpoints da Entidade EMPRESA
routes.post('/empresa', new EmpresaController().create);
routes.put('/empresa/:idEmpresa', new EmpresaController().update);
routes.get('/empresa', new EmpresaController().read);
routes.get('/empresa/:idEmpresa', new EmpresaController().readById);
routes.delete('/empresa/:idEmpresa', new EmpresaController().remove);

// Endpoints da Entidade LOCAL
routes.post('/local/:idEmpresa/create', new LocalController().create);
routes.get('/local', new LocalController().list);

// Endpoints da Entidade RESPONSAVEL
routes.post('/responsavel', new ResponsavelController().create);

// >>>>>>> Endpoint da Entidade USER
routes.post('/user', new UserController().create);
routes.post('/login', new LoginController().signIn);

// Endpoints da Entidade Cliente
routes.post('/cliente', new ClienteController().create);

// Endpoints da Entidade TICKET
routes.post('/ticket/:idCliente/novo', new TickerController().create)

// Endpoints protegidos
routes.use(new Auth().authMiddleware)
routes.get('/perfil', new LoginController().getProfile);


export default routes