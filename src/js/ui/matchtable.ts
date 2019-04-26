import { createTeamInfo } from './teaminfo.js';
import matchInfo from './matchinfo.js';
import { Round, rounds } from '../data/rounds.js';
import { Team } from '../data/team.js';
import { Match } from '../data/match.js';

const MATCHTABLE_ID = 'matchtable';
const DISPLAY_FROM_DATE: Date = new Date();

let createMatchInfo: (currentTeamId: number, match: Match) => HTMLElement;

function createRoundCell(currentTeamId: any, matches?: Array<Match>) {
  const td = document.createElement('td');
  td.classList.add('round');

  if (matches) {
    const list = document.createElement('ol');
    list.classList.add('round--matches', 'nrk-unset');

    const matchItems = matches.map((match: any) => {
      const matchInfo = createMatchInfo(currentTeamId, match);
      const listItem = document.createElement('li');
      listItem.classList.add('match');

      listItem.appendChild(matchInfo);

      return listItem;
    });

    matchItems.forEach((item: any) => {
      list.appendChild(item);
    });

    td.appendChild(list);
  }

  return td;
}

function createTeamRow(team: Team, matches: Array<Match>) {
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

export default (teams: Array<Team>, matches: Array<Match>) => {
  const tbody = document.createElement('tbody');
  const thead = document.createElement('thead');
  thead.appendChild(createRoundDatesRow());
  const container = document.getElementById(MATCHTABLE_ID);

  if (!container) {
    return;
  }

  createMatchInfo = matchInfo(teams);

  teams.forEach((team: Team) => {
    const tr = createTeamRow(team, matches);
    tbody.appendChild(tr);
  });

  container.appendChild(thead);
  container.appendChild(tbody);
};
