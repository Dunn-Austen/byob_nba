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
    table.integer('opponent');
    table.integer('team_id').unsigned();
    //Unsigned means no (-) attached, no negative numbers
    table.foreign('team_id').references('teams.id');
    //Makes this a foreign key referencing the primary key on the other table
  })
};

exports.down = function(knex) {
  //In removing the tables, the attached table is first removed, then the anchor
  return knex.schema
    .dropTable('champions')
    .dropTable('teams')
};
