
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table){
      table.increments();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.string('value').notNullable();

      /* Relacionamento entre as tabelas ongs => incidents */
      table.string('ong_id').notNullable();
      
      /* Criação da chave estrangeira */
      table.foreign('ong_id').references('id').inTable('ongs');
    });
  };
  
  /**
   * 
   * DOWN = Se der algum erro e precisar dar um rollback
   */
  
  exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
  };