import {Router} from 'express'
import { EmpresaController } from './controllers/EmpresaController';
import { LocalController } from './controllers/LocalController';

const routes = Router();

routes.post('/empresa', new EmpresaController().create);
routes.put('/empresa/:idEmpresa', new EmpresaController().update);
routes.get('/empresa', new EmpresaController().read);
routes.get('/empresa/:idEmpresa', new EmpresaController().readById);
routes.delete('/empresa/:idEmpresa', new EmpresaController().remove);


routes.post('/local/:idEmpresa/create', new LocalController().create);
routes.get('/local', new LocalController().list);

export default routes