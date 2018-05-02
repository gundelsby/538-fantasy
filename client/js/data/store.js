import teamParse from './team.js'
import matchParse from './match.js'

const FORECAST_DATA_URL = 'https://projects.fivethirtyeight.com/soccer-predictions/forecasts/2018_eliteserien_forecast.json'
const MATCHES_DATA_URL = 'https://projects.fivethirtyeight.com/soccer-predictions/forecasts/2018_eliteserien_matches.json'

const fetch = window.fetch
const store = {
  teams: [],
  matches: []
}

function getTeams () {
  if (!store.teams.length) {
    fetch(FORECAST_DATA_URL)
      .then(response => {
        return response.json()
      })
      .then(json => {
        return json.forecasts[0].teams.map((team) => {
          return teamParse(team)
        })
      })
      .then((teams) => {
        store.teams = teams
        return teams
      })
  }

  return store.teams
}

function getMatches () {
  if (!store.matches.length) {
    fetch(MATCHES_DATA_URL)
      .then(response => {
        return response.json()
      })
      .then(json => {
        return json.map(match => {
          return matchParse(match)
        })
      })
      .then((matches) => {
        store.matches = matches
        return store.matches
      })
  }

  return store.matches
}

export default {
  getTeams,
  getMatches
}
