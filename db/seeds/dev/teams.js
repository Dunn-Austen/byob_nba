const teamsData = require('../../../teamsData');

const createTeam = async (knex, team) => {
  const teamId = await knex('teams').insert({
    franchise: team.franchise,
    playoff_series: team.Plyfs,
    champsionships: team.champ
  }, 'id');

  let championPromises = team.champions.map(champion => {
    return createChampion(knex, {
      champ: champion,
      team_id: teamId[0]
    })
  });

  return Promise.all(championPromises);
};

const createChampion = (knex, champion) => {
  return knex('champions').insert(champion);
};

exports.seed = async function(knex) {
  try {
    await knex('teams').del();
    await knex('champions').del();
    //Deletes the data in the table

    let teamPromises = teamsData.map(team => {
      return createTeam(knex, team);
    });

    return Promise.all(teamPromises);

    //I need to clarify 'knex' - return (knex)

  } catch (error) {
    console.log(`Error sending data: ${error}`);
  }
};
