const express = require('express');
const connection = require('./database/connection');
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router();


/**
 * Rota de Login, para saber se a ONG existe ou não
 */
routes.post('/session', SessionController.create);

/**
 * Rotas destinadas as ONGS, criação de ongs, listagem de todas as ONGS
 */

/* Rota para listar todas as ONGS cadastradas */
routes.get('/ongs', OngController.index);
/* Rota para a criação de uma nova ONG */
routes.post('/ongs', OngController.create);

/**
 * Rotas destinadas ao perfil das ONGS e seus casos, listagem de casos
 */
/* Listar casos(incidents) específicos de uma ong */
routes.get('/profile', ProfileController.index);




/**
 * Rotas destinadas aos incidentes, criação, listagem de todos os casos, deletar casos.
 */
/* Rota para criação de um novo incidente */
routes.post('/incidents', IncidentController.create);
/* Rota para listar todos os incidentes*/
routes.get('/incidents', IncidentController.index);
/* Rota para deletar um incidente da ONG baseado no seu ID*/
routes.delete('/incidents/:id', IncidentController.delete);




module.exports = routes;