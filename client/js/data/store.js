import teamParse from './team.js'
import matchParse from './match.js'

const FORECAST_DATA_URL = 'https://projects.fivethirtyeight.com/soccer-predictions/forecasts/2018_eliteserien_forecast.json'
const MATCHES_DATA_URL = 'https://projects.fivethirtyeight.com/soccer-predictions/forecasts/2018_eliteserien_matches.json'

const fetch = window.fetch
const store = {
  teams: [],
  matches: []
}

async function getJson (url) {
  const response = await fetch(url)
  return response.json()
}

async function getTeams () {
  if (!store.teams.length) {
    const data = await getJson(FORECAST_DATA_URL)

    store.teams = data.forecasts[0].teams.map(teamParse)
  }

  return store.teams
}

async function getMatches () {
  if (!store.matches.length) {
    const data = await getJson(MATCHES_DATA_URL)

    store.matches = data.map(matchParse)
  }

  return store.matches
}

export default {
  getTeams,
  getMatches
}
