const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'BYOB_NBA';
//app.use(exp)

app.get('/', (request, response) => {
  response.send('Welcome to the BYOB_NBA page');
});

//Get endpoint for all teams
app.get('/api/v1/teams', async (request, response) => {
  try {
    const teams = await database('teams').select();
    response.status(200).json({teams});
  } catch (error) {
    response.status(500).json({error: 'internal server error' })
  }
});

//Get endpoint for a specific team
app.get('/api/v1/teams/:id', async (request, response) => {
  try {
    const teams = await database('teams').where('id', request.params.id).select();
    if (team.length) {
      response.status(200).json({team});

    } else {
      response.status(404).json({
        error: `Could not find team with id ${request.params.id}`
      });
    }
  } catch (error) {
    response.status(500).json({error: 'internal server error' })
  }
});

//Get endpoint for all champions
app.get('/api/v1/champions', async (request, response) => {
  try {
    const champions = await database('teams').select();
    response.status(200).json({champions});
  } catch (error) {
    response.status(500).json({error: 'internal server error' })
  }
});

//Get endpoint for a specific champion
app.get('/api/v1/champions/:id', async (request, response) => {
  try {
    const teams = await database('champions').where('id', request.params.id).select();
    if (champion.length) {
      response.status(200).json({champion});

    } else {
      response.status(404).json({
        error: `Could not find champion with id ${request.params.id}`
      });
    }
  } catch (error) {
    response.status(500).json({error: 'internal server error' })
  }
});

//Posting a new team
// If POST request fails to save an entity due to bad information being sent from the client, you should respond with 422: Unprocessable entity
app.post('/api/v1/teams', async (request, response) => {
  const team = request.body;

  for (let requiredParameter of ['franchise', 'playoff_series', 'championships']) {
    if(!team[requiredParameter]) {
      return response
        .status(422).send({ error: `Expected object structure: { name: <String>, city: <String>, championships: <String>  }. You're missing a "${requiredParameter}" property.` })
    }
  }

  try {
    const id = await database('teams').insert(team, 'id');
    response.status(201).json({ id: id[0] });
  } catch (error) {
    response.status(500).json({ error: 'internal server error'  });
  }
});

//Posting a new champion
//Needs file path amendment re: connected tables (teams -> champions)
app.post('/api/v1/champions', async (request, response) => {
  const champion = request.body;

  for (let requiredParameter of ['champion', 'year', 'opponent']) {
    if(!champion[requiredParameter]) {
      return response
        .status(422).send({ error: `Expected object structure: { name: <String>, city: <String>, championships: <String>  }. You're missing a "${requiredParameter}" property.` })
    }
  }

  try {
    const id = await database('teams').insert(champion, 'id');
    response.status(201).json({ id: id[0] });
  } catch (error) {
    response.status(500).json({ error: 'internal server error' });
  }
});

//Delete an NBA team
app.delete('/api/v1/teams/:id', async (request, response) => {
  const { id } = request.params;
  try {
    const team = await database('teams').where('id', id).del();

    response.sendStatus(204).json({msg: 'Successful delete'});
  } catch (error) {
    response.status(500).json({ error: 'internal server error'  });
  }
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
