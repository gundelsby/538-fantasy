let teamCache = {}

function calcAdversityFactor (match, isHomeGame) {
  const winProbability = isHomeGame ? match.prob1 : match.prob2
  return 1.0 - (winProbability + match.probtie / 2)
}

function calcGoalProbability (match) {
  return {
    home: 0,
    away: 0
  }
}

export default function (teams) {
  teamCache = teams

  return {
    calcAdversityFactor,
    calcGoalProbability
  }
}
