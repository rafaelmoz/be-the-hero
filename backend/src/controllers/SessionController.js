const connection = require('../database/connection');


module.exports = {
    async create (request, response){
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        /* Verifica se a ong existe ou não, se não existir da erro */
        if(!ong){
            return response.status(400).json({ error: "No ong found whith this ID!"});
        }

        return response.json(ong);
    }
}