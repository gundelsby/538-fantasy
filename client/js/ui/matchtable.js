const MATCHTABLE_ID = 'matchtable'

const teamCache = {}

const difficulty = [
  {name: 'baby', class: 'difficulty--baby'},
  {name: 'easy', class: 'difficulty--easy'},
  {name: 'medium', class: 'difficulty--medium'},
  {name: 'hard', class: 'difficulty--hard'},
  {name: 'nightmare', class: 'difficulty--nightmare'}
]

function fillTeamCache (teams) {
  teams.forEach(team => {
    teamCache[team.id] = team
  })
}

function calcDifficultyClass (match, isHomeGame) {
  const adversityFactor = 1.0 - ((isHomeGame ? match.prob1 : match.prob2) + match.probtie / 2)
  const difficultyPosition = Math.ceil(adversityFactor * difficulty.length)
  const calculatedDifficulty = difficulty[difficultyPosition - 1]
  if (match.id === 401007367) {
    console.log(isHomeGame ? match.prob1 : match.prob2, match.probtie, isHomeGame ? match.prob2 : match.prob1)
    console.log(adversityFactor, difficultyPosition, calculatedDifficulty && calculatedDifficulty.name)
  }
  return calculatedDifficulty ? calculatedDifficulty.class : ''
}

function createMatchCell (currentTeamId, match) {
  const td = document.createElement('td')
  const isHomeGame = match.team1_id === currentTeamId
  const opponent = isHomeGame ? teamCache[match.team2_id] : teamCache[match.team1_id]

  td.textContent = `${opponent.code} (${isHomeGame ? 'H' : 'B'})`
  td.className = calcDifficultyClass(match, isHomeGame)

  return td
}

function createTeamRow (team, matches) {
  const tr = document.createElement('tr')
  const th = document.createElement('th')
  th.textContent = team.name
  tr.appendChild(th)

  const upcomingMatches = matches.filter(match => {
    return match.team1_id === team.id || match.team2_id === team.id
  }).filter(match => {
    return Date.parse(match.datetime) > Date.now()
  })

  upcomingMatches.forEach(match => {
    tr.appendChild(createMatchCell(team.id, match))
  })

  return tr
}

export default (teams, matches) => {
  const tbody = document.createElement('tbody')
  const container = document.getElementById(MATCHTABLE_ID)

  fillTeamCache(teams)

  teams.forEach(team => {
    const tr = createTeamRow(team, matches)
    tbody.appendChild(tr)
  })

  container.appendChild(tbody)
}
