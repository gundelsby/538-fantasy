import rounds from '../data/rounds.js'
import matchPredictions from '../predictions/match.js'

const MATCHTABLE_ID = 'matchtable'
const DISPLAY_FROM_DATE = Date.now()
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

function createRoundCell (currentTeamId, matches) {
  const td = document.createElement('td')
  td.classList.add('round')

  if (matches) {
    const list = document.createElement('ol')
    list.classList.add('round--matches', 'nrk-unset')

    const matchItems = matches.map(match => {
      const matchInfo = createMatchInfo(currentTeamId, match)
      const listItem = document.createElement('li')
      listItem.classList.add('match')

      listItem.appendChild(matchInfo)

      return listItem
    })

    matchItems.forEach(item => {
      list.appendChild(item)
    })

    td.appendChild(list)
  }

  return td
}

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
  container.classList.add('team--details')

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
  th.classList.add('team')

  const content = document.createElement('div')
  content.classList.add('matchtable--content')
  content.textContent = team.name
  th.appendChild(content)

  th.appendChild(createTeamDetails(team))

  return th
}

function createTeamRow (team, matches) {
  const tr = document.createElement('tr')
  tr.appendChild(createTeamHeader(team))

  const upcomingMatches = matches.filter(match => {
    return match.team1_id === team.id || match.team2_id === team.id
  }).filter(match => {
    return match.datetime > DISPLAY_FROM_DATE
  })

  const upcomingRounds = rounds.filter(round => {
    return round.start > DISPLAY_FROM_DATE
  }).map((round, index, arr) => {
    const nextStart = arr[index + 1] ? arr[index + 1].start : null

    round.matches = upcomingMatches.filter(match => {
      return match.datetime >= round.start && match.datetime < nextStart
    })

    return round
  })

  upcomingRounds.forEach(round => {
    const cell = createRoundCell(team.id, round.matches)
    tr.appendChild(cell)
  })

  return tr
}

export default (teams, matches) => {
  const tbody = document.createElement('tbody')
  const container = document.getElementById(MATCHTABLE_ID)

  fillTeamCache(teams)
  matchPredictor = matchPredictions(teams)

  teams.forEach(team => {
    const tr = createTeamRow(team, matches)
    tbody.appendChild(tr)
  })

  container.appendChild(tbody)
}
