import { createTeamInfo } from './teaminfo.js';
import matchInfo from './matchinfo.js';
import { rounds } from '../data/rounds.js';
const MATCHTABLE_ID = 'matchtable';
const DISPLAY_FROM_DATE = new Date();
let createMatchInfo;
function createRoundCell(currentTeamId, matches) {
    const td = document.createElement('td');
    td.classList.add('round');
    if (matches) {
        const list = document.createElement('ol');
        list.classList.add('round--matches', 'nrk-unset');
        const matchItems = matches.map((match) => {
            const matchInfo = createMatchInfo(currentTeamId, match);
            const listItem = document.createElement('li');
            listItem.classList.add('match');
            listItem.appendChild(matchInfo);
            return listItem;
        });
        matchItems.forEach((item) => {
            list.appendChild(item);
        });
        td.appendChild(list);
    }
    return td;
}
function createTeamRow(team, matches) {
    const tr = document.createElement('tr');
    tr.appendChild(createTeamInfo(team));
    const upcomingMatches = matches
        .filter((match) => {
        return match.team1_id === team.id || match.team2_id === team.id;
    })
        .filter((match) => {
        return match.datetime >= DISPLAY_FROM_DATE;
    });
    const upcomingRounds = rounds
        .filter((round) => {
        return round.start >= DISPLAY_FROM_DATE;
    })
        .map((round, index, arr) => {
        const nextStart = arr[index + 1] ? arr[index + 1].start : null;
        round.matches = upcomingMatches.filter((match) => {
            return match.datetime >= round.start && (!nextStart || match.datetime < nextStart);
        });
        return round;
    });
    upcomingRounds.forEach((round) => {
        const cell = createRoundCell(team.id, round.matches);
        tr.appendChild(cell);
    });
    return tr;
}
function createRoundDatesRow() {
    const dateRow = document.createElement('tr');
    dateRow.appendChild(document.createElement('td'));
    rounds
        .filter((round) => round.start > DISPLAY_FROM_DATE)
        .forEach((round) => {
        const roundHeader = document.createElement('th');
        roundHeader.textContent = round.start.toLocaleDateString('no-NB', {
            hour12: false,
            month: 'short',
            day: '2-digit'
        });
        dateRow.appendChild(roundHeader);
    });
    return dateRow;
}
export default (teams, matches) => {
    const tbody = document.createElement('tbody');
    const thead = document.createElement('thead');
    thead.appendChild(createRoundDatesRow());
    const container = document.getElementById(MATCHTABLE_ID);
    if (!container) {
        return;
    }
    createMatchInfo = matchInfo(teams);
    teams.sort(tableSort).forEach((team) => {
        const tr = createTeamRow(team, matches);
        tbody.appendChild(tr);
    });
    container.appendChild(thead);
    container.appendChild(tbody);
};
function tableSort(a, b) {
    const aPoints = a.points || 0;
    const aGoalDiff = getGoalDiff(a);
    const bPoints = b.points || 0;
    const bGoalDiff = getGoalDiff(b);
    if (bPoints - aPoints !== 0) {
        return bPoints - aPoints;
    }
    if (bGoalDiff - aGoalDiff !== 0) {
        return bGoalDiff - aGoalDiff;
    }
    return (b.goalsFor || 0) - (a.goalsFor || 0);
}
function getGoalDiff(team) {
    const goalsFor = team.goalsFor || 0;
    const goalsAgainst = team.goalsAgainst || 0;
    return goalsFor - goalsAgainst;
}
