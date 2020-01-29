// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/nba_champs',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },

};
