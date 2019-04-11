const teams = {};

function initTeam (teamId) {
  if (!teams[teamId]) {
    teams[teamId] = {
      goalsFor: 0,
      goalsForHome: 0,
      goalsForAway: 0,
      goalsAgainst: 0,
      goalsAgainstHome: 0,
      goalsAgainstAway: 0,
      matchesPlayed: 0,
      matchesPlayedHome: 0,
      matchesPlayedAway: 0,
      points: 0
    };
  }
}

function addTeamScore (teamId, goalsFor, goalsAgainst, isHomeGame) {
  initTeam(teamId);

  teams[teamId].goalsFor += goalsFor;
  teams[teamId].goalsAgainst += goalsAgainst;
  teams[teamId].matchesPlayed++;

  if (isHomeGame) {
    teams[teamId].goalsForHome += goalsFor;
    teams[teamId].goalsAgainstHome += goalsAgainst;
    teams[teamId].matchesPlayedHome++;
  } else {
    teams[teamId].goalsForAway += goalsFor;
    teams[teamId].goalsAgainstAway += goalsAgainst;
    teams[teamId].matchesPlayedAway++;
  }
}

function addTeamPoints (match) {
  const homeTeam = match.team1_id;
  const awayTeam = match.team2_id;

  if (match.score1 === match.score2) {
    teams[homeTeam].points = teams[homeTeam].points ? teams[homeTeam].points + 1 : 1;
    teams[awayTeam].points = teams[awayTeam].points ? teams[awayTeam].points + 1 : 1;
  }
}

function getTeamStats (matches) {
  matches.forEach((match) => {
    if (typeof match.score1 === 'number') {
      addTeamScore(match.team1_id, match.score1, match.score2, true);
      addTeamScore(match.team2_id, match.score2, match.score1, false);
      addTeamPoints(match);
    }
  });

  return teams;
}

export default {
  getTeamStats
};
