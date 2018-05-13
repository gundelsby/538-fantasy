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
  return Math.round(Math.min(score1, score2))
}

function calcGoalProbability (match) {
  const homeTeam = teamCache[match.team1_id]
  const awayTeam = teamCache[match.team2_id]
  const avgHomeGoalsFor = homeTeam.goalsForHome / homeTeam.matchesPlayedHome
  const avgHomeGoalsAgainst = homeTeam.goalsAgainstHome / homeTeam.matchesPlayedHome
  const avgAwayGoalsFor = awayTeam.goalsForAway / awayTeam.matchesPlayedAway
  const avgAwayGoalsAgainst = awayTeam.goalsAgainstAway / awayTeam.matchesPlayedAway

  return {
    home: calcLowestLikelyScore(avgHomeGoalsFor, avgAwayGoalsAgainst),
    away: calcLowestLikelyScore(avgAwayGoalsFor, avgHomeGoalsAgainst)
  }
}

export default function (teams) {
  fillTeamCache(teams)

  return {
    calcAdversityFactor,
    calcGoalProbability
  }
}
