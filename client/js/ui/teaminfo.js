function createTeamDetailsDataRow (name, value) {
  const row = document.createElement('tr')

  const header = document.createElement('th')
  header.textContent = name
  row.appendChild(header)

  const data = document.createElement('td')
  data.textContent = typeof value === 'number' ? Number(value).toFixed(2) : value
  row.appendChild(data)

  return row
}

function createTeamDetails (team) {
  const container = document.createElement('div')
  container.classList.add('team--details', 'overlay')

  const dataTable = document.createElement('table')
  dataTable.classList.add('team--details__data')
  dataTable.appendChild(createTeamDetailsDataRow('F', team.goalsFor))
  dataTable.appendChild(createTeamDetailsDataRow('F/M', team.goalsFor / team.matchesPlayed))
  dataTable.appendChild(createTeamDetailsDataRow('F/M (Home)', team.goalsForHome / team.matchesPlayedHome))
  dataTable.appendChild(createTeamDetailsDataRow('F/M (Away)', team.goalsForAway / team.matchesPlayedAway))
  dataTable.appendChild(createTeamDetailsDataRow('A', team.goalsAgainst))
  dataTable.appendChild(createTeamDetailsDataRow('A/M', team.goalsAgainst / team.matchesPlayed))
  dataTable.appendChild(createTeamDetailsDataRow('A/M (Home)', team.goalsAgainstHome / team.matchesPlayedHome))
  dataTable.appendChild(createTeamDetailsDataRow('A/M (Away)', team.goalsAgainstAway / team.matchesPlayedAway))
  container.appendChild(dataTable)

  return container
}

function createTeamHeader (team) {
  const th = document.createElement('th')
  th.classList.add('team', 'overlay--container')

  const content = document.createElement('div')
  content.classList.add('matchtable--content')
  content.textContent = team.name
  th.appendChild(content)

  th.appendChild(createTeamDetails(team))

  return th
}

export default createTeamHeader
