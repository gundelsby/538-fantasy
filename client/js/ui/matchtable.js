const MATCHTABLE_ID = 'matchtable'

const teamCache = {}

function fillTeamCache (teams) {
  teams.forEach(team => {
    teamCache[team.id] = team
  })
}

function createMatchCell (currentTeamId, match) {
  const td = document.createElement('td')
  const opponent = match.team1_id === currentTeamId ? teamCache[match.team2_id] : teamCache[match.team1_id]

  td.textContent = opponent.name

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
