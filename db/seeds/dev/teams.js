const teamsData = require('../../../teamsData');
const championsData = require('../../../championsData');

const createTeam = async (knex, team) => {
  const teamId = await knex('teams').insert({
    franchise: team.Franchise,
    playoff_series: team.Plyfs,
    championships: team.Champ
  }, 'id');

  let championPromises = championsData.map(champion => {
    return createChampion(knex, {
      champion: champion.Franchise,
      year: champion.Year,
      opponent: champion.Runner_up,
      team_id: teamId[0]
    });
  });

  return Promise.all(championPromises);
};

const createChampion = (knex, champion) => {
  return knex('champions').insert(champion);
};

exports.seed = async (knex) => {
  try {
    await knex('teams').del();
    await knex('champions').del();

    let teamPromises = teamsData.map(team => {
      return createTeam(knex, team);
    });

    return Promise.all(teamPromises);

  } catch (error) {
    console.log(`Error sending data: ${error}`);
  }
};
