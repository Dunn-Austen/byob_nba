const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'BYOB_NBA';

app.get('/', (request, response) => {
  response.send('Welcome to the BYOB_NBA page');
});

app.get('/api/v1/teams/:id', (request, response) => {
  const { id } = request.params;
  const team = app.locals.teams.find(team => team.id === id);
  if (!team) {
    return response.sendStatus(404);
  }

  response.status(200).json(team);
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
