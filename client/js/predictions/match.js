let teamCache = {}

function calcAdversityFactor (match, isHomeGame) {
  const winProbability = isHomeGame ? match.prob1 : match.prob2
  return 1.0 - (winProbability + match.probtie / 2)
}

export default function (teams) {
  teamCache = teams

  return {
    calcAdversityFactor
  }
}
