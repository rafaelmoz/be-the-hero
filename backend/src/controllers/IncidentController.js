const connection = require('../database/connection');


module.exports = {
    /* Listar todos incidentes da ONG */
    async index (request, response){
        /* Criando a paginação dos incidentes limitando a 5 */
        const { page = 1} = request.query;

        /* Vai retornar a quantidade de casos (TOTAL), vai contar quantos casos tem 
        e informar ao frontend quantos registros tem(X-Total-Count) */
        const [count] = await connection('incidents')
            .count();
            console.log(count)

        response.header('X-Total-Count', count['count(*)']);

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            /* Trazer também junto com os incidentes as informações da ONG que registrou o incidente */
            .select(['incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.uf',
                'ongs.uf']);

        return response.json(incidents);
    },


    /* Criar incidentes para a ONG */
    async create (request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id })
    },

    /* Deletar um incidente */
    async delete (request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        /* Verifica se o incidente que esta sendo deletado é da ong que esta logado,
        se não for da o erro 401, se for ele passa e deleta o incidente. */
        if (incident.ong_id != ong_id){
            return response.status(401).json({ erro: 'Operation not permited.'});
        }

        await connection('incidents').where('id', id).delete()

        return response.status(204).send();
    },

}