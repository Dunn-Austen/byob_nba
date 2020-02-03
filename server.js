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
//The locals object is somewhat akin to local storage - a sometimes convenient means for caching information. Here we're just storing the title.
//App.locals is provided by express
app.locals.title = 'BYOB_NBA';


app.get('/', (request, response) => {
//This express route refers to the instace of our express app handling a get request (method) to the '/' (path) (the first argument). The 2nd argument is a callback that handles the logic governing the reaction to the get request
  response.send('Welcome to the BYOB_NBA page');
//Line 23 returns a reponse with the specified text
});

//This route involves the logic for the type of response provided for a Get request for all teams
//Same instance(app)/method(get)/path(/api/v1/teams)/handler format as the above endpoint
app.get('/api/v1/teams', async (request, response) => {
  //The Try / Catch statements allow for an error to be thrown if the try statement fails to execute appropriately, like an if/else statement
  try
  //Assuming no error, the following code dictates the promise resolution
  //Initializes the variable, teams, with data from the teams table (the select call resolves to an array of objects from the database)
    const teams = await database('teams').select();
  //
    response.status(200).json({teams});
    //The 200 status indicates a successful get request, and gives a response object that amounts to the parsed data from the teams database
  } catch (error) {
    //Catch block runs the below code if an error is caught in the try statement
    //Gives back a 500 status, with parsed text explaining that a 500 code corresponds to an internal server error
    response.status(500).json({error: 'internal server error' })
  }
});

//This route governs the behavior responding to a GET request for an individual team's data
//Same instance(app)/method(get)/path(/api/v1/teams/id:)/handler format as the above endpoint
//The :id refers to an identifier included in the table creation for the teams data, and allows us to pinpoint particular objects from the data set
app.get('/api/v1/teams/:id', async (request, response) => {
  try {
    //Includes the promise resolution in the case of a successful fetch request
    const teams = await database('teams').where('id', request.params.id).select();
    //This code is largely the same as above, with the exception of the WHERE statement
    //The where clause above translates to SELECT data from the TEAMS table WHERE the ID MATCHES the ID on the params objects of the request (the id of the team central to the get request)
    if (team.length) {
      //The conditional here runs the logic/promise resolution below if TRUE (length = 0 is falsey, so there must be a length > 0)
      response.status(200).json({team});
      //The 200 status indicates a successful get request, and gives a response object that amounts to the JSONed data from the teams database

    } else {
      response.status(404).json({
        //If the if condition resolves to false, we give an error status of 404 (resource not found), with some text explaining the specific missing element
        error: `Could not find team with id ${request.params.id}`
      });
    }
  } catch (error) {
    //Catch block runs the below code if an error is caught in the try statement
    //Gives back a 500 status, with parsed text explaining that a 500 code corresponds to an internal server error
    response.status(500).json({error: 'internal server error' })
  }
});

//This route governs the behavior responding to a GET request for an individual team's data
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
