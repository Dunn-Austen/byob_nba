//Import syntax that allows us to use the express framework (configuration element)
const express = require('express');
//Initializes a variable of 'app' with the express invocation. Allows us to run express by referencing 'app'
const app = express();
//Establishes the present environment (development, testing, or production) with the default setting of a development environment
const environment = process.env.NODE_ENV || 'development';
//Per the specific environment, fetches the database configuration from knexfile.js so that express can access it
const configuration = require('./knexfile')[environment];
//Import syntax for knex (configuration element)
const database = require('knex')(configuration);

//By default, parses the request body to json format
app.use(express.json());

//Dictates the port on which the server runs (specifying 3000 as the default)
app.set('port', process.env.PORT || 3000);
//The locals object is somewhat akin to local storage - a sometimes convenient means for caching information. Here we're just storing the title
app.locals.title = 'BYOB_NBA';


app.get('/', (request, response) => {
  response.send('Welcome to the BYOB_NBA page');
});
//Just a little something to greet me when running the server. It's the endpoint dictating responses for the (/) home pathway

app.get('/api/v1/teams', async (request, response) => {
  try {
    const teams = await database('teams').select();
    response.status(200).json({teams});
  } catch (error) {
    response.status(500).json({error: 'internal server error' })
  }
});
//This is the GET request enpoint for all team data. The code block suffices to specify what to do when encountering a particular fetch call (determines happy & sad paths and targeted responses)
//Each of the remaining code blocks represents the programmed logic for receiving and processing various fetch calls, be they successful or some other condition

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
//Generates a message indicating that the port is indeed running
