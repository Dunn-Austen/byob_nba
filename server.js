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

//Get request for all teams
app.get('/api/v1/teams', async (request, response) => {
  try {
    const teams = await database('teams').select();
    response.status(200).json({teams});
  } catch (error) {
    response.status(500).json({error})
  }
});

//Get request for a specific team - needs amendment for final lesson
app.get('/api/v1/teams/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const teams = await database('teams').select();
    const team = teams.find(team => team.id === id);
    if (!team) {
      return response.sendStatus(404);
    }

    response.status(200).json({team});
  } catch (error) {
    response.status(500).json({error})
  }
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
