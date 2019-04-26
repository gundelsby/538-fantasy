const teams = new Map();
function initTeam(teamId) {
    if (!teams.has(teamId)) {
        teams.set(teamId, {
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
        });
    }
}
function addTeamScore(teamId, goalsFor, goalsAgainst, isHomeGame) {
    initTeam(teamId);
    const team = teams.get(teamId);
    if (!team) {
        return;
    }
    team.goalsFor += goalsFor;
    team.goalsAgainst += goalsAgainst;
    team.matchesPlayed++;
    if (isHomeGame) {
        team.goalsForHome += goalsFor;
        team.goalsAgainstHome += goalsAgainst;
        team.matchesPlayedHome++;
    }
    else {
        team.goalsForAway += goalsFor;
        team.goalsAgainstAway += goalsAgainst;
        team.matchesPlayedAway++;
    }
    teams.set(teamId, team);
}
function addTeamPoints(match) {
    const homeTeam = teams.get(match.team1_id);
    const awayTeam = teams.get(match.team2_id);
    if (!homeTeam || !awayTeam) {
        return;
    }
    if (match.score1 === match.score2) {
        homeTeam.points = homeTeam.points ? homeTeam.points + 1 : 1;
        awayTeam.points = awayTeam.points ? awayTeam.points + 1 : 1;
    }
    teams.set(homeTeam.id, homeTeam);
    teams.set(awayTeam.id, awayTeam);
}
function getTeamStats(matches) {
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
