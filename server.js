const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(express.json());

app.set('port', process.env.PORT || 3000);
app.locals.title = 'BYOB_NBA';


app.get('/', (request, response) => {
  response.send('Welcome to the BYOB_NBA page');
});

app.get('/api/v1/teams', async (request, response) => {
  try {
    const teams = await database('teams').select();
    response.status(200).json({teams});
  } catch (error) {
    response.status(500).json({error: 'internal server error' })
  }
});

app.get('/api/v1/teams/:id', async (request, response) => {
  try {
    const team = await database('teams').where('id', request.params.id).select();
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

app.get('/api/v1/champions', async (request, response) => {
  try {
    const champions = await database('champions').select();
    response.status(200).json({champions});
  } catch (error) {
    response.status(500).json({error: 'internal server error' })
  }
});

app.get('/api/v1/champions/:id', async (request, response) => {
  try {
    const champion = await database('champions').where('id', request.params.id).select();
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

app.post('/api/v1/champions', async (request, response) => {
  const champion = request.body;

  for (let requiredParameter of ['champion', 'year', 'opponent']) {
    if(!champion[requiredParameter]) {
      return response
        .status(422).send({ error: `Expected object structure: { name: <String>, city: <String>, championships: <String>  }. You're missing a "${requiredParameter}" property.` })
    }
  }

  try {
    const id = await database('champions').insert(champion, 'id');
    response.status(201).json({ id: id[0] });
  } catch (error) {
    response.status(500).json({ error: 'internal server error' });
  }
});

app.delete('/api/v1/teams/:id', async (request, response) => {
  try {
    const team = await database('teams').where('id', request.params.id).del();

    response.sendStatus(204).json({msg: 'Successful delete'});
  } catch (error) {
    response.status(500).json({ error: 'internal server error'  });
  }
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
