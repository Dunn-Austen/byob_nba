exports.up = function(knex) {
  return knex.schema
  .createTable('teams', table => {
    table.increments('id').primary();
    table.string('franchise');
    table.integer('playoff_series');
    table.integer('championships');
    table.timestamps(true, true);
  })
  .createTable('champions', table => {
    table.increments('id').primary();
    table.string('champion');
    table.integer('year');
    table.string('opponent');
    table.integer('team_id').unsigned();
    table.foreign('team_id').references('teams.id');
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('champions')
    .dropTable('teams')
};
