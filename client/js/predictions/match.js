const teamCache = {}

function fillTeamCache (teams) {
  teams.forEach(team => {
    teamCache[team.id] = team
  })
}

function calcAdversityFactor (match, isHomeGame) {
  const winProbability = isHomeGame ? match.prob1 : match.prob2
  return 1.0 - (winProbability + match.probtie / 2)
}
/*
  goalsFor: 0,
  goalsForHome: 0,
  goalsForAway: 0,
  goalsAgainst: 0,
  goalsAgainstHome: 0,
  goalsAgainstAway: 0,
  matchesPlayed: 0,
  matchesPlayedHome: 0,
  matchesPlayedAway: 0
*/

function calcLowestLikelyScore (score1, score2) {
  return Math.min(score1, score2)
}

function calcGoalProbability (match) {
  const homeTeam = teamCache[match.team1_id]
  const awayTeam = teamCache[match.team2_id]
  const avgHomeGoalsFor = homeTeam.goalsForHome / homeTeam.matchesPlayedHome
  const avgHomeGoalsAgainst = homeTeam.goalsAgainstHome / homeTeam.matchesPlayedHome
  const avgAwayGoalsFor = awayTeam.goalsForAway / awayTeam.matchesPlayedAway
  const avgAwayGoalsAgainst = awayTeam.goalsAgainstAway / awayTeam.matchesPlayedAway

  const stuff = {}
  stuff[`${homeTeam.name}`] = calcLowestLikelyScore(avgHomeGoalsFor, avgAwayGoalsAgainst)
  stuff[`${awayTeam.name}`] = calcLowestLikelyScore(avgAwayGoalsFor, avgHomeGoalsAgainst)
  stuff[`${homeTeam.name} (pred)`] = (homeTeam.o_rating + awayTeam.d_rating) / 2
  stuff[`${awayTeam.name} (pred)`] = (awayTeam.o_rating + homeTeam.d_rating) / 2

  return stuff
}

export default function (teams) {
  fillTeamCache(teams)

  return {
    calcAdversityFactor,
    calcGoalProbability
  }
}
