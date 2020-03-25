const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    /* Método para Listagem de todas as ONGS */
    async index (request, response){
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    /* Método para criação de ONGS */
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        /* Criar a id da nossa ong, já que não esta criando automaticamente */
        const id = crypto.randomBytes(4).toString('HEX');
        /* Conectar ao nosso banco de dados, e inserir dados nas colunas */
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
    })

    return response.json({ id });
}
}