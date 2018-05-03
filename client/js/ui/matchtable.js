const MATCHTABLE_ID = 'matchtable'

const teamCache = {}

function fillTeamCache (teams) {
  teams.forEach(team => {
    teamCache[team.id] = team
  })
}

function calcBackgroundColor (match, isHomeGame) {
  const r = Math.round(((isHomeGame ? match.prob2 : match.prob1) * 100))
  const g = Math.round(((isHomeGame ? match.prob1 : match.prob2) * 100))
  const b = 0

  return `rgba(${r}, ${g}, ${b}, 0.5)`
}

function createMatchCell (currentTeamId, match) {
  const td = document.createElement('td')
  const isHomeGame = match.team1_id === currentTeamId
  const opponent = isHomeGame ? teamCache[match.team2_id] : teamCache[match.team1_id]

  td.textContent = opponent.code
  td.style.backgroundColor = calcBackgroundColor(match, isHomeGame)

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
