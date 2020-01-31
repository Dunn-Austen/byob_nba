
exports.up = function(knex) {
  return knex.schema
  .createTable('papers', function (table) {
    table.increments('id').primary();
    table.string('title');
    table.string('author');

    table.timestamps(true, true);
  })
};

exports.down = function(knex) {

};
