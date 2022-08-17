import {Router} from 'express'
import { EmpresaController } from './controllers/EmpresaController';

const routes = Router();

routes.post('/empresa', new EmpresaController().create);
routes.put('/empresa/:idEmpresa', new EmpresaController().update);
routes.get('/empresa', new EmpresaController().read);
routes.get('/empresa/:idEmpresa', new EmpresaController().readById);


export default routes