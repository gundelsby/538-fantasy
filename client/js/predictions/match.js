const teamCache = new Map();
function fillTeamCache(teams) {
    teams.forEach((team) => {
        teamCache.set(team.id, team);
    });
}
function calcAdversityFactor(match, isHomeGame) {
    const winProbability = isHomeGame ? match.prob1 : match.prob2;
    return 1.0 - (winProbability + match.probtie / 2);
}
function calcLowestLikelyScore(score1, score2) {
    return Math.min(score1, score2);
}
function getAverage(total = 0, divider = 0) {
    if (total === 0 || divider === 0) {
        return 0;
    }
    return total / divider;
}
function calcGoalProbability(match) {
    const homeTeam = teamCache.get(match.team1_id);
    const awayTeam = teamCache.get(match.team2_id);
    if (!homeTeam || !awayTeam) {
        console.log(`Missing teams for match ${match.id}!`);
        if (!homeTeam) {
            console.log(`Home team missing, id: ${match.team1_id}`);
        }
        if (!awayTeam) {
            console.log(`Away team missing, id: ${match.team2_id}`);
        }
        return;
    }
    const avgHomeGoalsFor = getAverage(homeTeam.goalsForHome, homeTeam.matchesPlayedHome);
    const avgHomeGoalsAgainst = getAverage(homeTeam.goalsAgainstHome, homeTeam.matchesPlayedHome);
    const avgAwayGoalsFor = getAverage(awayTeam.goalsForAway, awayTeam.matchesPlayedAway);
    const avgAwayGoalsAgainst = getAverage(awayTeam.goalsAgainstAway, awayTeam.matchesPlayedAway);
    const stuff = {};
    stuff[`${homeTeam.name}`] = calcLowestLikelyScore(avgHomeGoalsFor, avgAwayGoalsAgainst);
    stuff[`${awayTeam.name}`] = calcLowestLikelyScore(avgAwayGoalsFor, avgHomeGoalsAgainst);
    stuff[`${homeTeam.name} (pred)`] = (homeTeam.o_rating + awayTeam.d_rating) / 2;
    stuff[`${awayTeam.name} (pred)`] = (awayTeam.o_rating + homeTeam.d_rating) / 2;
    return stuff;
}
export function createMatchPredictor(teams) {
    fillTeamCache(teams);
    return {
        calcAdversityFactor,
        calcGoalProbability
    };
}
