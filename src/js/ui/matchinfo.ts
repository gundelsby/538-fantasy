import { createMatchPredictor, MatchPredictor } from '../predictions/match.js';
import { Team } from '../data/team.js';
import { Match } from '../data/match.js';

const difficulty = [
  { name: 'baby', class: 'difficulty--baby' },
  { name: 'easy', class: 'difficulty--easy' },
  { name: 'medium', class: 'difficulty--medium' },
  { name: 'hard', class: 'difficulty--hard' },
  { name: 'nightmare', class: 'difficulty--nightmare' }
];

const teamCache: Map<Team['id'], Team> = new Map();
let matchPredictor: MatchPredictor;

function fillTeamCache(teams: Array<Team>) {
  teams.forEach((team) => {
    teamCache.set(team.id, team);
  });
}

function calcDifficultyClass(match: any, isHomeGame: boolean) {
  const adversityFactor = matchPredictor.calcAdversityFactor(match, isHomeGame);
  const difficultyPosition = Math.ceil(adversityFactor * difficulty.length);
  const calculatedDifficulty = difficulty[difficultyPosition - 1];

  return calculatedDifficulty ? calculatedDifficulty.class : '';
}

function createMatchDetailsDataRow(name: string, value: number) {
  const row = document.createElement('tr');

  const header = document.createElement('th');
  header.textContent = name;
  row.appendChild(header);

  const data = document.createElement('td');
  data.textContent = Number(value).toFixed(2);
  row.appendChild(data);

  return row;
}

function createMatchDetails(match: Match): HTMLElement {
  const element = document.createElement('div');
  element.classList.add('match--details', 'overlay');

  const data = matchPredictor.calcGoalProbability(match);

  if (!data) {
    return element;
  }

  const dataTable = document.createElement('table');
  dataTable.classList.add('match--details__data');

  Object.keys(data).forEach((key) => {
    const row = createMatchDetailsDataRow(key, data[key]);
    dataTable.appendChild(row);
  });
  element.appendChild(dataTable);

  return element;
}

function calcOutlook(match: Match, isHomeGame: boolean) {
  const homeTeam = teamCache.get(match.team1_id);
  const awayTeam = teamCache.get(match.team2_id);

  const predictions = matchPredictor.calcGoalProbability(match);
  if (match.id === 401106546) {
    console.log(predictions);
  }

  if (!predictions || !homeTeam || !awayTeam) {
    return '';
  }

  let emojis = '';

  const goalsFor = isHomeGame ? predictions[homeTeam.name] : predictions[awayTeam.name];
  const goalsAgainst = isHomeGame ? predictions[awayTeam.name] : predictions[homeTeam.name];

  if (match.id === 401106546) {
    console.log(predictions);
    console.log(`${goalsFor}, ${goalsFor > 1}`);
    console.log(`${goalsAgainst}, ${goalsAgainst < 1}`);
  }

  if (goalsFor > 1) {
    emojis += '⚽';
  }
  emojis += goalsAgainst < 1 ? '🛡️' : '😬';

  return emojis;
}

function createMatchInfo(currentTeamId: number, match: Match) {
  const element = document.createElement('div');
  element.classList.add('match--info', 'matchtable--content', 'overlay--container');
  element.dataset.matchId = String(match.id);

  const isHomeGame = match.team1_id === currentTeamId;
  const opponent = isHomeGame ? teamCache.get(match.team2_id) : teamCache.get(match.team1_id);

  const outlookEmojis = calcOutlook(match, isHomeGame);
  element.textContent = opponent
    ? `${opponent.code} (${isHomeGame ? 'H' : 'B'}) ${outlookEmojis}`
    : '';
  element.classList.add(calcDifficultyClass(match, isHomeGame));

  element.appendChild(createMatchDetails(match));

  return element;
}

export default function(teams: Array<Team>): (currentTeamId: number, match: Match) => HTMLElement {
  fillTeamCache(teams);
  matchPredictor = createMatchPredictor(teams);

  return createMatchInfo;
}
