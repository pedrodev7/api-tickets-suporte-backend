import express from 'express'
import { appDataSource } from './data-source'
import routes from './routes';



/**
 * O método irá se conectar primeiro com o banco de dados,
 * para então efetuar a conexão com o servidor backend.
 *  
 * Caso a conexão seja mal sucedidade, o servidor não é iniciado.
 */

appDataSource.initialize().then(() =>{
    const app = express();

    app.use(express.json());
    
    app.use(routes);
    
    return app.listen(process.env.PORT);
})