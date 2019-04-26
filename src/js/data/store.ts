import { Match, parse as matchParse } from './match.js';
import { Team, parse as teamParse } from './team.js';

const FORECAST_DATA_URL =
  'https://projects.fivethirtyeight.com/soccer-predictions/forecasts/2019_eliteserien_forecast.json';
const MATCHES_DATA_URL =
  'https://projects.fivethirtyeight.com/soccer-predictions/forecasts/2019_eliteserien_matches.json';

const fetch = window.fetch;
const store = {
  teams: [],
  matches: []
};

async function getJson(url: string) {
  const response = await fetch(url);
  return response.json();
}

async function getTeams(): Promise<Array<Team>> {
  if (!store.teams.length) {
    const data = await getJson(FORECAST_DATA_URL);

    store.teams = data.forecasts[0].teams.map(teamParse);
  }

  return store.teams;
}

async function getMatches(): Promise<Array<Match>> {
  if (!store.matches.length) {
    const data = await getJson(MATCHES_DATA_URL);

    store.matches = data.map(matchParse);
  }

  return store.matches;
}

export default { getTeams, getMatches };
