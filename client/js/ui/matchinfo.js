import { createMatchPredictor } from '../predictions/match.js';
const difficulty = [
    { name: 'baby', class: 'difficulty--baby' },
    { name: 'easy', class: 'difficulty--easy' },
    { name: 'medium', class: 'difficulty--medium' },
    { name: 'hard', class: 'difficulty--hard' },
    { name: 'nightmare', class: 'difficulty--nightmare' }
];
const teamCache = new Map();
let matchPredictor;
function fillTeamCache(teams) {
    teams.forEach((team) => {
        teamCache.set(team.id, team);
    });
}
function calcDifficultyClass(match, isHomeGame) {
    const adversityFactor = matchPredictor.calcAdversityFactor(match, isHomeGame);
    const difficultyPosition = Math.ceil(adversityFactor * difficulty.length);
    const calculatedDifficulty = difficulty[difficultyPosition - 1];
    return calculatedDifficulty ? calculatedDifficulty.class : '';
}
function createMatchDetailsDataRow(name, value) {
    const row = document.createElement('tr');
    const header = document.createElement('th');
    header.textContent = name;
    row.appendChild(header);
    const data = document.createElement('td');
    data.textContent = Number(value).toFixed(2);
    row.appendChild(data);
    return row;
}
function createMatchDetails(match) {
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
function createMatchInfo(currentTeamId, match) {
    const element = document.createElement('div');
    element.classList.add('match--info', 'matchtable--content', 'overlay--container');
    const isHomeGame = match.team1_id === currentTeamId;
    const opponent = isHomeGame ? teamCache.get(match.team2_id) : teamCache.get(match.team1_id);
    element.textContent = opponent ? `${opponent.code} (${isHomeGame ? 'H' : 'B'})` : '';
    element.classList.add(calcDifficultyClass(match, isHomeGame));
    element.appendChild(createMatchDetails(match));
    return element;
}
export default function (teams) {
    fillTeamCache(teams);
    matchPredictor = createMatchPredictor(teams);
    return createMatchInfo;
}
