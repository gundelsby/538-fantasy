import matchPredictions from '../predictions/match.js'

const difficulty = [
  {name: 'baby', class: 'difficulty--baby'},
  {name: 'easy', class: 'difficulty--easy'},
  {name: 'medium', class: 'difficulty--medium'},
  {name: 'hard', class: 'difficulty--hard'},
  {name: 'nightmare', class: 'difficulty--nightmare'}
]

const teamCache = {}
let matchPredictor = null

function fillTeamCache (teams) {
  teams.forEach(team => {
    teamCache[team.id] = team
  })
}

function calcDifficultyClass (match, isHomeGame) {
  const adversityFactor = matchPredictor.calcAdversityFactor(match, isHomeGame)
  const difficultyPosition = Math.ceil(adversityFactor * difficulty.length)
  const calculatedDifficulty = difficulty[difficultyPosition - 1]

  return calculatedDifficulty ? calculatedDifficulty.class : ''
}

function createMatchInfo (currentTeamId, match) {
  const element = document.createElement('div')
  element.classList.add('match--info', 'matchtable--content')

  const isHomeGame = match.team1_id === currentTeamId
  const opponent = isHomeGame ? teamCache[match.team2_id] : teamCache[match.team1_id]

  element.textContent = `${opponent.code} (${isHomeGame ? 'H' : 'B'})`
  element.classList.add(calcDifficultyClass(match, isHomeGame))

  return element
}

export default function (teams) {
  fillTeamCache(teams)
  matchPredictor = matchPredictions(teams)

  return createMatchInfo
}
